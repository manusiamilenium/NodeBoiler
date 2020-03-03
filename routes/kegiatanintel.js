'use strict';

module.exports = function (app, sessionChecker) {
    var kegiatanintel = require('../controller/kegiatanintel');

    app.route('/kegiatanintel')
        .get(sessionChecker, kegiatanintel.index);
 
    app.route('/kegiatanintel/add')
        .get(sessionChecker, kegiatanintel.create)
        .post(sessionChecker, kegiatanintel.createAction);
        app.route('/kegiatanintel/delete/:id_kegiatan_intelijen')
        .get(sessionChecker, kegiatanintel.delete);
};
