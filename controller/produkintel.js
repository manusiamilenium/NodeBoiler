'use strict';

var response = require('../result');
var model = require('../model/produkintel');

exports.index = function (req, res) {
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification; 
            delete req.session.notificationtype;
            res.render('produk_intel',{data:rows,notification: notification, nottype: nottype});
            delete req.session.notification;
        }
    });
};
exports.createAction = function (req, res) {
    var nama_produk_intelijen = req.body.nama_produk_intelijen;
    
    model.add([nama_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/produkintel');
        }
    });
};
exports.create = function (req, res) {
    var id_produk_intelijen = req.params.id_produk_intelijen;
    model.getData(id_produk_intelijen, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('produkinteladd',{data:rows[0],edit:"edit"});
            }else{
                res.render('produkinteladd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var nama_produk_intelijen = req.body.nama_produk_intelijen; 

    model.edit([nama_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/produkintel');
             
        }
    });
};
exports.delete = function (req, res) {

    var id_produk_intelijen = req.params.id_produk_intelijen;
    model.delete([id_produk_intelijen],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/produkintel');
            }
        });
};