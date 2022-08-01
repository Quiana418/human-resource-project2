// 定义mixin
import store from '@/store'
export default {
  methods: {
    // 用来测试的
    fn () {
      console.log(555)
    },
    // 定义混入 用来做按钮的权限控制（添加）
    checkPermission (point) {
      if (store.getters.points) {
        return !store.getters.points.includes(point)
      }
    }

  }
}
