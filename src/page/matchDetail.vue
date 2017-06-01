<template>
  <div class="container-wrap">
      <div class='match-title'>
        <i class='back-btn el-icon-arrow-left' @click='backfunc'></i>
        <p>比赛{{mid}}</p>
      </div>
    <section id='match-detail'>
      <section class='match-wrap'>
      <!-- 天辉表格 -->
        <div class='match-table radiant'>
          <div class="table-header radiant-header">
           <div class="header-left radiant-desc">
            <div class="desc-div"><p>Radiant</p><p>天辉</p></div></div>
             <p class="winOrFailed">{{winStatus}}</p>
          </div>
          <div class="table-body">
            <div class="cell radiant" v-for="player in players.radiant">
              <img :src="player.heroavatar" alt="英雄头像" class="hero-avatar">
              <div class="name-damage">
                <p class="user-name">{{player.personaname}}</p>
                <p class="damage-str">伤害:{{getHeroDamage(player.hero_damage)}}%</p>
              </div>
              <div class="kda-info">
                <p class="">{{player.kdaInfo}}</p>
                <p class="">KDA:{{player.kda}}</p>
              </div>
              <div class="item-info">
                <div v-for="item in player.itemIds">
                  <img :src="item" class="itemImg">
                </div>
              </div>
              <img :src="player.useravatar" alt="用户头像" class="user-avatar">
            </div>
          </div>
        </div>
        <!-- 夜宴表格 -->
        <div class='match-table'>
          <div class="table-header dire-header">
          <div class="header-left dire-desc">
            <div class="desc-div"><p>Dire</p><p>夜魇</p></div>
            <p class="winOrFailed">{{winStatus}}</p>
          </div>
          </div>
          <div class="table-body">
          <div class="cell dire" v-for="player in players.dire">
              <img :src="player.heroavatar" alt="英雄头像" class="hero-avatar">
              <div class="name-damage">
                <p class="user-name">{{player.personaname}}</p>
                <p class="damage-str">伤害:{{getHeroDamage(player.hero_damage)}}%</p>
              </div>
              <div class="kda-info">
                <p class="">{{player.kdaInfo}}</p>
                <p class="">KDA:{{player.kda}}</p>
              </div>
              <div class="item-info">
                <div v-for="item in player.itemIds">
                  <img :src="item" class="itemImg">
                </div>
              </div>
              <img :src="player.useravatar" alt="用户头像" class="user-avatar">
            </div>
          </div>
        </div>
      </section>
      <div>
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
  import defaultLogo from '../assets/images/defaultuser.png'

  export default {
    data () {
      return {
        mid: '', // 比赛id
        players: {
          radiant: [], // 近卫方选手
          dire: [] // 夜宴方选手
        },
        totalHeroDamage: 0, // 总英雄伤害
        allItems: [],
        winStatus: '' // 输赢状态
      }
    },
    mounted () {
      this.mid = this.$route.params.mid
      this.getAllItems()
      this.getDetail()
    },
    methods: {
      // 获取比赛详情
      getDetail () {
        axios({
          method: 'get',
          url: '/api/IDOTA2Match_570/GetMatchDetails/v1?key=' + util.config.dota2_token + '&match_id=' + this.mid
        }).then((res) => {
          let details = res.data.result
          this.getData(details)
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取数据
      getData (data) {
        let match = data
        let players = match.players
        let self = this
        for (let player of players) {
          let rtn = {}
          var p = new Promise(function (resolve, reject) {
            // 英雄头像
            util.getHeroNameFromId(player.hero_id, (nameObj) => {
              rtn.heroavatar = util.getHeroAvatar(nameObj.name, 'full')
              resolve()
            })
          })
          let getUserInfo = function () {
            return new Promise((resolve, reject) => {
              // 获取玩家信息 名字 头像
              let steamid = self.getSteamid(player.account_id.toString())
              util.getUsers(steamid, (err, userInfo) => {
                if (err) {
                  console.error(err)
                  reject(err)
                }
                if (userInfo) {
                  rtn.useravatar = userInfo.avatar
                  rtn.steamid = userInfo.steamid
                  rtn.personaname = userInfo.personaname
                } else {
                  rtn.personaname = '匿名玩家'
                  rtn.useravatar = defaultLogo
                }
                resolve()
              })
            })
          }
          p.then(getUserInfo).then(() => {
            self.totalHeroDamage += player.hero_damage
            rtn.hero_damage = player.hero_damage
            // 杀／死／助
            rtn.kdaInfo = player.kills + '／' + player.deaths + '／' + player.assists
            rtn.kda = util.getKDA(player.kills, player.deaths, player.assists)
            let engine = util.get8bitNumber(player.player_slot).substr(0, 1) // 阵营
            let itemIds = [] // 道具装备id数组
            for (let i = 0; i < 6; i++) {
              var key = 'item_' + i
              if (player[key]) {
                itemIds.push(player[key])
              }
            }
            itemIds = itemIds.map(itemid => {
              let itemName = self.allItems.filter(item => {
                if (itemid === item.id) {
                  return item
                }
              })[0]
              return util.getItemAvatar(itemName.name)
            })
            rtn.itemIds = itemIds
            if (!parseInt(engine)) { // 天辉
              this.winStatus = match.radiant_win ? '胜利' : '失败'
              self.players.radiant.push(rtn)
            } else { // 夜宴
              this.winStatus = match.radiant_win ? '失败' : '胜利'
              self.players.dire.push(rtn)
            }
          })
        }
      },
      // 获取所有装备
      getAllItems () {
        var d = window.localStorage.getItem('allitems')
        if (!d) {
          axios({
            method: 'get',
            url: '/api/IEconDOTA2_570/GetGameItems/v1?key=' + util.config.dota2_token
          }).then((res) => {
            let items = res.data.result.items
            this.allItems = items
            window.localStorage.setItem('allitems', JSON.stringify(items))
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.allItems = JSON.parse(d)
        }
      },
      getHeroDamage (damage) {
        let d = (damage / this.totalHeroDamage) * 100
        return d.toFixed(2)
      },
      getSteamid (dotaid) {
        return util.dotaidToSteamid(dotaid)
      },
      backfunc () {
        util.backTo()
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
$heroavatarW: 70px; // 英雄头像宽度
$itemW: 30px; // 装备图片宽度
$titleH: 54px; // 导航条高度
$tableheaderH: 40px; // 表头高度
$cellBorderColor: #F1F2F2;
$failColor: #BBBDCF;
$winColor: #31A836;
$titleColor: #676D73;
$direColor: rgb(157,53,40); //夜宴 颜色
$radiantColor: rgb(81,140,66); //近卫 颜色
.col-C7CBCF{
  color: #C7CBCF;
}
.failColor{
  background-color: $failColor;
}
.winColor{
  background-color: $winColor;
}
.container-wrap{
  height:100%;
  background-color: $Black;
  margin-top: $titleH;
  margin-bottom: $toolbarH;
}
.match-title{
  position: fixed;
  left: 0;
  top: 0;
  right:0;
  height: $titleH;
  line-height: $titleH;
  text-align: center;
  background-color: $Black;
  color: $white;
  .back-btn{
    display: inline-block;
    position: absolute;
    top: 14px;
    left: 20px;
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
}
#match-detail{
  .match-wrap{
    .dire{
      background: linear-gradient(to right, rgb(37,18,18) , $Black);
      .user-name{
        color: $direColor
      }
    }
    .radiant{
      background: linear-gradient(to right, rgb(32,42,22) , $Black);
      .user-name{
        color: $radiantColor
      }
    }
    .table-header{
      height: $tableheaderH;
      .header-left{
        width:150px;
        height:$tableheaderH;
        color: $white;
        display: flex;
        position: relative;
        .desc-div{
          font-size: 14px;
          line-height: 14px;
          position: absolute;
          top: -39px;
          left: 5px;
          &>p:nth-of-type(1){
            margin-bottom: 5px;
          }
        }
        .winOrFailed{
            position: absolute;
            left: 59px;
            top: -34px;
            font-size: 19px;
        }
      }
    }
    .dire-header{
      border-top:1px solid $direColor;
      .dire-desc{
        border-top: $tableheaderH solid $direColor;
        border-right: $tableheaderH solid transparent;
        border-bottom:none;
        border-left: none;
      }
    }
    .radiant-header{
      border-top:1px solid $radiantColor;
      .radiant-desc{
        border-top: $tableheaderH solid $radiantColor;
        border-right: $tableheaderH solid transparent;
        border-bottom:none;
        border-left: none;
      }
    }
    .cell{
      display: flex;
      justify-content: space-around;
      color: rgb(129,135,125);
      border:1px solid rgb(34,36,34);
      font-size: 12px;
      padding: 0 5px;
      align-items: center;
      .hero-avatar{
        width: $heroavatarW;
        max-height: 40px;
      }
      .user-name{
        font-size: 16px;
      }
      .item-info{
        width: $itemW*3;
        display: flex;
        flex-wrap: wrap;
       .itemImg{
          width: $itemW;
        }
      }
      .user-avatar{
        width: 40px;
        @include radius(50%);
      }
    }
  }
}
</style>
