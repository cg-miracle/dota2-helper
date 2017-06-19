<template>
  <div class="container">
    <hd page-type="英雄"></hd>
    <section id='heros' class='list-wrap main' >
    <div class="title">
     <span class='co-9a3'>ALL</span>OF<span class='co-b7d'>HEROS</span>
     <div class='noData' v-show="isError">steam api 挂了(刷新)</div>
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
import api from '../http/apis'
import util from '../lib/utils'

export default {
  data () {
    return {
      herodatas: [],
      imgurl: '',
      heroImg: '',
      isError: false
    }
  },
  mounted () {
    this.getHeros()
  },
  methods: {
    getHeros () {
      var d = window.localStorage.getItem('heros')
      if (!d) { // language=zh
        api.IEcon.GetHeroes({
          language: 'zh'
        }).then((data) => {
          var d = data.result
          this.herodatas = d.heroes
          window.localStorage.setItem('heros', JSON.stringify(d))
        }).catch((err) => {
          console.log('apiError' + err)
          this.isError = true
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
