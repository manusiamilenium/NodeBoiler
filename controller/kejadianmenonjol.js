'use strict';

var response = require('../result');
var model = require('../model/kejadianmenonjol');
var uamodel = require('../model/useractivity');
var subditmodel = require('../model/subditmodel'); 
var validation = require('../validator/kejadianmenonjol.js');

exports.index = function (req, res) { 
    req.session.menuactive = 2;
    global.helper.render('kejadianmenonjol', req, res,{data:{}});
    /*
    model.getAll([req.session.user.id_user],function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {  
            global.helper.render('kejadianmenonjol', req, res,{data:rows});
        }
    });*/
};
exports.createAction = function (req, res) { 
    var id_subdit = req.body.id_subdit;
    var tahun_kejadian_menonjol = req.body.tahun_kejadian_menonjol;
    var bulan_kejadian_menonjol = req.body.bulan;
    var uraian_kejadian_menonjol = req.body.uraian_kejadian_menonjol;
    var jumlah_kejadian_menonjol = req.body.jumlah_kejadian_menonjol;
    const error = validation(req.body).error;
    if (error) {
        req.session.notification = error.message;
        req.session.notificationtype = "error";
        global.helper.getRefference(subditmodel,function (error, rows) {
            global.helper.render('kejadianmenonjoladd', req, res,{data:req.body,subdit:rows});
        });
    }else {
        model.add([req.session.user.id_user, id_subdit, tahun_kejadian_menonjol, bulan_kejadian_menonjol, jumlah_kejadian_menonjol, uraian_kejadian_menonjol], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.loguser([req.session.user.id_user, "Mengisi Data Kejadian Menonjol"],(r) => { }); 
                req.session.notification = "Berhasil Ditambah";
                req.session.notificationtype = "success";
                res.redirect('/kejadianmenonjol');
            }
        });
    }
};
exports.create = function (req, res) {
    var id_kejadian_menonjol = req.params.id_kejadian_menonjol;
    var subdits = [];  
    global.helper.getRefference(subditmodel,function (error, rows) {
        subdits = rows;
        model.getData([id_kejadian_menonjol,req.session.user.id_user], function (error, rows, fields) {
            if (error) {
                console.log(error);
                req.session.notification = "Kesalahan Pengisian";
                req.session.notificationtype = "Error";
                res.redirect('/kejadianmenonjol/add');
            } else {
                
                if(rows[0]){ 
                    res.render('kejadianmenonjoladd',{data:rows[0],subdit:subdits,edit:"edit"});
                }else{
                    //res.render('kejadianmenonjoladd',{subdit:subdits,edit:""});
                    global.helper.render('kejadianmenonjoladd', req, res,{data:{},subdit:subdits});
                }
            }
        });
         
    });
   
};

exports.updateAction = function (req, res) { 
    var id_subdit = req.body.id_subdit;
    var tahun_kejadian_menonjol = req.body.tahun_kejadian_menonjol;
    var bulan_kejadian_menonjol = req.body.bulan;
    var uraian_kejadian_menonjol = req.body.uraian_kejadian_menonjol;
    var id_kejadian_menonjol = req.params.id_kejadian_menonjol;
    var jumlah_kejadian_menonjol = req.body.jumlah_kejadian_menonjol;
    model.edit([req.session.user.id_user,id_subdit,tahun_kejadian_menonjol,bulan_kejadian_menonjol,jumlah_kejadian_menonjol,uraian_kejadian_menonjol,id_kejadian_menonjol], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.loguser([req.session.user.id_user, "Mengedit Data kejadian menonjol"],(r) => { }); 
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/kejadianmenonjol');
             
        }
    });
};
exports.delete = function (req, res) { 
    var id_kejadian_menonjol = req.params.id_kejadian_menonjol;
    model.delete([id_kejadian_menonjol],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else { 
                uamodel.loguser([req.session.user.id_user, "Menghapus Data Produk Intelijen"],(r) => { }); 
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/kejadianmenonjol');
                
            }
        });
}; 