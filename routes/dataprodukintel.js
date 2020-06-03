'use strict';
 
module.exports = function (app, sessionChecker,cacheCheck) {
    var dataprodukintel = require('../controller/dataprodukintel');

    app.route('/dataprodukintel')
        .get(sessionChecker,cacheCheck, dataprodukintel.index);
    app.route('/dataprodukintel/:id_data_produk_intelijen')
        .get(sessionChecker, dataprodukintel.create);
    app.route('/dataprodukintel/add')
        .get(sessionChecker, dataprodukintel.create)
        .post(sessionChecker, dataprodukintel.createAction);
    app.route('/dataprodukintel/edit')
        .post(sessionChecker, dataprodukintel.updateAction);
    app.route('/dataprodukintel/delete/:id_data_produk_intelijen')
        .get(sessionChecker, dataprodukintel.delete);

};
