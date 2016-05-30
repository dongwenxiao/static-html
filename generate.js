/**
 * 生成静态资源的方法（命令行使用）
 * @type {[type]}
 */
var generate = require('./lib/generate');
var ejs = require('ejs');

var GENERATE_PATH = require('./config/generate-config');
var pagesConfig = require('./config/config-pages');

function generateFile(views) {
    var finishCount = 0;
    views.forEach(function(view, i) {
        ejs.renderFile('./views/' + view + '.ejs', function(err, html) {

            if (err) {
                console.log('generate html fail. error:' + err);
            }

            generate.generateFile(view + '.html', html, GENERATE_PATH, function() {
                finishCount++;
                if (finishCount == views.length) {
                    console.log('Generate html done! path: ' + GENERATE_PATH);
                }
            });
        });
    });
    generate.exists('./public/', GENERATE_PATH, generate.copy);
}

generateFile(pagesConfig);
