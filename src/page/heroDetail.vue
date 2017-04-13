<template>
<div class="container">
  <hd page-type="详情"></hd>
  <div class="hero-detail">
     <h1 class='hero-name'>{{hero.name}}</h1>
      <div class='row'>
        <div class='left-view'>
          <span class='info-num'>{{hero.damage}}</span><span class='info-str co-b8'>Damage</span>
          <span class='info-num'>{{hero.survive}}</span><span class='info-str co-b8'>Survive</span>
        </div>
        <img :src="getAvatar(heroimg)" alt="头像" class='hero-avatar'>
         <div class='right-view'>
            <span class='info-num'>{{hero.difficulty}}</span><span class='info-str co-b8'>Difficulty</span>
            <span class='info-tag'>{{hero.extag1 | isexist}}</span><span class='info-str co-b8'>Orientation</span>
        </div>
      </div>
      <div class='skill-area'>
        <span class='skill-list ' :class="selectedIndex===0?'active':''" @click="changetype('技能')">技能介绍</span>
        <span class='rune-list'   :class="selectedIndex===1?'active':''" @click="changetype('符文')">符文介绍</span>
        <div class='skill-inner'>
         <div v-for='skill in skills' class='skil-item'>
          <img :src='getskillicon(skill.skill_id)' alt="技能图标" class='skill-icon'>
          <div>
              <p>{{skill.skill_name}}</p>
              <p>{{skill.skill_tips}}</p>
          </div>
         </div>
        </div>
      </div>
  </div>
  <!-- 底部背景 -->
  <div  id="hero-bg" v-bind:style="{backgroundImage: 'url('+ getImg(heroimg) +')'}"></div>
</div>
</template>
<script>
  import hd from '../components/header.vue'
  import util from '../lib/utils.js'
  import axios from 'axios'
  export default {
    data () {
      return {
        hero: {},
        skills: [],
        heroimg: '',
        selectedIndex: 0
      }
    },
    mounted () {
      this.getHero()
    },
    filters: {
      isexist: function (obj) {
        if (obj === '') {
          return '无'
        } else {
          return obj
        }
      }
    },
    methods: {
      getHero () {
        var heroid = this.$route.params.id
        this.heroimg = this.$route.params.imgid
        var d = window.localStorage.getItem(heroid)
        this.hero = JSON.parse(d)[0]
        this.skills = this.hero.skill_list
        this.css('#hero-bg::before{background-image: url(' + this.getImg(this.heroimg) + ')}')
        console.log(this.hero)
        if (!d) {
          axios({
            method: 'get',
            url: 'http://kogapi.games-cube.com/championdetail?hero_id=' + heroid,
            headers: {
              'DAIWAN-API-TOKEN': util.config.token
            }
          }).then((res) => {
            if (res.data.msg === 'ok') {
              var d = res.data
              this.hero = d
              window.localStorage.setItem(heroid, JSON.stringify(d.data))
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      changetype (str) {
        if (str === '技能') {
          this.selectedIndex = 0
        } else if (str === '符文') {
          this.selectedIndex = 1
        }
      },
      getImg (obj) {
        return util.getImgUrl(obj)
      },
      getAvatar (obj) {
        return util.getImgUrlicon(obj)
      },
      getskillicon (obj) {
        return util.getskillicon(obj)
      },
      css (t) {
        // 迫于无奈
        var img = document.getElementById('beforeImg')
        if (img) {
          document.body.removeChild(img)
        }
        var s = document.createElement('style')
        s.id = 'beforeImg'
        s.innerText = t
        document.body.appendChild(s)
      }
    },
    components: {
      hd
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../assets/scss/common.scss';
$co-b8: #BFBFB8;
$co-118: rgba(131,127,118,.6);
$co-168: rgb(175,173,168);
$imgW: 150px;
$skilliconW: 50px;
$triangleW: 20px;
 .co-b8{
   color: $co-b8;
 }
 #hero-bg{
    position: fixed;
    top: $navBarH; left: 0; right: 0; bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    &::before{
      content: '';
      background: $co-118;
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      filter: blur(15px);
      z-index: -1;
      background-repeat: no-repeat;
      background-size: cover;
      margin: -20px;
    }
 }
.hero-detail{
    overflow: hidden;
    color: $white;
    padding-top: 30px;
    .hero-name{//英雄名
      text-align: center;
      font-size: 30px;
      margin-bottom: 30px;
    }
    .row{//第二列
       display: flex;
       justify-content: space-around;
       .left-view,.right-view{
         display: flex;
         justify-content: center;
         align-items: center;
         flex-direction: column;
         .info-num{
           text-align: center;
           font-size: 30px;
         }
         .info-str{
            font-size: 18px;
         }
         .info-tag{
           margin-top: 14px;
         }
       }
       .hero-avatar{//头像
          width: $imgW;
          height: $imgW;
          @include radius(50%)
       }
    }
    .skill-area{
      margin-top: 40px;
      padding: 0 20px;
      font-size: 0;
      .skill-list,.rune-list{
        display: inline-block;
        width:50%;
        cursor: pointer;
        text-align: center;
        color: $co-b8;
        font-size: 18px;
        &.active{
           color: $white;
        }
      }
      .skill-inner{
        border: 1px solid $co-168;
        margin-top: 20px;
        width:100%;
        background: $co-118;
        display: flex;
        flex-direction: column;
        padding: 20px 10px 10px;
        @include radius(10px)
        margin-bottom: 30px;
        .skil-item{
          display: flex;
          flex-wrap: nowrap;
          margin-bottom: 10px;
          font-size: 15px;
          .skill-icon{
            width: $skilliconW;
            height: $skilliconW;
            margin-right: 5px;
          }
        }
      }
    } 
}
</style>
