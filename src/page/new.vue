<template>
<div class="container">
  <hd page-type="大厅"></hd>
  <div id="news">
      <!--banner-->
       <el-carousel height="150px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="banner图">
        </el-carousel-item>
    </el-carousel>
  </div>
  <tb></tb>
</div>
</template>

<script>
import hd from '../components/header.vue'
import tb from '../components/toolbar.vue'
import banner1 from '../assets/images/banner1.jpeg'
import banner2 from '../assets/images/banner2.jpeg'
import banner3 from '../assets/images/banner3.jpeg'
export default {
  data () {
    return {
      imgs: [banner1, banner2, banner3]
    }
  },
  components: {
    hd,
    tb
  }
}
</script>
