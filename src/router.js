import Vue from 'vue'
import Router from 'vue-router'
import Layout from './Layout'
Vue.use(Router)

export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: 'index',
        component: () => import('@/views/index.vue'),
        name: '首页',
        hidden: true,
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      },
    ],
  },
  {
    path: "/login",
    component: (resolve) => require(["@/views/login"], resolve),
    hidden: true,
  },
  {
    path: '/sui/my-page',
    component: () => import('@/views/mypage'),
  },
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = []

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}


export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  base:  '/',
})
