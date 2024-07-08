<template>
  <nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <RouterLink
          to="/"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase dark:text-gray-100 text-gray-800 inline-flex items-baseline"
          ><img :src="icon" alt="seaweed logo" class="self-center w-5 h-5 mr-2" />Algal Bloom
          Map</RouterLink
        >
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <font-awesome-icon
            v-if="!showMenu"
            class="text-gray-500 hover:text-cyan-600 text-lg leading-lg dark:text-gray-100"
            :icon="['fas', 'fa-bars']"
          />
          <font-awesome-icon
            v-else
            class="text-gray-500 hover:text-cyan-600 text-lg leading-lg dark:text-gray-100"
            :icon="['fas', 'x']"
          />
        </button>
      </div>
      <div
        class="lg:flex lg:rounded-none rounded-md flex-grow items-center border-2 lg:border-0 border-cyan-600 bg-white dark:bg-neutral-600 dark:lg:bg-transparent lg:bg-transparent lg:shadow-none"
        :class="{ hidden: !showMenu, block: showMenu }"
      >
        <ul class="flex flex-col lg:flex-row list-none mr-auto">
          <li class="flex items-center">
            <RouterLink
              to="/"
              class="lg:hover:text-cyan-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold dark:text-gray-100 text-gray-600"
              >Map</RouterLink
            >
          </li>
          <li class="flex items-center">
            <RouterLink
              to="/report"
              class="lg:hover:text-cyan-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold dark:text-gray-100 text-gray-600"
              >Report</RouterLink
            >
          </li>
          <li class="flex items-center">
            <RouterLink
              to="/about"
              class="lg:hover:text-cyan-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold dark:text-gray-100 text-gray-600"
              >About</RouterLink
            >
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <a
              class="lg:hover:text-cyan-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold dark:text-gray-100 text-gray-600"
              target="_blank"
              href="https://github.com/AndrewR3K/algal-bloom-map"
            >
              <font-awesome-icon class="text-lg leading-lg" :icon="['fab', 'github']" />
              <span class="lg:hidden inline-block ml-2">Github</span>
            </a>
          </li>
          <li>
            <input
              type="checkbox"
              name="light-switch"
              v-model="isDark"
              class="light-switch sr-only"
            />
            <label
              class="flex items-center justify-center cursor-pointer w-8 h-8 hover:text-cyan-600 rounded-full dark:text-gray-100 text-gray-600"
              for="light-switch"
              @click="toggleDark()"
            >
              <svg
                class="w-4 h-4 dark:hidden"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-current"
                  d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"
                />
                <path
                  class="fill-current"
                  d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
                />
              </svg>
              <svg
                class="w-4 h-4 hidden dark:block hover:text-cyan-600"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-current"
                  d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"
                />
                <path
                  class="fill-current"
                  d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"
                />
              </svg>
              <span class="sr-only">Switch to light / dark version</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import icon from '@/assets/logo.png'

const showMenu = ref(false)

const toggleNavbar = () => {
  showMenu.value = !showMenu.value
}

const isDark = useDark({
  selector: 'html'
})

const toggleDark = useToggle(isDark)

const route = useRoute()

const path = computed(() => route.path)
</script>