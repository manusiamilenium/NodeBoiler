'use strict';

var response = require('../result');
var model = require('../model/produkkeluar');

exports.index = function (req, res) {
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification; 
            delete req.session.notificationtype;
            res.render('produkkeluar',{data:rows,notification: notification, nottype: nottype});
            delete req.session.notification;
        }
    });
};
exports.createAction = function (req, res) {
    var nama_jenis_produk_keluar = req.body.nama_jenis_produk_keluar;
    
    model.add([nama_jenis_produk_keluar], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/produkkeluar');
        }
    });
};
exports.create = function (req, res) {
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    model.getData(id_jenis_produk_keluar, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('produkkeluaradd',{data:rows[0],edit:"edit"});
            }else{
                res.render('produkkeluaradd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var nama_jenis_produk_keluar = req.body.nama_jenis_produk_keluar; 

    model.edit([nama_jenis_produk_keluar], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/produkkeluar');
             
        }
    });
};
exports.delete = function (req, res) {

    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    model.delete([id_jenis_produk_keluar],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/produkkeluar');
            }
        });
};