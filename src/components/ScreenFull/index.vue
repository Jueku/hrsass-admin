<template>
  <!-- 放置一个图标 -->
  <div>
    <svg-icon
      :icon-class="isFullScreen?'exit-fullscreen':'fullscreen'"
      class="fullscreen"
      @click="toggleScreen"
    />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isFullScreen: false
    }
  },
  methods: {
    toggleScreen() {
      if (ScreenFull.isEnabled) {
        this.isFullScreen = !this.isFullScreen
        ScreenFull.toggle()
      } else {
        this.$message.warning('亲！您该下载新版浏览器')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
}
</style>
