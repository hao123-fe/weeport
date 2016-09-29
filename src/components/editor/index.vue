<template lang="jade">
n3-row
  n3-column(:col="4", :offset="1")
    report-form
  n3-column(:col="4", :offset="1")
    report-preview
</template>
<script>
import ReportForm from './form.vue'
import ReportPreview from './preview.vue'
import {n3Row, n3Column} from 'N3-Components'

export default {
  components: {
    reportForm: ReportForm,
    ReportPreview: ReportPreview,
    n3Row: n3Row,
    n3Column: n3Column
  }
}
</script>
