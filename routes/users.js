'use strict';
 
module.exports = function (app,sessionChecker) {
    var user = require('../controller/user');
     
    app.route('/login')
        .get(user.index)
        .post(user.login);
     app.route('/user/changep')
        .get(sessionChecker,user.changep)
        .post(sessionChecker,user.changepaction);
    /*
    app.route('/users')
        .get(tokenize, user.users);

    app.route('/users/:user_id')
        .get(tokenize, user.findUsers);

    app.route('/users')
        .post(tokenize, user.createUsers);

    app.route('/users')
        .put(tokenize, user.updateUsers);

    app.route('/users')
        .delete(tokenize, user.deleteUsers);
    */
};
