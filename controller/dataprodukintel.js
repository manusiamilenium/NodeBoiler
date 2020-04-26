'use strict';

var response = require('../result');
var model = require('../model/dataprodukintel');
var uamodel = require('../model/useractivity');
var subditmodel = require('../model/subditmodel');
var produkintelmodel = require('../model/produkintel');
var validation = require('../validator/dataprodukintel.js');
exports.index = function (req, res) {
    req.session.menuactive = 3;
    global.helper.render('dataprodukintel', req, res, { data: {} });
    /*
    model.getAll([req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            global.helper.render('dataprodukintel', req, res, { data: rows });

        }
    });*/
};
exports.createAction = function (req, res) { 
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;
    var subdits = [];
    var jenis = [];
    const error = validation(req.body).error;
    if (error) {
        
        req.session.notification = error.message;
        req.session.notificationtype = "error";
        global.helper.getRefference(subditmodel,function (error, rows) {
            subdits = rows;
            global.helper.getRefference(produkintelmodel,function (error, rows) {
                jenis = rows;
                global.helper.render('dataprodukinteladd', req, res, { subdit: subdits, jenis: jenis, edit: "", data: req.body});
            });
        });
    } else {
        model.add([req.session.user.id_user, id_subdit, tahun_data_produk_intelijen, bulan_data_produk_intelijen, jenis_produk_intelijen, jumlah_data_produk_intelijen], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([req.session.user.id_user, "Mengisi Data Produk Intelijen"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Ditambah";
                req.session.notificationtype = "success";
                res.redirect('/dataprodukintel');
            }
        });
    }
};
 
exports.create = async function (req, res) {
    var id_data_produk_intelijen = req.params.id_data_produk_intelijen;
    var subdits = [];
    var jenis = [];
    global.helper.getRefference(subditmodel,function (error, rows) {
        subdits = rows;
        global.helper.getRefference(produkintelmodel,function (error, rows) {
            jenis = rows;
            model.getData([id_data_produk_intelijen, req.session.user.id_user], function (error, rows, fields) {
                if (error) {
                    console.log(error);
        
                } else {
                    if (rows[0]) {
                        res.render('dataprodukinteladd', { data: rows[0], subdit: subdits, jenis: jenis, edit: "edit" });
                    } else {
                        //console.log(getData(subditmodel));
                        global.helper.render('dataprodukinteladd', req, res, { subdit: subdits, jenis: jenis, edit: "", data: {} });
                    }
                }
            });
        });
    });
    


};

exports.updateAction = function (req, res) {

   
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;

    model.edit([req.session.user.id_user, id_subdit, tahun_data_produk_intelijen, bulan_data_produk_intelijen, jenis_produk_intelijen, jumlah_data_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([req.session.user.id_user,"Mengedit Data Intelijen"], function (error, rows, fields) { });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/dataprodukintel');

        }
    });
};
exports.delete = function (req, res) {
     
    var id_data_produk_intelijen = req.params.id_data_produk_intelijen;
    model.delete([id_data_produk_intelijen],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([req.session.user.id_user, "Menghapus Data Produk Intelijen"], function (error, rows, fields) {
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