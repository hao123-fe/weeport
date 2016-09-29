<template lang="jade">
n3-row
  n3-column(:col="8", :offset="2")
    n3-form
      n3-form-item(label="周报标题")
        n3-input(:value.sync="title")
      n3-form-item(label="邮箱帐号")
        n3-input(:value.sync="username")
      n3-form-item(label="邮箱密码")
        n3-input(:value.sync="password", type="password")
      n3-form-item(label="发送至")
        n3-input(:value.sync="sendTo")
      n3-form-item(label="抄送至")
        n3-input(:value.sync="cc")
      n3-form-item(label="自动发送")
        n3-switch(:value.sync="autoSend")
</template>
<script>
import {n3Row, n3Column, n3Form, n3FormItem, n3Input, n3Button, n3Tabs, n3Tab, n3Datepicker, n3Switch} from 'N3-Components'

export default {
  data () {
    return {
      autoSend: JSON.parse(this.getOption('autoSend'))
    }
  },
  watch: {
    autoSend (val) {
      this.setOption('autoSend', val)
    }
  },
  computed: {
    title: {
      get () {
        return this.getOption('reportTitle')
      },
      set (val) {
        this.setOption('reportTitle', val)
      }
    },
    sendTo: {
      get () {
        return this.getOption('sendTo')
      },
      set (val) {
        this.setOption('sendTo', val)
      }
    },
    cc: {
      get () {
        return this.getOption('cc')
      },
      set (val) {
        this.setOption('cc', val)
      }
    },
    username: {
      get () {
        return this.getOption('username')
      },
      set (val) {
        this.setOption('username', val)
      }
    },
    password: {
      get () {
        return this.getOption('password')
      },
      set (val) {
        this.setOption('password', val)
      }
    }
  },
  methods: {
    getOption (key) {
      const ls = global.localStorage
      return ls.getItem(key)
    },
    setOption (key, val) {
      const ls = global.localStorage
      ls.setItem(key, val)
    }
  },
  components: {
    n3Row: n3Row,
    n3Column: n3Column,
    n3Form: n3Form,
    n3Switch: n3Switch,
    n3FormItem: n3FormItem,
    n3Input: n3Input,
    n3Button: n3Button,
    n3Tabs: n3Tabs,
    n3Tab: n3Tab,
    n3Datepicker: n3Datepicker
  }
}
</script>
