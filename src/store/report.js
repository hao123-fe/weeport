import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const cache = global.localStorage.getItem('cache')

const state = cache ? JSON.parse(cache) : {
  title: '',
  date: '',
  projects: [],
  plans: []
}

const mutations = {
  UPDATEREPORT (state, newState) {
    state = newState
  }
}

export default new Vuex.Store({
  state,
  mutations
})
