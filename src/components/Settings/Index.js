import React from 'react'
import {connect} from 'react-redux'
import {changeConfig} from '@/store/actions.js'
import SettingTextBox from './SettingTextBox.js'
import PropTypes from 'prop-types'

class Settings extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  static propTypes = {
    dispatch: PropTypes.func,
    config: PropTypes.object
  }
  render () {
    const {dispatch, config} = this.props
    const {theme} = this.context
    const data = config.toJS()
    const {reportName, userName} = data
    return <section className={'content'}>
      <div style={{background: theme.acrylicTexture60.background, padding: '20px'}}>
        <h1 style={{borderBottom: `2px solid ${theme.listAccentLow}`}}>设置</h1>
        <SettingTextBox label={'周报名称'} value={reportName} onChange={e => dispatch(changeConfig({key: 'reportName', value: e.target.value}))} />
        <SettingTextBox label={'周报所属人姓名'} value={userName} onChange={e => dispatch(changeConfig({key: 'userName', value: e.target.value}))} />
      </div>
    </section>
  }
}

export default connect(state => ({
  config: state.config
}))(Settings)
