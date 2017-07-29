import Immutable from 'immutable'
import {load} from '@/lib/storage.js'
import {CHANGE_CONFIG} from './actions'

const initialState = Immutable.fromJS(load('config'))

export default (state = initialState, action) => {
  const {type, value, config} = action
  switch (type) {
    case CHANGE_CONFIG:
      return state.update(config.key, val => config.value)
    default:
      return state
  }
}
