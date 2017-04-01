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

exports.config = {
  token: '287AA-861A7-A8AD8-DA1AF ',
  hero_img: 'http://cdn.tgp.qq.com/kog/v3/images/heroPortrait/', // {hero_img_id}.png'
  '英雄图标': 'http://cdn.tgp.qq.com/kog/v3/images/hero/{hero_img_id}.png',
  '技能图标': 'http://cdn.tgp.qq.com/kog/v3/images/skillIcon/{技能ID}.png',
  '英雄卡片': 'http://cdn.tgp.qq.com/kog/v3/images/heroCard/{hero_id}.jpg',
  '装备图标': 'http://cdn.tgp.qq.com/kog/v3/images/equipment/{装备ID}.png',
  '战队图标': 'http://cdn.tgp.qq.com/kog/v3/images/teamRating/{战队ID}.png',
  '战队角色': ['无战队', '筹备期创建者', '筹备期加入', '队长', '副队长', '长老', '队员', '等待结果'],
  '战队级别': ['无', '青铜军团', '白银战盟', '黄金近卫', '白金铁卫', '钻石血卫', '王者联盟'],
  '战队级别图标': 'http://cdn.tgp.qq.com/kog/v3/images/teamRating/{team_rate顺序号}.png',
  '角色段位': ['--', '倔强青铜III', '倔强青铜II', '倔强青铜I', '秩序白银III', '秩序白银II', '秩序白银I', '荣耀黄金III', '荣耀黄金II', '荣耀黄金I', '尊贵铂金III', '尊贵铂金II', '尊贵铂金I', '永恒钻石III', '永恒钻石II', '永恒钻石I', '最强王者', '荣耀黄金Ⅳ', '尊贵铂金Ⅴ', '尊贵铂金Ⅳ', '永恒钻石Ⅴ', '永恒钻石Ⅳ'],
  '角色段位图标1': 'http://cdn.tgp.qq.com/kog/v3/images/grade/{grade顺序号}.png',
  '角色段位图标2': 'http://game.gtimg.cn/images/yxzj/web201605/page/rank{grade顺序号}.png',
  '大区': ['', '安卓手Q', 'IOS手Q', '安卓微信', 'IOS微信', '', '安卓手Q', '安卓手Q'],
  mode_name: ['经典模式', '人机', '新手指导', '活动', '天梯对战', '匹配对战', '房间对战', '燃烧的远征', 'pve竞技场', '大乱斗娱乐模式', '赏金赛', '战队赛'],
  '结果': ['平局', '胜利', '失败']
}
