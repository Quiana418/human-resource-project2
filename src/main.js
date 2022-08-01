import Vue from 'vue'

// 让样式在不同浏览器保持一致性
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

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

// 打印
import Print from 'vue-print-nb'
// Global instruction
Vue.use(Print)

/* 批量导入全局过滤器 处理时间  filters是一个对象
把过滤器名作为属性名
过滤器函数作为值 */
import * as filters from '@/filters'
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon svg图标
import '@/permission' // permission control
import i18n from '@/language'
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
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 导入全局封装的插件
import components from './components'
// .use会自动执行install里面的方法
Vue.use(components)

// 导入mixin
import mixins from '@/mixin'
Vue.mixin(mixins)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
