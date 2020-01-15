'use strict';

module.exports = function (app, sessionChecker) {
    var produkkeluar = require('../controller/produkkeluar');

   //master produkkeluar
    app.route('/produkkeluar')
        .get(sessionChecker, produkkeluar.index)
        .post(sessionChecker, produkkeluar.createAction);
    app.route('/produkkeluar/:id_jenis_produk_keluar')
        .get(sessionChecker, produkkeluar.create);
    app.route('/produkkeluar/add')
        .get(sessionChecker, produkkeluar.create);
    app.route('/produkkeluar/edit')
        .post(sessionChecker, produkkeluar.updateAction);
    app.route('/produkkeluar/delete/:id_jenis_produk_keluar')
        .get(sessionChecker, produkkeluar.delete);
};
