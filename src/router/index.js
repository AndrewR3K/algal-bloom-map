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
        title: 'Map'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/ReportView.vue'),
      meta: {
        title: 'Report'
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
