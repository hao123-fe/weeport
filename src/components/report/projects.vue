<template lang="jade">
n3-column(:col="col")
  n3-nav(type="vertical")
    n3-nav-item(v-for="project of projects | orderBy orderByTasks", :active="current === project", @click="selectProject(project)", v-if="!search || ~project.name.indexOf(search)")
      a(v-text="projectLabel(project)")
</template>
<script>
import {n3Nav, n3NavItem, n3Column} from 'N3-Components'
export default {
  props: ['projects', 'select-project', 'current', 'search', 'col'],
  components: {
    n3Nav: n3Nav,
    n3NavItem: n3NavItem,
    n3Column: n3Column
  },
  methods: {
    orderByTasks (a, b) {
      let countA = 0
      let countB = 0
      const tasksA = a.tasks
      const tasksB = b.tasks
      for (const taskA of tasksA) {
        taskA && countA++
      }
      for (const taskB of tasksB) {
        taskB && countB++
      }
      return countB - countA
    },
    checkTaskState (task) {
      const progress = task.progress
      if (progress.length) {
        return !(progress[0].state === 'COMPLETED' || progress[0].state === 'DEPLOYED' || progress[0].state === 'ENDED')
      } else {
        return true
      }
    },
    projectLabel (project) {
      let count = 0
      const tasks = project.tasks
      for (const task of tasks) {
        if (this.checkTaskState(task)) {
          count++
        }
      }
      if (count) {
        return `${(project.name || '未命名项目')} (${count})`
      } else {
        return `${(project.name || '未命名项目')}`
      }
    }
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
