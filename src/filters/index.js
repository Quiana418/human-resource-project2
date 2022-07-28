// 处理时间的过滤器
import dayjs from 'dayjs'
// Vue.filter('formatTime', function (time) {
//   return dayjs(time).format('YYYY-MM-DD')
// })

// 按需导出
export const formatTime = function (time) {
  return dayjs(time).format('YYYY-MM-DD')
}
