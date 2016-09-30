<template lang="jade">
n3-nav(:on-change="selectProject", type="vertical")
  n3-nav-item(v-for="project of projects", :active="current === $index", @click="selectProject($index)", v-if="!search || ~project.name.indexOf(search)")
    a(v-text="project.name || '未命名项目'")
</template>
<script>
import {n3Nav, n3NavItem} from 'N3-Components'
export default {
  props: ['projects', 'select-project', 'current', 'search'],
  components: {
    n3Nav: n3Nav,
    n3NavItem: n3NavItem
  }
}
</script>
<style lang="stylus" scoped>
.n3-navbar-nav li
  border-right 2px solid #41cac0
  &.n3-navbar-active
    background #41cac0
    border-top-left-radius 3px
    border-bottom-left-radius 3px
    a
      color white
      &:hover
        color white
</style>
