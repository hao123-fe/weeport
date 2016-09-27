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
<style lang="stylus" scoped>
.report
  position absolute
  top 52px
  bottom 0
  left 0
  right 0
  overflow hidden
  .form, .preview
    padding 20px
    width 50%
    position absolute
    overflow auto
    top 0
    bottom 0
</style>
