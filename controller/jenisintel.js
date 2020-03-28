'use strict';

var response = require('../result');
var model = require('../model/jenisintelmodel');

exports.index = function (req, res) {
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification; 
            delete req.session.notificationtype;
            res.render('jenis_kegiatan_intelijen',{data:rows,notification: notification, nottype: nottype});
           
        }
    });
};
exports.createAction = function (req, res) {
    var name = req.body.nama_jenis_kegiatan_intelijen;
    
    model.add([name], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/jenis_kegiatan_intelijen');
        } 
    });
};
exports.create = function (req, res) {
    var id_jenis_kegiatan_intelijen = req.params.id_jenis;
    model.getData(id_jenis_kegiatan_intelijen, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){ 
                res.render('jenis_kegiatan_intelijenadd',{data:rows[0],edit:"edit"});
            }else{
                res.render('jenis_kegiatan_intelijenadd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var nama_jenis_kegiatan_intelijen = req.body.nama_jenis_kegiatan_intelijen; 

    model.edit([nama_jenis_kegiatan_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/jenis_kegiatan_intelijen');
             
        }
    });
};
exports.delete = function (req, res) {

    var id_jenis_kegiatan_intelijen = req.params.id_jenis;
    model.delete([id_jenis_kegiatan_intelijen],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/jenis_kegiatan_intelijen');
            }
        });
}; 