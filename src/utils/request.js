import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTime } from '@/utils/auth'

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么----注入token
  const token = store.getters.token
  if (token) {
    // 判断时间是否大于两小时 如果超过两小时 退出  主动介入
    const time = Date.now() - getTime()
    if (time > 7200000) {
      store.dispatch('user/logout')
      router.push('/login')
    }
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 把请求回来的数据解构出来
  const { data, success, message } = response.data
  if (success) {
    // 如果登录成功 那么响应数据
    return data
  } else {
    // 如果密码货账号错误 登录失败提示信息
    Message.error(message)
    // 否则到catch里捕获错误
    return Promise.reject(new Error(message))
  }
}, function (error) {
  // 判断token是否超时 被动处理
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default request
