'use strict';

var response = require('../result');
var model = require('../model/subditmodel');

exports.index = function (req, res) {
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification; 
            delete req.session.notificationtype;
            res.render('subdit',{data:rows,notification: notification, nottype: nottype});
            delete req.session.notification;
        }
    });
};
exports.createAction = function (req, res) {
    var name = req.body.nama_subdit;
    
    model.addSubdit([name], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/subdits');
        }
    });
};
exports.create = function (req, res) {
    var id_subdit = req.params.id_subdit;
    model.getSubdit(id_subdit, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){ 
                res.render('subditadd',{data:rows[0],edit:"edit"});
            }else{
                res.render('subditadd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var nama_subdit = req.body.nama_subdit; 

    model.editSubdit([nama_subdit], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/subdits');
             
        }
    });
};
exports.delete = function (req, res) {

    var id_subdit = req.params.id_subdit;
    model.deleteSubdit([id_subdit],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/subdits');
            }
        });
};