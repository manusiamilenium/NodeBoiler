'use strict';

var response = require('../result');
var model = require('../model/indexkepuasan');
var uamodel = require('../model/useractivity');
exports.index = function (req, res) {
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows);
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification;
            delete req.session.notificationtype;

            res.render('indexkepuasan', { data: rows, notification: notification, nottype: nottype });

        }
    });
};
exports.createAction = function (req, res) {
    var multer = require('multer');
    var path = require('path');

    const storage = multer.diskStorage({
        destination: path.join(__dirname + './../public/img/'),
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() +
                path.extname(file.originalname));
        }
    });
    const fileFilter = function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(pdf|PDF|jpg|JPG|jpeg|JPEG|PNG|png)$/)) {
            req.fileValidationError = 'Only pdf,png and jpg files are allowed!';
            return cb(new Error('Only pdf, png and jpg  files are allowed!'), false);
        }
        cb(null, true);
    };
    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('attachment');
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        //console.log(req.file);

        if (req.fileValidationError) {
            req.session.notification = req.fileValidationError;
            req.session.notificationtype = "error";
            res.redirect('/indexkepuasan/add');
            //return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/indexkepuasan/add');
            //return res.send('Please select an file to upload');
        }
        else if (err instanceof multer.MulterError) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/indexkepuasan/add');
            // return res.send(err);
        }
        else if (err) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/indexkepuasan/add');
            //return res.send(err);
        } else {
            const fs = require('fs');
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var buff = new Buffer(encode_image, 'base64')
            var id_user = req.session.user[0].id_user;
            var value_index_kepuasan = req.body.value_index_kepuasan;
            var attachment_index_kepuasan = buff;
            model.add([id_user, value_index_kepuasan, attachment_index_kepuasan], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    uamodel.add([id_user, "Mengisi Index Kepuasan"], function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                        }
                    });
                    req.session.notification = "Berhasil Ditambah";
                    req.session.notificationtype = "success";
                    res.redirect('/indexkepuasan');
                }
            });
        }
    });
};
exports.fileDownload = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_index_kepuasan = req.params.id_index_kepuasan;
    model.getData([id_index_kepuasan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user, "Download File Index Kepuasan"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                var buffer = rows[0].attachment_index_kepuasan
                const fs = require('fs');
                fs.writeFile('attachment_index_kepuasan.pdf', buffer, 'binary', function(err) {
                    if(err) {
                        console.log(err);
                    }else{
                        console.log('file saved');
                        fs.readFile('attachment_index_kepuasan.pdf', (err, data) => {
                            res.contentType("application/pdf");
                            res.send(data);//
                        });
                    }
                });
            }
        });
};
exports.create = function (req, res) {


    var id_index_kepuasan = req.params.id_index_kepuasan;
    model.getData(id_index_kepuasan, function (error, rows, fields) {
        if (error) {
            console.log(error);

        } else {
            if (rows[0]) {
                console.log(rows[0]);
                res.render('indexkepuasanadd', { data: rows[0], edit: "edit" });
            } else {
                res.render('indexkepuasanadd', { edit: "" });
            }
        }
    });
};

exports.updateAction = function (req, res) {

    var id_user = req.session.user[0].id_user;
    var value_index_kepuasan = req.body.value_index_kepuasan;
    var attachment_index_kepuasan = req.body.attachment_index_kepuasan;

    model.edit([id_user, value_index_kepuasan, attachment_index_kepuasan], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Index Kepuasan"], function (error, rows, fields) { });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/indexkepuasan');

        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_index_kepuasan = req.params.id_index_kepuasan;
    model.delete([id_index_kepuasan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user, "Menghapus Index Kepuasan"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/indexkepuasan');
            }
        });
};

exports.dash = function (req, res) {
    var indek = 0;
    var totalsend = 0;
    model.getIndexes(function (error, rows, fields) {
        indek = (rows[0]['indek']) / 35;
    });
    model.getTotalsend(function (error, rows, fields) {
        totalsend = rows[0]['totalsend'];
    });
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            res.render('indexkepuasandash', { data: rows, indek: parseInt(indek), totalsend: totalsend });

        }
    });

};