import Immutable from 'immutable'
import {SAVE_REPORT, LOAD_REPORT, IMPORT_REPORT, EDIT_THIS_WEEK, EDIT_NEXT_WEEK, ADD_STEP, UPDATE_STEP, CHECK_THIS_WEEK, CHECK_NEXT_WEEK, PUSH_TO_THIS_WEEK, PUSH_TO_NEXT_WEEK, CHANGE_REPORT_DATE, ADD_PROJECT, CHANGE_CURRENT_PROJECT, UPDATE_PROJECT} from './actions'
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
      return state.update('thisWeek', val => val.push(''))  
    case PUSH_TO_NEXT_WEEK:
      return state.update('nextWeek', val => val.push(''))
    case CHECK_THIS_WEEK:
      if (e.keyCode === 13 && e.target.value) {
        e.preventDefault()
        focusNextInput(e.target)
        return state.update('thisWeek', val => val.splice(index + 1, 0, ''))
      } else if (e.keyCode === 8 && !e.target.value/* && state.getIn(['thisWeek']).size > 1 */) {
        e.preventDefault()
        focusPrevInput(e.target)
        return state.update('thisWeek', val => val.splice(index, 1))
      } else {
        return state
      }
    case CHANGE_REPORT_DATE:
      return state.update('reportDate', val => date)
    case CHECK_NEXT_WEEK:
      if (e.keyCode === 13 && e.target.value) {
        e.preventDefault()
        focusNextInput(e.target)
        return state.update('nextWeek', val => val.splice(index + 1, 0, ''))
      } else if (e.keyCode === 8 && !e.target.value/* && state.getIn(['nextWeek']).size > 1 */) {
        e.preventDefault()
        focusPrevInput(e.target)
        return state.update('nextWeek', val => val.splice(index, 1))
      } else {
        return state
      }
    case ADD_PROJECT:
      return state.update('projects', val => val.push(Immutable.fromJS({
        name: '',
        description: '',
        members: '',
        steps: [],
        open: true
      })))
    case CHANGE_CURRENT_PROJECT:
      return state.update('currentProject', val => value)
    case UPDATE_PROJECT:
      return state.updateIn(['projects', value.index === undefined ? state.get('currentProject') : value.index, value.key], val => value.value)
    case SAVE_REPORT:
      return state
    case LOAD_REPORT:
      return state
        .update('reportDate', val => Immutable.fromJS(value.date))
        .update('projects', val => Immutable.fromJS(value.projects || []))
        .update('thisWeek', val => Immutable.fromJS(value.thisWeek || []))
        .update('nextWeek', val => Immutable.fromJS(value.nextWeek || []))
    case IMPORT_REPORT:
      return state
    case ADD_STEP:
      const newStep = {
        name: '未命名流程',
        start: new Date(),
        end: new Date(),
        state: 'PENDING'
      }
      return state.updateIn(['projects', state.get('currentProject'), 'steps'], val => val ? val.push(Immutable.fromJS(newStep)) : Immutable.fromJS([newStep]))
    case UPDATE_STEP:
      return state.updateIn(['projects', state.get('currentProject'), 'steps', value.index, value.key], val => value.value)
    default:
      return state
  }
}
