'use strict';

var model = require('../model/kegiatanintel');
var uamodel = require('../model/useractivity');
var jmodel = require('../model/jenisintelmodel');
var moment = require('moment');
var helper = require('./helper');

var validation = require('../validator/kegiatanintel.js');
exports.index = function (req, res) {
    var title = "";
    req.session.menuactive = 4;
    
    global.helper.render('kegiatan_intel', req, res, { data: {}, title: title });
};
exports.create = async (req, res) => {

    var id_kegiatan_intelijen = "";
    id_kegiatan_intelijen = req.params.id_kegiatan_intelijen;

    const data = await helper.getRefferences(jmodel, (r) => { });

    const onError = (error) => {
        console.log(error);
        helper.render('kegiatan_intel_add', req, res, { data: {}, jenis: data._results[0] , edit: "" });
    }
    const onSuccess = async (results) => {
        if (results[0]) {
            helper.render('kegiatan_intel_add', req, res, { data: results[0], edit: "edit", jenis: data._results[0] });
        } else {
            helper.render('kegiatan_intel_add', req, res, { data: {}, jenis: data._results[0], edit: "" });
        }
    }

    model.getData([id_kegiatan_intelijen, req.session.user.id_user], onSuccess, onError);
};

exports.createAction = async  (req, res) => {
    var bulan_kegiatan_intelijen = req.body.bulan;
    var tahun_kegiatan_intelijen = req.body.tahun_kegiatan_intelijen;
    var jenis_kegiatan_intelijen = req.body.jenis_kegiatan_intelijen;
    var jumlah_kegiatan_intelijen = req.body.jumlah_kegiatan_intelijen;
    var reduksi_kegiatan_intelijen = req.body.reduksi_kegiatan_intelijen;
    var uraian_kegiatan_intelijen = req.body.uraian_kegiatan_intelijen;
    const error = validation(req.body).error;
    if (error) {
        req.session.notification = error.message;
        req.session.notificationtype = "error";
        const onSuccess = async (results) => {
            await helper.render('kegiatan_intel_add', req, res, { data: req.body, jenis: results, edit: "" });
        }
        const reffs = await helper.getRefferences(jmodel, onSuccess);
        
        

    } else {
        const onError = async (error) => {
            console.log(error)
            req.session.notification = "Kesalahan Pengisian";
            req.session.notificationtype = "error";
            const reffs = await helper.getRefferences(jmodel, (r) => { });
            helper.render('kegiatan_intel_add', req, res, { data: req.body, jenis: reffs._results[0], edit: "" });
        }
        const onSuccess = async (results) => {
            uamodel.loguser([req.session.user.id_user, "Mengisi Data Kegiatan Intel"],(r) => { });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/kegiatanintel');
        }
        model.add([req.session.user.id_user, tahun_kegiatan_intelijen, bulan_kegiatan_intelijen, jenis_kegiatan_intelijen, jumlah_kegiatan_intelijen, reduksi_kegiatan_intelijen, uraian_kegiatan_intelijen], onSuccess, onError);
        
    }
};

exports.delete = function (req, res) {
    var id_kegiatan_intelijen = req.params.id_kegiatan_intelijen;
    const onError = async (error) => {
        console.log(error);
    }
    const onSuccess = async (results) => {
        uamodel.loguser([req.session.user.id_user,  "Menghapus Data Kegiatan Intel"],(r) => { });
            req.session.notification = "Berhasil Dihapus";
            req.session.notificationtype = "success";
            res.redirect('/kegiatanintel');
    }
    model.delete([id_kegiatan_intelijen], onSuccess,onError);
};