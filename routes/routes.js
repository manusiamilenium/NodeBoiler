'use strict';
var tokenize = require('../services/TokenValidator');
var refresh = require('../services/RefreshToken');
module.exports = function (app) {
    var user = require('../controller/user');

    app.route('/')
        .get(tokenize,user.index);

    app.route('/users')
        .get(tokenize,user.users);

    app.route('/users/:user_id')
        .get(tokenize,user.findUsers);

    app.route('/users')
        .post(tokenize,user.createUsers);

    app.route('/users')
        .put(tokenize,user.updateUsers);

    app.route('/users')
        .delete(tokenize,user.deleteUsers);

    app.route('/login')
        .post(user.login);

};