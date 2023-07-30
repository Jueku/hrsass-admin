import request from '@/utils/request'

/**
 * 登录接口
 * @param {*} loginForm 参数
 * @returns
 */
export const loginApi = (loginForm) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: loginForm
  })
}

/**
 * 获取用户信息
 * @returns
 */
export const getUserProfileApi = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取用户信息（含头像）
 * @param {*} id
 * @returns
 */
export const getUserAvatarApi = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
