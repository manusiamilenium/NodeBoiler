'use strict';
 
module.exports = function (app,sessionChecker) {
    var user = require('../controller/user');
     
    app.route('/login')
        .get(user.index)
        .post(user.login);
     app.route('/user/changep')
        .get(sessionChecker,user.changep)
        .post(sessionChecker,user.changepaction);
};
