import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router'

import router from './router'
import microApp from '@micro-zoe/micro-app'

// 先把当前的路由挂载起来  通过addRouter

Vue.use(Router)

Vue.use(Element, {
  size: 'mini', // set element-ui default size
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
microApp.start();
