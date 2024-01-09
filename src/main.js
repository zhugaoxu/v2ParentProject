import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router'

import router from './router'
import microApp from '@micro-zoe/micro-app'
import store from './store'
import './permiss'
import '@/assets/styles/index.scss'
import zhudafen from 'zhudafen';
import 'zhudafen/lib/theme-chalk/index.css';
import AddDialog from '@/components/addDialog'
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETable from 'vxe-table'
import './assets/icons' // icon
// 先把当前的路由挂载起来  通过addRouter

Vue.use(Router)
Vue.use(zhudafen);
Vue.component("AddDialog", AddDialog);

VXETable.use(VXETablePluginElement)


Vue.use(Element, {
  size: 'mini', // set element-ui default size
})
Vue.use(VXETable)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
microApp.start();
