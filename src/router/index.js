import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 动态路由
export const asyncRoutes = [
  {
    path: '/approvals',
    component: Layout,
    children: [{
      path: '',
      name: 'Approvals',
      component: () => import('@/views/approvals/index'),
      meta: { title: '审批', icon: 'tree-table' }
    }]
  },
  {
    path: '/attendances',
    component: Layout,
    children: [{
      path: '',
      name: 'Attendances',
      component: () => import('@/views/attendances/index'),
      meta: { title: '考勤', icon: 'skill' }
    }]
  },
  {
    path: '/departments',
    component: Layout,
    children: [{
      path: '',
      name: 'Departments',
      component: () => import('@/views/departments/index'),
      meta: { title: '组织架构', icon: 'tree' }
    }]
  },
  {
    path: '/employees',
    component: Layout,
    children: [{
      path: '',
      name: 'Employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    }]
  },

  {
    path: '/permission',
    component: Layout,
    children: [{
      path: '',
      name: 'Permission',
      component: () => import('@/views/permission/index'),
      meta: { title: '权限管理', icon: 'lock' }
    }]
  },
  {
    path: '/salarys',
    component: Layout,
    children: [{
      path: '',
      name: 'Salarys',
      component: () => import('@/views/salarys/index'),
      meta: { title: '工资', icon: 'money' }
    }]
  },
  {
    path: '/setting',
    component: Layout,
    children: [{
      path: '',
      name: 'Setting',
      component: () => import('@/views/setting/index'),
      meta: { title: '设置', icon: 'setting' }
    }]
  },
  {
    path: '/social',
    component: Layout,
    children: [{
      path: '',
      name: 'Social',
      component: () => import('@/views/social/index'),
      meta: { title: '社保', icon: 'table' }
    }]
  },
  {
    path: '/import',
    hidden: true,
    component: Layout,
    children: [{
      path: '',
      name: 'Import',
      component: () => import('@/views/import/index')
    }]
  },
  {
    path: '/employee/detail/:id',
    hidden: true,
    component: Layout,
    children: [{
      path: '',
      name: 'EmployeeDetail',
      component: () => import('@/views/employees/detail'),
      props: true
    }]

  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 静态页面和动态页面（根据权限展示不同页面）合并
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
