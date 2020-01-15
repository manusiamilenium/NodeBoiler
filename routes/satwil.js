'use strict';
 
module.exports = function (app,sessionChecker) {
    var satwil = require('../controller/satwil');
    //master satwil
    app.route('/')
        .get(sessionChecker, satwil.index);
    app.route('/satwils')
        .get(sessionChecker, satwil.index)
        .post(sessionChecker, satwil.createAction);

    app.route('/satwils/:id_satwil')
        .get(sessionChecker, satwil.create);
    app.route('/satwils/add')
        .get(sessionChecker, satwil.create);
    app.route('/satwils/edit')
        .post(sessionChecker, satwil.updateAction);
    app.route('/satwils/delete/:id_satwil')
        .get(sessionChecker, satwil.delete);
};
