<template lang="jade">
div
  n3-alert(type="success", message="保存", placement="top", :show.sync="alert.saveSuccess", :duration="2000") 保存成功！
  n3-alert(type="danger", message="保存", placement="top", :show.sync="alert.saveFail", :duration="2000") 保存失败！
  n3-row
    n3-column(:col="12")
      div.report-header
        n3-input.search(placeholder="搜索项目", :value.sync="search", width="195px")
        n3-button.add(type="primary", @click="addProject")
          n3-icon(type="plus")
        n3-datepicker.date(placeholder="日期", :value.sync="date", width="100px")
        n3-button.pull-right(type="primary", @click="save") 保存
  n3-row
    projects(:col="3", :search="search", :projects="projects", :select-project="selectProject", :current="currentProject")
    n3-column(:col="9", v-if="currentProject !== null").project
      n3-form
        h4 项目
        n3-form-item(label="项目名称", need)
          n3-input(:value.sync="currentProject.name")
        hr
      n3-form.task-list
        h4 任务列表&nbsp
        a.add-task(type="primary", @click="addTask(currentProject)") 添加任务&nbsp;
          n3-icon(type="plus")
        n3-accordion.tasks(:one-at-atime="true")
          n3-panel(v-for="task of currentProject.tasks", v-if="taskInWeek(task.progress, dateRange)")
            div(slot="header")
              span(v-text="`${task.name || '未命名任务'}`")
              n3-icon.completed(type="check", v-if="isCompleted(task.progress[0])")
              n3-icon.ended(type="times", v-if="isEnded(task.progress[0])")
              n3-icon.remove.pull-right(type="remove", @click.stop="removeTask(task, currentProject.tasks)")
            n3-form-item(label="任务名称")
              n3-input(:value.sync="task.name")
            n3-form-item.progress(label="时间节点")
              n3-select.state(:value.sync="progress.state")
                n3-option(v-for="state in status", :value="$key")
                  span(v-text="state.text")
              n3-input.detail(placeholder="状态描述", :value.sync="progress.detail")
              n3-button.add(type="primary", @click="addProgress(task, tasks)") 添加&nbsp;
                n3-icon(type="plus")
            n3-form-item.timeline
              n3-timeline
                n3-timeline-item(v-for="progress of task.progress", :color="status[progress.state].color")
                  timeline-item(:status="status", :progress="progress")
    n3-column(:col="9", v-if="currentProject === null")
      div.report-empty 请选择或新建一个项目
</template>
<script>
import Projects from './projects.vue'
import TimelineItem from './timeline-item.vue'
import status from '../../lib/task-status.js'
import {n3Row, n3Column, n3Form, n3FormItem, n3Input, n3Checkbox, n3Button, n3Select, n3Option, n3Label, n3Tabs, n3Tab, n3Datepicker, n3Icon, n3Alert, n3Accordion, n3Panel, n3Timeline, n3TimelineItem} from 'N3-Components'

export default {
  data () {
    const ls = global.localStorage
    const date = this.transDate(new Date())
    const defaultState = Object.keys(status)[0]
    return {
      alert: {
        saveSuccess: false,
        saveFail: false
      },
      progress: {
        state: defaultState,
        detail: ''
      },
      defaultState: defaultState,
      status: status,
      search: '',
      date: date,
      currentProject: null,
      projects: JSON.parse(ls.getItem('projects')) || []
    }
  },
  computed: {
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
    }
  },
  methods: {
    isCompleted (point) {
      return point.state === 'COMPLETED' || point.state === 'DEPLOYED'
    },
    isEnded (point) {
      return point.state === 'ENDED'
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
    },
    addProject () {
      if (this.search) {
        const project = {
          name: this.search,
          tasks: []
        }
        this.projects.unshift(project)
        this.search = ''
        this.currentProject = project
      }
    },
    addTask (project) {
      project.tasks.unshift({
        name: '',
        progress: [
          {
            state: 'PENDING',
            date: this.date
          }
        ]
      })
    },
    addProgress (task) {
      task.progress.unshift({
        state: this.progress.state,
        detail: this.progress.detail,
        date: this.transDate(new Date())
      })
      this.progress.detail = ''
    },
    removeTask (task, tasks) {
      const index = tasks.indexOf(task)
      tasks.splice(index, 1)
    },
    selectProject (project) {
      this.currentProject = project
    },
    save () {
      const ls = global.localStorage
      try {
        ls.setItem('projects', JSON.stringify(this.projects))
        this.alert.saveSuccess = true
      } catch (e) {
        this.alert.saveFail = true
      }
    },
    prevent () {}
  },
  components: {
    projects: Projects,
    timelineItem: TimelineItem,
    n3Checkbox: n3Checkbox,
    n3Label: n3Label,
    n3Alert: n3Alert,
    n3Accordion: n3Accordion,
    n3Panel: n3Panel,
    n3Select: n3Select,
    n3Option: n3Option,
    n3Icon: n3Icon,
    n3Row: n3Row,
    n3Column: n3Column,
    n3Form: n3Form,
    n3FormItem: n3FormItem,
    n3Input: n3Input,
    n3Button: n3Button,
    n3Tabs: n3Tabs,
    n3Tab: n3Tab,
    n3Datepicker: n3Datepicker,
    n3Timeline: n3Timeline,
    n3TimelineItem: n3TimelineItem
  }
}
</script>
<style lang="stylus">
.report-header
  padding 10px 0
  margin-bottom 10px
  border-bottom 1px dotted #ddd
  .title
    vertical-align middle
    font-size 20px
    margin-right 10px
  .add
    border-top-left-radius 0
    border-bottom-left-radius 0
    margin-right 10px
  .search
    input
      border-top-right-radius 0
      border-bottom-right-radius 0
.report-empty
  text-align center
  padding 100px 0
  font-size 48px
  color #eee
.task-list
.tasks
  .n3-panel-heading
    .remove
      opacity 0
      transition opacity .3s
      color #ff6c60
    & a:hover
      .remove
        opacity 1
  .progress
    .state
      .n3-dropdown-toggle
        border-top-right-radius 0
        border-bottom-right-radius 0
        border-color #ccc
        border-right 0
    .detail
      .n3-form-control
        border-radius 0
    .add
      border-top-left-radius 0
      border-bottom-left-radius 0
  .completed, .ended
    margin-left 5px
  .completed
    color #2ecc71
  .ended
    color #e74c3c
  .add-task
    display block
    padding 10px 15px
.project
  .n3-panel-collapse.collapse-transition
    overflow visible
</style>
