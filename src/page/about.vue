<template>
<div class="container">
  <hd page-type="关于"></hd>
  <div id="about">
  </div>
</div>
</template>
<script>
  import hd from '../components/header.vue'
  import util from '../lib/utils.js'
  import axios from 'axios'
  // import runelogo from '../assets/images/runeLogo.png'
  export default {
    data () {
      return {
        hero: {},
        skills: [],
        runes: [],
        heroimg: '',
        isselected: true,
        runeImg: ''
      }
    },
    mounted () {
      this.getHero()
    },
    filters: {
      isexist: function (obj) {
        if (obj === '') {
          return '无'
        } else {
          return obj
        }
      }
    },
    methods: {
    },
    components: {
      hd
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../assets/scss/common.scss';
</style>
