import Vue from 'vue'
import Vuex from 'vuex'
import week from '../lib/week.js'

Vue.use(Vuex)

function getPrevReport (reportDate) {
  const date = new Date(reportDate)
  date.setDate(date.getDate() - 7)
  const currentWeek = week(date)
  if (!+currentWeek) {
    date.setFullYear(date.getFullYear() - 1)
    date.setMonth(11)
    date.setDate(31)
  }
  const reportKey = `${date.getFullYear()}_${week(date)}`
  const data = global.localStorage.getItem(reportKey) ? JSON.parse(global.localStorage.getItem(reportKey)) : {
    title: '',
    date: reportDate,
    projects: []
  }
  return data
}

function getReportKey (reportDate) {
  const date = new Date(reportDate)
  const currentWeek = week(date)
  if (!+currentWeek) {
    date.setFullYear(date.getFullYear() - 1)
    date.setMonth(11)
    date.setDate(31)
  }
  return `${date.getFullYear()}_${week(date)}`
}

function newReport () {
  const state = getPrevReport(new Date())
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
  state.date = new Date()
  state.projects = newProjects
  return state
}

const cache = global.localStorage.getItem(getReportKey(new Date()))

const state = cache ? JSON.parse(cache) : newReport()

const mutations = {
  UPDATEREPORT (state, newState) {
    state.title = newState.title
    state.date = newState.date
    state.projects = newState.projects
  },
  NEWREPORT (state) {
    const data = getPrevReport(state.date)
    state.projects = data.projects
    state.title = data.title
    state.date = data.date

    const newProjects = []
    for (const project of state.projects) {
      const newTasks = []
      for (const task of project.tasks) {
        task.status === '计划中' && (task.status = 'Pending')
        task.detail = ''
        task.status !== '已上线' && newTasks.push(task)
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
