<template lang="jade">
navigator
n3-container.main-body
  router-view
</template>
<script>
import Navigator from './navigator/index.vue'
import {n3Container} from 'N3-Components'
export default {
  components: {
    navigator: Navigator,
    n3Container: n3Container
  }
}
</script>
<style lang="stylus">
html, body
  background #f2f2f2
body
  padding-top 52px
.main-body
  position relative
  margin-top 20px
  background white
  border-radius 5px
  box-shadow 0 0 5px silver
.n3-input-con.inline
  vertical-align middle
.pull-right
  float right
</style>
