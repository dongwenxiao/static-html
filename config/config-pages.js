/**
 * 配置要生成和压缩的页面
 * 如果页面全名是  xxx.html,yyy.html
 * 则			   ['xxx','yyy']
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
