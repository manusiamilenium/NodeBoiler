'use strict'; 

module.exports = function (app, sessionChecker) {
    var alsus = require('../controller/alsus');

    app.route('/alsus')
        .get(sessionChecker, alsus.indexAlsus);
    app.route('/alsus/add')
        .get(sessionChecker, alsus.createAlsus)
        .post(sessionChecker, alsus.createAlsusAction);
    app.route('/alsus/delete/:id_penggunaan_alsus')
        .get(sessionChecker, alsus.deleteAlsus);
    app.route('/alsus/file/:id_penggunaan_alsus')
        .get(sessionChecker, alsus.fileAlsus);
    app.route('/alsus/realisasi')
        .get(sessionChecker, alsus.indexRealisasi);
    app.route('/alsus/realisasiadd')
        .get(sessionChecker, alsus.createAlsusRealisasi)
        .post(sessionChecker, alsus.createAlsusRealisasiAction);
    app.route('/alsus/realisasidelete/:id_realisasi_alsus')
        .get(sessionChecker, alsus.deleteAlsusRealisasi);
     
};