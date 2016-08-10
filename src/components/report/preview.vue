<template lang="jade">
div.preview
  article
    h1
      span(v-text="`${report.title}`")
      span(v-if="week", v-text="`【${week}】`")
    hr
    h2 本周工作
    div(v-for="project of report.projects")
      h3(v-text="project.title", style="color: orange")
      ul(style="font-size: 14px;")
        li(v-for="task of project.tasks")
          h4.work-title
            span.status(v-text="`${task.status}`")
            span(v-text="task.title")
          div.detail
            span(v-text="task.detail")
    hr
    h2 下周计划
    div(v-for="project of report.projects")
      h3(v-text="project.title", style="color: orange")
      ul(style="font-size: 14px;")
        li(v-for="task of project.tasks", v-if="task.status!=='已上线' && !task.delay")
          h4.work-title
            span(v-text="`·${task.title}`")
          div.detail
            span(v-text="task.plan")
    hr
    div.extra
      i 本文由<a href="https://github.com/hao123-fe/weekly-report-generator">周报生成器</a>生成
</template>

<script>
import ReportStore from '../../store/report.js'
import week from 'week'
export default {
  data () {
    return {
      report: ReportStore.state
    }
  },
  computed: {
    week () {
      const date = new Date(this.report.date)
      return this.report.date ? `${date.getFullYear()}年第${week(date)}周` : ''
    }
  }
}
</script>


<style lang="stylus" scoped>
.preview
  left 50%
  right 0
  font-color #444
  .detail
    white-space pre-wrap
    padding-left 20px
  .extra
    font-size 12px
    color #bbb
    text-align right
    a
      color #999
      &:hover
        color #666
  .work-title
    span
      vertical-align middle
    .status
      font-size 12px
      background #ccc
      color white
      padding 5px
      border-radius 5px
      display inline-block
      margin-right 5px
</style>
