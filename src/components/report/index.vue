<template lang="jade">
div
  n3-alert(type="success", message="保存", placement="top", :show.sync="alert.saveSuccess", :duration="2000") 保存成功！
  n3-alert(type="danger", message="保存", placement="top", :show.sync="alert.saveFail", :duration="2000") 保存失败！
  n3-row
    n3-column(:col="12")
      div.report-header
        n3-input.search(placeholder="搜索项目", :value.sync="search", width="195px")
        n3-button.add(type="primary", @click="addProject")
          n3-icon(type="plus")
        n3-datepicker.date(placeholder="日期", :value.sync="date", width="100px")
        n3-button.pull-right(type="primary", @click="save") 保存
  n3-row
    n3-column(:col="3")
      projects(:search="search", :projects="projects", :select-project="selectProject", :current="currentProject")
    n3-column(:col="9", v-if="currentProject !== null")
      n3-form
        n3-form-item(label="项目名称", need)
          n3-input(:value.sync="projects[currentProject].name")
        n3-form-item
          n3-button(type="primary", @click="addTask(projects[currentProject])") 添加任务&nbsp;
            n3-icon(type="plus")
        n3-accordion
          n3-panel(v-for="task of projects[currentProject].tasks", :header="task.name || '未命名任务'")
            n3-form-item(label="任务名称")
              n3-input(:value.sync="task.name")
    n3-column(:col="9", v-if="currentProject === null")
      div.report-empty 请选择或新建一个项目
</template>
<script>
import Projects from './Projects.vue'
import {n3Row, n3Column, n3Form, n3FormItem, n3Input, n3Button, n3Tabs, n3Tab, n3Datepicker, n3Icon, n3Alert, n3Accordion, n3Panel} from 'N3-Components'

export default {
  data () {
    const ls = global.localStorage
    const date = new Date()
    const dateObj = {
      year: date.getFullYear(),
      month: (month => {
        let ret = (month + 1).toString()
        return ret.length === 1 ? '0' + ret : ret
      })(date.getMonth()),
      date: (date => {
        let ret = date.toString()
        return ret.length === 1 ? '0' + ret : ret
      })(date.getDate())
    }
    return {
      alert: {
        saveSuccess: false,
        saveFail: false
      },
      search: '',
      date: `${dateObj.year}-${dateObj.month}-${dateObj.date}`,
      currentProject: null,
      projects: JSON.parse(ls.getItem('projects')) || []
    }
  },
  methods: {
    addProject () {
      if (this.search) {
        this.projects.push({
          name: this.search,
          tasks: []
        })
        this.search = ''
        this.currentProject = this.projects.length - 1
      }
    },
    addTask (project) {
      project.tasks.push({
        name: '',
        progress: []
      })
    },
    selectProject (index) {
      this.currentProject = index
    },
    save () {
      const ls = global.localStorage
      try {
        ls.setItem('projects', JSON.stringify(this.projects))
        this.alert.saveSuccess = true
      } catch (e) {
        this.alert.saveFail = true
      }
    }
  },
  components: {
    projects: Projects,
    n3Alert: n3Alert,
    n3Accordion: n3Accordion,
    n3Panel: n3Panel,
    n3Icon: n3Icon,
    n3Row: n3Row,
    n3Column: n3Column,
    n3Form: n3Form,
    n3FormItem: n3FormItem,
    n3Input: n3Input,
    n3Button: n3Button,
    n3Tabs: n3Tabs,
    n3Tab: n3Tab,
    n3Datepicker: n3Datepicker
  }
}
</script>
<style lang="stylus">
.report-header
  padding 10px 0
  margin-bottom 10px
  border-bottom 1px dotted #eee
  .title
    vertical-align middle
    font-size 20px
    margin-right 10px
  .add
    border-top-left-radius 0
    border-bottom-left-radius 0
    margin-right 10px
  .search
    input
      border-top-right-radius 0
      border-bottom-right-radius 0
.report-empty
  text-align center
  padding 100px 0
  font-size 48px
  color #ddd
</style>
