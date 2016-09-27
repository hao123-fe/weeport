import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Settings from './settings/index.vue'
import Preview from './preview/index.vue'
import Report from './report/index.vue'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Report
  },
  '/report': {
    component: Report
  },
  '/preview': {
    component: Preview
  },
  '/settings': {
    component: Settings
  }
})

router.start(App, 'app')
