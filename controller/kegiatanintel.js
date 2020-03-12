'use strict';

var model = require('../model/kegiatanintel');
var uamodel = require('../model/useractivity');  
var jmodel = require('../model/jenisintelmodel');
var moment = require('moment');

exports.index = function (req, res) {
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
            res.render('kegiatan_intel',{data:rows,notification: notification, nottype: nottype,title:title});            
        }
    });
};
exports.create = function (req, res) {
    var jenis = [];
    var id_kegiatan_intelijen ="";
    id_kegiatan_intelijen = req.params.id_kegiatan_intelijen;
    jmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows); 
            jenis = await rows;
        }
    });

    model.getData([id_kegiatan_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.render('kegiatan_intel_add',{jenis:jenis,edit:""});
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('kegiatan_intel_add',{data:rows[0],edit:"edit",jenis:jenis});
            }else{
                res.render('kegiatan_intel_add',{jenis:jenis,edit:""});
            }
        }
    });

     
};

exports.createAction = function (req, res) {
    var id_user = req.session.user[0].id_user;  
    var bulan_kegiatan_intelijen = req.body.bulan_kegiatan_intelijen;
    var tahun_kegiatan_intelijen = req.body.tahun_kegiatan_intelijen;
    var jenis_kegiatan_intelijen = req.body.jenis_kegiatan_intelijen;
    var jumlah_kegiatan_intelijen = req.body.jumlah_kegiatan_intelijen;
    var reduksi_kegiatan_intelijen = req.body.reduksi_kegiatan_intelijen;
    var uraian_kegiatan_intelijen = req.body.uraian_kegiatan_intelijen;

    model.add([id_user,tahun_kegiatan_intelijen,bulan_kegiatan_intelijen,jenis_kegiatan_intelijen,jumlah_kegiatan_intelijen,reduksi_kegiatan_intelijen,uraian_kegiatan_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Mengisi Data Produk Keluar"], function (error, rows, fields) { 
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/kegiatanintel');
        }
    });
};

exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;  
    var id_kegiatan_intelijen = req.params.id_kegiatan_intelijen;
    

    model.delete([id_kegiatan_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Menghapus Data Produk Keluar"], function (error, rows, fields) { 
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Dihapus";
            req.session.notificationtype = "success";
            res.redirect('/kegiatanintel');
        }
    });
};