// 下边这行代码就声明了一个Vue中插件
import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import ScreenFull from '@/components/ScreenFull'
import Lang from '@/components/Lang'
// export default {
//   // install方法中有一个形参，形参就是Vue构造函数
//   // 插件的强大支出：关于在Vue构造函数中的操作 都可以在install方法中实现
//   // Vue.component  Vue.prototype Vue.directive
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }

// 如果插件是一个函数，函数的形参中就可以接受Vue构造函数
export default function(Vue) {
  Vue.component('PageTools', PageTools)
  Vue.component('UploadExcel', UploadExcel)
  Vue.component('ImageUpload', ImageUpload)
  Vue.component('ScreenFull', ScreenFull)
  Vue.component('Lang', Lang)
}
