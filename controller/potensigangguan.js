'use strict';

var response = require('../result');
var model = require('../model/potensigangguan');
var kjmodel = require('../model/kejadianmenonjol');
var uamodel = require('../model/useractivity');
exports.index = function (req, res) { 
    req.session.menuactive = 2;
    global.helper.render('potensigangguan', req, res, { data: {},});
    /*
    model.getAll([req.session.user.id_user],function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            global.helper.render('potensigangguan', req, res, { data: rows,});
        }
    });*/
};
exports.createAction = function (req, res) {
    var multer = require('multer');
    var path = require('path');
    let upload = multer({ storage: global.helper.getUploadStorage(multer,path), fileFilter: global.helper.getFileFilter }).single('attachment');
    upload(req, res, function (err) { 
        req.session.notificationtype = "error";
        if (req.fileValidationError) {
            req.session.notification = req.fileValidationError; 
            global.helper.render('potensigangguanadd', req, res, { data: req.body,});
        }
        else if (!req.file) {
            req.session.notification = 'Please select an file to upload'; 
            global.helper.render('potensigangguanadd', req, res, { data: req.body,});
        }
        else if (err instanceof multer.MulterError) {
            req.session.notification = 'Please select an file to upload'; 
            global.helper.render('potensigangguanadd', req, res, { data: req.body,});
        }
        else if (err) {
            req.session.notification = 'Please select an file to upload'; 
            global.helper.render('potensigangguanadd', req, res, { data: req.body,});
        } else {
            const fs = require('fs');
            var img = fs.readFileSync(req.file.path);
            var encode_image = img.toString('base64');
            var buff = new Buffer(encode_image, 'base64') 
            var jumlah_potensi_gangguan = req.body.jumlah_potensi_gangguan;
            var tahun_potensi_gangguan = req.body.tahun_potensi_gangguan;
            var attachment_potensi_gangguan = buff;

            model.add([req.session.user.id_user, jumlah_potensi_gangguan, tahun_potensi_gangguan, attachment_potensi_gangguan], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                     
                    uamodel.loguser([req.session.user.id_user, "Mengisi Potensi Gangguan"],(r) => { }); 
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
    model.getData([id_potensi_gangguan,req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            if (rows[0]) { 
                res.render('potensigangguanadd', { data: rows[0], edit: "edit" });
            } else {
                global.helper.render('potensigangguanadd', req, res, { data: {},});
            }
        }
    });


};
exports.fileDownload = function (req, res) { 
    var id_potensi_gangguan = req.params.id_potensi_gangguan; 
    model.getData([id_potensi_gangguan,req.session.user.id_user],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.loguser([req.session.user.id_user, "Mendownload file Potensi Gangguan"],(r) => { }); 
                var buffer = rows[0].attachment_potensi_gangguan
                const fs = require('fs');
                fs.writeFile('attachment_potensi_gangguan.pdf', buffer, 'binary', function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                         
                        fs.readFile('attachment_potensi_gangguan.pdf', (err, data) => {
                            res.contentType("application/pdf");
                            res.send(data);//
                        });
                    }
                });
                 
            }
        });
};

exports.updateAction = function (req, res) {
    var id_potensi_gangguan = req.params.id_potensi_gangguan; 
    var jumlah_potensi_gangguan = req.body.jumlah_potensi_gangguan;
    var tahun_potensi_gangguan = req.body.tahun_potensi_gangguan;
    var attachment_potensi_gangguan = req.body.attachment_potensi_gangguan;

    model.edit([req.session.user.id_user, jumlah_potensi_gangguan, tahun_potensi_gangguan, attachment_potensi_gangguan, id_potensi_gangguan], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.loguser([req.session.user.id_user, "Mengedit Potensi Gangguan"],(r) => { }); 
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/potensigangguan');

        }
    });
};
exports.delete = function (req, res) { 
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    model.delete([id_potensi_gangguan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.loguser([req.session.user.id_user, "Menghapus Potensi Gangguan"],(r) => { }); 
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