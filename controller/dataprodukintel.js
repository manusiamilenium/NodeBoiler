'use strict';
 
var response = require('../result');
var model = require('../model/dataprodukintel');
var uamodel = require('../model/useractivity');
var subditmodel = require('../model/subditmodel');
var produkintelmodel = require('../model/produkintel');
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
            res.render('dataprodukintel',{data:rows,notification: notification, nottype: nottype});
            
        }
    });
};
exports.createAction = function (req, res) {
    var id_user = req.session.user[0].id_user; 
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;

    model.add([id_user,id_subdit,tahun_data_produk_intelijen,bulan_data_produk_intelijen,jenis_produk_intelijen,jumlah_data_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Mengisi Data Produk Intelijen"], function (error, rows, fields) { 
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/dataprodukintel');
        }
    });
};
exports.create = function (req, res) {
    var id_data_produk_intelijen = req.params.id_data_produk_intelijen;
    var subdits = [];
    var jenis = [];
    subditmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows); 
             subdits = await rows;
        }
    });
    produkintelmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows); 
            jenis = await rows;
        }
    });
    model.getData([id_data_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            
            if(rows[0]){
                console.log(rows[0]);
                res.render('dataprodukinteladd',{data:rows[0],subdit:subdits,jenis:jenis,edit:"edit"});
            }else{
                res.render('dataprodukinteladd',{subdit:subdits,jenis:jenis,edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var id_user = req.session.user[0].id_user; 
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;

    model.edit([id_user,id_subdit,tahun_data_produk_intelijen,bulan_data_produk_intelijen,jenis_produk_intelijen,jumlah_data_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Data Intelijen"], function (error, rows, fields) {});
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/dataprodukintel');
             
        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_data_produk_intelijen = req.params.id_data_produk_intelijen;
    model.delete([id_data_produk_intelijen],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user,"Menghapus Data Produk Intelijen"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/dataprodukintel');
                
            }
        });
}; 