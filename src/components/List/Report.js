import React from 'react'
import PropTypes from 'prop-types'
import {tasks} from '@/lib/tasks.js'
import {week, getDateRange, hasReport, getDate} from '@/lib/util.js'

class Th extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  render () {
    const {props} = this
    const {theme} = this.context
    const {colSpan, rowSpan} = props
    const attrs = {
      colSpan,
      rowSpan
    }
    return <th {...attrs} style={{
      padding: '5px 10px',
      background: theme.listAccentLow,
      textAlign: props.textAlign,
      border: `1px solid ${theme.listAccentLow}`
    }}>{props.children}</th>
  }
}

class Td extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    const {props} = this
    const {theme} = this.context
    const {colSpan, rowSpan} = props
    const attrs = {
      colSpan,
      rowSpan
    }
    return <td {...attrs} style={{
      backgroundColor: props.bgColor,
      color: props.color,
      padding: '10px',
      textAlign: props.textAlign,
      border: `1px solid ${theme.listAccentLow}`
    }}>{this.props.children}</td>
  }
}

const Component = props => <table className={'report-content'} style={{
  width: '100%',
  background: 'rgba(0, 0, 0, .5)',
  borderSpacing: '0',
  borderCollapse: 'collapse',
  color: 'white'
}}>
  <thead>
    <tr>
      <Th colSpan={8}>
        <h1 style={{margin: 0, padding: 0}}>
          【{props.reportName}】 {props.userName}
        </h1>
        <div>
          {props.date.getFullYear()}年第{week(props.date)}周 <i>{getDateRange(props.date).start}</i>&nbsp;至&nbsp;<i>{getDateRange(props.date).end}</i>
        </div>
      </Th>
    </tr>
  </thead>
  {
    !hasReport(props) && <tbody><tr><Td textAlign='center' colSpan={8}>暂无周报</Td></tr></tbody>
  }
  {
    props.thisWeek.length ? <tbody>
      <tr>
        <Td colSpan={8}>
          <h2 style={{margin: 0, padding: 0}}>本周总结</h2>
          <ol>
            {
              props.thisWeek.map((item, index) => <li key={index}>{item}</li>)
            }
          </ol>
        </Td>
      </tr>
    </tbody> : null
  }
  {
    props.nextWeek.length ? <tbody>
      <tr>
        <Td colSpan={8}>
          <h2 style={{margin: 0, padding: 0}}>下周计划</h2>
          <ol>
            {
              props.nextWeek.map((item, index) => <li key={index}>{item}</li>)
            }
          </ol>
        </Td>
      </tr>
    </tbody> : null
  }
  {
    props.projects.length ? <tbody>
      <tr>
        <Th>项目</Th>
        <Th>项目内容</Th>
        <Th>人员</Th>
        <Th>分解</Th>
        <Th colSpan={2}>计划时间</Th>
        <Th>状态</Th>
        <Th>备注</Th>
      </tr>
    </tbody> : null
  }
  {
    props.projects.filter(project => project.open).map((project, index) => {
      const steps = project.steps || []
      return <tbody key={index}>
        {
          new Array(steps.length).fill().map((row, index) => <tr key={index}>
            {!index && <Td rowSpan={steps.length}>{project.name}</Td>}
            {!index && <Td rowSpan={steps.length}>{project.description}</Td>}
            {!index && <Td rowSpan={steps.length}>{project.members}</Td>}
            <Td>{project.steps[index].name}</Td>
            <Td>{getDate(project.steps[index].start)}</Td>
            <Td>{getDate(project.steps[index].end)}</Td>
            <Td color={tasks[project.steps[index].state] && tasks[project.steps[index].state].color}>{project.steps[index].state}</Td>
            {!index && <Td rowSpan={steps.length}>{project.note}</Td>}
          </tr>)
        }
      </tbody>
    })
  }
</table>

Component.propTypes = {
  reportName: PropTypes.string,
  userName: PropTypes.string,
  date: PropTypes.object,
  thisWeek: PropTypes.array,
  nextWeek: PropTypes.array,
  projects: PropTypes.array
}

export default Component
