import React from 'react'
import {connect} from 'react-redux'
import {changeReportName} from '@/store/actions.js'
import {TextBox} from 'react-uwp'

class Settings extends React.Component {
  constructor () {
    super()
  }
  render () {
    const {dispatch, config} = this.props
    const data = config.toJS()
    const {reportName} = data
    return <section>
      <TextBox value={reportName} onChange={e => dispatch(changeReportName(e.target.value))}/>
    </section>
  }
}

export default connect(state => ({
  config: state.config
}))(Settings)