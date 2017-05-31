<template>
  <div class="container-wrap">
    <section id='match-detail'>
      <div class='match-title'>
        <i class='back-btn el-icon-arrow-left' @click='backfunc'></i>
        <p>比赛{{mid}}</p>
      </div>
      <section class='match-wrap'>
        <div class='match-table radiant'>
          <div class="table-header"></div>
          <div class="table-body">
            <div class="cell radiant" v-for="player in players.radiant">
            <img :src="player.heroavatar" alt="英雄头像" class="hero-avatar">
            <div>
            <p>{{player.personaname}}</p>
            </div>
            </div>
          </div>
        </div>
        <div class='match-table '>
          <div class="table-header"></div>
          <div class="table-body">
            <div class="cell dire">
            </div>
                <div class="cell dire">
            </div>
                <div class="cell dire">
            </div>
                <div class="cell dire">
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

  export default {
    data () {
      return {
        mid: '', // 比赛id
        players: {
          radiant: [], // 近卫方选手
          dire: [] // 夜宴方选手
        },
        totalHeroDamage: 0 // 总英雄伤害
      }
    },
    mounted () {
      this.mid = this.$route.params.mid
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
      getData (data) {
        let players = data.players
        for (let player of players) {
          let rtn = {}
          // 英雄头像
          util.getHeroNameFromId(player.hero_id, (nameObj) => {
            rtn.heroavatar = util.getHeroAvatar(nameObj.name, 'full')
          })
          // 获取玩家信息 名字 头像
          let steamid = this.getSteamid(player.account_id.toString())
          util.getUsers(steamid, (err, userInfo) => {
            if (err) {
              console.error(err)
            }
            if (userInfo) {
              rtn.useravatar = userInfo.avatar
              rtn.steamid = userInfo.steamid
              rtn.personaname = userInfo.personaname
            } else {
              rtn.personaname = '匿名玩家'
            }
          })
          this.totalHeroDamage += player.hero_damage
          rtn.kdaInfo = player.kills + '／' + player.deaths + '／' + player.assists
          // avatar personaname steamid
          let engine = util.get8bitNumber(player.player_slot).substr(0, 1) // 阵营
          if (!parseInt(engine)) { // 天辉
            this.players.radiant.push(rtn)
          } else { // 夜宴
            this.players.dire.push(rtn)
          }
        }
      },
      getHeroDamage () {

      },
      // 得到列表数据
      getShowData () {
        // radiant_win true Or false
        this.tableData = this.matchDetils.map(match => {
          let players = match.players
          let player = players.filter((value) => {
            if (value.account_id === this.did) {
              return value
            }
          })[0]
          let rtn = {}
          let winStatus = ''
          let engine = util.get8bitNumber(player.player_slot).substr(0, 1) // 阵营
          if (!parseInt(engine)) { // 天辉
            winStatus = match.radiant_win ? '胜' : '负'
          } else { // 夜宴
            winStatus = match.radiant_win ? '负' : '胜'
          }
          rtn.result = winStatus
          util.getHeroNameFromId(player.hero_id, (nameObj) => {
            rtn.hero = util.getHeroAvatar(nameObj.name, 'vert')
          })
          var diff = Date.now() - match.start_time * 1000
          rtn.end_at = util.getLastTimeStr(diff)
          rtn.level = 'Normal' // level 不知道怎么算 ＝ ＝！ Normal,High,Very High
          rtn.kda = util.getKDA(player.kills, player.deaths, player.assists)
          rtn.kdaInfo = player.kills + '／' + player.deaths + '／' + player.assists
          return rtn
        })
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
$heroavatarW: 70px;
$cellBorderColor: #F1F2F2;
$failColor: #BBBDCF;
$winColor: #31A836;
$titleColor: #676D73;
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
}
#match-detail{
  .match-title{
    position: relative;
    padding: 15px 0;
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
  .match-wrap{
    margin-top: 30px;
    .dire{
      background: linear-gradient(to right, rgb(37,18,18) , $Black);
    }
    .radiant{
      background: linear-gradient(to right, rgb(32,42,22) , $Black);
    }
    .cell{
      display: flex;
      color: #fff;
      border:1px solid rgb(34,36,34);
      font-size: 13px;
      .hero-avatar{
        width: $heroavatarW;
        max-height: 40px;
      }
    }
  }
}
</style>
