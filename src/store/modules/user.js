import { login, getInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken, setTime } from '@/utils/auth'
const state = {
  // 存token
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // token
  setToken (state, payload) {
    state.token = payload
  },
  // 用户信息
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  // 移除token
  removeToken (state) {
    state.token = null
    removeToken()
  },
  // 清空用户信息
  removeUserInfo (state) {
    state.userInfo = {}
  }
}
const actions = {
  // 发起登录请求
  async login (context, data) {
    // 解决密码写错也能登录--判断结果是否为success，如果失败 让他到catch里
    // 每个接口都有响应data，success，message这几个数据 放到响应拦截器里面
    //  这边不需要try catch也可以
    const res = await login(data)
    // 存token
    context.commit('setToken', res)
    // 存token之后 做持久化
    setToken(res)
    // 存时间戳 设置2小时后失效
    setTime(Date.now())
  },
  // 请求用户信息 在layout或者permission里里拿数据
  async getInfo (context) {
    // 用户基本信息
    const res = await getInfo()
    // 用户信息（头像）
    const res1 = await getUserDetailById(res.userId)
    // 合并用户信息
    context.commit('setUserInfo', { ...res, ...res1 })
  },
  // 退出登录
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

