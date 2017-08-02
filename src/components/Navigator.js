import React from 'react'
import PropTypes from 'prop-types'
import {NavigationView, SplitViewCommand} from 'react-uwp'

export default class Navigator extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor () {
    super()
    this.go = this.go.bind(this)
  }
  go (path) {
    const {route} = this.context.router
    const {push} = this.context.router.history
    return function () {
      path !== route.location.pathname && push(path)
    }
  }
  render () {
    const {props, go} = this
    const navigationTopNodes = [
      // <SplitViewCommand label="本周周报" onClick={go('/')} icon={"Home"} />,
      <SplitViewCommand label='周报列表' onClick={go('/list')} icon={'CalendarWeek'} />,
      <SplitViewCommand label='编辑周报' onClick={go('/edit')} icon={'Edit'} />
    ]
    const navigationBottomNode = [
      <SplitViewCommand label='设置' onClick={go('/settings')} icon={'Settings'} />,
      <SplitViewCommand label='帮助' visited onClick={go('/help')} icon={'Help'} />
    ]
    return <NavigationView className='full-size'
      pageTitle='WEEPORT'
      displayMode='overlay'
      autoResize={false}
      initWidth={0}
      navigationTopNodes={navigationTopNodes}
      navigationBottomNodes={navigationBottomNode}
    >
      <div className='content-container'>
        {props.children}
      </div>
    </NavigationView>
  }
}
