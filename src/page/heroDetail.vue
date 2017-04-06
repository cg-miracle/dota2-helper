<template>
<div class="container">
  <hd page-type="详情"></hd>
  <section id="hero-detail" v-bind:style="{backgroundImage: 'url('+ getImg(heroimg) +')'}">
      <h1 class='hero-name'>{{hero.name}}</h1>
      <div class='row'>
        <div class='left-view'>
          <h2 class='info-num'>{{hero.damage}}</h2><span class='info-str'>damage</span>
        </div>
      </div>
  </section>
</div>
</template>
<script>
  import hd from '../components/header.vue'
  import util from '../lib/utils.js'
  import axios from 'axios'
  export default {
    data () {
      return {
        hero: {},
        heroimg: ''
      }
    },
    mounted () {
      this.getHero()
    },
    methods: {
      getHero () {
        var heroid = this.$route.params.id
        this.heroimg = this.$route.params.imgid
        console.log(this.heroimg)
        var d = window.localStorage.getItem(heroid)
        this.hero = JSON.parse(d)[0]
        this.css('#hero-detail::before{background-image: url(' + this.getImg(this.heroimg) + ')}')
        console.log(this.hero)
        if (!d) {
          axios({
            method: 'get',
            url: 'http://kogapi.games-cube.com/championdetail?hero_id=' + heroid,
            headers: {
              'DAIWAN-API-TOKEN': util.config.token
            }
          }).then((res) => {
            if (res.data.msg === 'ok') {
              var d = res.data
              this.hero = d
              window.localStorage.setItem(heroid, JSON.stringify(d.data))
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      getImg (obj) {
        return util.getImgUrl(obj)
      },
      css (t) {
        // 迫于无奈
        var img = document.getElementById('beforeImg')
        if (!img) {
          var s = document.createElement('style')
          s.id = 'beforeImg'
          s.innerText = t
          document.body.appendChild(s)
        }
      }
    },
    components: {
      hd
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../assets/scss/common.scss';
$co-b8: #BFBFB8;
#hero-detail{
    position: fixed;
    top: $navBarH; left: 0; right: 0; bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    color: $white;
    &::before{
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      filter: blur(20px);
      z-index: -1;
      background-repeat: no-repeat;
      background-size: cover;
      margin: -20px;
    }
    .hero-name{//英雄名
      text-align: center;
      font-size: 30px;
      margin-bottom: 30px;
    }
    .row{//第二列
       display: flex;
       .left-view{
         flex-direction: column;
         .info-num{
           
         }
         .info-str{
            color: $co-b8
         }
       }
    }
    
}
</style>
