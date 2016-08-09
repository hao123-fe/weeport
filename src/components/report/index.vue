<template lang="jade">
div.report
  report-form
  report-preview
</template>
<script>
import ReportForm from './form.vue'
import ReportPreview from './preview.vue'

export default {
  components: {
    reportForm: ReportForm,
    ReportPreview: ReportPreview
  }
}
</script>
<style lang="stylus">
*
  box-sizing border-box
ul
  padding 0
  margin 0
li
  list-style none
.report
  .form, .preview
    padding 20px
    width 50%
    position absolute
    top 0
    bottom 0
  .form
    left 0
    right 50%
    .form-control
      margin-top 10px
    .task
      padding 10px
      background #eee
    fieldset
      margin 0
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
  .preview
    left 50%
    right 0
</style>
