// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'axios'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Axios)
// 实例化VueRorouter
const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')

/*
*banner1 http://pvp.qq.com/v/detail.shtml?G_Biz=18&tid=111311&e_code=undefined.undefined.undefined
*2 http://pvp.qq.com/v/detail.shtml?G_Biz=18&tid=112026&e_code=undefined.undefined.undefined
*http://pvp.qq.com/v/detail.shtml?G_Biz=18&tid=111699&e_code=undefined.undefined.undefined

*/
