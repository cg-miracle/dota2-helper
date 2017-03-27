<template>
  <div id="landing">
    <div class="landing-inner">
       <h1 class="app-title">王者荣耀小助手</h1>
       <p class="version-p">v1.0</p>
    </div>
  </div>
</template>

<script>
require('../assets/scss/app.scss')
require('../assets/scss/font/iconfont.css')

export default {
  mounted () {
    setTimeout(() => {
      this.$router.push({
        name: 'news'
      })
    }, 3000)
  }
}
</script>
