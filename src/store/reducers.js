import {combineReducers} from 'redux'
import editReport from './edit-report.js'
import config from './config.js'

export default combineReducers({
  config,
  editReport
})