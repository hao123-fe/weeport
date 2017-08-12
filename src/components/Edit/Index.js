import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
  addStep,
  initStep,
  updateStep,
  removeStep,
  syncLastWeek,
  editThisWeek,
  editNextWeek,
  checkThisWeek,
  checkNextWeek,
  pushToThisWeek,
  pushToNextWeek,
  addProject,
  changeCurrentProject,
  updateProject,
  removeProject,
  saveReport,
  loadReport
} from '@/store/actions.js'
import {week, getDateRange, getDate} from '@/lib/util.js'
import taskGroup from '@/lib/tasks.js'
import ReportTextBox from './ReportTextBox.js'
import PlaceHolder from './PlaceHolder.js'
import {Tooltip, ContentDialog, TextBox, Toast, CalendarDatePicker, DropDownMenu, CommandBar, AppBarButton, ListView, IconButton, Toggle, Button} from 'react-uwp'

class DatePicker extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  componentDidMount () {
    const $el = ReactDOM.findDOMNode(this)
    $el.children[0].style.width = 'auto'
    $el.children[1].style.background = this.context.theme.altHigh
  }
  render () {
    const {props} = this
    return <CalendarDatePicker {...props} />
  }
}
class EditReport extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  static propTypes = {
    dispatch: PropTypes.func,
    config: PropTypes.object,
    editReport: PropTypes.object,
    match: PropTypes.object
  }
  constructor () {
    super()
    this.state = {
      showSaveToast: false,
      showSyncDialog: false,
      showRemoveProjectDialog: false,
      showInitStepDialog: false
    }
    this.save = this.save.bind(this)
  }
  componentDidMount () {
    const {dispatch, match} = this.props
    dispatch(loadReport(match.params.id))
    document.addEventListener('keydown', this.save)
  }
  componentWillUnmount () {
    document.removeEventListener('keydown', this.save)
  }
  componentWillReceiveProps (nextProps) {
    const {dispatch, match} = this.props
    const id = nextProps.match.params.id
    if (match.params.id !== id) {
      dispatch(loadReport(id))
    }
  }
  save (e) {
    const {dispatch} = this.props
    const {thisWeek, nextWeek, projects} = this.props.editReport.toJS()
    if ((e.ctrlKey && e.keyCode === 83) || !e.keyCode) {
      e.preventDefault()
      this.setState({showSaveToast: true})
      dispatch(saveReport({
        thisWeek,
        nextWeek,
        projects
      }))
    }
  }
  render () {
    const {theme} = this.context
    const {showSaveToast, showRemoveProjectDialog, showSyncDialog, showInitStepDialog} = this.state
    const {dispatch} = this.props
    const data = this.props.editReport.toJS()
    const config = this.props.config.toJS()
    const {thisWeek, nextWeek, reportDate, projects, currentProject} = data
    const {reportName} = config
    const weekStyle = {
      flex: '1',
      color: theme.baseHigh,
      fontSize: 14,
      fontWeight: 'lighter',
      margin: 10,
      outline: 'none',
      border: `1px solid ${theme.listAccentMedium}`,
      background: theme.acrylicTexture60.background
    }
    const h3Style = {
      borderBottom: `2px solid ${theme.listAccentLow}`,
      marginTop: '5px'
    }
    const stepButtonStyle = {
      margin: '10px 10px 10px 0'
    }
    const projectStyle = {
      flex: '1',
      color: theme.baseHigh,
      fontSize: 14,
      fontWeight: 'lighter',
      margin: 10,
      outline: 'none',
      border: `1px solid ${theme.listAccentMedium}`,
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
      background: theme.listAccentMedium
    }
    return <section style={{width: '100%'}}>
      <Toast
        title={'保存'}
        description={['保存成功。']}
        showCloseIcon
        defaultShow={showSaveToast}
        onToggleShowToast={showSaveToast => this.setState({showSaveToast})}
        closeDelay={3000}
      />
      <ContentDialog
        statusBarTitle={'警告'}
        title={'删除项目'}
        content={'确定删除当前项目？'}
        defaultShow={showRemoveProjectDialog}
        primaryButtonText={'删除'}
        secondaryButtonText={'取消'}
        primaryButtonAction={e => dispatch(removeProject())}
        onCloseDialog={e => this.setState({showRemoveProjectDialog: false})}
      />
      <ContentDialog
        statusBarTitle={'警告'}
        title={'同步上周数据'}
        content={'同步上周数据后，您当前周报的『本周总结』将会被替换成上周的『下周计划』，『项目进度』将全部替换成上周进行的项目，并且不保留当前的数据，确定进行同步吗？'}
        defaultShow={showSyncDialog}
        primaryButtonText={'同步'}
        secondaryButtonText={'取消'}
        primaryButtonAction={e => dispatch(syncLastWeek())}
        onCloseDialog={e => this.setState({showSyncDialog: false})}
      />
      <ContentDialog
        statusBarTitle={'警告'}
        title={'初始化流程'}
        content={'初始化项目流程后，当前项目的流程将会被重置为『需求』、『开发』、『联调』、『测试』、『上线』共 5 个阶段，并且不会保留当前的流程数据。确定进行初始化吗？'}
        defaultShow={showInitStepDialog}
        primaryButtonText={'初始化'}
        secondaryButtonText={'取消'}
        primaryButtonAction={e => dispatch(initStep())}
        onCloseDialog={e => this.setState({showInitStepDialog: false})}
      />
      <div className={'command-bar'} style={{background: theme.acrylicTexture80.background}}>
        <CommandBar
          labelPosition={'right'}
          primaryCommands={[
            <AppBarButton icon={'Save'} label={'保存'} onClick={this.save} />,
            <AppBarButton icon={'Sync'} label={'同步上周'} onClick={e => this.setState({showSyncDialog: true})} />
          ]}
          secondaryCommands={false}
        />
      </div>
      <div className={'content-with-command-bar'}>
        <h1 style={{textAlign: 'center'}}>
          <b>【{reportName}】</b> {reportDate.getFullYear()}年第{week(reportDate)}周 （<i>{getDateRange(reportDate).start}</i>&nbsp;至&nbsp;<i>{getDateRange(reportDate).end}</i>）
        </h1>
        <div className={'flex-box'}>
          <div style={weekStyle}>
            <div style={headerStyle}>
              <span className={'header-text'}>本周总结</span>
              <Tooltip content={'添加条目（快捷键 Enter 添加 / Backspace 删除）'}>
                <IconButton size={32} onClick={e => dispatch(pushToThisWeek())}>Add</IconButton>
              </Tooltip>
            </div>
            <div className={'content-block'}>
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
              <span className={'header-text'}>下周计划</span>
              <Tooltip content={'添加条目（快捷键 Enter 添加 / Backspace 删除）'}>
                <IconButton size={32} onClick={e => dispatch(pushToNextWeek())}>Add</IconButton>
              </Tooltip>
            </div>
            <div className={'content-block'}>
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
              <span className={'header-text'}>项目进度</span>
              {
                currentProject !== null && <Tooltip content={'删除当前项目'}>
                  <IconButton size={32} onClick={e => this.setState({showRemoveProjectDialog: true})}>Delete</IconButton>
                </Tooltip>
              }
              <Tooltip content={'添加一个项目'}>
                <IconButton size={32} onClick={e => dispatch(addProject(e))}>Add</IconButton>
              </Tooltip>
            </div>
            <div style={projectWrapperStyle}>
              {
                !projects.length && <PlaceHolder style={{padding: '15px'}}>未添加项目</PlaceHolder>
              }
              {
                !!projects.length && <div style={{
                  background: theme.acrylicTexture80.background
                }}>
                  <ListView
                    defaultFocusListIndex={currentProject}
                    listSource={projects.map((item, index) => <span onClick={e => dispatch(changeCurrentProject(index))}>
                      <a>
                        {item.name || '未命名项目'}
                      </a>
                      <Toggle
                        size={12}
                        background={'none'}
                        style={{float: 'right'}}
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
                    currentProject !== null ? <div>
                      <h3 style={h3Style}>基本信息</h3>
                      <ReportTextBox placeholder={'项目名称'} value={projects[currentProject].name} onChange={e => dispatch(updateProject({key: 'name', value: e.target.value}))} />
                      <ReportTextBox placeholder={'工作描述'} value={projects[currentProject].description} onChange={e => dispatch(updateProject({key: 'description', value: e.target.value}))} />
                      <ReportTextBox placeholder={'参与人员'} value={projects[currentProject].members} onChange={e => dispatch(updateProject({key: 'members', value: e.target.value}))} />
                      <h3 style={h3Style}>流程分解</h3>
                      {
                        (projects[currentProject].steps || []).map((step, index) => <div key={index} style={{padding: 10, borderBottom: `1px dashed ${theme.listAccentLow}`}}>
                          <div className={'flex-box'}>
                            <TextBox style={{flex: 0.5, margin: '5px 10px 5px 0'}} background={theme.acrylicTexture80.background} placeholder={'流程名称'} value={step.name} onChange={e => dispatch(updateStep({key: 'name', index, value: e.target.value}))} />
                            <TextBox style={{flex: 1, margin: '5px 10px 5px 0'}} background={theme.acrylicTexture80.background} placeholder={'备注'} value={step.note} onChange={e => dispatch(updateStep({key: 'note', index, value: e.target.value}))} />
                            <DropDownMenu
                              style={{margin: '5px 0'}}
                              defaultValue={!~taskGroup.indexOf(step.state) ? taskGroup[0] : step.state}
                              values={taskGroup}
                              itemHeight={28}
                              onChangeValue={value => dispatch(updateStep({key: 'state', index, value}))}
                            />
                            <IconButton size={32} className={'edit-project-icon-button'} onClick={e => dispatch(removeStep(index))}>Delete</IconButton>
                          </div>
                          <div>
                            <div className={'flex-box'}>
                              <label style={{height: '32px', lineHeight: '32px', margin: '5px 10px 5px 0'}}>开始日期：</label>
                              <DatePicker value={getDate(step.start || null)} style={{margin: '5px 0', flex: 1}} onChangeDate={e => dispatch(updateStep({key: 'start', index, value: e}))} />
                            </div>
                            <div className={'flex-box'}>
                              <label style={{height: '32px', lineHeight: '32px', margin: '5px 10px 5px 0'}}>结束日期：</label>
                              <DatePicker value={getDate(step.end || null)} style={{margin: '5px 0', flex: 1}} onChangeDate={e => dispatch(updateStep({key: 'end', index, value: e}))} />
                            </div>
                          </div>
                        </div>)
                      }
                      <Button style={stepButtonStyle} background={theme.listAccentMedium} onClick={e => dispatch(addStep())}>添加新流程</Button>
                      <Button style={stepButtonStyle} onClick={e => this.setState({showInitStepDialog: true})}>初始化流程</Button>
                    </div> : <PlaceHolder>请选择一个项目</PlaceHolder>
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
