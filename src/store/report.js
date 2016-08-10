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
  },
  NEWREPORT (state) {
    const newProjects = []
    for (const project of state.projects) {
      const newTasks = []
      for (const task of project.tasks) {
        task.status !== '已上线' && newTasks.push(task)
        task.detail = ''
      }
      project.tasks = newTasks
      newTasks.length !== 0 && newProjects.push(project)
    }
    state.projects = newProjects
  }
}

export default new Vuex.Store({
  state,
  mutations
})
