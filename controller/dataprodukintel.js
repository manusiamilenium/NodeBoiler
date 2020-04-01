'use strict';

var response = require('../result');
var model = require('../model/dataprodukintel');
var uamodel = require('../model/useractivity');
var subditmodel = require('../model/subditmodel');
var produkintelmodel = require('../model/produkintel');
exports.index = function (req, res) {
    var id_user = req.session.user[0].id_user;
    model.getAll([id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            global.helper.render('dataprodukintel', req, res, { data: rows });

        }
    });
};
exports.createAction = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;
    var subdits = [];
    var jenis = [];
    if (id_subdit == "" || tahun_data_produk_intelijen == "" || bulan_data_produk_intelijen == "" || jenis_produk_intelijen == "" || jumlah_data_produk_intelijen == "") {
        req.session.notification = 'Mohon lengkapi isian';
        req.session.notificationtype = "error";
        getData(subditmodel,function (error, rows) {
            subdits = rows;
            getData(produkintelmodel,function (error, rows) {
                jenis = rows;
                global.helper.render('dataprodukinteladd', req, res, { subdit: subdits, jenis: jenis, edit: "", data: req.body});
            });
        });
        
        //res.render('dataprodukinteladd', { data: rows[0], subdit: subdits, jenis: jenis, edit: "edit" });
    } else {
        model.add([id_user, id_subdit, tahun_data_produk_intelijen, bulan_data_produk_intelijen, jenis_produk_intelijen, jumlah_data_produk_intelijen], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user, "Mengisi Data Produk Intelijen"], function (error, rows, fields) {
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
function getData(model,callback){
    model.getAll(function (error, rows, fields) {
        if (error) {
            callback(error);
        } else {
            //console.log(rows);
            callback(null,rows);
        }
    });
}
exports.create = async function (req, res) {
    var id_data_produk_intelijen = req.params.id_data_produk_intelijen;
    var subdits = [];
    var jenis = [];
    var id_user = req.session.user[0].id_user;
    getData(subditmodel,function (error, rows) {
        subdits = rows;
        getData(produkintelmodel,function (error, rows) {
            jenis = rows;
            model.getData([id_data_produk_intelijen, id_user], function (error, rows, fields) {
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

    var id_user = req.session.user[0].id_user;
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;

    model.edit([id_user, id_subdit, tahun_data_produk_intelijen, bulan_data_produk_intelijen, jenis_produk_intelijen, jumlah_data_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Data Intelijen"], function (error, rows, fields) { });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/dataprodukintel');

        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_data_produk_intelijen = req.params.id_data_produk_intelijen;
    model.delete([id_data_produk_intelijen],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user, "Menghapus Data Produk Intelijen"], function (error, rows, fields) {
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