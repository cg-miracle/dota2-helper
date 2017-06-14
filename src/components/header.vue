<template>
    <header id="head">
      <i v-if="isBack" class='back-btn el-icon-arrow-left' @click='backfunc'></i>
      <div class="navbar clearfix fix">{{pageType}}</div>
    </header>
</template>

<script>
import util from '../lib/utils'
export default{
  props: {
    pageType: String,
    isBack: Boolean
  },
  methods: {
    backfunc: function () {
      util.backTo()
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../assets/scss/common.scss';
#head{
  z-index: 20;
  position: relative;
    .back-btn{
      display: inline-block;
      position: absolute;
      top: 7px;
      left: 20px;
      width: 30px;
      height: 30px;
      color: $white;
      line-height: 30px;
      z-index: 30;
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
