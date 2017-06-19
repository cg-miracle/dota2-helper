<template>
  <div class="container-wrap">
    <hd :is-back=true
        :page-type="titleName"></hd>
    <section id='match-detail' class='main'>
    <div class="ye-line"></div>
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
  import api from '../http/apis'
  import util from '../lib/utils'
  import defaultLogo from '../assets/images/defaultuser.png'

  export default {
    data () {
      return {
        titleName: '',
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
      this.titleName = '比赛 ' + this.mid
      this.getAllItems()
      this.getDetail()
    },
    methods: {
      // 获取比赛详情
      getDetail () {
        api.match.GetMatchDetails({
          match_id: this.mid
        }).then((data) => {
          let details = data.result
          this.getData(details)
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
          api.IEcon.GetGameItems()
          .then((data) => {
            let items = data.result.items
            this.allItems = items
            window.localStorage.setItem('allitems', JSON.stringify(items))
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
