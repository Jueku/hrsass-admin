import Vue from 'vue'
// 类似reset.css  重置样式
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 导入element-ui 组件
import ElementUI from 'element-ui'
// 导入element-ui 对应的样式
import 'element-ui/lib/theme-chalk/index.css'
// element-ui的语言包 目的:做多语言切换
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 导入style中的样式
import '@/styles/index.scss' // global css
// 导入根组件
import App from './App'
// 导入vuex
import store from './store'
// 导入路由对象
import router from './router'

// 要执行 icons目录下的index.js
import '@/icons' // icon
// 要执行permission 这个文件
import '@/permission' // permission control
import request from '@/utils/request'
import plugin from '@/components/index'
import i18n from '@/lang'

// 目标：this.$request 在Vue的原型对象上（原型对象上的属性和方法可以被实例所访问）
Vue.prototype.$request = request

// Vue.use在使用插件的时候
// 1.如果插件是个对象，会直接调用插件内的install方法
// 2.如果插件是一个函数，Vue.use 会直接调用这个函数
Vue.use(plugin)
// 注册element-ui中的全局组件
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
import * as directives from '@/directive'
// for (const key in directives) {
//   Vue.directive(key, directives[key])
// }
// ['imgError']
Object.keys(directives).forEach((item) => {
  Vue.directive(item, directives[item])
})

Vue.config.productionTip = false
// 获取环境变量的值 固定语法 process.env.环境变量的名字
// console.log(process.env)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
