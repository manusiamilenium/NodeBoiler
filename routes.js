'use strict';

module.exports = function(app) {
    var todoList = require('./connection');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);
};