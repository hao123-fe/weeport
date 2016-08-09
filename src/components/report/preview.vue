<template lang="jade">
div.preview
  article
    h1
      span(v-text="`${report.title}`")
      span(v-text="`【${week}】`")
    div(v-for="project of report.projects")
      h2(v-text="project.title", style="color: orange")
      ul(style="font-size: 14px;")
        li(v-for="task of project.tasks")
          h3.work-title
            span.status(v-text="`${task.status}`")
            span(v-text="task.title")
          pre
            span(v-text="task.detail")
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
