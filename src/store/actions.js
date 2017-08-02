import {save, load} from '@/lib/storage.js'
import {week} from '@/lib/util.js'

export const EDIT_THIS_WEEK = 'EDIT_THIS_WEEK'
export const EDIT_NEXT_WEEK = 'EDIT_NEXT_WEEK'
export const CHECK_THIS_WEEK = 'CHECK_THIS_WEEK'
export const CHECK_NEXT_WEEK = 'CHECK_NEXT_WEEK'
export const PUSH_TO_THIS_WEEK = 'PUSH_TO_THIS_WEEK'
export const PUSH_TO_NEXT_WEEK = 'PUSH_TO_NEXT_WEEK'
export const CHANGE_REPORT_DATE = 'CHANGE_REPORT_DATE'
export const ADD_PROJECT = 'ADD_PROJECT'
export const CHANGE_CURRENT_PROJECT = 'CHANGE_CURRENT_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const CHANGE_CONFIG = 'CHANGE_CONFIG'
export const SAVE_REPORT = 'SAVE_REPORT'
export const LOAD_REPORT = 'LOAD_REPORT'
export const IMPORT_REPORT = 'IMPORT_REPORT'
export const ADD_STEP = 'ADD_STEP'
export const UPDATE_STEP = 'UPDATE_STEP'
export const INIT_STEP = 'INIT_STEP'
export const REMOVE_STEP = 'REMOVE_STEP'
export const SYNC_LAST_WEEK = 'SYNC_LAST_WEEK'

export function editThisWeek (value, index) {
  return {
    type: EDIT_THIS_WEEK,
    value,
    index
  }
}

export function editNextWeek (value, index) {
  return {
    type: EDIT_NEXT_WEEK,
    value,
    index
  }
}

export function checkThisWeek (e, index) {
  return {
    type: CHECK_THIS_WEEK,
    e,
    index
  }
}

export function checkNextWeek (e, index) {
  return {
    type: CHECK_NEXT_WEEK,
    e,
    index
  }
}

export function pushToThisWeek (e, index) {
  return {
    type: PUSH_TO_THIS_WEEK,
    e,
    index
  }
}

export function pushToNextWeek (e, index) {
  return {
    type: PUSH_TO_NEXT_WEEK,
    e,
    index
  }
}

export function changeReportDate (date) {
  return {
    type: CHANGE_REPORT_DATE,
    date
  }
}

export function addProject () {
  return {
    type: ADD_PROJECT
  }
}

export function changeCurrentProject (value) {
  return {
    type: CHANGE_CURRENT_PROJECT,
    value
  }
}

export function updateProject (value, index) {
  return {
    type: UPDATE_PROJECT,
    value
  }
}

export function changeConfig (config) {
  save('config', {
    [config.key]: config.value
  })
  return {
    type: CHANGE_CONFIG,
    config
  }
}

export function saveReport (report, date = new Date()) {
  save('reports', {
    [`${date.getFullYear()}_${week(date)}`]: report
  })
  return {
    type: SAVE_REPORT
  }
}

export function loadReport (id) {
  const reportDate = id ? new Date(id) : new Date()
  const report = load('reports')[`${reportDate.getFullYear()}_${week(reportDate)}`] || {}
  const {thisWeek, nextWeek, projects} = report
  return {
    type: LOAD_REPORT,
    value: {
      thisWeek,
      nextWeek,
      projects,
      reportDate
    }
  }
}

export function importReport (value) {
  return {
    type: IMPORT_REPORT
  }
}

export function addStep () {
  return {
    type: ADD_STEP
  }
}

export function updateStep (value) {
  return {
    value,
    type: UPDATE_STEP
  }
}

export function initStep (value) {
  return {
    type: INIT_STEP
  }
}

export function removeStep (index) {
  return {
    type: REMOVE_STEP,
    index
  }
}

export function syncLastWeek () {
  return {
    type: SYNC_LAST_WEEK
  }
}
