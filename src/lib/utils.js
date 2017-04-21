var config = {
  dota2_token: '4EC45E0F6BB0435E586BC369FABDBAA2',
  token: '546FA-9D53D-45524-3225E',
  hero_img: 'http://cdn.dota2.com/apps/dota2/images/heroes/', // {hero_img_id}.png'
  'heroicon': 'http://cdn.tgp.qq.com/kog/v3/images/hero/',
  'skillicon': 'http://cdn.tgp.qq.com/kog/v3/images/skillIcon/' // {技能ID}.png'
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

/**
 * obj 英雄name
 * 返回英雄头像 suffix ( eb sb lg full vert)
 */
exports.getHeroAvatar = (name, suffix) => {
  if (suffix === 'vert') {
    suffix = '_vert.jpg'
  } else {
    suffix = '_' + suffix + '.png'
  }
  return config.hero_img + name + suffix
}

exports.config = config
