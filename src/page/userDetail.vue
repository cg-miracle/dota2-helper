<template>
  <div class="container">
    <hd page-type=""></hd>
    <section id='friends'>
    </section>
    <tb type='好友'></tb>
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
      allUsers: [],
      imgurl: '',
      dotaid: '',
      tips: '请输入你要查找的玩家'
    }
  },
  mounted () {

  },
  methods: {
    getUsers () { // 221829218
      if (this.dotaid) {
        let ids = this.dotaid.split(',')
        let steamids = ids.map(function (value) {
          return this.getSteamid(value)
        }.bind(this))
        axios({
          method: 'get',
          url: '/api/ISteamUser/GetPlayerSummaries/v0002/?key=' + util.config.dota2_token + '&steamids=' + steamids
        }).then((res) => {
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.allUsers = []
      }
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
</style>
