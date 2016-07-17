/*
* @Author: cs_victor
* @Date:   2016-07-16 17:50:31
* @Last Modified by:   cs_victor
* @Last Modified time: 2016-07-17 13:37:55
*/
/**
 * 配置要生成和压缩的页面
 * 如果页面全名是  xxx.html	  ,yyy.html
 * 则			   page:xxx   ,page:yyy
 * 后面的data是给page页面提供数据用的
 * data:{ title: 'index' }   在ejs模板里直接   <%= title %>
 */
module.exports = [
    { page: 'index', data: { title: 'index' } },
    { page: 'login', data: { title: 'login' } },
    { page: '404', data: { title: '404' } },
    { page: 'admin/dashboard', data: { title: 'admin/dashboard' } },
    { page: 'admin/report', data: { title: 'admin/report' } },
    { page: 'activity/first', data: { title: 'activity/first' } },
    { page: 'activity/second', data: { title: 'activity/second' } }
];
