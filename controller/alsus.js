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
            res.render('alsus_data',{data:rows,notification: notification, nottype: nottype,title:title});            
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
            res.render('alsus_realisasi_data',{data:rows,notification: notification, nottype: nottype,title:title});            
        }
    });
};

exports.createAlsus = function (req, res) {
    var id_penggunaan_alsus ="";
    id_penggunaan_alsus = req.params.id_penggunaan_alsus;
    model.getData([id_penggunaan_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.render('alsus_data_add',{edit:""});
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('alsus_data_add',{data:rows[0],edit:"edit"});
            }else{
                res.render('alsus_data_add',{edit:""});
            }
        }
    });     
};

exports.createAlsusAction = function (req, res) {
    var id_user = req.session.user[0].id_user;  
    var tahun_penggunaan_alsus = req.body.tahun_penggunaan_alsus;
    var jumlah_penggunaan_alsus = req.body.jumlah_penggunaan_alsus;
     

    model.add([id_user,tahun_penggunaan_alsus,jumlah_penggunaan_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Mengisi Data alsus"], function (error, rows, fields) { 
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/alsus/');
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
            uamodel.add([id_user,"Menghapus Data Alsus"], function (error, rows, fields) { 
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

exports.createAlsusRealisasi = function (req, res) {
    var id_realisasi_alsus ="";
    id_realisasi_alsus = req.params.id_realisasi_alsus;
    rmodel.getData([id_realisasi_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.render('alsus_realisasi_add',{edit:""});
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('alsus_realisasi_add',{data:rows[0],edit:"edit"});
            }else{
                res.render('alsus_realisasi_add',{edit:""});
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
     

    rmodel.add([id_user,tahun_realisasi_alsus,bulan_realisasi_alsus,jumlah_realisasi_alsus,uraian_realisasi_alsus], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Mengisi Data realisasi alsus"], function (error, rows, fields) { 
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
            uamodel.add([id_user,"Menghapus Data Realisasi Alsus"], function (error, rows, fields) { 
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