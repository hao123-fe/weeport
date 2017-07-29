import {combineReducers} from 'redux'
import editReport from './edit-report.js'
import config from './config.js'
import report from './report.js'

export default combineReducers({
  config,
  editReport,
  report
})