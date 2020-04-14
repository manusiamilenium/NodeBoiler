'use strict';

var model = require('../model/kegiatanintel');
var uamodel = require('../model/useractivity');  
var jmodel = require('../model/jenisintelmodel');
var moment = require('moment');

exports.index = function (req, res) {
    var title = ""; 
    req.session.menuactive = 4;
    model.getAll([req.session.user.id_user],function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {   
            global.helper.render('kegiatan_intel', req, res,{data:rows,title:title}); 
        }
    });
};
exports.create = function (req, res) {
    
    var id_kegiatan_intelijen ="";
    id_kegiatan_intelijen = req.params.id_kegiatan_intelijen; 
    global.helper.getRefference(jmodel,function (error, reffs) {
        model.getData([id_kegiatan_intelijen,req.session.user.id_user], function (error, rows, fields) {
            if (error) {
                console.log(error); 
                global.helper.render('kegiatan_intel_add', req, res,{data:{},jenis:reffs,edit:""}); 
            } else {
                if(rows[0]){ 
                    res.render('kegiatan_intel_add',{data:rows[0],edit:"edit",jenis:reffs});
                }else{
                    global.helper.render('kegiatan_intel_add', req, res,{data:{},jenis:reffs,edit:""}); 
                }
            }
        });
    });
   
};

exports.createAction = function (req, res) {  
    var bulan_kegiatan_intelijen = req.body.bulan;
    var tahun_kegiatan_intelijen = req.body.tahun_kegiatan_intelijen;
    var jenis_kegiatan_intelijen = req.body.jenis_kegiatan_intelijen;
    var jumlah_kegiatan_intelijen = req.body.jumlah_kegiatan_intelijen;
    var reduksi_kegiatan_intelijen = req.body.reduksi_kegiatan_intelijen;
    var uraian_kegiatan_intelijen = req.body.uraian_kegiatan_intelijen;
    if (bulan_kegiatan_intelijen == "" || tahun_kegiatan_intelijen == "" || jenis_kegiatan_intelijen == "" || jumlah_kegiatan_intelijen == "" || reduksi_kegiatan_intelijen == "" || uraian_kegiatan_intelijen == "") {
        req.session.notification = 'Mohon lengkapi isian';
        req.session.notificationtype = "error";
        global.helper.getRefference(jmodel, function (error, rows) {
            global.helper.render('kegiatan_intel_add', req, res, { data: req.body, jenis: rows, edit: "" });
        });
    } else {
        model.add([req.session.user.id_user, tahun_kegiatan_intelijen, bulan_kegiatan_intelijen, jenis_kegiatan_intelijen, jumlah_kegiatan_intelijen, reduksi_kegiatan_intelijen, uraian_kegiatan_intelijen], function (error, rows, fields) {
            if (error) {
                console.log(error)
                req.session.notification = "Kesalahan Pengisian";
                req.session.notificationtype = "error";
                global.helper.getRefference(jmodel, function (error, rows) {
                    global.helper.render('kegiatan_intel_add', req, res, { data: req.body, jenis: rows, edit: "" });
                });
            } else {
                uamodel.add([req.session.user.id_user, "Mengisi Data Kegiatan Intel"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Ditambah";
                req.session.notificationtype = "success";
                res.redirect('/kegiatanintel');
            }
        });
    }
};

exports.delete = function (req, res) { 
    var id_kegiatan_intelijen = req.params.id_kegiatan_intelijen; 
    model.delete([id_kegiatan_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([req.session.user.id_user,"Menghapus Data Kegiatan Intel"], function (error, rows, fields) { 
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