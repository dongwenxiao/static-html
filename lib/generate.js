var fs = require('fs');
var stat = fs.stat;
var path = "./public/";


var generate = {
    /*
     * 复制目录中的所有文件包括子目录
     * @param{ String } 需要复制的目录
     * @param{ String } 复制到指定的目录
     */
    copy: function(src, dst) {
        // 读取目录中的所有文件/目录
        fs.readdir(src, function(err, paths) {
            if (err) {
                throw err;
            }
            paths.forEach(function(path) {
                var _src = src + '/' + path,
                    _dst = dst + '/' + path,
                    readable, writable;
                stat(_src, function(err, st) {
                    if (err) {
                        throw err;
                    }
                    // 判断是否为文件
                    if (st.isFile()) {
                        // 创建读取流
                        readable = fs.createReadStream(_src);
                        // 创建写入流
                        writable = fs.createWriteStream(_dst);
                        // 通过管道来传输流
                        readable.pipe(writable);
                    }
                    // 如果是目录则递归调用自身
                    else if (st.isDirectory()) {
                        generate.exists(_src, _dst, generate.copy);
                    }
                });
            });
        });
    },
    exists: function(src, dst, callback) {
        fs.exists(dst, function(exists) {
            // 已存在
            if (exists) {
                callback(src, dst);
            }
            // 不存在
            else {
                fs.mkdir(dst, function() {
                    callback(src, dst);
                });
            }
        });
    },
    generateFile: function(fileName, content, path, callback) {

        this.exists(path, path, function() {
            fs.writeFile(path + fileName, content, { flag: 'w' }, function(err) {
                if (err) throw err
                callback && callback();
            });
        });
    },

    clean: function(path) {

        var files = [];

        if (fs.existsSync(path)) {

            files = fs.readdirSync(path);

            files.forEach(function(file, index) {

                var curPath = path + "/" + file;

                if (fs.statSync(curPath).isDirectory()) { // recurse

                    generate.clean(curPath);

                } else { // delete file

                    fs.unlinkSync(curPath);

                }

            });

            fs.rmdirSync(path);

        }

    }
}


module.exports = generate;
