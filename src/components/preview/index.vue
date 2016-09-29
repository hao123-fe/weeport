<template lang="jade">
div
  n3-row
    n3-column(:col="12")
      div.report-header
        span.title(v-text="title")
        span.title(v-text="week")
        n3-datepicker.date(placeholder="日期", :value.sync="date", width="100px")
        n3-button.pull-right(type="primary") 发送
  n3-row
    n3-column(:col="12")
</template>
<script>
import {n3Row, n3Column, n3Form, n3FormItem, n3Input, n3Button, n3Tabs, n3Tab, n3Datepicker} from 'N3-Components'
import week from '../../lib/week.js'

export default {
  data () {
    const ls = global.localStorage
    const currentDate = new Date()
    return {
      title: ls.getItem('reportTitle') || '未命名周报',
      projectName: '未命名项目',
      date: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
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
    n3Datepicker: n3Datepicker
  },
  computed: {
    dateRange () {
      const startDate = new Date(this.date)
      const endDate = new Date(this.date)
      const day = (new Date(this.date)).getDay()
      startDate.setDate(startDate.getDate() - day)
      endDate.setDate(endDate.getDate() + 7 - day - 1)
      return {
        start: `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`,
        end: `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`
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
      return `${date.getFullYear()}年第${week(date)}周 （${this.dateRange.start} - ${this.dateRange.end}）`
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
</style>
