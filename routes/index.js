var express = require('express');
var router = express.Router();
var generate = require('../lib/generate');
var generate_path = "./generate/";

var views = [
    'index',
    'login',
    'register'
];

/* GET pages. */
router
    .get('/', function(req, res, next) {
        res.render('index');
    });

views.forEach(function(view, i) {
    (function(view) {
        router.get("/" + view, function(req, res) {
            res.render(view);
        });
    })(view);
});

/*工具 -----------------------------------------*/
router
    // 生成html
    .get('/generate', function(req, res) {
        var finishCount = 0;
        views.forEach(function(view, i) {
            res.render(view, function(err, html) {
                generate.generateFile(view + '.html', html, generate_path, function() {
                    finishCount++;
                    if (finishCount == views.length) {
                        res.send('generate html done! path: ' + generate_path);
                    }
                });
            });
        });
        // copy 静态资源
        generate.exists('./public/', generate_path, generate.copy);
    })
    // 清空
    .get('/clean', function(req, res) {
        generate.clean(generate_path, function() {});
        res.send('clean done!');
    });

module.exports = router;
