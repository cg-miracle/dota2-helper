<template>
  <div id="landing">
    <div class="landing-inner">
       <h1 class="app-title">Dota2 AMG</h1>
       <p class="version-p">v1.0</p>
       <div class="loading-time">( <span class="number">{{number}}</span> )</div>
    </div>
  </div>
</template>

<script>
require('../assets/scss/app.scss')
require('../assets/scss/font/iconfont.css')

export default {
  data () {
    return {
      number: 4,
      tid: 0
    }
  },
  mounted () {
    this.timeCount()
  },
  methods: {
    timeCount () {
      this.number = this.number - 1
      if (this.number === 0) {
        clearTimeout(this.tid)
        this.$router.push({
          name: 'news'
        })
      } else {
        this.tid = setTimeout(this.timeCount, 1000)
      }
    }
  }
}
</script>
