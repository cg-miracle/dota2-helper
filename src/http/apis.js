import * as $http from './http'

export default {
  user: {
    GetPlayerSummaries (params) {
      return $http.getData('/ISteamUser/GetPlayerSummaries/v0002', params)
    } // 获取玩家基本信息
  },
  match: {
    GetTeamInfoByTeamID (params) {
      return $http.getData('/IDOTA2Match_570/GetTeamInfoByTeamID/v1', params)
    }, // 获取团队信息
    GetMatchDetails (params) {
      return $http.getData('IDOTA2Match_570/GetMatchDetails/v1', params)
    }, // 获取比赛详情
    GetMatchHistory (params) {
      return $http.getData('/IDOTA2Match_570/GetMatchHistory/v1', params)
    } // 获取比赛历史
  },
  IEcon: {
    GetHeroes (params) {
      return $http.getData('/IEconDOTA2_570/GetHeroes/v1', params)
    }, // 获取英雄信息
    GetGameItems (params) {
      return $http.getData('/IEconDOTA2_570/GetGameItems/v1?', params)
    }, // 获取游戏道具
    GetUGCFileDetails (params) {
      return $http.getData('/ISteamRemoteStorage/GetUGCFileDetails/v1', params)
    } // 获取图片文件
  }
}
