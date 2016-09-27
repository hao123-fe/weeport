<template lang="jade">
navigator
n3-container
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
</style>
