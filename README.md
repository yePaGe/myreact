# myreact
# 小demo开发过程笔记
1. 执行'cnpm run start'后，无其他报错，只提示cannot get /，问题原因是："start": "webpack-dev-server --hot --inline --colors --content-base ./build", 多了'./build'，并不存在此文件夹。
2. vue是通过new一个vue对象来启动框架的，但是react是以reactDom.render()启动的，即代表react并没有一个全局对象，所以无法利用全局对象的prototype定义一个全局方法，解决方法：将需要全局使用的方法定义为window的属性，该方法便可全局调用。
3. 跨域请求代理的target不可缺少协议部分。
4. csrf token.
5. 注意配置插件的文件plugin.js的写法