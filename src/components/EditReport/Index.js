import React from 'react'
import {connect} from 'react-redux'
import {editThisWeek, editNextWeek, checkThisWeek, checkNextWeek, pushToThisWeek, pushToNextWeek, changeReportDate, addProject, changeCurrentProject, updateCurrentProject} from '@/store/actions.js'
import {week} from '@/lib/util.js'
import ReportTextBox from './ReportTextBox.js'
import {CalendarDatePicker, DatePicker, DropDownMenu, CommandBar, AppBarButton, AppBarSeparator, ListView, IconButton, AutoSuggestBox} from 'react-uwp'

class EditReport extends React.Component {
  static contextTypes = {
      theme: React.PropTypes.object
  }
  constructor (props, context) {
    super(props, context)
  }
  render () {
    const {theme} = this.context
    const {dispatch} = this.props
    const data = this.props.editReport.toJS()
    const {thisWeek, nextWeek, reportDate, projects, currentProject} = data
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
    }
    const projectWrapperStyle = {
      display: 'flex',
      flex: '1'
    }
    const headerStyle = {
      display: 'flex',
      padding: '5px 10px',
      background: theme.listAccentLow
    }
    return <section>
      <CommandBar
        background={theme.acrylicTexture80.background}
        labelPosition="right"
        primaryCommands={[
          <AppBarButton icon="Share" label="发送" />,
          <AppBarSeparator />,
          <AppBarButton icon="Copy" label="导入" />,
          <AppBarButton icon="Save" label="保存" />
        ]}
        secondaryCommands={false}
      />
      <div className="flex-box">
        <div style={weekStyle}>
          <div style={headerStyle}>
            2017 年 7.16 ~ 7.21 （第 {week(reportDate)} 周）周报
          </div>
          <div className="content-block">
            <span>选择周报日期：</span>
            <DatePicker style={{
              margin: '10px 0'
            }} onChangeDate={e => dispatch(changeReportDate(e))} defaultDate={reportDate} pickerItemHeight={24}/>
          </div>
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
              thisWeek.map((item, index) => <ReportTextBox
                placeholder={`${index + 1}.`}
                onChangeValue={e => dispatch(editThisWeek(e, index))}
                onKeyDown={e => dispatch(checkThisWeek(e, index))}
                key={index}
                value={item}
              />)
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
              nextWeek.map((item, index) => <ReportTextBox
                placeholder={`${index + 1}.`}
                onChangeValue={e => dispatch(editNextWeek(e, index))}
                onKeyDown={e => dispatch(checkNextWeek(e, index))}
                key={index}
                value={item}
              />)
            }
          </div>
        </div>
      </div>
      <div className="flex-box">
        <div style={projectStyle}>
          <div style={headerStyle}>
            <span style={{flex: 1}}>项目进度</span>
            <IconButton size={20} onClick={e => dispatch(addProject(e))}>Add</IconButton>
          </div>
          <div style={projectWrapperStyle}>
            <div style={{
              background: theme.acrylicTexture80.background,
              minHeight: 400
            }}>
              <AutoSuggestBox background="none" style={{
                width: 200
              }}/>
              <ListView
                listSource={projects.map((item, index) => <a onClick={e => dispatch(changeCurrentProject(index))}>{item.name || '未命名项目'}</a>)}
                style={{
                  width: 200,
                  display: 'block',
                  background: 'none',
                  border: 0
                }}
                listItemStyle={{height: 40}}
              />
            </div>
            <div style={{
              flex: 1,
              padding: '15px',
              background: theme.acrylicTexture60.background
            }}>
              {
                currentProject !== null && <div>
                  <ReportTextBox placeholder="项目名称" value={projects[currentProject].name} onChange={e => dispatch(updateCurrentProject({name: e.target.value}))}/>
                  <ReportTextBox placeholder="工作描述" value={projects[currentProject].description} onChange={e => dispatch(updateCurrentProject({description: e.target.value}))}/>
                  <ReportTextBox placeholder="参与人员" value={projects[currentProject].members} onChange={e => dispatch(updateCurrentProject({members: e.target.value}))}/>
                  <ReportTextBox placeholder="流程"/>
                  <CalendarDatePicker defaultDate={new Date()}/>
                  <CalendarDatePicker defaultDate={new Date()}/>
                  <DropDownMenu background="none" values={["PENDING", "DEVELOPING", "DELAY"]}/>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

export default connect(state => ({
  editReport: state.editReport
}))(EditReport)