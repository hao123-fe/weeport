import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Report from './Report.js'
import clipIt from 'clip-it'
import {loadReport} from '@/store/actions'
import {hasReport, getDate} from '@/lib/util.js'
import {Icon, CalendarView, ContentDialog, CommandBar, AppBarButton, AppBarSeparator, Toast} from 'react-uwp'

class ReportList extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  constructor () {
    super()
    this.state = {
      showCopyToast: false,
      showDatepickerToast: false
    }
    this.copy = this.copy.bind(this)
  }
  copy (e) {
    if ((e.ctrlKey && e.keyCode === 67) || !e.keyCode) {
      e.preventDefault()
      clipIt(
        `${this.refs.report.innerHTML}<div style="text-align: right">本页由 <a href="https://github.com/hao123-fe/weeport">周报生成器</a> 生成</div>`,
        {contentType: 'text/html'}
      )
      this.setState({showCopyToast: true})
    }
  }
  componentDidMount () {
    const {dispatch, match} = this.props
    dispatch(loadReport(match.params.id))
    document.addEventListener('keydown', this.copy)
  }
  componentWillReceiveProps (nextProps) {
    const {dispatch, match} = this.props
    const id = nextProps.match.params.id
    if (match.params.id !== id) {
      dispatch(loadReport(id))
    }
  }
  componentWillUnmount () {
    document.removeEventListener('keydown', this.copy)
  }
  render () {
    const {theme} = this.context
    const {report, config, match, history} = this.props
    const {showCopyToast, showDatepickerToast} = this.state
    const {reportName, userName} = config.toJS()
    const {reportDate, thisWeek, nextWeek, projects} = report.toJS()
    return <section style={{width: '100%'}}>
      <Toast
        defaultShow={showDatepickerToast}
        logoNode={<Icon>CalendarReply</Icon>}
        title="选择周报日期"
        showCloseIcon
      >
        <CalendarView onChangeDate={e => {
          this.setState({showDatepickerToast: false})
          history.push(`/list/${getDate(e)}`)
        }}/>
      </Toast>
      <Toast
        title="复制"
        description={["复制成功，可直接粘贴至邮件客户端。"]}
        showCloseIcon
        defaultShow={showCopyToast}
        onToggleShowToast={showCopyToast => this.setState({showCopyToast})}
        closeDelay={3000}
      />
      <div className="command-bar" style={{background: theme.acrylicTexture80.background}}>
        <CommandBar
          background={theme.acrylicTexture80.background}
          labelPosition="right"
          primaryCommands={[
            <AppBarButton icon="CalendarReply" label="选择周报" onClick={e => this.setState({showDatepickerToast: true})}/>,
            <AppBarButton icon="Edit" label="编辑" onClick={e => history.push(`/edit/${match.params.id ? getDate(match.params.id) : ''}`)}/>,
            <AppBarSeparator/>,
            hasReport({thisWeek, nextWeek, projects}) && <AppBarButton icon="Copy" label="复制当前页" onClick={this.copy}/>
          ]}
          secondaryCommands={false}
        />
      </div>
      <div className="content-with-command-bar" ref="report">
        <Report
          theme={theme}
          reportName={reportName}
          userName={userName}
          date={reportDate}
          thisWeek={thisWeek}
          nextWeek={nextWeek}
          projects={projects}/>
      </div>
    </section>
  }
}

export default connect(state => ({
  report: state.report,
  config: state.config
}))(ReportList)