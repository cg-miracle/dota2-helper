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

const Heros = resolve => {
  require.ensure(['../page/heros.vue'], () => {
    resolve(require('../page/heros.vue'))
  })
}

const HeroDetail = resolve => {
  require.ensure(['../page/heroDetail.vue'], () => {
    resolve(require('../page/heroDetail.vue'))
  })
}

const Friends = resolve => {
  require.ensure(['../page/friends.vue'], () => {
    resolve(require('../page/friends.vue'))
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
  path: '/heros',
  name: 'heros',
  component: Heros
}, {
  path: '/hero/:id',
  name: 'heroDetail',
  component: HeroDetail
}, {
  path: '/friends',
  name: 'friends',
  component: Friends
}, {
  path: '*',
  component: Home
}]

export default routers
