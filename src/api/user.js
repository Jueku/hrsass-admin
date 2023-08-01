import request from '@/utils/request'
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}
export function getInfo(token) {

}

export function logout() {

}
