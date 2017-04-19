<template>
  <div class="container">
    <hd page-type="好友"></hd>
    <section id='friends'>
      <div class='search-bar'>
        <input v-focus  v-model='username' placeholder='请输入召唤师名' type="text" class='search-input' >
        <span class='search-btn' @click="getUsers">搜索</span>
      </div>
      <div class='content-body'>
          <div class='tips-area'>
            <img src='../assets/images/acer2.gif'>
            <p>{{tips}}</p>
          </div>
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
      herodatas: [],
      imgurl: '',
      username: '',
      tips: '请输入你要查找的召唤师'
    }
  },
  filters: {

  },
  mounted () {
  },
  methods: {
    getUsers () {
      let key = this.username // encodeURI(this.username)
      axios({
        method: 'get',
        url: 'http://kogapi.games-cube.com/UserArea?keyword=' + key,
        headers: {
          'DAIWAN-API-TOKEN': util.config.token
        }
      }).then((res) => {
        if (res.data.msg === 'ok') {
          console.log(res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    toheroDetail (id, imgid) {
      this.$router.push({name: 'heroDetail', params: {id: id, imgid: imgid}})
    },
    getImg (obj) {
      return util.getImgUrl(obj)
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
#friends{
  .search-bar{
    display: flex;
    align-items: center;
    justify-content: center;
    height: $searchBarH;
    line-height: $searchBarH;
    border: 3px solid $lightBlue;
    overflow: hidden;
    .search-input{
        width: 80%;
    }
    .search-btn{
      text-align: center;
       width: 20%;
       background-color: $ShitYellow;
       color: $white;
    }
  }
  .content-body{
    display: flex;
    justify-content: center;
    .tips-area{
      margin-top: 50px;
      text-align: center;
      color: $Silver;
    }
  }
}
</style>
