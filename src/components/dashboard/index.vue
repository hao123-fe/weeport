<template lang="jade">
section
  n3-row
    n3-column(:col="12")
      div.report-header
        h4 数据备份
  n3-row
    n3-column(:col="12")
      n3-button(@click="backup") 数据备份
  n3-row
    n3-column(:col="12")
      div.report-footer
</template>
<script>
import clipboard from 'clipboard-js'
import {n3Row, n3Column, n3Button} from 'N3-Components'

export default {
  components: {
    n3Row,
    n3Column,
    n3Button
  },
  methods: {
    backup () {
      const ls = global.localStorage
      const data = ls.getItem('projects')
      clipboard.copy(data)
    }
  }
}
</script>
