<template>
  <footer class="relative pt-8 pb-6 text-gray-500 dark:text-gray-100" style="height: 150px">
    <div class="container mx-auto px-4">
      <hr class="my-6 border-gray-200" />
      <div class="flex flex-wrap items-center md:justify-between justify-center">
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm font-semibold py-1">
            Created with <font-awesome-icon :icon="['fas', 'fa-heart']" /> and
            <font-awesome-icon :icon="['fas', 'fa-mug-hot']" /> by
            <a
              href="https://github.com/AndrewR3K"
              target="_blank"
              class="underline hover:text-cyan-600"
              >AndrewR3K</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const date = new Date().getFullYear()
</script>