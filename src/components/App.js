import React from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Route} from 'react-router-dom'
import {editThisWeek, editNextWeek, checkThisWeek, checkNextWeek} from '@/store/actions.js'
import PropTypes from 'prop-types'
import UwpContainer from '@/components/UwpContainer.js'
import Edit from '@/components/Edit/Index.js'
import List from '@/components/List/Index.js'
import Settings from '@/components/Settings/Index.js'
import Help from '@/components/Help/Index.js'
import Home from '@/components/Home/Index.js'

export default class App extends React.Component {
  constructor () {
    super()
  }
  render () {
    return <Router>
      <UwpContainer>
        <Route exact path="/" component={Home}/>
        <Route path="/edit" component={Edit}/>
        <Route path="/list" component={List}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/help" component={Help}/>
      </UwpContainer>
    </Router>
  }
}