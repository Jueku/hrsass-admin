import { loginApi, getUserProfileApi, getUserAvatarApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken() || '',
  userInfo: {}
}

const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  logOut(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}

// vuex中存数据 取数据 （在vuex中 不适合写业务逻辑相关的代码）
// if (res.data.success) {
//   router.push('/')
// } else {
//   alert('用户名密码错误')
// }
const actions = {
  async login(store, data) {
    const res = await loginApi(data)
    store.commit('setToken', res.data)
    return res
  },
  async getUserInfo(store) {
    const res = await getUserProfileApi()
    const res2 = await getUserAvatarApi(res.data.userId)
    const result = {
      ...res.data,
      ...res2.data
    }
    store.commit('setUserInfo', result)
    return result
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
