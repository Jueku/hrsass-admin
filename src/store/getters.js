// $store.getters.sidebar
// $store.getters['app/sidebar']
// 目的：快捷访问
const getters = {
  // sidebar: state => state.app.sidebar,
  // sidebar: function(state) {
  //   return state.app.sidebar
  // },
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // store.getters.token
  // token(state) {
  //   return state.user.token
  // }
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  // $store.getters.staffPhoto
  staffPhoto: state => state.user.userInfo.staffPhoto,
  routes: state => state.routes.routes,
  roles: state => state.user.userInfo.roles,
  userInfo: state => state.user.userInfo
}
export default getters
