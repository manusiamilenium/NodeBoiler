'use strict';

module.exports = function (app, sessionChecker) {
    var potensigangguan = require('../controller/potensigangguan');

    app.route('/potensigangguan')
        .get(sessionChecker, potensigangguan.index)
        .post(sessionChecker, potensigangguan.createAction);
    app.route('/potensigangguan/:id_potensi_gangguan')
        .get(sessionChecker, potensigangguan.create);
    app.route('/potensigangguan/add')
        .get(sessionChecker, potensigangguan.create);
    app.route('/potensigangguan/edit')
        .post(sessionChecker, potensigangguan.updateAction);
    app.route('/potensigangguan/delete/:id_potensi_gangguan')
        .get(sessionChecker, potensigangguan.delete);
        app.route('/potensigangguan/file/:id_potensi_gangguan')
        .get(sessionChecker, potensigangguan.fileDownload);
    app.route('/potensigangguandash')
        .get(sessionChecker, potensigangguan.dash)

};
