import {combineReducers} from 'redux'
import Immutable from 'immutable'
import {EDIT_THIS_WEEK, EDIT_NEXT_WEEK, CHECK_THIS_WEEK, CHECK_NEXT_WEEK} from './actions'
import {focusNextInput, focusPrevInput} from '@/lib/util.js' 

const initialState = Immutable.fromJS({
  thisWeek: (['']),
  nextWeek: Immutable.fromJS([''])
})

const editReport = (state = initialState, action) => {
  const {type, index, value, e} = action
  switch (type) {
    case EDIT_THIS_WEEK:
      return state.updateIn(['thisWeek', index], val => value)
    case EDIT_NEXT_WEEK:
      return state.updateIn(['nextWeek', index], val => value)
    case CHECK_THIS_WEEK:
      if (e.keyCode === 13 && e.target.value) {
        focusNextInput(e.target)
        return state.updateIn(['thisWeek'], val => val.push(''))
      } else if (e.keyCode === 8 && !e.target.value && state.getIn(['thisWeek']).size > 1) {
        focusPrevInput(e.target)
        return state.updateIn(['thisWeek'], val => val.splice(index, 1))
      } else {
        return state
      }
    case CHECK_NEXT_WEEK:
      if (e.keyCode === 13 && e.target.value) {
        focusNextInput(e.target)
        return state.updateIn(['nextWeek'], val => val.push(''))
      } else if (e.keyCode === 8 && !e.target.value && state.getIn(['nextWeek']).size > 1) {
        focusPrevInput(e.target)
        return state.updateIn(['nextWeek'], val => val.splice(index, 1))
      } else {
        return state
      }
    default:
      return state
  }
}

export default combineReducers({
  editReport
})