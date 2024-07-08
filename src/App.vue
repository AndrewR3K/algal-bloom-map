<template>
  <div class="flex flex-col h-screen justify-between bg-gray-100 dark:bg-neutral-800">
    <Nav />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
</script>

<style scoped>
</style>
