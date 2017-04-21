<template>
    <header id="head">
      <span v-if='isBack' class='backbtn' @click='backTo'>返回</span>
      <div class="navbar clearfix fix" :class="{'show':show}">{{pageType}}</div>
    </header>
</template>

<script>
  export default{
    data () {
      return {
        show: false
      }
    },
    props: {
      pageType: String,
      fix: Boolean,
      isBack: Boolean
    },
    methods: {
      backTo: function () {
        history.go(-1)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../assets/scss/common.scss';
#head{
  position: relative;
  .backbtn{
    position: fixed;
    left: 0;
    top: 0;
    height: $navBarH;
    line-height: $navBarH;
    color: $white;
    z-index: 10;
    padding-left:10px;
  }
  .navbar{
    width: 100%;
    height: $navBarH;
    line-height: $navBarH;
    background-color: $Black;
    text-align: center;
    color: $white;
    &.fix{
      position: fixed;
      top:0;
      left: 0;
      right: 0;
    }
  }
}
 
</style>
