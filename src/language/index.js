import Vue from 'vue'
import zh from './zh'
import en from './en'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 导入i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 准备翻译的语言环境信息
const messages = {
  en: {
    message: {

      // 这个只是测试，语言翻译已经提取成单独的zh和en.js文件了
      calendar: 'calendar'
      // element组件的国际化
    },
    // 我们自己的国际化
    ...en,
    ...enLocale
  },
  zh: {
    message: {

      calendar: '日历'
    },
    ...zh,
    ...zhLocale
  }
}
// 引入cookie做语言持久化
import Cookies from 'js-cookie'
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Cookies.get('locale'),
  // locale: 'en', // 设置地区 不能固定
  messages, // 设置地区信息
  silentTranslationWarn: true
})
export default i18n
