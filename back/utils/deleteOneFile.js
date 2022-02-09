const fs = require('fs')
const path = require('path')

exports.deleteOneFile = (dir, file) => {
    fs.unlink(path.join(dir, file), (err) => {
        if (err) console.log(err);
        else console.log('delete OK', file)
    });
}