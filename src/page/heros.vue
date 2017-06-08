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
