'use strict';

var model = require('../model/alsus');
var uamodel = require('../model/useractivity');
var rmodel = require('../model/alsusrealisasi');
var validation = require('../validator/alsus.js');
exports.indexAlsus = function (req, res) {
    var title = ""; 
    model.getAll([req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            global.helper.render('alsus_data', req, res, { data: rows, title: title });
        }
    });
};
exports.indexRealisasi = function (req, res) {
    var title = "";  
    rmodel.getAll([req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            global.helper.render('alsus_realisasi_data', req, res, { data: rows, title: title });
        }
    });
};

exports.createAlsus = function (req, res) {
    var id_penggunaan_alsus = "";
    id_penggunaan_alsus = req.params.id_penggunaan_alsus; 
    model.getData([id_penggunaan_alsus, req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            global.helper.render('alsus_data_add', req, res, { edit: "", data: {} });
        } else {
            if (rows[0]) {
                global.helper.render('alsus_data_add', req, res, { data: rows[0], edit: "edit" });
            } else {
                global.helper.render('alsus_data_add', req, res, { edit: "", data: {} });
            }
        }
    });
};

exports.createAlsusAction = function (req, res) {

    var multer = require('multer');
    var path = require('path');

    let upload = multer({ storage: global.helper.getUploadStorage(multer,path), fileFilter: global.helper.getFileFilter}).single('attachment');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        //console.log(req.file);
        const error = validation(req.body).error;
        if (error) {
            req.session.notification = error.message;
            req.session.notificationtype = "error";
            global.helper.render('alsus_data_add', req, res, { edit: "", data: req.body });
             
        } else {
             
            if(!global.helper.multerValidate(req,multer,err)){
                req.session.notification = 'Mohon lengkapi upload dokumen ';
                req.session.notificationtype = "error";
                global.helper.render('alsus_data_add', req, res, { edit: "", data: req.body });
            }
            else {
                const fs = require('fs');
                var img = fs.readFileSync(req.file.path);
                var encode_image = img.toString('base64');
                var buff = new Buffer(encode_image, 'base64')
                var tahun_penggunaan_alsus = req.body.tahun_penggunaan_alsus;
                var jumlah_penggunaan_alsus = req.body.jumlah_penggunaan_alsus;
                model.add([req.session.user.id_user, tahun_penggunaan_alsus, jumlah_penggunaan_alsus, buff], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    } else {
                        uamodel.add([req.session.user.id_user, "Mengisi Data alsus"], function (error, rows, fields) {
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
        }


    });


};
exports.deleteAlsus = function (req, res) { 
    var id_penggunaan_alsus = req.params.id_penggunaan_alsus;
    model.delete([id_penggunaan_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([req.session.user.id_user, "Menghapus Data Alsus"], function (error, rows, fields) {
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
     
    var id_penggunaan_alsus = req.params.id_penggunaan_alsus;


    model.getData([id_penggunaan_alsus, req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([req.session.user.id_user, "Download File Alsus"], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                }
            });
            var buffer = rows[0].attachment_penggunaan_alsus
            const fs = require('fs');
            fs.writeFile('attachment_penggunaan_alsus.pdf', buffer, 'binary', function (err) {
                if (err) {
                    console.log(err);
                } else {

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
            global.helper.render('alsus_realisasi_add', req, res, { edit: "",data: {} });
        } else {
            if (rows[0]) {
                global.helper.render('alsus_realisasi_add', req, res, { data: rows[0], edit: "edit" });
            } else {
                global.helper.render('alsus_realisasi_add', req, res, { edit: "",data: {} });
            }
        }
    });
};
exports.createAlsusRealisasiAction = function (req, res) { 
    var tahun_realisasi_alsus = req.body.tahun_realisasi_alsus;
    var bulan_realisasi_alsus = req.body.bulan;
    var jumlah_realisasi_alsus = req.body.jumlah_realisasi_alsus;
    var uraian_realisasi_alsus = req.body.uraian_realisasi_alsus;
    if(tahun_realisasi_alsus==""||bulan_realisasi_alsus==""||jumlah_realisasi_alsus==""||uraian_realisasi_alsus==""){
        req.session.notification = 'Mohon lengkapi isian form';
        req.session.notificationtype = "error";
        global.helper.render('alsus_realisasi_add', req, res, { edit: "", data: req.body });
    }else{
        rmodel.add([req.session.user.id_user, tahun_realisasi_alsus, bulan_realisasi_alsus, jumlah_realisasi_alsus, uraian_realisasi_alsus], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([req.session.user.id_user, "Mengisi Data realisasi alsus"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Ditambah";
                req.session.notificationtype = "success";
                res.redirect('/alsus/realisasi');
            }
        });
    }
};

exports.deleteAlsusRealisasi = function (req, res) {
    var id_realisasi_alsus = req.params.id_realisasi_alsus;
    rmodel.delete([id_realisasi_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([req.session.user.id_user, "Menghapus Data Realisasi Alsus"], function (error, rows, fields) {
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