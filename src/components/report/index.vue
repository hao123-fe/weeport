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
  .form, .preview
    padding 20px
    width 50%
    position absolute
    top 0
    bottom 0
</style>
