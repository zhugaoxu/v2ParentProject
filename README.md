# 注意事项
1. 主项目安装好 @micro-zoe/micro-app 之后需要在main.js引用下 import microApp from '@micro-zoe/micro-app' 
并且执行microApp.start();
2. 在使用micro-app组件时候  需要设置唯一name 主项目可以根据这个name操作这个子项目
3. 组件的url参数为子项目地址 
4. baseroute去除多余的路由  比如当前是/sui/my-page  设置baseroute='/sui'
5. 主项目和子项目之间的通信 核心原理是监听 监听传输当前项目数据和监听全局数据  除此之外 主项目也可传输子项目数据和方法 
（和常规vue父子通信一样）
6. 子项目的vue.config.js需要设置下 headers: {'Access-Control-Allow-Origin': '*'} 和proxy代理同级  允许访问