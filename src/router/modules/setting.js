import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'settings',
      component: () => import('@/views/setting/index'),
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
