'use strict';

module.exports = function (app, sessionChecker) {
    var jenisintel = require('../controller/jenisintel');

    app.route('/jenis_kegiatan_intelijen')
        .get(sessionChecker, jenisintel.index)
        .post(sessionChecker, jenisintel.createAction);
    app.route('/jenis_kegiatan_intelijen/:id_jenis')
        .get(sessionChecker, jenisintel.create);
    app.route('/jenis_kegiatan_intelijen/add')
        .get(sessionChecker, jenisintel.create);
    app.route('/jenis_kegiatan_intelijen/edit')
        .post(sessionChecker, jenisintel.updateAction);
    app.route('/jenis_kegiatan_intelijen/delete/:id_jenis')
        .get(sessionChecker, jenisintel.delete);
};
