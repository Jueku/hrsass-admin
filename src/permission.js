// 全局前置守卫做判断
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 从store中获取token
  const token = store.getters.token
  if (token) {
    // 有token
    if (to.path === '/login') {
      // 有token 访问的是登录页 跳转到首页
      next('/')
      NProgress.done()
    } else {
      // 如果有用户信息，就不请求最新用户信息
      const userInfo = store.state.user.userInfo
      if (Object.keys(userInfo).length === 0) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没token
    if (whiteList.includes(to.path)) {
      // 访问路径在白名单中 直接放行
      next()
    } else {
      // 访问的路径 不在白名单中 跳转到登录页
      next('/login')
      NProgress.done()
    }
  }
})
// beforeEach中重定向后 不会再走afterEach
router.afterEach((to, from) => {
  NProgress.done()
})
