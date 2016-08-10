<template lang="jade">
form.form(@submit="send")
  h2 周报配置
  label.form-control
    span 标题
    input(v-model="report.title")
  label.form-control
    span 时间
    input(v-model="report.date", type="date")
  h2 本周工作
  fieldset.form-control.project(v-for="project of report.projects")
    a.remove(@click="removeItem(report.projects, project)") x
    legend(v-text="project.title || `未命名项目`")
    label.form-control
      span 项目名称
      input(v-model="project.title")
    ul
      li.task.form-control(v-for="task of project.tasks")
        a.remove(@click="removeItem(project.tasks, task)") x
        label.form-control
          span 标题
          input(v-model="task.title")
        label.form-control
          span 状态
          select(v-model="task.status")
            option Pending
            option 需求中
            option 开发中
            option 联调中
            option 已提测
            option 已上线
            option 其它
        label.form-control
          span 详细
          textarea(v-model="task.detail", rows="3")
    button(type="button", @click="addTask(project.tasks)").add.form-control.block + 添加任务
  button(type="button", @click="addProject").add.form-control.block + 添加项目
  h2 下周计划
  fieldset.form-control.project(v-for="project of report.projects")
    legend(v-text="project.title || `未命名项目`")
    ul
      li.task.form-control(v-for="task of project.tasks", v-if="task.status!=='已上线'")
        h5(v-text="task.title")
        label.form-control
          span.inline-block 任务计划推迟一周
          input.inline-block(type="checkbox", v-model="task.delay")
        label.form-control
          span 计划说明
          textarea(v-model="task.plan", rows="3")
    button(type="button", @click="addPlanTask(project.tasks)").add.form-control.block + 添加计划任务
  button(type="button", @click="addPlanProject").add.form-control.block + 添加计划项目
  button(type="button", @click="save").form-control 保存本周周报
  button(type="button", @click="newReport").form-control 开始写下周周报
</template>

<script>
import ReportStore from '../../store/report.js'
export default {
  data () {
    return {
      report: ReportStore.state
    }
  },
  methods: {
    addProject () {
      ReportStore.state.projects.push({
        title: '',
        tasks: []
      })
      ReportStore.dispatch('UPDATEREPORT', ReportStore.state)
    },
    addTask (tasks) {
      tasks.push({
        title: '',
        status: 'Pending',
        detail: '',
        delay: false,
        plan: ''
      })
    },
    addPlanProject () {

    },
    addPlanTask () {

    },
    removeItem (list, item) {
      list.splice(list.indexOf(item), 1)
    },
    save () {
      global.localStorage.setItem('cache', JSON.stringify(this.$data.report))
    },
    newReport () {
      ReportStore.dispatch('NEWREPORT')
    },
    send (e) {
      global.localStorage.setItem('cache', '')
    },
    isPlanProjectEmpty (project) {
      console.log(project)
      for (const task of project) {
        if (task.status !== '已上线') {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="stylus" scoped>
.form
  left 0
  right 50%
  h5
    margin 10px 0
  .form-control
    margin-top 10px
  .remove
    display none
    position absolute
    right 0
    top 0
    width 20px
    height 20px
    background red
    color white
    text-align center
    line-height 20px
    border-radius 100%
  .task
    padding 10px
    background #eee
    position relative
    &:hover
      &>.remove
        display block
  fieldset
    margin 0
    position relative
    &:hover
      &>.remove
        display block
  button
    color white
    padding 10px 20px
    border none
    &.block
      display block
      width 100%
    &.add
      background green
      &:hover
        background lighten(green, 10%)
  label
    display block
    span
      font-size 12px
      display block
    input, select, textarea
      width 100%
    textarea
      resize vertical
      rows 3
    .inline-block
      display inline-block
      width auto
</style>
