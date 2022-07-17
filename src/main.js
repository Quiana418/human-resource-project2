import Vue from 'vue'

// 让样式在不同浏览器保持一致性
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 全局样式
import '@/styles/index.scss' // global css
// 全局自定义指令
// import '@/directives'
import * as obj from '@/directives' // 把自定义指令导出到一个obj对象里
// Object.keys(obj) 把自定义指令的属性名提取到一个数组里['imgerror','']
Object.keys(obj).forEach(item => {
  // item==自定义属性名   obj[item]====属性值对象
  Vue.directive(item, obj[item])
})

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon svg图标
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/* if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
} */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
