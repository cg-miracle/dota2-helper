<template>
    <footer id="toolbar">
      <ul class="bars">
        <li class="item " @click="pushTo('news')" :class="{'active':type === '大厅'}">
          <div class="item-inner">
            <i class="iconfont icon-wxbzhuye"></i>
            <span>大厅</span>
          </div>
        </li>
         <li class="item" @click="pushTo('heros')" :class="{'active':type === '英雄'}">
          <div class="item-inner" > 
            <i class="iconfont icon-iconfonthuangguan"></i>
              <span>英雄</span>           
          </div>
        </li>
         <li class="item" @click="pushTo('friends')" :class="{'active':type === '好友'}">
         <div class="item-inner">
             <i class=" iconfont icon-account"></i>
            <span>好友</span>             
         </div>
        </li>
        <li class="item" >
        <div class="item-inner">
               <i class="iconfont icon-prompt"></i>
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
      type: String,
      fix: Boolean
    },
    methods: {
      pushTo: function (n) {
        this.$router.push({name: n})
      }
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
    border: 1px solid $lightGray;
    box-shadow: 0 0 4px rgba(0,0,0,0.25);
    z-index: 10;
    background-color: $white;
   .bars{
     display: flex;
     height: 100%;

     .item{
       height: 100%;
       flex: 1;
       .item-inner{
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center ;
          color: $Silver;
          font-size: 14px;
          .iconfont{
            font-size: 17px;
          }
         
       }
     }
    .active .iconfont{
      color: $DarkBlue;
    }
    .active span{
      color: $ShitYellow;
    }
   }
}
 
</style>
