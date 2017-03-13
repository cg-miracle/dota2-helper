const Home = resolve => {
  require.ensure(['../page/index.vue'], () => {
    resolve(require('../page/index.vue'))
  })
}

const News = resolve => {
  require.ensure(['../page/new.vue'], () => {
    resolve(require('../page/new.vue'))
  })
}

const routers = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/news',
  name: 'news',
  component: News
}, {
  path: '*',
  component: Home
}]

export default routers
