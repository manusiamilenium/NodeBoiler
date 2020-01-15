'use strict';

module.exports = function (app, sessionChecker) {
    var produkintel = require('../controller/produkintel');

    app.route('/produkintel')
        .get(sessionChecker, produkintel.index)
        .post(sessionChecker, produkintel.createAction);
    app.route('/produkintel/:id_produk_intelijen')
        .get(sessionChecker, produkintel.create);
    app.route('/produkintel/add')
        .get(sessionChecker, produkintel.create);
    app.route('/produkintel/edit')
        .post(sessionChecker, produkintel.updateAction);
    app.route('/produkintel/delete/:id_produk_intelijen')
        .get(sessionChecker, produkintel.delete);
};
