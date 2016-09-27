<template lang="jade">
header
  a.logo
    img(src="../../assets/logo.png")
  n3-nav
    n3-nav-item(v-link="{path: '/report', activeClass: 'n3-navbar-active'}")
      a 周报
    n3-nav-item(v-link="{path: '/preview', activeClass: 'n3-navbar-active'}")
      a 邮件预览
    n3-nav-item(v-link="{path: '/settings', activeClass: 'n3-navbar-active'}")
      a 设置
</template>
<script>
import {n3Row, n3Column, n3Button, n3Input, n3Datepicker, n3Nav, n3NavItem} from 'N3-Components'

export default {
  components: {
    n3Row: n3Row,
    n3Column: n3Column,
    n3Nav: n3Nav,
    n3NavItem: n3NavItem,
    n3Button: n3Button,
    n3Input: n3Input,
    n3Datepicker: n3Datepicker
  }
}
</script>
<style lang="stylus" scoped>
header
  position fixed
  width 100%
  top 0
  background white
  z-index 100
.logo
  height 52px
  float left
  padding 10px
  margin-right 10px
  img
    height 100%
</style>
