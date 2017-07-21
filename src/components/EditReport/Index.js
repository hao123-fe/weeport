import React from 'react'
import {connect} from 'react-redux'
import {editThisWeek, editNextWeek, checkThisWeek, checkNextWeek} from '@/store/actions.js'
import ReportTextBox from './ReportTextBox.js'
import {CalendarDatePicker, DropDownMenu} from 'react-uwp'

class EditReport extends React.Component {
  static contextTypes = {
      theme: React.PropTypes.object
  }
  constructor (props, context) {
    super(props, context)
    console.log(context)
  }
  render () {
    const { theme } = this.context
    const {dispatch} = this.props
    const data = this.props.editReport.toJS()
    const {thisWeek, nextWeek} = data
    const weekStyle = {
      flex: '1',
      color: theme.baseHigh,
      fontSize: 14,
      fontWeight: "lighter",
      padding: '15px',
      margin: 10,
      outline: "none",
      border: `1px solid ${theme.listAccentLow}`,
      background: theme.acrylicTexture60.background
    }
    return <section>
      <h1 style={{
        textAlign: 'center',
        padding: '20px 0'
      }}>2017 年 7.16 ~ 7.21 （第 100 周）周报</h1>
      <div style={{
        display: 'flex',
      }}>
        <div style={weekStyle}>
        <h2>本周总结</h2>
        {
          thisWeek.map((item, index) => <ReportTextBox
            placeholder="ENTER / BACKSPACE"
            onChangeValue={e => dispatch(editThisWeek(e, index))}
            onKeyDown={e => dispatch(checkThisWeek(e, index))}
            key={index}
            value={item}
          />)
        }
        </div>
        <div style={weekStyle}>
        <h2>下周计划</h2>
        {
          nextWeek.map((item, index) => <ReportTextBox
            placeholder="ENTER / BACKSPACE"
            onChangeValue={e => dispatch(editNextWeek(e, index))}
            onKeyDown={e => dispatch(checkNextWeek(e, index))}
            key={index}
            value={item}
          />)
        }
        </div>
      </div>
      <div style={{
        display: 'flex',
      }}>
        <div style={weekStyle}>
          <h2>项目进度</h2>
          <h3>通用专题</h3>
          <ReportTextBox placeholder="工作描述"/>
          <ReportTextBox placeholder="参与人员"/>
          <ReportTextBox placeholder="流程"/>
          <CalendarDatePicker background="rgba(0,0,0,.25)" defaultDate={new Date()}/>
          <CalendarDatePicker background="rgba(0,0,0,.25)" defaultDate={new Date()}/>
          <DropDownMenu values={["PENDING", "DEVELOPING", "DELAY"]}/>
        </div>
      </div>
    </section>
  }
}

export default connect(state => ({
  editReport: state.editReport
}))(EditReport)