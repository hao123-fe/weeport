export const EDIT_THIS_WEEK = 'EDIT_THIS_WEEK'
export const EDIT_NEXT_WEEK = 'EDIT_NEXT_WEEK'
export const CHECK_THIS_WEEK = 'CHECK_THIS_WEEK'
export const CHECK_NEXT_WEEK = 'CHECK_NEXT_WEEK'

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