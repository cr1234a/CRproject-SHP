import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import store from '@/store'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 常量路由，所有登录者都可以看见的页面
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
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

]

// 异步路由，指定者才可以看见的页面
export const asyncRoute = [{
  path: 'acl',
  component: Layout,
  // redirect: '/acl/user/list',
  name: 'Acl',
  meta: {
    title: '权限管理',
    icon: 'el-icon-lock'
  },
  children: [{
    path: '/user',
    name: 'User',
    component: () => import('@/views/acl/user'),
    meta: {
      title: '用户管理',
    }
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import('@/views/acl/role'),
    meta: {
      title: '角色管理',
    }
  },
  {
    name: 'RoleAuth',
    path: 'role/auth/:id',
    activeMenu: '/acl/role',
    component: () => import('@/views/acl/role/roleAuth'),
    meta: {
      activeMenu: '/acl/role',
      title: '角色授权',
    },
    hidden: true,
  },
  {
    path: '/permission',
    name: 'Permission',
    component: () => import('@/views/acl/permission/index.vue'),
    meta: {
      title: '菜单管理',
    }
  }]
},
{
  path: '/product',
  component: Layout,
  name: 'Product',
  redirect: '/product',
  meta: { title: '商品管理', icon: 'el-icon-goods' },
  children: [
    {
      path: 'trademark',
      name: 'TradeMark',
      component: () => import('@/views/product/tradeMark'),
      meta: { title: '品牌管理' }
    },
    {
      path: 'attr',
      name: 'Attr',
      component: () => import('@/views/product/Attr'),
      meta: { title: '平台属性管理' }
    },
    {
      path: 'spu',
      name: 'Spu',
      component: () => import('@/views/product/Spu'),
      meta: { title: 'Spu管理' }
    },
    {
      path: 'sku',
      name: 'Sku',
      component: () => import('@/views/product/Sku'),
      meta: { title: 'Sku管理' }
    },
  ]
},
{
  path: '/text',
  component: Layout,
  name: 'Text',
  redirect: '/text',
  meta: { title: '测试管理', icon: 'el-icon-eleme' },
  children: [
    {
      path: 'text1',
      name: 'Text1',
      component: () => import('@/views/Text/text1'),
      meta: { title: '测试管理1' }
    },
    {
      path: 'text2',
      name: 'Text2',
      component: () => import('@/views/Text/text2'),
      meta: { title: '测试管理2' }
    },
  ]
}
]

// 任意路由，无论怎样都会跳转的路由
export const anyRoute = { path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
// let oneRun = true; //通过oneRun变量控制 避免陷入死循环
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// router.beforeEach((to, from, next) => {

//   // if (router.app.$options.store.state.user.Aroutes.length==0) {
//   //   console.log(11)
//   // } else {
//   //   next()
//   // }
//   router.app.$options.store.dispatch('user/getInfo')
//   setTimeout(() => {
//     console.log(11)
//     // next()
//   }, 5000)
// })
export default router


