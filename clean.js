var generate = require('./lib/generate');
var GENERATE_PATH = require('./config/generate-config');

generate.clean(GENERATE_PATH, function() {});

console.log('Clean static finish. path:' + GENERATE_PATH);
