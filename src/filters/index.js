// 处理时间的过滤器
import dayjs from 'dayjs'
// Vue.filter('formatTime', function (time) {
//   return dayjs(time).format('YYYY-MM-DD')
// })

// 按需导出 在这里全部导出，在main.js里统一引入 使用的时候不需要引入了
export const formatTime = function (time) {
  return dayjs(time).format('YYYY-MM-DD')
}
