<template>
  <div class="container-wrap">
    <section id='user-detail'>
      <div class='user-info'>
        <i class='back-btn el-icon-arrow-left' @click='backfunc'></i>
        <img class='user-avatar' :src="userInfo.avatarmedium" alt="头像">
        <p class='user-name'>{{userInfo.personaname}}</p>
        <p class='dota-id'>ID: {{getDotaid(userInfo.steamid)}}</p>
      </div>
      <section class='summaries'>
        <h2>摘要</h2>
        <div class='summaries-content'>
          <div class='summaries-item'><p>2087</p><p>总场数</p></div>
          <div class='summaries-item'><p>3.20</p><p>KDA</p></div>
          <div class='summaries-item'><p>49.5%</p><p>总胜率</p></div>
          <div class='summaries-item'><p>3000</p><p>天梯匹配MMR</p></div>
        </div>
      </section>
      <section class='recent-match'>
        <h2>最近比赛</h2>
        <section class='match-table'>
          <div class='table-header'>
              <span>英雄</span>
              <span>结果</span>
              <span>level</span>
              <span>结束时间</span>
              <span>KDA</span>
          </div>
          <div class='table-body'>
            <div class='cell' v-for='match in tableData'>
              <span class="item">{{match.hero}}</span>
              <span class="item"><span class="resultTag" :class="match.result === '胜'?'winColor':'failColor'">{{match.result}}</span></span>
              <span class="item col-C7CBCF">{{match.level}}</span>
              <span class="item">{{match.end_at}}</span>
              <span class="item">{{match.kda}}</span>
            </div>
          </div>
        </section>
      </section>
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
        userInfo: {// 用户信息
          steamid: '1112'
        },
        sid: '', // stemid
        did: '', // dota2 数字id
        imgurl: '',
        dotaid: '',
        tips: '请输入你要查找的玩家',
        tableData: [{
          end_at: '19小时前',
          result: '胜',
          hero: '斧王',
          level: 'High',
          kda: '40'
        }],
        matchIds: [],
        matchDetils: []
      }
    },
    mounted () {
      this.sid = this.$route.params.sid
      this.did = this.getDotaid(this.sid)
      this.getUsers()
      this.getmatchIds()
    },
    methods: {
      // 获取用户信息 头像，数字ID等
      getUsers () { // 221829218
        let steamids = [this.sid]
        axios({
          method: 'get',
          url: '/api/ISteamUser/GetPlayerSummaries/v0002/?key=' + util.config.dota2_token + '&steamids=' + steamids
        }).then((res) => {
          this.userInfo = res.data.response.players[0]
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取最近5场比赛的 比赛id
      getmatchIds () {
        let accountid = this.getDotaid(this.sid)
        axios({
          method: 'get',
          url: '/api/IDOTA2Match_570/GetMatchHistory/v1?key=' + util.config.dota2_token + '&matches_requested=5&account_id=' + accountid
        }).then((res) => {
          let matches = res.data.result.matches
          this.matchIds = matches.map(function (value) {
            return value.match_id
          })
          this.getmatchDetail()
        }).catch((err) => {
          console.error(err)
        })
      },
      getmatchDetail () {
        // 创建返回值为promise对象的函数数组
        let promisify = this.matchIds.map(value => {
          return () => {
            return this.getDetailAjax(value)
          }
        })
        // 利用reduce 进行循环promise操作 设置初始值initialValue 为Promise.resolve()
        promisify.reduce((pre, next) => {
          return pre.then(next)
        }, Promise.resolve()).then((result) => {
          this.getShowData()
        }).catch(err => {
          console.error(err)
        })
      },
      // 获取最近5场比赛的详情
      getDetailAjax (id) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'get',
            url: '/api/IDOTA2Match_570/GetMatchDetails/v1?key=' + util.config.dota2_token + '&match_id=' + id
          }).then((res) => {
            let details = res.data.result
            this.matchDetils.push(details)
            resolve('ok')
          }).catch((err) => {
            console.log(err)
            reject(err)
          })
        })
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
          console.log(this.isWin)
          rtn.result = winStatus
          util.getHeroNameFromId(player.hero_id, (name) => {
            rtn.hero = name
          })
          var diff = Date.now() - match.start_time * 1000
          rtn.end_at = util.getLastTimeStr(diff)
          rtn.level = 'Normal' // level 不知道怎么算 ＝ ＝！ Normal,High,Very High
          rtn.kda = util.getKDA(player.kills, player.deaths, player.assists)
          return rtn
        })
        console.log(this.tableData)
      },
      getSteamid (dotaid) {
        return util.dotaidToSteamid(dotaid)
      },
      getDotaid (steamid) {
        return util.steamidToDotaid(steamid)
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
$cellBorderColor: #F1F2F2;
$failColor: #BBBDCF;
$winColor: #31A836;
.col-C7CBCF{
  color: #C7CBCF;
}
.failColor{
  background-color: $failColor;
}
.winColor{
  background-color: $winColor;
}
#user-detail{
  //用户信息
  .user-info{
    position: relative;
    padding: 20px 0;
    text-align: center;
    background-color: $Black;
    color: $white;
    .back-btn{
      display: inline-block;
      position: absolute;
      top: 20px;
      left: 20px;
      width: 30px;
      height: 30px;
    }
    .user-avatar{
      @include radius(50%)
    }
    .dota-id{
      color: $Silver;
      font-size: 12px;
    }
  }
  //摘要
  .summaries{
    margin: 20px 0 25px 0;
    .summaries-content{
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      background-color: $white;
      .summaries-item{
        text-align: center;
        &>p:nth-of-type(1){
          font-size: 20px;
          color: $Black;
        }
        &>p:nth-of-type(2){
          font-size: 12px;
          color: $Silver
        }
      }
    }
  }
  //最近比赛
  .match-table{
    .table-header{
      display: flex;
      font-size: 15px;
      background-color: rgb(254,255,255);
      color: #C7CBCF;
      justify-content: space-around;
      border-bottom: 1px solid $cellBorderColor;
      padding: 5px 10px;
      span{
         flex: 0 1 20%;
      }
    }
    .table-body{
      background-color: #fff;
      font-size: 14px;
      .cell{
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid $cellBorderColor;
        padding: 10px 10px;
        .item{
          flex: 0 1 20%;
          .resultTag{
            display:inline-block;
            width:34px;
            height:34px;
            line-height: 34px;
            text-align:center;
            color: white;
          }
        }
      }
    }
  }
}
</style>
