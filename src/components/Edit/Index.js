import React from 'react'
import {connect} from 'react-redux'
import {editThisWeek, editNextWeek, checkThisWeek, checkNextWeek, pushToThisWeek, pushToNextWeek, changeReportDate, addProject, changeCurrentProject, updateProject} from '@/store/actions.js'
import {week} from '@/lib/util.js'
import ReportTextBox from './ReportTextBox.js'
import PlaceHolder from './PlaceHolder.js'
import {CalendarDatePicker, DatePicker, DropDownMenu, CommandBar, AppBarButton, AppBarSeparator, ListView, IconButton, AutoSuggestBox, Toggle} from 'react-uwp'

class EditReport extends React.Component {
  static contextTypes = {
      theme: React.PropTypes.object
  }
  constructor (props, context) {
    super(props, context)
    this.getDateRange = this.getDateRange.bind(this)
  }
  transDate (date) {
    const year = date.getFullYear()
    const month = (month => {
      let ret = (month + 1).toString()
      return ret.length === 1 ? '0' + ret : ret
    })(date.getMonth())
    const day = (date => {
      let ret = date.toString()
      return ret.length === 1 ? '0' + ret : ret
    })(date.getDate())
    return `${year}-${month}-${day}`
  }
  getDateRange (date) {
    const startDate = new Date(date)
    const endDate = new Date(date)
    const day = (new Date(date)).getDay()
    startDate.setDate(startDate.getDate() - day)
    endDate.setDate(endDate.getDate() + 7 - day - 1)
    return {
      start: this.transDate(startDate),
      end: this.transDate(endDate)
    }
  }
  render () {
    const {theme} = this.context
    const {dispatch} = this.props
    const data = this.props.editReport.toJS()
    const config = this.props.config.toJS()
    const {thisWeek, nextWeek, reportDate, projects, currentProject} = data
    const {reportName} = config
    const weekStyle = {
      flex: '1',
      color: theme.baseHigh,
      fontSize: 14,
      fontWeight: "lighter",
      margin: 10,
      outline: "none",
      border: `1px solid ${theme.listAccentLow}`,
      background: theme.acrylicTexture60.background
    }
    const projectStyle = {
      flex: '1',
      color: theme.baseHigh,
      fontSize: 14,
      fontWeight: "lighter",
      margin: 10,
      outline: "none",
      border: `1px solid ${theme.listAccentLow}`,
      background: theme.acrylicTexture60.background
    }
    const projectWrapperStyle = {
      display: 'flex',
      flex: '1',
      background: theme.acrylicTexture60.background
    }
    const headerStyle = {
      display: 'flex',
      padding: '5px 10px',
      background: theme.listAccentLow
    }
    return <section>
      <div className="flex-box">
        <div style={weekStyle}>
          <div style={headerStyle}>
            <b>【{reportName}】</b> {reportDate.getFullYear()}年第{week(reportDate)}周 （<i>{this.getDateRange(reportDate).start}</i>&nbsp;至&nbsp;<i>{this.getDateRange(reportDate).end}</i>）
          </div>
          <CommandBar
            background={theme.acrylicTexture80.background}
            labelPosition="right"
            primaryCommands={[
              <AppBarButton icon="CalendarReply" label="选择周报" />,
              <AppBarButton icon="Copy" label="导入上周" />,
              <AppBarSeparator />,
              <AppBarButton icon="Save" label="保存" />
            ]}
            secondaryCommands={false}
          />
          {/*<div className="content-block">
            
            <span>选择周报日期：</span>
            <DatePicker style={{
              margin: '10px 0'
            }} onChangeDate={e => dispatch(changeReportDate(e))} defaultDate={reportDate} pickerItemHeight={24}/>
          </div>*/}
        </div>
      </div>
      <div className="flex-box">
        <div style={weekStyle}>
          <div style={headerStyle}>
            <span style={{flex: 1}}>本周总结</span>
            <IconButton size={20} onClick={e => dispatch(pushToThisWeek())}>Add</IconButton>
          </div>
          <div className="content-block">
            {
              thisWeek.length
                ? thisWeek.map((item, index) => <ReportTextBox
                  placeholder={`${index + 1}.`}
                  onChangeValue={e => dispatch(editThisWeek(e, index))}
                  onKeyDown={e => dispatch(checkThisWeek(e, index))}
                  key={index}
                  value={item}
                />)
                : <PlaceHolder>未添加本周总结</PlaceHolder>
            }
          </div>
        </div>
        <div style={weekStyle}>
          <div style={headerStyle}>
            <span style={{flex: 1}}>下周计划</span>
            <IconButton size={20} onClick={e => dispatch(pushToNextWeek())}>Add</IconButton>
          </div>
          <div className="content-block">
            {
              nextWeek.length
                ? nextWeek.map((item, index) => <ReportTextBox
                  placeholder={`${index + 1}.`}
                  onChangeValue={e => dispatch(editNextWeek(e, index))}
                  onKeyDown={e => dispatch(checkNextWeek(e, index))}
                  key={index}
                  value={item}
                />)
                : <PlaceHolder>未添加下周计划</PlaceHolder>
            }
          </div>
        </div>
      </div>
      <div>
        <div style={projectStyle}>
          <div style={headerStyle}>
            <span style={{flex: 1}}>项目进度</span>
            <IconButton size={20} onClick={e => dispatch(addProject(e))}>Add</IconButton>
          </div>
          <div style={projectWrapperStyle}>
            {
              !projects.length && <PlaceHolder style={{padding: '15px'}}>未添加项目</PlaceHolder>
            }
            {
              !!projects.length && <div style={{
                background: theme.acrylicTexture80.background,
                minHeight: 400
              }}>
                {/*<AutoSuggestBox background="none" style={{
                  width: 200
                }}/>*/}
                <ListView
                  defaultFocusListIndex={currentProject}
                  listSource={projects.map((item, index) => <span onClick={e => dispatch(changeCurrentProject(index))}
                >
                  <a>
                  {item.name || '未命名项目'}
                  </a>
                  <Toggle
                    size={12}
                    background="none"
                    style={{float: "right"}}
                    onToggle={e => dispatch(updateProject({open: e}, index))}
                    onClick={e => e.stopPropagation()}
                    defaultToggled={item.open}
                  />
                </span>)}
                  style={{
                    width: 200,
                    display: 'block',
                    background: 'none',
                    border: 0
                  }}
                  listItemStyle={{height: 40}}
                />
              </div>
            }
            {
              !!projects.length && <div style={{
                flex: 1,
                padding: '15px',
                background: theme.acrylicTexture60.background
              }}>
                {
                  currentProject !== null && <div>
                    <ReportTextBox placeholder="项目名称" value={projects[currentProject].name} onChange={e => dispatch(updateProject({name: e.target.value}))}/>
                    <ReportTextBox placeholder="工作描述" value={projects[currentProject].description} onChange={e => dispatch(updateProject({description: e.target.value}))}/>
                    <ReportTextBox placeholder="参与人员" value={projects[currentProject].members} onChange={e => dispatch(updateProject({members: e.target.value}))}/>
                    <ReportTextBox placeholder="流程"/>
                    <CalendarDatePicker defaultDate={new Date()}/>
                    <CalendarDatePicker defaultDate={new Date()}/>
                    <DropDownMenu background="none" values={["PENDING", "DEVELOPING", "DELAY"]}/>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  }
}

export default connect(state => ({
  editReport: state.editReport,
  config: state.config
}))(EditReport)