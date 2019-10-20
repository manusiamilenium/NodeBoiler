'use strict';

var response = require('../result');
var connection = require('../connection');
var model = require('../model/usermodel');

exports.users = function (req, res) {
    model.getUsers(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });

};

exports.index = function (req, res) {
    response.ok("Hello world!", res)
};

exports.findUsers = function (req, res) {
    var user_id = req.params.user_id;
    model.getUser(user_id, function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};
exports.createUsers = function (req, res) {

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    model.addUser([first_name, last_name], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok("Berhasil menambahkan user!", res)
        }
    });

};

exports.updateUsers = function (req, res) {

    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    model.editUser([first_name, last_name, user_id], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function (req, res) {

    var user_id = req.body.user_id;
    model.deleteUser([user_id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Berhasil menghapus user!", res)
            }
        });
};