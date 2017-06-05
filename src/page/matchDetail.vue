<template>
  <div class="container-wrap">
      <div class='match-title'>
        <i class='back-btn el-icon-arrow-left' @click='backfunc'></i>
        <p>比赛{{mid}}</p>
      </div>
    <section id='match-detail'>
      <loading v-show="!isLoad">dd</loading>
      <section class='match-wrap' v-show="isLoad">
      <!-- 天辉表格 -->
        <div class='match-table radiant'>
          <div class="table-header radiant-header">
           <div class="header-left radiant-desc">
            <div class="desc-div"><p>Radiant</p><p>天辉</p></div>
             <p class="winOrFailed">{{rwinStatus}}</p>
            </div>
            <div class="header-right">
              <span>杀敌 {{rKills}}</span>
              <span>经验 {{rxp}}</span>
              <span>金钱 {{rallMoney}}</span>
            </div>
          </div>
          <div class="table-body">
            <div class="cell radiant" v-for="player in players.radiant">
              <img :src="player.heroavatar" alt="英雄头像" class="hero-avatar">
              <div class="name-damage">
                <p class="user-name">{{player.personaname}}</p>
                <p class="damage-str">伤害:{{getHeroDamage('radiant',player.hero_damage)}}%</p>
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
              <span @click="toUserDetail(player.account_id)">
                <img :src="player.useravatar" alt="用户头像" class="user-avatar">
              </span>
            </div>
          </div>
        </div>
        <!-- 夜宴表格 -->
        <div class='match-table'>
          <div class="table-header dire-header">
          <div class="header-left dire-desc">
            <div class="desc-div"><p>Dire</p><p>夜魇</p></div>
            <p class="winOrFailed">{{dwinStatus}}</p>
          </div>
          <div class="header-right">
           <span>杀敌 {{dKills}}</span>
           <span>经验 {{dxp}}</span>
           <span>金钱 {{dallMoney}}</span>
          </div>
          </div>
          <div class="table-body">
          <div class="cell dire" v-for="player in players.dire">
              <img :src="player.heroavatar" alt="英雄头像" class="hero-avatar">
              <div class="name-damage">
                <p class="user-name">{{player.personaname}}</p>
                <p class="damage-str">伤害:{{getHeroDamage('dire',player.hero_damage)}}%</p>
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
              <span @click="toUserDetail(player.account_id)">
                <img :src="player.useravatar" alt="用户头像" class="user-avatar">
              </span>
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
  import loading from '../components/loading.vue'
  import axios from 'axios'
  import util from '../lib/utils'
  import defaultLogo from '../assets/images/defaultuser.png'

  export default {
    data () {
      return {
        mid: '', // 比赛id
        players: {
          radiant: [], // 近卫方选手
          dire: [], // 夜宴方选手
          isfinished: false
        },
        nonameIds: [], // 存放匿名玩家id
        isLoad: false,
        rHeroDamage: 0, // 总英雄伤害
        dHeroDamage: 0,
        allItems: [],
        rwinStatus: '', // 天辉输赢状态
        dwinStatus: '', // 夜宴输赢状态
        dallMoney: 0, // 平均金钱
        rallMoney: 0,
        dKills: 0, // 总杀人数
        rKills: 0,
        dxp: 0, // 平均经验值
        rxp: 0
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
        let dArr = []
        let rArr = []
        let rtnobj = {}
        function setOneData (player, params) {
          return new Promise((resolve, reject) => {
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
                    self.nonameIds.push(player.account_id)
                    rtn.personaname = '匿名玩家'
                    rtn.useravatar = defaultLogo
                  }
                  resolve()
                })
              })
            }
            p.then(getUserInfo).then(() => {
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
              rtn.account_id = player.account_id
              if (!parseInt(engine)) { // 天辉
                self.rwinStatus = match.radiant_win ? '胜利' : '失败'
                self.dwinStatus = match.radiant_win ? '失败' : '胜利'
                self.rHeroDamage += player.hero_damage
                self.rallMoney += player.gold_per_min
                self.rKills += player.kills
                self.rxp += player.xp_per_min
                rArr.push(rtn)
              } else { // 夜宴
                self.dwinStatus = match.radiant_win ? '失败' : '胜利'
                self.rwinStatus = match.radiant_win ? '胜利' : '失败'
                self.dHeroDamage += player.hero_damage
                self.dallMoney += player.gold_per_min
                self.dKills += player.kills
                self.dxp += player.xp_per_min
                dArr.push(rtn)
              }
              resolve()
            })
          })
        }
        let promiseArr = players.map((player) => {
          return setOneData(player)
        })
        Promise.all(promiseArr).then(res => {
          rtnobj.radiant = rArr
          rtnobj.dire = dArr
          this.players = rtnobj
          this.players.isfinished = true
        })
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
      getHeroDamage (str, damage) {
        if (str === 'radiant') {
          let d = (damage / this.rHeroDamage) * 100
          return d.toFixed(2)
        } else {
          let d = (damage / this.dHeroDamage) * 100
          return d.toFixed(2)
        }
      },
      getSteamid (dotaid) {
        return util.dotaidToSteamid(dotaid)
      },
      toUserDetail (dotaid) {
        let steamid = this.getSteamid(dotaid.toString())
        if (this.nonameIds.indexOf(dotaid) === -1) { // 不是匿名玩家
          this.$router.push({name: 'userDetail', params: {sid: steamid}})
        }
      },
      backfunc () {
        util.backTo()
      }
    },
    watch: {
      players: {
        handler (val) {
          // 监测列表数据变化
          if (val.isfinished) {
            this.$nextTick(function () {
              // console.log('dom 更新完毕')
              this.isLoad = true
            })
          }
        },
        deep: true
      }
    },
    components: {
      hd,
      tb,
      loading
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
  height: 100%;
}
.match-title{
  position: fixed;
  left: 0;
  top: 0;
  right:0;
  z-index: 10;
  height: $titleH;
  line-height: $titleH;
  text-align: center;
  background-color: $Black;
  color: $white;
  border-bottom: 4px solid $ShitYellow;
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
   margin-top: 10px;
    height: 100%;
    background-color: #1F2D3D;
    margin-top: 54px;
    margin-bottom: 50px;
    overflow: scroll;
  .match-wrap{
    & .match-table:nth-of-type(2){
      margin-top: 10px;
    }
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
      display: flex;
      justify-content: space-between;
      // 表格头左半
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
      // 表格头右半
      .header-right{
        display:flex;
        color: #fff;
        font-size: 12px;
        align-items:center;
        &>span{
          padding:0 8px;
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
        font-size: 15px;
        width: 87px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
