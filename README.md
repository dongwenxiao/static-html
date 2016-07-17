# 纯静态HTML开发框架[static-html]

> 说明 - 项目目的，
> 此项目适用于开发纯静态 HTML+CSS+JS 项目，减少重复代码。
> 比方说：网站项目初期，前端同学提供给服务端同学的纯静态文件。



### Feature

 - server 本项目服务端依托于Express
 - html 碎片化开发模式(利用EJS模版减少编写重复html)
 - html、css、js代码均有清晰的结构(根据我的经验进行拆分多个文件，在打包时候轻松合并)
 - css、js 的引用地址会在打包时候自动加上版本号(```<link rel=stylesheet href="assets/css/lib.min.css?v=59bbc2f39c">```)


### Start
> 注：本项目使用了两个node工具，需要安装到全局
[node-dev](https://www.npmjs.com/package/node-dev) & [gulp](https://www.npmjs.com/package/gulp)
```
npm install -g node-dev gulp
```


1.Clone 项目代码
```sh
mkdir [project_path] && cd [project_path]
clone [git_url]
```

2.安装 NPM 依赖包
```sh
cd [project_path]
npm install
```

3.配置 HTML 文件名
打开页面配置文件 : /config/config-pages.js
```js
// page 字段对应 /views/* 
// data 字段是给页面提供的数据，
// 在页面中可以通过<%= title %>这样访问
module.exports = [
    { page: 'index', data: { title: 'index' } },
    { page: '404', data: { title: '404' } },
    { page: 'admin/dashboard', data: { title: 'admin/dashboard' } }
];
```
如果我们新增加一个页面，要对应增加 ```/views/``` 下面的 ```xx.ejs ```和```/config-pages.js``` 下面的 ```{ page: 'xx', data: { title: 'xx' } }``` 配置。


### Usage

1.启动开发模式(运行起Express Web服务)
```sh
npm start
```
监视less文件(打开less文件检测，如果less文件改变则自动编译)
```sh
npm run watch-less
```
2.生成纯静态文件(把HTML片段拼接成生成完整HTML并Copy相关静态文件)

默认生成到 /generate 文件夹 (此文件下的静态文件用于交付服务端同学套模板用)
```sh
npm run static
```
3.打包(根据页面里的usemin配置，执行gulp打包相关任务：合并、压缩、更新引用)

默认生成到： /dist 文件夹 (此文件夹下的静态文件用于发布到线上)
```sh
npm run dist
```
