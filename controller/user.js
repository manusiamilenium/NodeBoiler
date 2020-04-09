'use strict';


var model = require('../model/usermodel');
const {validateLogin,validateChangePass} = require('../validator/user.js');

exports.index = function (req, res) {
   
    global.helper.render('login',req,res);

};
exports.changep = function (req, res) {
    global.helper.render('userchangepassword',req,res,{data: {},});
};
exports.changepaction = function (req, res) {
    var password_old = req.body.password,
        password_new = req.body.password_new;  
    const error = validateChangePass(req.body).error;
    if (!error) {
         
            model.getUser([req.session.user.username], function (error, rows, fields) {
                if (error) {
                    global.helper.render('userchangepassword',req,res,{data: req.body,});
                    //res.render('userchangepassword');
                } else {
                    if ((rows.length > 0) && (password_old == rows[0].password)) {
                        
                        model.editPassword([password_new,req.session.user.id_user], function (error, rows, fields) {
                            if (error) {
                                req.session.notification = "Penggantian password tidak berhasil ";
                                req.session.notificationtype = "error";
                                global.helper.render('userchangepassword',req,res,{data: {},});
                            } else {
                                console.log('this.sql', this.sql); 
                                req.session.notification = "Penggantian password berhasil ";
                                req.session.notificationtype = "success";
                                global.helper.render('userchangepassword',req,res,{data: {},});
                            }
                        });
                        
                        
                    } else {
                        req.session.notification = "Password lama tidak cocok";
                        req.session.notificationtype = "error";
                        global.helper.render('userchangepassword',req,res,{data: req.body,});
                    }
                }
            });
         
    }else{
        req.session.notification = error.message;
        req.session.notificationtype = "error";
        global.helper.render('userchangepassword',req,res,{data: req.body,});
    }
};
exports.login = function (req, res) {
    
    const error = validateLogin(req.body).error;
    if (!error) {
        let username = req.body.username,
        password = req.body.password;
        model.getUser([username], function (error, rows, fields) {
            if (error) {
                req.session.notification = error;
                req.session.notificationtype = "error";
                global.helper.render('login',req,res);
            } else {
                if ((rows.length > 0) && (password == rows[0].password)) {
                    let user = rows[0];
                    user.password = "--------nothing2seehere--------"
                    req.session.user = user;
                    if (req.session.user.role == 1) {
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
        req.session.notification = error.message;
        req.session.notificationtype = "error";
        global.helper.render('login',req,res);
    }

};