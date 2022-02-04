const sharp = require('sharp'),
    path = require('path')
fs = require('fs')

module.exports = async (req, res, next) => {
    if (req.file) {
        const fieldName = req.file.fieldname
        console.log("TEST DU FIELDNAME", fieldName);
        let pathSharp

        switch (fieldName) {
            case 'avatar':
                pathSharp = "/upload/users"
                width = 200
                height = 200
                console.log(req.file);
                break;
            case 'image':
                pathSharp = "/upload/articles"
                width = 500
                height = 900
                break;
        }
        await sharp(req.file.path)
            .resize({
                height: height,
                width: width
            })
            .toFormat('webp'), (err, info) => {
                console.log(info);
            }
        next()
    }
}