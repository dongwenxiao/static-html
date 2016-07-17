/*
 * @Author: victor
 * @Date:   2016-07-16 17:50:31
 * @Last Modified by:   victor
 * @Last Modified time: 2016-07-17 10:13:57
 */

var express = require('express');
var router = express.Router();
var generate = require('../lib/generate');

//
var GENERATE_PATH = "./generate/";

//
var pagesConfig = require('../config/config-pages');
var views = pagesConfig;


/* GET pages. */

router
    .get('/', function(req, res, next) {
        res.render('index');
    });

views.forEach(function(view, i) {
    var page = view.page;
    var data = view.data;
    (function(view) {
        router.get("/" + page + ".html", function(req, res) {
            res.render(page, data);
        });
    })(page);
});

/*工具 -----------------------------------------*/
/*router
// 生成html
    .get('/generate', function(req, res) {
        var finishCount = 0;
        views.forEach(function(view, i) {
            res.render(view, function(err, html) {
                generate.generateFile(view + '.html', html, GENERATE_PATH, function() {
                    finishCount++;
                    if (finishCount == views.length) {
                        res.send('generate html done! path: ' + GENERATE_PATH);
                    }
                });
            });
        });
        generate.exists('./public/', GENERATE_PATH, generate.copy);
    })
    // 清理html
    .get('/clean', function(req, res) {
        generate.clean(GENERATE_PATH, function() {});
        res.send('clean done!');
    });*/

module.exports = router;
