import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Map',
        metaTags: [
          {
            name: 'description',
            content:
              'The Algal Bloom Map is a dynamic and interactive tool that visualizes data on current algal bloom reports across California. By aggregating and presenting this information, we aim to help researchers, environmentalists, and the general public stay informed about the locations and severity of algal blooms.'
          },
          {
            name: 'keywords',
            content: 'algal, bloom, algal bloom, california, map, algal bloom map '
          }
        ]
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About',
        metaTags: [
          {
            name: 'description',
            content:
              'The Algal Bloom Map is a dynamic and interactive tool that visualizes data on current algal bloom reports across California. By aggregating and presenting this information, we aim to help researchers, environmentalists, and the general public stay informed about the locations and severity of algal blooms.'
          },
          {
            name: 'keywords',
            content: 'algal, bloom, algal bloom, california, map, algal bloom map '
          }
        ]
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/ReportView.vue'),
      meta: {
        title: 'Report',
        metaTags: [
          {
            name: 'description',
            content:
              'The Algal Bloom Map is a dynamic and interactive tool that visualizes data on current algal bloom reports across California. By aggregating and presenting this information, we aim to help researchers, environmentalists, and the general public stay informed about the locations and severity of algal blooms.'
          },
          {
            name: 'keywords',
            content: 'algal, bloom, algal bloom, california, map, algal bloom map '
          }
        ]
      }
    }
  ]
})

router.beforeResolve((to, from) => {
  document.title = (to.meta.title || 'Algal Bloom Map') + ' | Algal Bloom Map'
  if (to.meta.hasOwnProperty('metaTags')) {
    for (let x = 0; x < to.meta.metaTags.length; x++) {
      let oldMeta = document.getElementsByTagName('meta')
      for (let m = 0; m < oldMeta.length; m++) {
        if (oldMeta[m].name == to.meta.metaTags[x].name) {
          oldMeta[m].remove()
        }
      }
      let meta = document.createElement('meta')
      if (to.meta.metaTags[x] && to.meta.metaTags[x].hasOwnProperty('name')) {
        meta.name = to.meta.metaTags[x].name
        meta.content = to.meta.metaTags[x].content
      }
      if (to.meta.metaTags[x].hasOwnProperty('property')) {
        meta.property = to.meta.metaTags[x].name
        meta.content = to.meta.metaTags[x].content
      }
      document.head.appendChild(meta)
    }
  }
  // next()
})

export default router
