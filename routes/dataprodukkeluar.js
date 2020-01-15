'use strict';

module.exports = function (app, sessionChecker) {
    var dataprodukkeluar = require('../controller/dataprodukkeluar');

    app.route('/dataprodukkeluar/:id_jenis_produk_keluar')
    .get(sessionChecker, dataprodukkeluar.index);
    
app.route('/dataprodukkeluaradd/:id_jenis_produk_keluar')
    .get(sessionChecker, dataprodukkeluar.create)
    .post(sessionChecker, dataprodukkeluar.createAction);

};
