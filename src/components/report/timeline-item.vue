<template lang="jade">
div
  n3-modal(:show.sync="show", title="修改时间节点")
    div(slot="footer")
    n3-form(slot="body")
      n3-form-item(label="节点状态")
        n3-select.state(:value.sync="progress.state")
          n3-option(v-for="state in status", :value="$key")
            span(v-text="state.text")
      n3-form-item(label="节点日期")
        n3-datepicker(:value.sync="progress.date")
      n3-form-item(label="节点描述")
        n3-textarea(:value.sync="progress.detail")
  a(@click="showModal")
    n3-label(:hover="false")
      span(v-text="status[progress.state].text")
    span.date(v-text="progress.date")
    p.detail(v-text="progress.detail")
</template>

<script>
import {n3Modal, n3Label, n3Form, n3FormItem, n3Select, n3Option, n3Datepicker, n3Textarea} from 'N3-Components'

export default {
  props: ['status', 'progress'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    showModal () {
      this.show = true
    }
  },
  components: {
    n3Modal: n3Modal,
    n3Label: n3Label,
    n3Form: n3Form,
    n3FormItem: n3FormItem,
    n3Select: n3Select,
    n3Option: n3Option,
    n3Datepicker: n3Datepicker,
    n3Textarea: n3Textarea
  }
}
</script>

<style lang="stylus" scoped>
.timeline
  .date
    margin-left 10px
    font-size 16px
    vertical-align middle
  .detail
    padding 10px 0 0
    color #444
</style>
