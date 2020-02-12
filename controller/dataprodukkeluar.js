'use strict';

var response = require('../result');
var model = require('../model/dataprodukkeluar');
var uamodel = require('../model/useractivity');  
var pmodel = require('../model/produkkeluar');
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
            res.render('dataprodukkeluaradd',{data:rows,notification: notification, nottype: nottype});
            
        }
    });
};
exports.createAction = function (req, res) {
    var id_user = req.session.user[0].id_user;  
    var id_jenis_produk_keluar = req.body.id_jenis_produk_keluar;
    var nomor_produk_keluar = req.body.nomor_produk_keluar;
    var tanggal_produk_keluar = req.body.tanggal_produk_keluar;
    var kepada_produk_keluar = req.body.kepada_produk_keluar;
    var satker_produk_keluar = req.body.satker_produk_keluar;
    var perihal_produk_keluar = req.body.perihal_produk_keluar;

    model.add([id_user,id_jenis_produk_keluar,nomor_produk_keluar,tanggal_produk_keluar,kepada_produk_keluar,satker_produk_keluar,perihal_produk_keluar], function (error, rows, fields) {
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
            res.redirect('/dataprodukkeluaradd/'+id_jenis_produk_keluar);
        }
    });
};
exports.create = function (req, res) {
    var id_produk_keluar = req.params.id_produk_keluar;
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    var jenis = [];
    produkintelmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows); 
            jenis = await rows;
        }
    });
    pmodel.getData([id_jenis_produk_keluar],function (error, rows, fields) {
        title = rows[0]['nama_jenis_produk_keluar'];
    });
    model.getData([id_produk_keluar], function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('dataprodukkeluaradd',{data:rows[0],jenis:jenis,id_jenis_produk_keluar:id_jenis_produk_keluar,edit:"edit",title:title});
            }else{
                res.render('dataprodukkeluaradd',{jenis:jenis,id_jenis_produk_keluar:id_jenis_produk_keluar,edit:"",title:title});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var id_user = req.session.user[0].id_user; 
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan_data_produk_intelijen;
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
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    model.delete([id_jenis_produk_keluar],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user,"Menghapus Data Produk Keluar Intelijen"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/dataprodukkeluar');
                
            }
        });
}; 