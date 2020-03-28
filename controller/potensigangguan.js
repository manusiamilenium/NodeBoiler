'use strict';

var response = require('../result');
var model = require('../model/potensigangguan');
var kjmodel = require('../model/kejadianmenonjol');
var uamodel = require('../model/useractivity');
exports.index = function (req, res) {
    var id_user = req.session.user[0].id_user;
    model.getAll([id_user],function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification;
            delete req.session.notificationtype;
            res.render('potensigangguan', { data: rows, notification: notification, nottype: nottype });
            delete req.session.notification;
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
            res.redirect('/potensigangguan/add');
            //return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/potensigangguan/add');
            //return res.send('Please select an file to upload');
        }
        else if (err instanceof multer.MulterError) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/potensigangguan/add');
            // return res.send(err);
        }
        else if (err) {
            req.session.notification = 'Please select an file to upload';
            req.session.notificationtype = "error";
            res.redirect('/potensigangguan/add');
            //return res.send(err);
        } else {
            const fs = require('fs');
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var buff = new Buffer(encode_image, 'base64')

            var id_user = req.session.user[0].id_user;
            var jumlah_potensi_gangguan = req.body.jumlah_potensi_gangguan;
            var tahun_potensi_gangguan = req.body.tahun_potensi_gangguan;
            var attachment_potensi_gangguan = buff;

            model.add([id_user, jumlah_potensi_gangguan, tahun_potensi_gangguan, attachment_potensi_gangguan], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    uamodel.add([id_user, "Mengisi Potensi Gangguan"], function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                        }
                    });
                    req.session.notification = "Berhasil Ditambah";
                    req.session.notificationtype = "success";
                    res.redirect('/potensigangguan');
                }
            });
        }
    });
};
exports.create = function (req, res) {
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    var id_user = req.session.user[0].id_user;
    model.getData([id_potensi_gangguan,id_user], function (error, rows, fields) {
        if (error) {
            console.log(error);

        } else {
            if (rows[0]) { 
                res.render('potensigangguanadd', { data: rows[0], edit: "edit" });
            } else {
                res.render('potensigangguanadd', { edit: "" });
            }
        }
    });


};
exports.fileDownload = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    var id_user = req.session.user[0].id_user;
    model.getData([id_potensi_gangguan,id_user],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user, "Mendownload file Potensi Gangguan"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                var buffer = rows[0].attachment_potensi_gangguan
                const fs = require('fs');
                fs.writeFile('attachment_potensi_gangguan.pdf', buffer, 'binary', function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('file saved');
                        fs.readFile('attachment_potensi_gangguan.pdf', (err, data) => {
                            res.contentType("application/pdf");
                            res.send(data);//
                        });
                    }
                });
                //req.session.notification = "Berhasil Dihapus";
                //req.session.notificationtype = "success";
                //res.redirect('/potensigangguan');
            }
        });
};

exports.updateAction = function (req, res) {
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    var id_user = req.session.user[0].id_user;
    var jumlah_potensi_gangguan = req.body.jumlah_potensi_gangguan;
    var tahun_potensi_gangguan = req.body.tahun_potensi_gangguan;
    var attachment_potensi_gangguan = req.body.attachment_potensi_gangguan;

    model.edit([id_user, jumlah_potensi_gangguan, tahun_potensi_gangguan, attachment_potensi_gangguan, id_potensi_gangguan], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Potensi Gangguan"], function (error, rows, fields) { });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/potensigangguan');

        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    model.delete([id_potensi_gangguan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user, "Menghapus Potensi Gangguan"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/potensigangguan');
            }
        });
};

exports.dash = function (req, res) {
    var totalpotensi = 0;
    var totalkejadian = 0;
    var totalsend = 0;
    var potensipersatwil = [];
    model.total(function (error, rows, fields) {
        if (error) {
            console.log(error)
        }
        totalpotensi = rows[0]['total'];
    });
    kjmodel.total(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } 
        totalkejadian = rows[0]['total'];
    });
    model.totalpersatwil(function (error, rows, fields) {
        if (error) {
            console.log(error)
        }
        potensipersatwil = rows;
    });
    model.getTotalsend(function (error, rows, fields) {
        if (error) {
            console.log(error)
        }
        totalsend = rows[0]['total'];
    });

    kjmodel.totalpersatwil(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var iku = ~~(((totalpotensi - totalkejadian) / totalpotensi) * 100);
            res.render('potensigangguandash',
                {
                    data: rows,
                    potensipersatwil: potensipersatwil,
                    totalpotensi: totalpotensi,
                    totalsend: totalsend,
                    iku: iku,
                    totalkejadian: totalkejadian
                });

        }
    });

};