<template>
  <div class="flex flex-col h-screen justify-between bg-gray-100 dark:bg-neutral-800 h-full">
    <Nav />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
</style>
