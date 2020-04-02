module.exports = {

    render: function (view, req, res, locals = {}) {
        res.render(view, locals, function (err, html) {
            delete req.session.notification;
            delete req.session.notificationtype;
            res.send(html);
        });
    },

    getRefference: function (model, callback) {
        model.getAll(function (error, rows, fields) {
            if (error) {
                callback(error);
            } else {
                //console.log(rows);
                callback(null, rows);
            }
        });
    },

    getUploadStorage: function (multer,path) {
        return multer.diskStorage({
            destination: path.join(__dirname + './../public/img/'),
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() +
                    path.extname(file.originalname));
            }
        });
    },

    getFileFilter : function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(pdf|PDF|jpg|JPG|jpeg|JPEG|PNG|png)$/)) {
            req.fileValidationError = 'Only pdf,png and jpg files are allowed!';
            return cb(new Error('Only pdf, png and jpg  files are allowed!'), false);
        }
        cb(null, true);
    },



}