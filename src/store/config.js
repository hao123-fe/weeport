import Immutable from 'immutable'
import {load} from '@/lib/storage.js'
import {CHANGE_REPORT_NAME} from './actions'
const initialState = Immutable.fromJS({
  reportName: load('config').weeport || '研发周报'
})

export default (state = initialState, action) => {
  const {type, value} = action
  switch (type) {
    case CHANGE_REPORT_NAME:
      // console.log(state.updateIn(['config', 'reportName'], val => value).toJS())
      return state.updateIn(['reportName'], val => value)
    default:
      return state
  }
}