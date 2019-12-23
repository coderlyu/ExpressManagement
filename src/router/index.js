import Vue from 'vue'
import VueRouter from 'vue-router'
import userLayout from '@/views/user/layout'
import adminLayout from '@/views/admin/layout'
import store from '@/store'

// console.log(store.getters.roles === 'user')
Vue.use(VueRouter)

export const userRoutes = [
  {
    path: '/401',
    component: () => import('@/views/errorpage/401'),
    meta: { title: '401' }
  },
  {
    path: '/404',
    component: () => import('@/views/errorpage/404'),
    meta: { title: '404' }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: userLayout,
    children: [
      {
        path: '',
        name: 'userhome',
        component: () => import('@/views/user/home'),
        meta: { title: '主页' }
      },
      {
        path: 'takeparts',
        name: 'takeparts',
        component: () => import('@/views/user/takeparts'),
        meta: { title: '取包裹' }
      },
      {
        path: 'mailing',
        name: 'mailing',
        component: () => import('@/views/user/mailing'),
        meta: { title: '寄包裹' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录注册' }
  },
  {
    path: '/user', // 用户
    component: userLayout,
    children: [
      {
        path: '',
        name: 'user',
        component: () => import('@/views/user/profile'),
        meta: { title: '个人信息' }
      }
    ]
  },
  {
    path: '/setting',
    component: userLayout,
    children: [
      {
        path: '',
        name: 'setting',
        component: () => import('@/views/user/setting'),
        meta: { title: '个人设置' }
      }
    ]
  },
  {
    path: '/nearby',
    component: userLayout,
    children: [
      {
        path: '',
        name: 'nearby',
        component: () => import('@/views/user/nearby'),
        meta: { title: '个人设置' }
      }
    ]
  },
  { path: '*', redirect: '/404' }
]
export const adminRoutes = [
  {
    path: '/401',
    component: () => import('@/views/errorpage/401'),
    meta: { title: '401' }
  },
  {
    path: '/404',
    component: () => import('@/views/errorpage/404'),
    meta: { title: '404' }
  },
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin', // 管理员
    component: adminLayout,
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('@/views/admin/home'),
        meta: { title: '后台管理主页' }
      },
      {
        path: 'studentList',
        name: 'studentList',
        component: () => import('@/views/admin/manage/studentList'),
        meta: { title: '用户列表' }
      },
      {
        path: 'adminList',
        name: 'adminList',
        component: () => import('@/views/admin/manage/adminList'),
        meta: { title: '管理员列表' }
      },
      {
        path: 'packageList',
        name: 'packageList',
        component: () => import('@/views/admin/manage/packageList'),
        meta: { title: '包裹列表' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录注册' }
  },
  { path: '*', redirect: '/404' }
]

const createRouter = (roles) => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: roles === 1 ? userRoutes : adminRoutes // 1为用户，2为管理员
})

const router = createRouter(store.state.user.roles)

export function resetRouter () {
  console.log(store.state.user.roles)
  const newRouter = createRouter(store.state.user.roles)
  router.matcher = newRouter.matcher
}

export default router
