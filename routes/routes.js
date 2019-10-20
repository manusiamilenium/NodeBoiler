'use strict';

module.exports = function (app) {
    var user = require('../controller/user');

    app.route('/')
        .get(user.index);

    app.route('/users')
        .get(user.users);

    app.route('/users/:user_id')
        .get(user.findUsers);

    app.route('/users')
        .post(user.createUsers);

    app.route('/users')
        .put(user.updateUsers);

    app.route('/users')
        .delete(user.deleteUsers);
};