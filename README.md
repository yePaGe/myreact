# myreact
# 小demo开发过程笔记
1. 执行'cnpm run start'后，无其他报错，只提示cannot get /，问题原因是："start": "webpack-dev-server --hot --inline --colors --content-base ./build", 多了'./build'，并不存在此文件夹。
2. vue是通过new一个vue对象来启动框架的，但是react是以reactDom.render()启动的，即代表react并没有一个全局对象，所以无法利用全局对象的prototype定义一个全局方法，解决方法：将需要全局使用的方法定义为window的属性，该方法便可全局调用。
3. 跨域请求代理的target不可缺少协议部分。
4. csrf token.
5. 注意配置插件的文件plugin.js的写法.
6. 当对数据表写入数据时，会自动生成相应的表。
7. controller和service分开写，避免回调函数的嵌套使用。
8. 用户信息列表的密码应加密后再存入数据表中。
9. 服务端中公用方法可以写application.js中，用this.app.方法名()调用
10. 'true' != true
11. 多个不同变量判断注意解耦以及逻辑顺序
12. 利用服务端的中间件，对指定请求url进行token验证，防范跨站点请求伪造，crsf攻击


# 项目启动步骤：
## 数据库
1. 启动mongod数据库 'net start MongoDB';
2. 利用node应用的进程管理器启动adminMongo并维持运行，cmd进入adminMongo此node项目文件夹，'pm2 start app.js';
3. 可以访问 'http://localhost:1234' 查看并操作数据库;

## 服务端
1. 进入server文件夹， 'cnpm run dev';

## 客户端
1. 进入myreact文件夹， 'cnpm run start';

#vscode 调试 node 配置文件内容
"version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Egg",
            "cwd": "${workspaceRoot}",
            "runtimeExecutable": "npm",
            "windows": {
                "runtimeExecutable": "npm.cmd"
            },
            "runtimeArgs": [
                "run",
                "debug"
            ],
            "console": "integratedTerminal",
            "protocol": "auto",
            "restart": true,
            "port": 9999
        }
    ]