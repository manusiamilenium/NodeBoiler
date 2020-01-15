'use strict';
 
module.exports = function (app,sessionChecker) {
    var satker = require('../controller/satker');
    //master satker
    app.route('/satkers')
        .get(sessionChecker, satker.index)
        .post(sessionChecker, satker.createAction);
    app.route('/satkers/:id_satker')
        .get(sessionChecker, satker.create);
    app.route('/satkers/add')
        .get(sessionChecker, satker.create);
    app.route('/satkers/edit')
        .post(sessionChecker, satker.updateAction);
    app.route('/satkers/delete/:id_satker')
        .get(sessionChecker, satker.delete);
};
