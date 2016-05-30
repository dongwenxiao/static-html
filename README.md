# 纯静态HTML开发框架[static-html]

> 说明，
> 此项目适用于开发纯静态HTML+CSS+JS 项目。
> 例如：网站项目初期，前端提供给服务端开发的静态文件；不需要SEO的项目，管理后台项目。



### Feature

 - HTML 碎片化开发模式(利用EJS模版减少编写重复HTML)
 - html、css、js代码均有清晰的结构(根据我的经验进行拆分多个文件，在打包时候轻松合并)
 - css、js 的引用地址会在打包时候自动加上版本号(```<link rel=stylesheet href="assets/css/lib.min.css?v=59bbc2f39c">```)


### Start

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
open file : /routes/index.js
```js
// the cols value is page_name ,and matched with files in /views/[page_name.ejs]
var views = [
    'index',
    'login',
    'register'
];

```


### Usage

1.启动开发模式(运行起Express Web服务)
```sh
npm start
```
2.生成静态化文件(把HTML片段拼接成生成完整HTML并Copy相关静态文件)

默认生成到 /generate 文件夹
```sh
npm run static
```
3.打包(根据页面里的usemin配置，执行gulp打包相关任务：合并、压缩、更新引用)

默认生成到： /dist 文件夹
```sh
npm run usemin
```
