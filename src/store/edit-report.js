import Immutable from 'immutable'
import {EDIT_THIS_WEEK, EDIT_NEXT_WEEK, CHECK_THIS_WEEK, CHECK_NEXT_WEEK, PUSH_TO_THIS_WEEK, PUSH_TO_NEXT_WEEK, CHANGE_REPORT_DATE, ADD_PROJECT, CHANGE_CURRENT_PROJECT, UPDATE_PROJECT} from './actions'
import {focusNextInput, focusPrevInput} from '@/lib/util.js' 

const initialState = Immutable.fromJS({
  reportDate: new Date(),
  projects: [],
  currentProject: null,
  thisWeek: [],
  nextWeek: []
})

export default (state = initialState, action) => {
  const {type, index, value, date, e} = action
  switch (type) {
    case EDIT_THIS_WEEK:
      return state.updateIn(['thisWeek', index], val => value)  
    case EDIT_NEXT_WEEK:
      return state.updateIn(['nextWeek', index], val => value)
    case PUSH_TO_THIS_WEEK:
      return state.updateIn(['thisWeek'], val => val.push(''))  
    case PUSH_TO_NEXT_WEEK:
      return state.updateIn(['nextWeek'], val => val.push(''))
    case CHECK_THIS_WEEK:
      if (e.keyCode === 13 && e.target.value) {
        e.preventDefault()
        focusNextInput(e.target)
        return state.updateIn(['thisWeek'], val => val.splice(index + 1, 0, ''))
      } else if (e.keyCode === 8 && !e.target.value/* && state.getIn(['thisWeek']).size > 1 */) {
        e.preventDefault()
        focusPrevInput(e.target)
        return state.updateIn(['thisWeek'], val => val.splice(index, 1))
      } else {
        return state
      }
    case CHANGE_REPORT_DATE:
      return state.updateIn(['reportDate'], val => date)
    case CHECK_NEXT_WEEK:
      if (e.keyCode === 13 && e.target.value) {
        e.preventDefault()
        focusNextInput(e.target)
        return state.updateIn(['nextWeek'], val => val.splice(index + 1, 0, ''))
      } else if (e.keyCode === 8 && !e.target.value/* && state.getIn(['nextWeek']).size > 1 */) {
        e.preventDefault()
        focusPrevInput(e.target)
        return state.updateIn(['nextWeek'], val => val.splice(index, 1))
      } else {
        return state
      }
    case ADD_PROJECT:
      return state.updateIn(['projects'], val => val.push({
        name: '',
        description: '',
        members: '',
        open: true
      }))
    case CHANGE_CURRENT_PROJECT:
      return state.updateIn(['currentProject'], val => value)
    case UPDATE_PROJECT:
      return state.updateIn(['projects', index === undefined ? state.get('currentProject') : index], val => Object.assign({}, val, value))
    default:
      return state
  }
}
