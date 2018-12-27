'use strict';

const fs = require('fs');
const path = require('path');
const UglifyJS = require("uglify-js");

var dirname = './public/scripts/app';
var filePath = dirname + '/minify.js';


if (fs.existsSync(dirname) && !fs.existsSync(filePath)) {

    fs.readdir(dirname, function (err, filenames) {


        if (err) {
            global.console.log(err)
        }

        filenames.forEach(function (filename) {

            var ext = path.extname(filename.toString());

            // only supports .js for JS minification
            if (ext === '.js') {

                fs.readFile(dirname + '/' + filename, 'utf-8', function (err, content) {

                    if (err) {
                        global.console.log(err)
                    }

                    // advance UglifyJS configuration
                    var result = UglifyJS.minify(content, {
                        parse: {},
                        compress: true,
                        mangle: true,
                        output: {
                            ast: true,
                            code: true // optional - faster if false
                        },
                        ie8: true,
                        keep_fnames: true
                    });

                    // global.console.log(result.error); // runtime error, or `undefined` if no error
                    // global.console.log(result.code); // minified output: function add(n,d){return n+d}

                    // Async variant
                    // fs.writeFile('final.js', result.code, {
                    //     flag: "a"
                    // }, (err) => {
                    //     if (err) {
                    //         global.console.log(err)
                    //     }
                    //     global.console.log('The file has been saved!');
                    // });

                    // Sync variant                   
                    return fs.writeFileSync(filePath, result.code, {
                        flag: "a" // Open file for appending. The file is created if it does not exist.
                    });

                });

            }

            // handle otherwise
            else {

                fs.unlink(dirname + '/' + filename, (err) => {
                    if (err) throw err;
                    global.console.log(filename, 'was skipped and trashed!');
                });

            }

        });

        console.log('Minified JS has been created successfully!');

    });

}

if (fs.existsSync(filePath)) {
    global.console.log('File already exists!');
}

if (!fs.existsSync(dirname)) {
    global.console.log('Unable to find public folder! Please make sure it exits.');
}