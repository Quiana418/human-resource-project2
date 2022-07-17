// 通过用户访问的页面 判断是否放行
// 这里面写的是路由守卫
import router from '@/router'
// 引入页面顶部的进度条 加载时显示
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'
// 定义白名单 相当于只有这两个才是被允许的 vip
const whitespace = ['/login', '/404']

// 前置路由守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 根据是否有token 做权限控制
  const token = store.getters.token
  // 如果有token
  if (token) {
    // 并且登陆过 还想去登录的话 就不能在登录 直接去首页
    if (to.path === '/login') {
      // 关闭进度条
      NProgress.done()
      next('/')
    } else {
      // 如果登陆过 要去其他地方 直接放行
      // 在这里可以拿用户数据 拿数据前进行判断 如果没有拿到过数据 才能拿
      if (!store.state.user.userInfo.id) {
        store.dispatch('user/getInfo')
      }
      next()
    }
  } else {
    // 如果无token 想去白名单里的 那么直接放行
    if (whitespace.includes(to.path)) {
      next()
    } else {
      // 如果无token 想去其他地方 只能到登录
      next('/login')
    }
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
// 后置路由守卫
