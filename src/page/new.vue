<template>
<div class="container">
  <hd page-type="大厅"></hd>
  <div id="hall">
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
                <span class="item"><img :src="team.logo" class="team_avatar"></span>
                <div class="nameAndTag">
                  <p class="item col-C7CBCF">{{team.name}}</p>
                  <p class="item col-C7CBCF">{{team.tag}}</p>
                </div>
                <span class="create-time">{{getFormateTime(team.time_created)}}</span>
              </div>
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
import axios from 'axios'
import moment from 'moment'
export default {
  data () {
    return {
      leaguelogo: leaguelogo,
      imgs: [banner1, banner2, banner3],
      teams: [],
      logos: {
        'EHOME': '81469728907777994',
        'Invictus Gaming': '528418381437908533',
        'DK': '438324451817706092',
        'LGD-GAMING': '784036350514842156',
        'Newbee.Boss': '90469956945415030'
      }
    }
  },
  mounted () {
    // var preMonth = moment().subtract(2, 'months')._d
    this.getTeams()
  },
  methods: {
    getFormateTime (time) {
      return moment(time * 1000).format('YY/MM/DD')
    },
    getTeams () {
      var d = window.localStorage.getItem('teams')
      if (!d) {
        axios({
          method: 'get',
          url: '/api/IDOTA2Match_570/GetTeamInfoByTeamID/v1?format=json&key=' + util.config.dota2_token
        }).then((res) => {
          if (res.data.result.status === 1) {
            let d = res.data.result
            this.getCnTeams(d.teams)
            window.localStorage.setItem('teams', JSON.stringify(d))
          }
        }).catch((err) => {
          console.log(err)
          this.$message(err)
        })
      } else {
        let teams = JSON.parse(d).teams
        this.getCnTeams(teams)
      }
    },
    // 获取中国战队
    getCnTeams (teams) {
      let logos = []
      this.teams = teams.filter(value => {
        if (value.country_code === 'cn') {
          let logoid = this.logos[value.name]
          logos.push(logoid)
          return value
        }
      })
      // 创建返回值为promise对象的数组
      let promisify = logos.map(id => {
        return util.getTeamLogo(id)
      })
      let self = this
      Promise.all(promisify).then(urls => {
        // urls logo地址数组
        self.teams = self.teams.map((value, index) => {
          value.logo = urls[index]
          return value
        })
      }).catch(reason => {
        console.log(reason)
      })
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
$titleColor: #676D73;
$cellBorderColor: #F1F2F2;
#hall{
  margin-bottom: $toolbarH;
  .banner-wrap{
    border:2px solid $Black;
    .banner-logo{
      width: 100%;
    }
  }
  .dota-team {
    margin-top:10px;
    h2{
      padding-left: 10px;
      margin-bottom: 5px;
      color: $titleColor;
      i{
        margin-right: 10px;
      }
    }
    .match-table{
      .table-body{
        // background-color: steelblue;
        background-color: #fff;
        color: #ccc;
        font-size: 13px;
        .cell{
          display: flex;
          align-items: center;
          position: relative;
          border-bottom: 1px solid $cellBorderColor;
          .nameAndTag{
            margin-left: 10px;
            width: 100%;
            overflow: hidden;
            &>p:nth-of-type(1){
              font-size: 15px;
              color: darkcyan;
            }
          }
          .create-time{
            position: absolute;
            right: 14px;
            bottom: 6px;
            font-size: 12px;
          }
          .team_avatar{
            width: 60px;
            height:40px;
            background-color: cadetblue;
          }
        }
      }
    }
  }
  .league-list{
    .cell{
       padding:5px 5px 5px 0;
      .league_avatar{
        width:80px;
        height:40px;
        vertical-align: middle;
      }
      .league-desc{
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
