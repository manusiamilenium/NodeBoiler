'use strict';


var model = require('../model/usermodel');


exports.index = function (req, res) {
   
    global.helper.render('login',req,res);

};
exports.changep = function (req, res) {
    global.helper.render('userchangepassword',req,res);
};
exports.changepaction = function (req, res) {
    var password_old = req.body.password_old,
        password_new = req.body.password_new,
        repassword_new = req.body.repassword_new,
        username = req.session.user[0].username,
        user_id = req.session.user[0].id_user; 
    if (password_new != "" && repassword_new != "") {
        if (password_new == repassword_new ) {
            model.getUser([username], function (error, rows, fields) {
                if (error) {
                    global.helper.render('userchangepassword',req,res);
                    //res.render('userchangepassword');
                } else {
                    if ((rows.length > 0) && (password_old == rows[0].password)) {
                        
                        model.editPassword([password_new,user_id], function (error, rows, fields) {
                            if (error) {
                                req.session.notification = "Penggantian password tidak berhasil ";
                                req.session.notificationtype = "error";
                                global.helper.render('userchangepassword',req,res);
                            } else {
                                console.log('this.sql', this.sql); 
                                req.session.notification = "Penggantian password berhasil ";
                                req.session.notificationtype = "success";
                                global.helper.render('userchangepassword',req,res);
                            }
                        });
                        
                        
                    } else {
                        req.session.notification = "Password lama tidak cocok";
                        req.session.notificationtype = "error";
                        global.helper.render('userchangepassword',req,res);
                    }
                }
            });
        }else{
            req.session.notification = "Password dan Ulangi Password Tidak Cocok.";
            req.session.notificationtype = "error";
            global.helper.render('userchangepassword',req,res);
        }
    }else{
        req.session.notification = "Password tidak boleh kosong.";
        req.session.notificationtype = "error";
        global.helper.render('userchangepassword',req,res);
    }
};
exports.login = function (req, res) {
    var username = req.body.username,
        password = req.body.password;
    if (username != "" && password != "") {
        model.getUser([username], function (error, rows, fields) {
            if (error) {
                req.session.notification = error;
                req.session.notificationtype = "error";
                global.helper.render('login',req,res);
            } else {
                if ((rows.length > 0) && (password == rows[0].password)) {
                    req.session.user = rows;
                    if (req.session.user[0].role == 1) {
                        res.redirect('/');
                    }
                    else {
                        res.redirect('/indexkepuasan');
                    }
                } else {
                    req.session.notification = "Username dan Password Salah.";
                    req.session.notificationtype = "error";
                    global.helper.render('login',req,res);
                }
            }
        });
    }
    else {
        req.session.notification = "Username dan Password tidak boleh kosong";
        req.session.notificationtype = "error";
        global.helper.render('login',req,res);
    }

};