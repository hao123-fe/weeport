import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Report from './Report.js'
import clipIt from 'clip-it'
import {loadReport} from '@/store/actions'
import {hasReport} from '@/lib/util.js'
import {CommandBar, AppBarButton, AppBarSeparator, Toast} from 'react-uwp'

class ReportList extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  constructor () {
    super()
    this.state = {
      showCopyToast: false
    }
  }
  componentDidMount () {
    const {dispatch} = this.props
    dispatch(loadReport())
  }
  render () {
    const {theme} = this.context
    const {report, config} = this.props
    const {showCopyToast} = this.state
    const {reportName, userName} = config.toJS()
    const {date, thisWeek, nextWeek, projects} = report.toJS()
    return <section style={{width: '100%'}}>
      <Toast
        title="复制"
        description={["复制成功。"]}
        showCloseIcon
        defaultShow={showCopyToast}
        onToggleShowToast={showCopyToast => this.setState({showCopyToast})}
        closeDelay={3000}
      />
      <div style={{background: theme.acrylicTexture80.background}}>
        <CommandBar
          background={theme.acrylicTexture80.background}
          labelPosition="right"
          primaryCommands={[
            <AppBarButton icon="CalendarReply" label="选择周报" />,
            hasReport({thisWeek, nextWeek, projects}) && <AppBarButton icon="Copy" label="复制当前页" onClick={e => {
              clipIt(this.refs.report.innerHTML + '<div style="text-align: right">本页由 <a href="//github.com/hao123-fe/weeport">周报生成器</a> 生成</div>', {contentType: 'text/html'})
              this.setState({showCopyToast: true})
            }}/>,
            <AppBarButton icon="Save" label="编辑" />
          ]}
          secondaryCommands={false}
        />
      </div>
      <div ref="report" style={{padding: '20px'}}>
        <Report
            theme={theme}
            reportName={reportName}
            userName={userName}
            date={date}
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