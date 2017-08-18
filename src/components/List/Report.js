import React from 'react'
import PropTypes from 'prop-types'
import {tasks} from '@/lib/tasks.js'
import {week, getDateRange, hasReport, getSimpleDate} from '@/lib/util.js'

class Th extends React.Component {
  static contextTypes = {
    theme: PropTypes.object
  }
  render () {
    const {props} = this
    // const {theme} = this.context
    const {colSpan, rowSpan} = props
    const attrs = {
      colSpan,
      rowSpan
    }
    return <th {...attrs} style={{
      // padding: '5px 10px',
      // background: theme.listAccentLow,
      backgroundColor: '#f0f0f0',
      border: '1px solid #ddd',
      padding: '7px 10px',
      verticalAlign: 'top',
      fontFamily: 'times',
      fontSize: '14px',
      textAlign: props.textAlign
      // border: `1px solid ${theme.listAccentLow}`
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
    // const {theme} = this.context
    const {colSpan, rowSpan} = props
    const attrs = {
      colSpan,
      rowSpan
    }
    return <td {...attrs} style={{
      border: '1px solid #ddd',
      padding: '7px 10px',
      verticalAlign: 'top',
      fontFamily: 'times',
      fontSize: '14px',
      textAlign: props.textAlign
    }} className={'confluence-td'}>{this.props.children}</td>
  }
}

const Component = props => <table className={'report-content'} style={{
  width: '100%',
  background: 'white',
  color: '#333',
  borderCollapse: 'collapse',
  borderSpacing: '0',
  borderColor: 'grey'
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
          <p><b style={{margin: 0, padding: 0}}>本周总结：</b></p>
          {
            props.thisWeek.map((item, index) => <p key={index}>{index + 1}、{item}</p>)
          }
        </Td>
      </tr>
    </tbody> : null
  }
  {
    props.nextWeek.length ? <tbody>
      <tr>
        <Td colSpan={8}>
          <p><b style={{margin: 0, padding: 0}}>下周计划：</b></p>
          {
            props.nextWeek.map((item, index) => <p key={index}>{index + 1}、{item}</p>)
          }
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
          new Array(steps.length).fill().map((row, index) => {
            const startDate = getSimpleDate(project.steps[index].start)
            const endDate = getSimpleDate(project.steps[index].end)
            return <tr key={index}>
              {!index && <Td rowSpan={steps.length}>{project.name}</Td>}
              {!index && <Td rowSpan={steps.length}>{project.description}</Td>}
              {!index && <Td rowSpan={steps.length}>{project.members}</Td>}
              <Td>{project.steps[index].name}</Td>
              {
                startDate === endDate ? <Td colSpan={2}>{getSimpleDate(project.steps[index].start)}</Td> : null
              }
              {
                startDate !== endDate ? <Td>{getSimpleDate(project.steps[index].start)}</Td> : null
              }
              {
                startDate !== endDate ? <Td>{getSimpleDate(project.steps[index].end)}</Td> : null
              }
              <Td color={tasks[project.steps[index].state] && tasks[project.steps[index].state].color}>{project.steps[index].state}</Td>
              <Td>{project.steps[index].note}</Td>
            </tr>
          })
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
