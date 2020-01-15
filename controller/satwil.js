'use strict';

var response = require('../result');
var model = require('../model/satwilmodel');

exports.index = function (req, res) {
    model.getSatwils(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification; 
            delete req.session.notificationtype;
            res.render('satwil',{data:rows,notification: notification, nottype: nottype});
            delete req.session.notification;
        }
    });
};
exports.createAction = function (req, res) {
    var name = req.body.nama_satwil;
    
    model.addSatwil([name], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/satwils');
        }
    });
};
exports.create = function (req, res) {
    var id_satwil = req.params.id_satwil;
    model.getSatwil(id_satwil, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('satwiladd',{data:rows[0],edit:"edit"});
            }else{
                res.render('satwiladd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var nama_satwil = req.body.nama_satwil; 

    model.editSatwil([nama_satwil], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/satwils');
             
        }
    });
};
exports.delete = function (req, res) {

    var id_satwil = req.params.id_satwil;
    model.deleteSatwil([id_satwil],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/satwils');
            }
        });
};