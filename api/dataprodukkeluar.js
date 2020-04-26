'use strict';

var model = require('../model/dataprodukkeluar');
var helper = require('./helper');
//api
exports.fetchDatatables = async (req, res) =>  {
    const id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    helper.processDatatables(req,res,model,[id_jenis_produk_keluar, req.session.user.id_user]);
};