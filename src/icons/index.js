import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 注册全局组件 <svg-icon></svg-icon>
Vue.component('svg-icon', SvgIcon)

// webpack提供的语法 （了解）
// require.context 读取某个文件夹下的文件
// 1. 要读取的文件夹的路径
// 2. 是否读取该文件夹下的子文件夹
// 3. 读取哪些类型的文件
// 作用：读取svg文件夹中 所有.svg结尾的文件
const req = require.context('./svg', false, /\.svg$/)

// 批量导入的 .svg图标
// 这个写法就是下面挨个导入的一个简写
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// 挨个导入
// import dashboard from '@/icons/svg/dashboard'
// import example from '@/icons/svg/example'
// import eyeOpen from '@/icons/svg/eye-oepn'
// import eye from '@/icons/svg/eye'
// ....
