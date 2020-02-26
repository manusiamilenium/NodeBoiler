'use strict';
 
module.exports = function (app, sessionChecker) {
    var dataprodukintel = require('../controller/dataprodukintel');

    app.route('/dataprodukintel')
        .get(sessionChecker, dataprodukintel.index)
        .post(sessionChecker, dataprodukintel.createAction);
    app.route('/dataprodukintel/:id_data_produk_intelijen')
        .get(sessionChecker, dataprodukintel.create);
    app.route('/dataprodukintel/add')
        .get(sessionChecker, dataprodukintel.create);
    app.route('/dataprodukintel/edit')
        .post(sessionChecker, dataprodukintel.updateAction);
    app.route('/dataprodukintel/delete/:id_data_produk_intelijen')
        .get(sessionChecker, dataprodukintel.delete);

};
