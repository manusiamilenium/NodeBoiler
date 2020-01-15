'use strict';

var response = require('../result');
var model = require('../model/kejadianmenonjol');
var uamodel = require('../model/useractivity');
var subditmodel = require('../model/subditmodel'); 
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
            res.render('kejadianmenonjol',{data:rows,notification: notification, nottype: nottype});
            
        }
    });
};
exports.createAction = function (req, res) {
    var id_user = req.session.user[0].id_user; 
    var id_subdit = req.body.id_subdit;
    var tahun_kejadian_menonjol = req.body.tahun_kejadian_menonjol;
    var bulan_kejadian_menonjol = req.body.bulan_kejadian_menonjol;
    var uraian_kejadian_menonjol = req.body.uraian_kejadian_menonjol;
    var jumlah_kejadian_menonjol = req.body.jumlah_kejadian_menonjol;
    model.add([id_user,id_subdit,tahun_kejadian_menonjol,bulan_kejadian_menonjol,jumlah_kejadian_menonjol,uraian_kejadian_menonjol], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Mengisi Data Kejadian Menonjol"], function (error, rows, fields) { 
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/kejadianmenonjol');
        }
    });
};
exports.create = function (req, res) {
    var id_kejadian_menonjol = req.params.id_kejadian_menonjol;
    var subdits = []; 
    subditmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows); 
             subdits = await rows;
        }
    });
     
    model.getData([id_kejadian_menonjol], function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            
            if(rows[0]){
                console.log(rows[0]);
                res.render('kejadianmenonjoladd',{data:rows[0],subdit:subdits,edit:"edit"});
            }else{
                res.render('kejadianmenonjoladd',{subdit:subdits,edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var id_user = req.session.user[0].id_user; 
    var id_subdit = req.body.id_subdit;
    var tahun_kejadian_menonjol = req.body.tahun_kejadian_menonjol;
    var bulan_kejadian_menonjol = req.body.bulan_kejadian_menonjol;
    var uraian_kejadian_menonjol = req.body.uraian_kejadian_menonjol;
    var id_kejadian_menonjol = req.params.id_kejadian_menonjol;
    var jumlah_kejadian_menonjol = req.body.jumlah_kejadian_menonjol;
    model.edit([id_user,id_subdit,tahun_kejadian_menonjol,bulan_kejadian_menonjol,jumlah_kejadian_menonjol,uraian_kejadian_menonjol,id_kejadian_menonjol], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Data kejadian menonjol"], function (error, rows, fields) {});
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/kejadianmenonjol');
             
        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_kejadian_menonjol = req.params.id_kejadian_menonjol;
    model.delete([id_kejadian_menonjol],
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
                res.redirect('/kejadianmenonjol');
                
            }
        });
}; 
