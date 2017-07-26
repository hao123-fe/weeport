import {save} from '@/lib/storage.js'

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
export const CHANGE_REPORT_NAME = 'CHANGE_REPORT_NAME'

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
    type: ADD_PROJECT,
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
    value,
    index
  }
}

export function changeReportName (value) {
  save('config', {
    reportName: value
  })
  return {
    type: CHANGE_REPORT_NAME,
    value
  }
}
