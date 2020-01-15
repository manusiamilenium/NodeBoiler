'use strict';

var response = require('../result');
var model = require('../model/satkermodel');

exports.index = function (req, res) {
    model.getSatkers(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification; 
            delete req.session.notificationtype;
            res.render('satker',{data:rows,notification: notification, nottype: nottype});
            delete req.session.notification;
        }
    });
};
exports.createAction = function (req, res) {
    var name = req.body.nama_satker;
    
    model.addSatker([name], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/satkers');
        }
    });
};
exports.create = function (req, res) {
    var id_satker = req.params.id_satker;
    model.getSatker(id_satker, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('satkeradd',{data:rows[0],edit:"edit"});
            }else{
                res.render('satkeradd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var nama_satker = req.body.nama_satker; 

    model.editSatker([nama_satker], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/satkers');
             
        }
    });
};
exports.delete = function (req, res) {

    var id_satker = req.params.id_satker;
    model.deleteSatker([id_satker],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/satkers');
            }
        });
};