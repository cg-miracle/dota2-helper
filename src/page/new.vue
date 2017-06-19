<template>
<div class="container">
  <hd page-type="大厅"></hd>
  <div id="hall" class="main">
      <!--banner-->
       <el-carousel height="150px" class="banner-wrap">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="banner图" class="banner-logo">
        </el-carousel-item>
      </el-carousel>
      <section class='dota-team'>
          <h2><i class="iconfont icon-iconfonthuangguan huangguan"></i>战队(CN)</h2>
        <section class='match-table'>
            <div class='table-body'>
              <div class='cell' v-for='(team,index) in teams'>
                <span class="item"><img :src="team.logo" class="team_avatar" alt="战队logo"></span>
                <div class="nameAndTag">
                  <p class="item col-C7CBCF">{{team.name ? team.name : '匿名战队' }}</p>
                  <p class="item col-C7CBCF">{{team.tag ? team.tag : '匿名战队'}}</p>
                </div>
                <span class="create-time">{{getFormateTime(team.time_created)}}</span>
              </div>
              <div class='noData' v-show="isError">steam api 挂了</div>
            </div>
          </section>
      </section>
      <section class='dota-team league-list'>
          <h2><i class="iconfont icon-iconfonthuangguan huangguan"></i>联赛</h2>
        <section class='match-table'>
            <div class='table-body'>
              <div class='cell'>
                <span class="item"><img :src="leaguelogo" class="league_avatar"></span>
                <div class="nameAndTag">
                  <p class="item col-C7CBCF">索泰联赛大师赛</p>
                  <p class="item col-C7CBCF league-desc">索泰联赛大师赛这个舞台上顶尖的职业战队在全世界的注视下发挥出他们的极限。</p>
                </div>
              </div>
              <div class='cell'>
                <span class="item"><img :src="leaguelogo" class="league_avatar"></span>
                <div class="nameAndTag">
                  <p class="item col-C7CBCF">2017年马尼拉大师赛</p>
                  <p class="item col-C7CBCF league-desc">我们隆重推出大师赛，云集全球顶尖战队的Dota 2联赛</p>
                </div>
              </div>
              <div class='cell'>
                <span class="item"><img :src="leaguelogo" class="league_avatar"></span>
                <div class="nameAndTag">
                  <p class="item col-C7CBCF">SL i-联赛国际邀请赛第2赛季</p>
                  <p class="item col-C7CBCF league-desc">Starladder和ImbaTV联袂推出新一赛季的SL i-联赛国际邀请赛</p>
                </div>
              </div>
                  <div class='cell'>
                <span class="item"><img :src="leaguelogo" class="league_avatar"></span>
                <div class="nameAndTag">
                  <p class="item col-C7CBCF">WCA赛事平台精英赛</p>
                  <p class="item col-C7CBCF league-desc">2017年世界电子竞技大赛已经回归</p>
                </div>
              </div>
            </div>
          </section>
      </section>
  </div>
  <tb type='大厅'></tb>
</div>
</template>

<script>
import hd from '../components/header.vue'
import tb from '../components/toolbar.vue'
import leaguelogo from '../assets/images/leaguelogo.png'
import banner1 from '../assets/images/banner1.png'
import banner2 from '../assets/images/banner2.png'
import banner3 from '../assets/images/banner3.jpg'
import util from '../lib/utils'
import api from '../http/apis'
import moment from 'moment'

export default {
  data () {
    return {
      leaguelogo: leaguelogo,
      imgs: [banner1, banner2, banner3],
      teams: [],
      isError: false
    }
  },
  mounted () {
    this.getTeams()
  },
  methods: {
    getFormateTime (time) {
      return moment(time * 1000).format('YY/MM/DD')
    },
    getTeams () {
      var d = window.localStorage.getItem('teams')
      if (!d) {
        api.match.GetTeamInfoByTeamID({
          isString: true
        })
        .then(result => {
          // 将结果中超过17位的id 转为字符串 防止精度丢失
          console.log(result)
          result = result.replace(/(\d{17,})/g, function ($1) { return '"' + $1 + '"' })
          let data = JSON.parse(result)
          let d = data.result
          this.getCnTeams(d.teams)
        }).catch(err => {
          this.isError = true
          console.error(err)
        })
      } else {
        this.teams = JSON.parse(d)
      }
    },
    // 获取中国战队
    getCnTeams (teams) {
      let logos = []
      this.teams = teams.filter(value => {
        if (value.country_code === 'cn') {
          let logoid = value.logo
          logos.push(logoid)
          return value
        }
      })
      // 创建返回值为promise对象的数组
      let promisify = logos.map(id => {
        return util.getTeamLogo(id)
      })
      let self = this
      Promise.all(promisify).then((urls) => {
        // urls logo地址数组
        self.teams = self.teams.map((value, index) => {
          value.logo = urls[index]
          return value
        })
        window.localStorage.setItem('teams', JSON.stringify(self.teams))
      }).catch(reason => {
        console.error(reason)
      })
    }
  },
  components: {
    hd,
    tb
  }
}
</script>
