// 根据动态路由筛选获取权限
import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: []
}
const mutations = {
  setRoutes (state, payload) {
    state.routes = payload
  }
}
const actions = {
  filter (context, menus) {
    /*
    const newRoutes = []
     menus.forEach(key => {
      asyncRoutes.filter(item => item.children[0].name === key)
      newRoutes.push(...asyncRoutes.filter(item => item.children[0].name === key))
    }) */
    const newRoutes = asyncRoutes.filter(item => menus.includes(item.children[0].name))
    // 把静态路由和筛选出来的部分动态路由合并
    context.commit('setRoutes', [...constantRoutes, ...newRoutes])
    return newRoutes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
