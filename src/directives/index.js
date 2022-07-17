/* import Vue from 'vue'
// 全局自定义指令 图片加载失败时 调用
Vue.directive('imgerror', {
  // 指令所在的标签插入dom树时就执行
  inserted (el) {
    el.src = 'http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'
  },
  // 数据更新时就执行
  update (el) {
    el.src = 'http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'
  }
}) */

// 改写版
export const imgerror = {
  update (el, binding) {
    // el.src = binding.value
    el.onerror = function () {
      el.src = 'http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'
    }
  }
}
