'use strict';
 
module.exports = function (app,sessionChecker) {
    var subdit = require('../controller/subdit');
     
    //master subdit
    app.route('/subdits')
        .get(sessionChecker, subdit.index)
        .post(sessionChecker, subdit.createAction);
    app.route('/subdits/:id_subdit')
        .get(sessionChecker, subdit.create);
    app.route('/subdits/add')
        .get(sessionChecker, subdit.create);
    app.route('/subdits/edit')
        .post(sessionChecker, subdit.updateAction);
    app.route('/subdits/delete/:id_subdit')
        .get(sessionChecker, subdit.delete);
};
