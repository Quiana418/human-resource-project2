// 封装插件
import PageToolBar from './PageToolBar'
import Pagination from './Pagination'
import UploadImage from './UploadImage/index.vue'
import FullScreen from './FullScreen/index.vue'
// 导入顶部页签
import TagsView from '@/components/TagsView'

export default {
  /* Vue插件的写法
  1.定义一个插件插件就是一个普通的对象，只不过这个对象有一个固定的方法，名字叫install参数就是Vue
  2.使用一个插件Vue.use(插件名字)使用的时候会自动执行install方法
  3.插件：VueRouter element-ui Vuex
  */
  install (Vue) {
    // 封装全局的PageToolBar 页面顶部工具条
    Vue.component('PageToolBar', PageToolBar)
    Vue.component('UploadImage', UploadImage)
    Vue.component('FullScreen', FullScreen)
    Vue.component('TagsView', TagsView)
    Vue.component('Pagination', Pagination)
    // Vue.filter
    // Vue.directive
    // Vue.prototype.eat = function () {}
  }
}
