'use strict';

var model = require('../model/alsus');
var uamodel = require('../model/useractivity');
var rmodel = require('../model/alsusrealisasi');

exports.indexAlsus = function (req, res) {
    var title = "";
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows);
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification;
            delete req.session.notificationtype;
            res.render('alsus_data', { data: rows, notification: notification, nottype: nottype, title: title });
        }
    });
};
exports.indexRealisasi = function (req, res) {
    var title = "";
    rmodel.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows);
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification;
            delete req.session.notificationtype;
            res.render('alsus_realisasi_data', { data: rows, notification: notification, nottype: nottype, title: title });
        }
    });
};

exports.createAlsus = function (req, res) {
    var id_penggunaan_alsus = "";
    id_penggunaan_alsus = req.params.id_penggunaan_alsus;

    model.getData([id_penggunaan_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.render('alsus_data_add', { edit: "" });
        } else {
            if (rows[0]) {
                console.log(rows[0]);
                res.render('alsus_data_add', { data: rows[0], edit: "edit" });
            } else {
                res.render('alsus_data_add', { edit: "" });
            }
        }
    });
};

exports.createAlsusAction = function (req, res) {
    
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
            res.redirect('/alsus/add');
            //return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/alsus/add');
            //return res.send('Please select an file to upload');
        }
        else if (err instanceof multer.MulterError) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/alsus/add');
           // return res.send(err);
        }
        else if (err) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/alsus/add');
            //return res.send(err);
        } else {
            const fs = require('fs');
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var buff =  new Buffer(encode_image, 'base64')

            var id_user = req.session.user[0].id_user;
            var tahun_penggunaan_alsus = req.body.tahun_penggunaan_alsus;
            var jumlah_penggunaan_alsus = req.body.jumlah_penggunaan_alsus;
            
           
            console.log(buff);
            model.add([id_user, tahun_penggunaan_alsus, jumlah_penggunaan_alsus,buff], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    uamodel.add([id_user, "Mengisi Data alsus"], function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                        }
                    });
                    req.session.notification = "Berhasil Ditambah";
                    req.session.notificationtype = "success";
                    res.redirect('/alsus/');
                }
            });
        }


    });


};
exports.deleteAlsus = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_penggunaan_alsus = req.params.id_penggunaan_alsus;


    model.delete([id_penggunaan_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user, "Menghapus Data Alsus"], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Dihapus";
            req.session.notificationtype = "success";
            res.redirect('/alsus/');
        }
    });
};

exports.fileAlsus = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_penggunaan_alsus = req.params.id_penggunaan_alsus;


    model.getData([id_penggunaan_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user, "Download File Alsus"], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                }
            });
            var buffer = rows[0].attachment_penggunaan_alsus
            const fs = require('fs');
            fs.writeFile('attachment_penggunaan_alsus.pdf', buffer, 'binary', function(err) {
                if(err) {
                    console.log(err);
                }else{
                    console.log('file saved');
                    fs.readFile('attachment_penggunaan_alsus.pdf', (err, data) => {
                        res.contentType("application/pdf");
                        res.send(data);//
                    });
                }
            });
            
        }
    });
};

exports.createAlsusRealisasi = function (req, res) {
    var id_realisasi_alsus = "";
    id_realisasi_alsus = req.params.id_realisasi_alsus;
    rmodel.getData([id_realisasi_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.render('alsus_realisasi_add', { edit: "" });
        } else {
            if (rows[0]) {
                console.log(rows[0]);
                res.render('alsus_realisasi_add', { data: rows[0], edit: "edit" });
            } else {
                res.render('alsus_realisasi_add', { edit: "" });
            }
        }
    });
};
exports.createAlsusRealisasiAction = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var tahun_realisasi_alsus = req.body.tahun_realisasi_alsus;
    var bulan_realisasi_alsus = req.body.bulan;
    var jumlah_realisasi_alsus = req.body.jumlah_realisasi_alsus;
    var uraian_realisasi_alsus = req.body.uraian_realisasi_alsus;


    rmodel.add([id_user, tahun_realisasi_alsus, bulan_realisasi_alsus, jumlah_realisasi_alsus, uraian_realisasi_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user, "Mengisi Data realisasi alsus"], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/alsus/realisasi');
        }
    });
};

exports.deleteAlsusRealisasi = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_realisasi_alsus = req.params.id_realisasi_alsus;


    rmodel.delete([id_realisasi_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user, "Menghapus Data Realisasi Alsus"], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Dihapus";
            req.session.notificationtype = "success";
            res.redirect('/alsus/realisasi');
        }
    });
};