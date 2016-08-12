<template lang="jade">
li(:class="{expand: expand}")
  div(@click="toggleItem")
    slot(name="header")
  div
    slot
</template>

<script>
export default {
  props: ['show'],
  data () {
    return {
      expand: typeof this.show === 'undefined' ? true : this.show
    }
  },
  methods: {
    toggleItem () {
      this.expand = !this.expand
    }
  }
}
</script>

<style lang="stylus" scoped>
li
  overflow hidden
</style>
