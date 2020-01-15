'use strict';

module.exports = function (app, sessionChecker) {
    var indexkepuasan = require('../controller/indexkepuasan');

    app.route('/indexkepuasan')
        .get(sessionChecker, indexkepuasan.index)
        .post(sessionChecker, indexkepuasan.createAction);
    app.route('/indexkepuasan/:id_index_kepuasan')
        .get(sessionChecker, indexkepuasan.create);
    app.route('/indexkepuasan/add')
        .get(sessionChecker, indexkepuasan.create);
    app.route('/indexkepuasan/edit')
        .post(sessionChecker, indexkepuasan.updateAction);
    app.route('/indexkepuasan/delete/:id_index_kepuasan')
        .get(sessionChecker, indexkepuasan.delete);
    app.route('/indexkepuasandash')
        .get(sessionChecker, indexkepuasan.dash)

};
