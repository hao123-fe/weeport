import React from 'react'
import {connect} from 'react-redux'
import {changeConfig} from '@/store/actions.js'
import {TextBox} from 'react-uwp'

class Settings extends React.Component {
  constructor () {
    super()
  }
  render () {
    const {dispatch, config} = this.props
    const data = config.toJS()
    const {reportName, userName} = data
    return <section>
      <TextBox value={reportName} onChange={e => dispatch(changeConfig({key: 'reportName', value: e.target.value}))}/>
      <TextBox value={userName} onChange={e => dispatch(changeConfig({key: 'userName', value: e.target.value}))}/>
    </section>
  }
}

export default connect(state => ({
  config: state.config
}))(Settings)