<template>
<div class="container">
  <hd page-type="关于"></hd>
  <div id="about">
    <div class="about-wrap">
      <img src="../assets/images/luffy.png" class="avatar">
      <div class="me-info">
        <p>name: {{name}}</p>
        <p>github: {{github}}</p>
        <p>qq: {{qq}}</p>
      </div>
      <div class="declare">此项目为本人练手demo,如有利益相关请联系我，马上修改。</div>
    </div>
  </div>
  <tb type='关于'></tb>
</div>
</template>
<script>
  import hd from '../components/header.vue'
  import tb from '../components/toolbar.vue'
  export default {
    data () {
      return {
        name: 'Miracle',
        github: 'https://github.com/cg-miracle/',
        qq: '337544754'
      }
    },
    components: {
      hd,
      tb
    }
  }
</script>
