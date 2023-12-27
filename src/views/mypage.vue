<template>
  <div>

    <!-- name为应用名称，全局唯一，url为子项目地址地址   baseroute去除多余的路由  比如当前是/sui/my-page  设置baseroute='/sui'  子项目就会跳转路由为/my-page的页面 -->
    <micro-app name='sha' url='http://10.10.10.222:8081/' baseroute='/sui'
      @datachange='(e) => handleDataChange(e)' :data="danL"></micro-app>
  </div>
</template>
<script>
import microApp from '@micro-zoe/micro-app'
export default {
  data() {

    return {
      nameA: 'suixinfei',
      danL: {
        // 传过去的是子组件实际需要的  不需要的就不传了
        name:'傻芬芬来喽',
        desc:'描述的信息'
      }
    }
  },
  methods: {
    // 接收到子组件传递的数据
    handleDataChange(e) {
      this.danL.desc = e.detail.data.type;
      this.danL = { ...this.danL }
      // 设置全局数据  可以在主应用和子应用都可以监听
      microApp.setGlobalData({ type: '全局数据' })
    }
  },


  mounted() {
   
    // 和上面 :data 的应用是一样的  这是传数据的两种方法  第一个参数是name 代表哪一个子项目
    setTimeout(() => {
      microApp.setData('sha', { type: '新的数据' })
      console.log("如果以后")

    }, 3000);

    //  microApp.getGlobalData() 获取全局数据

    // 监听下全局的数据变化
    microApp.addGlobalDataListener((globalData) => {
      console.log(globalData);
      console.log('芬芬好傻')
    })
  }
}
</script>
