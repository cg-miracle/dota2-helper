<template>
  <div class="container">
    <hd page-type="玩家"></hd>
    <section id='friends'>
      <div class='search-bar'>
        <input v-focus  v-model='dotaid' placeholder='dota2数字ID,多个时,隔开' type="text" class='search-input' >
        <span class='search-btn' @click="getUsers">搜索</span>
      </div>
      <div class='content-body'>
          <div class='tips-area' v-show='!allUsers.length'>
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
import axios from 'axios'
import util from '../lib/utils'
import acer1 from '../assets/images/acer1.gif'
import acer2 from '../assets/images/acer2.gif'

export default {
  data () {
    return {
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
        let ids = this.dotaid.split(',')
        let steamids = ids.map(function (value) {
          return this.getSteamid(value)
        }.bind(this))
        axios({
          method: 'get',
          url: '/api/ISteamUser/GetPlayerSummaries/v0002/?key=' + util.config.dota2_token + '&steamids=' + steamids
        }).then((res) => {
          // 显示搜索结果
          this.showplayers(res.data)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.allUsers = []
      }
    },
    showplayers (data) {
      let users = data.response.players
      if (!users.length) {
        // 如果搜不到玩家
        this.allUsers = []
        this.boothImg = acer1
        this.tips = '地球上找不到该玩家'
      } else {
        this.allUsers = users
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
    tb
  }
}
</script>

<style lang='scss' style="stylesheet/scss">
@import '../assets/scss/common.scss';
$searchBarH: 40px;
$userAvatarW: 40px;
#friends{
  background: #f0f2f4;
  height: 100%;
  .search-bar{
    display: flex;
    align-items: center;
    justify-content: center;
    height: $searchBarH;
    line-height: $searchBarH;
    border: 3px solid $Black;
    overflow: hidden;
    .search-input{
        width: 80%;
        height: 100%;
    }
    .search-btn{
      text-align: center;
       width: 20%;
       background-color: $ShitYellow;
       color: $white;
    }
  }
  .tips-area{
    margin-top: 50px;
    text-align: center;
    color: $Silver;
  }
  .user-list{
    margin-top: 15px;
    .userTitle{
      margin:0 0 5px 10px;
      color: $Silver;
    }
    .user-item{
      border-bottom: 1px solid #eee;
      font-size: 12px;
      padding: 5px;
      background: $white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userInfo{
        display: flex;
        align-items: center;
        width:50%;
        .userAvatar{
          width: $userAvatarW;
          height: $userAvatarW;
          @include radius(50%);
          margin-right: 10px;
        }
        .nameAndTime{
          .userName{
            max-width: 100px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &>p:nth-of-type(2){
            color: $LightSilver;
          }
        }
      }
      .dotaID{
        color: $LightSilver;
      }
      .seeMoreIcon{
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
