import Immutable from 'immutable'
import {load} from '@/lib/storage.js'
import {CHANGE_CONFIG} from './actions'

const configData = load('config')
const initialState = Immutable.fromJS({
  reportName: configData.reportName || '未命名周报',
  userName: configData.userName || '未知用户'
})

export default (state = initialState, action) => {
  const {type, config} = action
  switch (type) {
    case CHANGE_CONFIG:
      return state.update(config.key, val => config.value)
    default:
      return state
  }
}
