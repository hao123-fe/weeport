import React from 'react'
import {connect} from 'react-redux'
import {editThisWeek, editNextWeek, checkThisWeek, checkNextWeek} from '@/store/actions.js'
import PropTypes from 'prop-types'
import UwpContainer from '@/components/UwpContainer.js'
import EditReport from '@/components/EditReport/Index.js'

export default class App extends React.Component {
  constructor () {
    super()
  }
  render () {
    return <UwpContainer>
      <EditReport/>
    </UwpContainer>
  }
}