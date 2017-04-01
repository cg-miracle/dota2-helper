<template>
  <div class="container">
    <hd page-type="英雄"></hd>
    <section id='heros' class='list-wrap'>
    <div class="title"><span>ALL</span>OF</div>
      <div v-for='hero in herodatas' class='hero-item'>
      <div class="img-wrap">
        <img :src="getImgUrl(hero.hero_img_id)" alt="英雄图标" class='hero-img'>
      </div>
      </div>
    </section>
    <tb type='英雄'></tb>
  </div>
</template>

<script>
import hd from '../components/header.vue'
import tb from '../components/toolbar.vue'
import axios from 'axios'
import util from '../lib/utils'

export default {
  data () {
    return {
      herodatas: []
    }
  },
  filters: {

  },
  mounted () {
    this.getHeros()
  },
  methods: {
    getHeros () {
      var d = window.localStorage.getItem('heros')
      this.herodatas = JSON.parse(d)
      if (!d) {
        axios({
          method: 'get',
          url: 'http://kogapi.games-cube.com/champion',
          headers: {
            'DAIWAN-API-TOKEN': util.config.token
          }
        }).then((res) => {
          if (res.data.msg === 'ok') {
            var d = res.data
            this.herodatas = d
            window.localStorage.setItem('heros', JSON.stringify(d.data))
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    getImgUrl (obj) {
      console.log(obj)
      return util.config.hero_img + obj + '.png'
    }
  },
  components: {
    hd,
    tb
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' style="stylesheet/scss">
@import '../assets/scss/common.scss';
$bg: #37363C;
$imgW: 110px;
.list-wrap{
  display: flex;
  flex-wrap: wrap;
  padding: $padd-10;
  justify-content: space-around;
  background-color: $bg;
  .hero-item{
    margin-bottom: 15px;
    .img-wrap{
      height: $imgW;
      overflow: hidden;
      @include radius(50%);
      box-shadow: 14px 0px 14px rgba(0,0,0,0.25), 10px 5px 5px rgba(0,0,0,0.22);
      .hero-img{
        width: $imgW; 
      }
    }

  }
}
</style>
