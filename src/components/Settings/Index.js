import React from 'react'
import {connect} from 'react-redux'
import {load, save} from '@/lib/storage.js'
import {changeConfig} from '@/store/actions.js'
import SettingTextBox from './SettingTextBox.js'
import PropTypes from 'prop-types'
import {Button, Toast} from 'react-uwp'

class Settings extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  static propTypes = {
    dispatch: PropTypes.func,
    config: PropTypes.object
  }
  constructor () {
    super()
    this.state = {
      showToast: false,
      toastText: '',
      toastTitle: ''
    }
    this.importData = this.importData.bind(this)
    this.exportData = this.exportData.bind(this)
    this.openToast = this.openToast.bind(this)
  }
  openToast (title = '', text = '') {
    this.setState({
      toastTitle: title,
      toastText: text,
      showToast: true
    })
  }
  importData (e) {
    const reader = new global.FileReader()
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result)
        save('reports', data)
        this.openToast('导入数据', '导入成功。')
      } catch (e) {
        this.openToast('导入数据', '导入失败，请检查数据格式是否正确。')
      }
    }
    reader.readAsText(e.target.files[0])
  }
  exportData () {
    const $download = document.createElement('a')
    $download.download = '周报.json'
    $download.href = `data:application/json;charset=UTF-8,${encodeURIComponent(JSON.stringify(load('reports')))}`
    document.body.appendChild($download)
    $download.click()
    document.body.removeChild($download)
    this.openToast('导出数据', '导出成功。')
  }
  render () {
    const {dispatch, config} = this.props
    const {showToast, toastText, toastTitle} = this.state
    const {theme} = this.context
    const data = config.toJS()
    const {reportName, userName} = data
    return <section className={'content'}>
      <Toast
        title={toastTitle}
        description={toastText}
        showCloseIcon
        defaultShow={showToast}
        onToggleShowToast={showToast => this.setState({showToast})}
        closeDelay={3000}
      />
      <div style={{background: theme.acrylicTexture60.background, padding: '20px'}}>
        <h1 style={{borderBottom: `2px solid ${theme.listAccentLow}`}}>设置</h1>
        <SettingTextBox placeholder={'周报名称'} value={reportName} onChange={e => dispatch(changeConfig({key: 'reportName', value: e.target.value}))} />
        <SettingTextBox placeholder={'周报所属人姓名'} value={userName} onChange={e => dispatch(changeConfig({key: 'userName', value: e.target.value}))} />
        <Button className={'form-control'} onClick={this.exportData}>导出数据</Button>
        <Button className={'form-control'}>
          导入数据
          <input className={'file-selector'} type={'file'} onChange={this.importData}
          />
        </Button>
      </div>
    </section>
  }
}

export default connect(state => ({
  config: state.config
}))(Settings)
