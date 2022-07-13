import { login } from '@/api/user'
const state = {
  // 存token
  token: null
}
const mutations = {
  setToken (state, payload) {
    state.token = payload
  }
}
const actions = {
  // 发起登录请求
  async login (context, data) {
    try {
      const res = await login(data)
      // console.log(res)
      // 存token
      context.commit('setToken', res.data.data)
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

