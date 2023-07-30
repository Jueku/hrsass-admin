// import Vue from 'vue'
import store from '@/store'

// 第一种写法
// Vue.directive('imgError', {
//   // 使用该指令的DOM元素，插入到页面中会执行inserted
//   // el:使用该指令的DOM元
//   // binding：是使用指令时传过来的数据(binding.value)
//   inserted(el, binding) {
//     // console.log(el)
//     // console.log(binding)
//     el.onerror = () => {
//       el.src = binding.value
//     }
//   }
// })

// 第二种写法
export const imgError = {
  // 使用该指令的DOM元素，插入到页面中会执行inserted
  // el:使用该指令的DOM元
  // binding：是使用指令时传过来的数据(binding.value)
  inserted(el, binding) {
    // console.log(el)
    // console.log(binding)
    el.onerror = () => {
      el.src = binding.value
    }
  }
}

export const permission = {
  inserted(el, binding) {
    // 1.先获取用户对应的权限标识
    const roles = store.getters.roles
    // 2.按钮所对应的权限标识 binding.value
    if (!roles?.points.includes(binding.value)) {
      // el.style.display = 'none'
      el.remove()
    }
  }
}
