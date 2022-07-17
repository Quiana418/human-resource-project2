// 用cookie做持久化
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// 取token
export function getToken () {
  return Cookies.get(TokenKey)
}

// 存token
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

// 移除token
export function removeToken () {
  return Cookies.remove(TokenKey)
}

const TimeKey = 'hr_time_key'
// 存时间戳
export function setTime (time) {
  return Cookies.set(TimeKey, time)
}

// 取时间戳
export function getTime () {
  return Cookies.get(TimeKey)
}
