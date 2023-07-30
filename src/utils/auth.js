import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  // localStorage.getItem(key)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // localStorage.setItem(key,value)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // localStorage.removeItem(key)
  return Cookies.remove(TokenKey)
}
