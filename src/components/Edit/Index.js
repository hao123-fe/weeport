import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addStep, updateStep, editThisWeek, editNextWeek, checkThisWeek, checkNextWeek, pushToThisWeek, pushToNextWeek, changeReportDate, addProject, changeCurrentProject, updateProject, saveReport, loadReport, importReport} from '@/store/actions.js'
import {week, getDateRange} from '@/lib/util.js'
import ReportTextBox from './ReportTextBox.js'
import PlaceHolder from './PlaceHolder.js'
import {Toast, CalendarDatePicker, DatePicker, DropDownMenu, CommandBar, AppBarButton, AppBarSeparator, ListView, IconButton, AutoSuggestBox, Toggle, Button} from 'react-uwp'

class EditReport extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  constructor () {
    super()
    this.state = {
      showSaveToast: false
    }
  }
  componentDidMount () {
    const {dispatch} = this.props
    dispatch(loadReport())
  }
  render () {
    const {theme} = this.context
    const {showSaveToast} = this.state
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
    const stepButtonStyle = {
      margin: '10px 10px 10px 0'
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
    return <section style={{width: '100%'}}>
      <Toast
        title="保存"
        description={["保存成功。"]}
        showCloseIcon
        defaultShow={showSaveToast}
        onToggleShowToast={showSaveToast => this.setState({showSaveToast})}
        closeDelay={3000}
      />
      <div style={{background: theme.acrylicTexture80.background}}>
        <CommandBar
          background={theme.acrylicTexture80.background}
          labelPosition="right"
          primaryCommands={[
            // <AppBarButton icon="Copy" label="导入上周" onClick={e => dispatch(importReport())}/>,
            // <AppBarSeparator />,
            <AppBarButton icon="Save" label="保存" onClick={e => {
                this.setState({'showSaveToast': true})
                dispatch(saveReport({
                  thisWeek,
                  nextWeek,
                  projects
                }))
              }
            }/>
          ]}
          secondaryCommands={false}
        />
      </div>
      <div style={{padding: '20px'}}>
        <h1 style={{textAlign: 'center'}}>
          <b>【{reportName}】</b> {reportDate.getFullYear()}年第{week(reportDate)}周 （<i>{getDateRange(reportDate).start}</i>&nbsp;至&nbsp;<i>{getDateRange(reportDate).end}</i>）
        </h1>
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
                      onToggle={e => dispatch(updateProject({key: 'open', index, value: e}))}
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
                      <h3>基本信息</h3>
                      <ReportTextBox placeholder="项目名称" value={projects[currentProject].name} onChange={e => dispatch(updateProject({key: 'name', value: e.target.value}))}/>
                      <ReportTextBox placeholder="工作描述" value={projects[currentProject].description} onChange={e => dispatch(updateProject({key: 'description', value: e.target.value}))}/>
                      <ReportTextBox placeholder="参与人员" value={projects[currentProject].members} onChange={e => dispatch(updateProject({key: 'members', value: e.target.value}))}/>
                      <h3>流程</h3>
                      {
                        (projects[currentProject].steps || []).map((step, index) => <div key={index}>
                          <ReportTextBox placeholder="流程" value={step.name} onChange={e => dispatch(updateStep({key: 'name', index, value: e.target.value}))}/>
                          <ReportTextBox placeholder="状态" value={step.state} onChange={e => dispatch(updateStep({key: 'state', index, value: e.target.value}))}/>
                          <ReportTextBox placeholder="开始时间" value={step.start} onChange={e => dispatch(updateStep({key: 'start', index, value: e.target.value}))}/>
                          <ReportTextBox placeholder="结束时间" value={step.end} onChange={e => dispatch(updateStep({key: 'end', index, value: e.target.value}))}/>
                          {/*
                            <CalendarDatePicker defaultDate={step.start} onChangeDate={e => dispatch(updateStep({key: 'start', index, value: e}))}/>
                            <CalendarDatePicker defaultDate={step.end} onChangeDate={e => dispatch(updateStep({key: 'end', index, value: e}))}/>
                          */}
                        </div>)
                      }
                      {/*<Button style={stepButtonStyle}>生成常规流程</Button>*/}
                      <Button style={stepButtonStyle} onClick={e => dispatch(addStep())}>添加新流程</Button>
                    </div>
                  }
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
  editReport: state.editReport,
  config: state.config
}))(EditReport)