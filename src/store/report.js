import {LOAD_REPORT} from '@/store/actions.js'
import Immutable from 'immutable'
const initialState = Immutable.fromJS({
  date: new Date(),
  thisWeek: [],
  nextWeek: [],
  projects: []
})

export default (state = initialState, action) => {
  const {type, value} = action
  switch (type) {
    case LOAD_REPORT:
      return state
        .update('reportDate', val => Immutable.fromJS(value.date))
        .update('projects', val => Immutable.fromJS(value.projects || []))
        .update('thisWeek', val => Immutable.fromJS(value.thisWeek || []))
        .update('nextWeek', val => Immutable.fromJS(value.nextWeek || []))
    default:
      return state
  }
}