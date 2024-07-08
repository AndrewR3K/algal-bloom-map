<template>
  <div id="map" style="height: 90vh" class="z-0"></div>
</template>

<script setup>
import { shallowRef, onMounted } from 'vue'
import axios from 'axios'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import * as L from 'leaflet'
import 'leaflet.markercluster'

import logo from '@/assets/logo.png'

const initialMap = shallowRef(null)

const logoIcon = L.icon({
  iconUrl: logo,
  iconSize: [32, 32],
  iconAnchor: [16, 0],
  popupAnchor: [0, 0]
})

onMounted(async () => {
  initialMap.value = L.map('map', {
    zoomControl: true,
    zoom: 1,
    zoomAnimation: false,
    fadeAnimation: true,
    markerZoomAnimation: true
  }).setView([37.7749, -122.431297], 6)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value)

  const options = {
    method: 'GET',
    url: 'https://data.ca.gov/api/3/action/datastore_search',
    params: { resource_id: '67648948-034f-4882-bbc0-c07c7d38daf9', limit: '5000' }
  }
  const markers = L.markerClusterGroup()
  try {
    const { data } = await axios.request(options)
    let filtered_data = data?.result?.records?.filter((record) => {
      if (record?.Bloom_Longitude !== null && record?.Bloom_Latitude !== null) {
        let current_date = new Date()

        if (record?.Case_Status == 'Closed') return false

        if (record?.Advisory_End_Date !== null) {
          let advisory_date = new Date(record?.Advisory_End_Date)
          if (current_date <= advisory_date) return true
        }

        if (record?.Advisory_Start_Date !== null) {
          let advisory_date = new Date(record?.Advisory_End_Date)
          if (current_date >= advisory_date) return true
        }
      }

      return false
    })

    for (let index = 0; index < filtered_data?.length; index++) {
      const record = filtered_data[index]
      if (record?.Bloom_Longitude !== null && record?.Bloom_Latitude !== null) {
        const each_marker = new L.marker([record.Bloom_Latitude, record.Bloom_Longitude], {
          icon: logoIcon
        }).bindPopup(
          `
            <dl class="max-w-md text-gray-900 divide-y divide-gray-200 text-xs">
                <div class="flex flex-col pb-3">
                    <dt class="mb-1 mr-2 text-gray-500">Advisory Window</dt>
                    <dd class="font-semibold">
                    ${record.Advisory_Start_Date} ${
            record.Advisory_End_Date ? '- ' + record.Advisory_End_Date : ''
          }
                    </dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500">Case Status</dt>
                    <dd class="font-semibold">
                    ${record.Case_Status}
                </dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500 ">Advisory Status</dt>
                    <dd class="font-semibold">${record.Advisory_Recommended || 'None'}</dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500 ">Bloom Details</dt>
                    <dd class="font-semibold">${record.Advisory_Detail || 'None'}</dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500 ">Bloom Size</dt>
                    <dd class="font-semibold">${record.Bloom_Size || 'None'}</dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500 ">Bloom Texture</dt>
                    <dd class="font-semibold">${record.Bloom_Texture || 'None'}</dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500 ">Bloom Location</dt>
                    <dd class="font-semibold">${record.Bloom_Location || 'None'}</dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500 ">Landmark</dt>
                    <dd class="font-semibold">${record.Landmark || 'None'}</dd>
                </div>
                <div class="flex flex-col py-3">
                    <dt class="mb-1 mr-2 text-gray-500 ">Reported By</dt>
                    <dd class="font-semibold">${record.Report_Type || 'None'}</dd>
                </div>
                <div class="flex flex-col py-3 ">
                    <dt class="mb-1 mr-2 text-gray-500 ">More Information</dt>
                    <dd class="font-semibold">Advisory ID: <a href="https://data.ca.gov/dataset/surface-water-freshwater-harmful-algal-blooms/resource/c6a36b91-ad38-4611-8750-87ee99e497dd?inner_span=True&filters=Advisory_ID%3A${
                      record.Advisory_ID
                    }" target="_blank">${record.Advisory_ID}</a></dd>
                    <dd class="font-semibold">Case ID: <a href="https://data.ca.gov/dataset/surface-water-freshwater-harmful-algal-blooms/resource/67648948-034f-4882-bbc0-c07c7d38daf9?inner_span=True&filters=Case_ID%3A${
                      record.Case_ID
                    }" target="_blank">${record.Case_ID}</a></dd>
                    <dd class="font-semibold">Bloom Report ID: <a href="https://data.ca.gov/dataset/surface-water-freshwater-harmful-algal-blooms/resource/c6a36b91-ad38-4611-8750-87ee99e497dd?inner_span=True&filters=Bloom_Report_ID%3A${
                      record.Bloom_Report_ID
                    }" target="_blank">${record.Bloom_Report_ID}</a></dd>
                </div>

                <div class="flex flex-col py-3 ">
                    <dt class="mb-1 mr-2 text-gray-500 ">Data Sourced from: </dt>
                    <dd class="font-semibold"><a href="https://data.ca.gov/dataset/surface-water-freshwater-harmful-algal-blooms" target="_blank">CA.Gov Surface Water - Freshwater Harmful Algal Blooms</a></dd>
                </div>
            </dl>
          `
        )

        markers.addLayer(each_marker)
      }
    }

    initialMap.value.addLayer(markers)
  } catch (error) {
    console.error(error)
  }
})
</script>