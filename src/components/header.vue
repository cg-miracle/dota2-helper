<template>
    <header id="head">
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
      fix: Boolean

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../assets/scss/common.scss';
#head{
  .navbar{
    width: 100%;
    height: $navBarH;
    line-height: $navBarH;
    background-color: $lightBlue;
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
