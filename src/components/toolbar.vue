<template>
    <footer id="toolbar">
      <ul class="bars">
        <li class="item">
          <div class="item-inner">
            <i class="iconfont icon-shipin"></i>
            <span>大厅</span>
          </div>
        </li>
         <li class="item">
         <div class="item-inner">
           <i class="iconfont icon-yxlm"></i>
            <span>英雄</span>           
         </div>
        </li>
         <li class="item">
         <div class="item-inner">
             <i class="iconfont icon-wanjiaqushi"></i>
            <span>好友</span>             
         </div>
        </li>
        <li class="item">
        <div class="item-inner">
               <i class="iconfont icon-guanyu"></i>
              <span>关于</span>               
        </div>
        </li>
      </ul>
    </footer>
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
#toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: $toolbarH;
   .bars{
     display: flex;
     height: 100%;

     .item{
       height: 100%;
       flex: 1;
       .item-inner{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont{
            color: $lightGray;
            font-size: 14px;
          }
       }
     }
   }
}
 
</style>
