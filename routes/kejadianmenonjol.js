'use strict';

module.exports = function (app, sessionChecker) {
    var kejadianmenonjol = require('../controller/kejadianmenonjol');

    app.route('/kejadianmenonjol')
        .get(sessionChecker, kejadianmenonjol.index)
        .post(sessionChecker, kejadianmenonjol.createAction);
    app.route('/kejadianmenonjol/:id_kejadian_menonjol')
        .get(sessionChecker, kejadianmenonjol.create);
    app.route('/kejadianmenonjol/add')
        .get(sessionChecker, kejadianmenonjol.create);
    app.route('/kejadianmenonjol/edit')
        .post(sessionChecker, kejadianmenonjol.updateAction);
    app.route('/kejadianmenonjol/delete/:id_kejadian_menonjol')
        .get(sessionChecker, kejadianmenonjol.delete);

};
