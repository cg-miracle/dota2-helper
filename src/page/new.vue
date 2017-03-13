<template>
<div class="container">
  <hd page-type="大厅"></hd>
  <div id="news">
      <!--banner-->
       <el-carousel height="150px">
        <el-carousel-item v-for="item in 4">
          <h3>{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
  </div>
</div>
</template>

<script>
import hd from '../components/header.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    hd
  }
}
</script>
