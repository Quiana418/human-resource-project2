const getters = {
  // getters就是让获取数据更简单
  // 属性名：state=>state.模块名.属性名
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  avatar: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  routes: state => state.permission.routes,
  points: state => state.user.userInfo.roles.points,
  userInfo: state => state.user.userInfo

}
export default getters
