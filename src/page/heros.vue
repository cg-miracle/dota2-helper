<template>
  <div class="container">
    <hd page-type="英雄"></hd>
    <section id='heros' class='list-wrap'>
    <div class="title">
     <span class='co-9a3'>ALL</span>OF<span class='co-b7d'>HEROS</span>
    </div>
      <div v-for='hero in herodatas' class='hero-item'>
        <div class="img-wrap">
          <img :src="getImg(hero.name)" alt="英雄图标" class='hero-img'>
        </div>
        <span>{{hero.localized_name}}</span>
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
      herodatas: [],
      imgurl: '',
      heroImg: ''
    }
  },
  mounted () {
    this.getHeros()
  },
  methods: {
    getHeros () {
      var d = window.localStorage.getItem('heros')
      if (!d) {
        axios({
          method: 'get',
          url: '/api/IEconDOTA2_570/GetHeroes/v1?key=' + util.config.dota2_token + '&language=zh'
        }).then((res) => {
          if (res.data.result.status === 200) {
            var d = res.data.result
            this.herodatas = d.heroes
            console.log(this.herodatas)
            window.localStorage.setItem('heros', JSON.stringify(d))
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.herodatas = JSON.parse(d).heroes
      }
    },
    // 获得英雄头像地址
    getImg (fullName) {
      return util.getHeroAvatar(fullName, 'vert')
    }
  },
  components: {
    hd,
    tb
  }
}
</script>

<style lang='scss' style="stylesheet/scss">
@import '../assets/scss/common.scss';
$bg: #37363C;
$imgW: 110px;
$titleFont: 30px; 
$nameFont: 14px; 
$co9a3: #71B9A3;
$cob7d: #F6CB7D;
.co-9a3{
  color: $co9a3;
}
.co-b7d{
    color: $cob7d;
}
.list-wrap{
  display: flex;
  flex-wrap: wrap;
  padding: $padd-10;
  justify-content: space-around;
  background-color: $bg;
  .title{
    color: $white;
    flex-basis: 100%;
    text-align: center;
    padding: 10px 0;
    font-size: $titleFont;
  }
  .hero-item{
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $white;
    font-size: $nameFont;
    .img-wrap{
      margin-bottom: 5px;
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
