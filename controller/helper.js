module.exports = {

    render: function (view, req, res, locals = {}) {
        res.render(view, locals, function (err, html) {
            delete req.session.notification;
            delete req.session.notificationtype;
            res.send(html);
        });
    },

    getRefference:  (model, callback) => {
        model.getAll(function (error, rows, fields) {
            if (error) {
                callback(error);
            } else {
                //console.log(rows);
                callback(null, rows);
            }
        });
    },

    getUploadStorage: (multer,path) => {
        return multer.diskStorage({
            destination: path.join(__dirname + './../public/img/'),
            filename: function (req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now() +
                    path.extname(file.originalname));
            }
        });
    },

    getFileFilter : (req, file, callback) => {
        // Accept images only
        if (!file.originalname.match(/\.(pdf|PDF|jpg|JPG|jpeg|JPEG|PNG|png)$/)) {
            req.fileValidationError = 'Only pdf,png and jpg files are allowed!';
            return callback(new Error('Only pdf, png and jpg  files are allowed!'), false);
        }
        callback(null, true);
    },

    multerValidate : (req,multer,err) => {
        let valid = true;
        if (req.fileValidationError) {
            valid=!valid;
        }
        else if (!req.file) {
            valid=!valid;
        }
        else if (err instanceof multer.MulterError) {
            valid=!valid;
        }
        else if (err) {
            valid=!valid;
        } 
        return valid;
    },



}