<template lang="jade">
div
  n3-alert(type="success", message="发送周报", placement="top", :show.sync="alert.sendSuccess", :duration="2000") 发送成功！
  n3-alert(type="danger", message="发送周报", placement="top", :show.sync="alert.sendFail", :duration="2000") 发送失败，请重试。
  n3-row
    n3-column(:col="12")
      div.report-header
        n3-datepicker.date(placeholder="日期", :value.sync="date", width="100px")
        n3-button.pull-right(type="primary", @click="getMailHTML") 发送周报&nbsp;
          n3-icon(type="envelope")
  n3-row
    n3-column(:col="12")
      div.mail(v-el:"mail")
        h2
          span(v-text="title")
          span(v-text="week")
        hr
        ul
          li(v-for="project of currentReport")
            h4(v-text="project.name || '未命名项目'")
            ul
              li(v-for="task of project.tasks")
                h5
                  span.state(v-text="status[task.progress[0].state].text", :style="{backgroundColor: status[task.progress[0].state].color}")
                  span.name(v-text="task.name || '未命名任务'")
                ul
                  li.point(v-for="point of task.progress", track-by="$index")
                    span.state(v-text="`${status[point.state].text}`")
                    span.date(v-text="point.date")
                    p(v-text="point.detail")
            hr
        footer 本周报由<a href="https://github.com/hao123-fe/weekly-reporter">周报生成器</a>生成
</template>
<script>
import {n3Row, n3Column, n3Form, n3FormItem, n3Input, n3Button, n3Tabs, n3Tab, n3Datepicker, n3Icon, n3Alert} from 'N3-Components'
import status from '../../lib/task-status.js'
import week from '../../lib/week.js'

const mailer = global.require ? global.require('../service/mailer.js') : function (options, callback) {
  console.log(options.content)
  callback && callback(true, '')
}

const styleKeys = [
  'border',
  'margin',
  'padding',
  'background',
  'lineHeight',
  'textIndent',
  'font',
  'borderRadius',
  'borderLeft',
  'listStyle',
  'color'
]

export default {
  data () {
    const ls = global.localStorage
    return {
      alert: {
        sendSuccess: false,
        sendFail: false
      },
      title: ls.getItem('reportTitle') || '未命名周报',
      date: this.transDate(new Date()),
      output: '',
      projects: JSON.parse(ls.getItem('projects')) || [],
      status: status
    }
  },
  components: {
    n3Row: n3Row,
    n3Column: n3Column,
    n3Form: n3Form,
    n3FormItem: n3FormItem,
    n3Input: n3Input,
    n3Button: n3Button,
    n3Tabs: n3Tabs,
    n3Tab: n3Tab,
    n3Datepicker: n3Datepicker,
    n3Icon: n3Icon,
    n3Alert: n3Alert
  },
  methods: {
    walkMailNode (root) {
      const newRoot = document.createElement(root.tagName)
      const style = global.getComputedStyle(root)
      if (root.firstChild && root.firstChild.nodeName === '#text') {
        newRoot.textContent = root.firstChild.textContent
      }
      for (const key of styleKeys) {
        newRoot.style[key] = style[key]
      }
      for (const el of root.children) {
        const newEl = this.walkMailNode(el)
        newRoot.appendChild(newEl)
      }
      return newRoot
    },
    getMailHTML () {
      const ls = global.localStorage
      const el = this.$els.mail
      const mailStr = this.walkMailNode(el).innerHTML
      mailer({
        username: ls.getItem('username'),
        password: ls.getItem('password'),
        to: ls.getItem('sendTo'),
        cc: ls.getItem('cc'),
        title: `${this.title} ${this.week}`,
        content: mailStr
      }, (error, info) => {
        this.alert.sendSuccess = !error
        this.alert.sendFail = error
        if (error) {
          console.log(error)
        } else {
          console.log('Message sent: ' + info.response)
        }
      })
    },
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
  },
  computed: {
    hasReport () {
      return !!this.currentReport.length
    },
    currentReport () {
      const newProjects = []
      for (const project of this.projects) {
        const tasks = project.tasks
        const newTasks = []
        for (const task of tasks) {
          const progress = task.progress
          const newProgress = []
          const lastPoint = progress[0]
          const lastDate = new Date(lastPoint.date)
          if (lastPoint.state !== 'COMPLETED' && lastPoint.state !== 'DEPLOYED' && lastPoint.state !== 'ENDED' && lastDate < this.dateRange.start) {
            newProgress.push(lastPoint)
          } else {
            for (const point of progress) {
              const date = new Date(point.date)
              const index = progress.indexOf(point)
              if (index === 0 && (point.state === 'COMPLETED' || point.state === 'DEPLOYED' || point.state === 'ENDED') && date < this.dateRange.start) {
                break
              }
              if (date >= this.dateRange.start && date < this.dateRange.end) {
                newProgress.push(Object.assign({}, point))
              }
            }
          }
          if (newProgress.length) {
            const newTask = Object.assign({}, task)
            newTask.progress = newProgress
            newTasks.push(newTask)
          }
        }
        if (newTasks.length) {
          const newProject = Object.assign({}, project)
          newProject.tasks = newTasks
          newProjects.push(newProject)
        }
      }
      return newProjects
    },
    taskInWeek (progress, dateRange) {
      if (!progress.length) {
        return true
      }
      if (!(progress[0].state === 'COMPLETED' || progress[0].state === 'DEPLOYED' || progress[0].state === 'ENDED')) {
        const date = new Date(progress[0].date)
        return date <= dateRange.end
      }
      for (const point of progress) {
        const date = new Date(point.date)
        return date > dateRange.start && date <= dateRange.end
      }
    },
    dateRange () {
      const startDate = new Date(this.date)
      const endDate = new Date(this.date)
      const day = (new Date(this.date)).getDay()
      startDate.setDate(startDate.getDate() - day)
      endDate.setDate(endDate.getDate() + 7 - day - 1)
      return {
        start: startDate,
        end: endDate
      }
    },
    week () {
      const date = new Date(this.date)
      const currentWeek = week(date)
      if (!+currentWeek) {
        date.setFullYear(date.getFullYear() - 1)
        date.setMonth(11)
        date.setDate(31)
      }
      return `${date.getFullYear()}年第${week(date)}周 （${this.transDate(this.dateRange.start)} 至 ${this.transDate(this.dateRange.end)}）`
    }
  }
}
</script>
<style lang="stylus" scoped>
.report-header
  padding 10px 0
  margin-bottom 10px
  border-bottom 1px dotted #eee
  .title
    vertical-align middle
    font-size 20px
    margin-right 10px
.mail
  padding 0 40px
  margin-bottom 40px
  h3
    color #333
  h4
    color orange
    border-left 2px solid orange
    text-indent 10px
    margin 20px 0
    padding 3px 0
  h5
    .state
      color white
      padding 3px 5px
      border-radius 5px
      margin-right 5px
  .point
    padding 5px 0
    margin-left 32px
    .state
      border 1px solid #666
      color #666
      padding 0 2px
      border-radius 5px
      margin-right 5px
  footer
    text-align right
    font-size 12px
    color gray
    a
      font-style italic
      padding 3px
</style>
