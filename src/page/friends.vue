<template>
  <div class="container">
    <hd page-type="玩家"></hd>
    <section id='friends' class="main">
      <div class='search-bar'>
        <input v-focus  v-model='dotaid' placeholder='dota2数字ID,多个时,隔开' type="text" class='search-input' >
        <span class='search-btn' @click="getUsers">搜索</span>
      </div>
      <div class='content-body'>
          <loading v-if="isLoad"></loading>
          <div class='tips-area' v-else v-show='!allUsers.length'>
            <img :src='boothImg'>
            <p>{{tips}}</p>
          </div>
          <section v-show='allUsers.length' class='user-list'>
           <h2 class='userTitle'><i class="iconfont icon-iconfonthuangguan huangguan"></i>玩家</h2>
           <div v-for='user in allUsers' class='user-item' @click='toUserDetail(user.steamid)'>
           <div class='userInfo'>
              <img :src="user.avatar" alt="玩家头像" class='userAvatar'>
              <div class='nameAndTime'>
                <p class='userName'>{{user.personaname}}</p>
                <p>{{getlogoffTime(user.lastlogoff)}}</p>
            </div>
           </div>
            <span class='dotaID'>ID: {{getDotaid(user.steamid)}}</span>
            <img src="../assets/images/more.png" class='seeMoreIcon'>
           </div>
          </section>
      </div>
    </section>
    <tb type='好友'></tb>
  </div>
</template>

<script>
import hd from '../components/header.vue'
import tb from '../components/toolbar.vue'
import api from '../http/apis'
import util from '../lib/utils'
import acer1 from '../assets/images/acer1.gif'
import acer2 from '../assets/images/acer2.gif'
import loading from '../components/loading.vue'

export default {
  data () {
    return {
      isLoad: false,
      allUsers: [],
      imgurl: '',
      dotaid: '',
      boothImg: acer2,
      tips: '请输入你要查找的玩家'
    }
  },
  methods: {
    getUsers () { // 221829218
      if (this.dotaid) {
        this.allUsers = []
        this.isLoad = true
        let ids = this.dotaid.split(',')
        let steamids = ids.map(function (value) {
          return this.getSteamid(value)
        }.bind(this))
        api.user.GetPlayerSummaries({
          steamids: steamids.join(',')
        }).then((data) => {
          // 显示搜索结果
          this.showplayers(data)
        }).catch((err) => {
          console.log(err)
          this.isLoad = false
          this.allUsers = []
          this.boothImg = acer1
          this.tips = 'steam api 挂了(刷新)'
        })
      } else {
        this.allUsers = []
      }
    },
    showplayers (data) {
      let users = data.response.players
      if (!users.length) {
        // 如果搜不到玩家
        this.isLoad = false
        this.allUsers = []
        this.boothImg = acer1
        this.tips = '地球上找不到该玩家'
      } else {
        this.allUsers = users
        this.$nextTick(function () {
          this.isLoad = false
        })
      }
    },
    getImg (obj) {
      return util.getImgUrl(obj)
    },
    getSteamid (dotaid) {
      return util.dotaidToSteamid(dotaid)
    },
    getDotaid (steamid) {
      return util.steamidToDotaid(steamid)
    },
    getlogoffTime (time) {
      let diff = Date.now() - time * 1000
      return util.getLastTimeStr(diff)
    },
    toUserDetail (steamid) {
      this.$router.push({name: 'userDetail', params: {sid: steamid}})
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  components: {
    hd,
    tb,
    loading
  }
}
</script>
