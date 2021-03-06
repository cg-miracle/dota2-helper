var Long = require('long')
import api from '../http/apis'

var config = {
  hero_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/', // {hero_img_id}.png'
  item_img: 'http://cdn.dota2.com/apps/dota2/images/items/' // <name>_lg.png'
}

exports.getLastTimeStr = diff => {
  const minute = 60 * 1000 // 1分钟
  const hour = 60 * minute // 1小时
  const day = 24 * hour // 1天
  const month = 31 * day // 月
  const year = 12 * month// 年

  var content = null
  if (diff < 5 * minute) { // 小于5分钟
    content = '刚刚'
  } else if (diff < hour) { // 小于60分钟
    content = Math.floor(diff / 60 / 1000) + '分钟前'
  } else if (diff < day) {
    content = Math.floor(diff / 3600 / 1000) + '小时前'
  } else if (diff < month) {
    content = Math.floor(diff / 24 / 3600 / 1000) + '天前'
  } else if (diff < year) {
    content = Math.floor(diff / day / 31) + '月前'
  } else {
    content = Math.floor(diff / year) + '年前'
  }

  return content
}

function getRealName (name) {
  return name.replace('npc_dota_hero_', '')
}

function getRealItemName (name) {
  return name.replace('item_', '')
}

/**
 * obj 英雄name
 * 返回英雄头像 suffix ( eb sb lg getHeroAvatar vert)
 */
exports.getHeroAvatar = (name, suffix) => {
  name = getRealName(name)
  if (suffix === 'vert') {
    suffix = '_vert.jpg'
  } else {
    suffix = '_' + suffix + '.png'
  }
  return config.hero_img + name + suffix
}

// 获得道具图片
exports.getItemAvatar = (name) => {
  name = getRealItemName(name)
  return config.item_img + name + '_lg.png'
}

/**
 * dota数字id 转steamid
 */
exports.dotaidToSteamid = (dotaid) => {
  return Long.fromString(dotaid).add('76561197960265728').toString()
}

/**
 * steamid 转dota数字id
 */
exports.steamidToDotaid = (steamid) => {
  return Long.fromString(steamid).sub('76561197960265728').toNumber()
}

exports.backTo = () => {
  history.go(-1)
}

/**
 * 获取英雄名字
 * id =>英雄id
 * callback => 成功后回调函数
 */
var getHeroNameArr = (heros, id) => {
  return heros.filter(function (value) {
    if (value.id === id) {
      return value.localized_name
    }
  })
}

exports.getHeroNameFromId = (id, callback) => {
  var d = window.localStorage.getItem('heros')
  if (!d) {
    api.IEcon.GetHeroes({
      language: 'zh'
    }).then((data) => {
      let d = data.result
      let name = getHeroNameArr(d.heros, id)
      window.localStorage.setItem('heros', JSON.stringify(d))
      callback(name[0])
    })
  } else {
    let name = getHeroNameArr(JSON.parse(d).heroes, id)
    callback(name[0])
  }
}

// 获取战队图片
exports.getTeamLogo = (ugcid) => {
  return new Promise((resolve, reject) => {
    api.IEcon.GetUGCFileDetails({
      ugcid: ugcid,
      appid: 570
    }).then((data) => {
      let d = data.data
      let url = d.url
      resolve(url)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

// 获取用户信息 头像，数字ID等
exports.getUsers = (sid, callback) => { // 221829218
  api.user.GetPlayerSummaries({
    steamids: sid
  }).then((res) => {
    let userInfo = res.data.response.players[0]
    callback(null, userInfo)
  }).catch((err) => {
    console.log(err)
    callback(err)
  })
}

// 获得8位二进制数 补满8位
exports.get8bitNumber = (number) => {
  number = number.toString(2)
  if (number.length !== 8) {
    for (let i = 0; i < 8 - number.length; i++) {
      number = '0' + number
    }
  }
  return number
}

// 计算kda k=>杀 d=>死 a=>助
exports.getKDA = (k, d, a) => {
  let kda = 0
  if (d === 0) d = 1
  kda = (k + a) / d
  return kda.toFixed(2)
}
exports.config = config
