<template>
  <span>
    <svg-icon icon-class="fullscreen" @click="handleClick"></svg-icon>
  </span>
</template>

<script>
import screenfull from 'screenfull'
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    // 点击全屏
    async handleClick () {
      if (screenfull.isEnabled) {
        screenfull.request()
      }
      // 原生写法
      /*  if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.requestFullscreen
      } */
    }
  }
}
</script>

<style scoped lang='scss'>
.svg-icon {
  margin-left: 15px;
  color: #fff;
  font-size: 20px;
  margin-right: 6px;
}
</style>
