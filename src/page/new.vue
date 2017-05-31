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
            <div class='table-header'>
                <span>NO</span>
                <span>战队logo</span>
                <span>战队名</span>
                <span>创建时间</span>
            </div>
            <div class='table-body'>
              <div class='cell' v-for='(team,index) in teams'>
                <span class="item">{{index + 1}}</span>
                <span class="item"><img :src="team.logo" class="team_avatar"></span>
                <span class="item col-C7CBCF">{{team.tag}}</span>
                <span class="item">{{getFormateTime(team.time_created)}}</span>
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
import banner1 from '../assets/images/banner1.png'
import banner2 from '../assets/images/banner2.jpg'
import banner3 from '../assets/images/banner3.jpg'
import util from '../lib/utils'
import axios from 'axios'
import moment from 'moment'
export default {
  data () {
    return {
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
        console.log(self.teams)
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
      .table-header{
        display: flex;
        font-size: 12px;
        background-color: rgb(254,255,255);
        color: #C7CBCF;
        justify-content: space-around;
        border-bottom: 1px solid $cellBorderColor;
        padding: 5px 10px;
        & span:nth-of-type(1){
          flex: 0 1 10%;
        }
        span{
          flex: 0 1 20%;
        }
      }
      .table-body{
        background-color: rgba(29,29,29,.3);
        color: $white;
        font-size: 13px;
        .cell{
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid $cellBorderColor;
          padding: 5px 10px;
          & .item:nth-of-type(1){
            flex: 0 1 10%;
          }
          .item{
            flex: 0 1 20%;
          }
          .team_avatar{
            width: 60px;
            height:40px;
          }
        }
      }
    }
  }
}
</style>
