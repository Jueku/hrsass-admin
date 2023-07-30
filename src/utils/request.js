import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  // baseURL:基地址，接口中公有的地址配到baseURL
  // 请求接口时：会把api中配置的url和baseURL拼接到一起 去请求，除非 你传过来的是一个绝对的URL地址
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + api url
  // withCredentials: true, // send cookies when cross-domain requests
  // 超时时间，超过5s 默认这次请求 失败
  timeout: 5000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 1.先取token
  const token = store.getters.token
  if (token) {
    // 有token的时候 再往请求头加
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  // 状态为 2xx 就会执行 第一个回调函数
  // console.log(response)
  if (!response.data.success) {
    // 统一提示
    Message.error(response.data.message)
    return Promise.reject(new Error(response.data.message))
  }
  return response.data
}, function(error) {
  // 对响应错误做点什么
  // 状态码为非2xx 进行统一提示
  // console.dir(error)
  if (error.response) {
    if (error.response.status === 401 && error.response.data.code === 10002) {
      // token过期
      store.commit('user/logOut')
      router.push('/login')
    }
    Message.error(error.response.data.message)
  }
  return Promise.reject(error)
})

export default service
