import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import UwpContainer from '@/components/UwpContainer.js'
import Edit from '@/components/Edit/Index.js'
import List from '@/components/List/Index.js'
import Settings from '@/components/Settings/Index.js'
import Help from '@/components/Help/Index.js'
// import Home from '@/components/Home/Index.js'

export default class App extends React.Component {
  render () {
    return <Router>
      <UwpContainer>
        <Route exact path='/' component={Edit} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/list/:id' component={List} />
        <Route exact path='/edit' component={Edit} />
        <Route exact path='/list' component={List} />
        <Route path='/settings' component={Settings} />
        <Route path='/help' component={Help} />
      </UwpContainer>
    </Router>
  }
}
