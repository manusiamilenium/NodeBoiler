'use strict';

var response = require('../result');
var model = require('../model/dataprodukkeluar');
var uamodel = require('../model/useractivity');
var pmodel = require('../model/produkkeluar');
var produkintelmodel = require('../model/produkintel');
var refprodukkeluar = require('../model/refprodukkeluar');
var pengirimanproduk = require('../model/pengirimanproduk');
var moment = require('moment');
exports.index = function (req, res) {
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    var id_user = req.session.user[0].id_user;
    pmodel.getData([id_jenis_produk_keluar], function (error, rows, fields) {
        title = rows[0]['nama_jenis_produk_keluar'];
    });
    var title = "";
    model.getAll([id_jenis_produk_keluar,id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification;
            delete req.session.notificationtype;
            res.render('dataprodukkeluar', { moment: moment, data: rows, id_jenis_produk_keluar: id_jenis_produk_keluar, notification: notification, nottype: nottype, title: title });

        }
    });
};
exports.createAction = function (req, res) {


    var multer = require('multer');
    var path = require('path');
    const storage = multer.diskStorage({
        destination: path.join(__dirname + './../public/img/'),
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() +
                path.extname(file.originalname));
        }
    });
    const fileFilter = function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(pdf|PDF|jpg|JPG|jpeg|JPEG|PNG|png)$/)) {
            req.fileValidationError = 'Only pdf,png and jpg files are allowed!';
            return cb(new Error('Only pdf, png and jpg  files are allowed!'), false);
        }
        cb(null, true);
    };
    let upload = multer({ storage: storage, fileFilter: fileFilter }).any();
    upload(req, res, function (err) {
        req.session.notificationtype = "error";
        if (req.fileValidationError) {
            req.session.notification = req.fileValidationError;
        }
        else if (!req.file) {
            req.session.notification = 'Please select an file to upload';
        }
        else if (err instanceof multer.MulterError) {
            req.session.notification = 'Please select an file to upload';
        }
        else if (err) {
            req.session.notification = 'Please select an file to upload';
        }


        var id_user = req.session.user[0].id_user;
        var id_jenis_produk_keluar = req.body.id_jenis_produk_keluar;
        var nomor_produk_keluar = req.body.nomor_produk_keluar;
        var tanggal_produk_keluar = req.body.tanggal_produk_keluar;
        var kepada_produk_keluar = req.body.kepada_produk_keluar;
        var satker_produk_keluar = req.body.satker_produk_keluar;
        var perihal_produk_keluar = req.body.perihal_produk_keluar;
        model.add([id_user, id_jenis_produk_keluar, nomor_produk_keluar, tanggal_produk_keluar, kepada_produk_keluar, satker_produk_keluar, perihal_produk_keluar], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {

                var insertid = rows.insertId;
                for (let index = 0; index < req.files.length; index++) {
                    const file = req.files[index];
                    var nomor_ref_produk_keluar = req.body.input[index].nomor_ref_produk_keluar;
                    var jenis_ref_produk_keluar = req.body.input[index].jenis_produk_intelijen;
                    const fs = require('fs');
                    var img = fs.readFileSync(file.path);
                    var encode_image = img.toString('base64');
                    var buff = new Buffer(encode_image, 'base64')
                    refprodukkeluar.add([insertid, nomor_ref_produk_keluar, jenis_ref_produk_keluar, buff], function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                        } else {
                            if (index == req.files.length - 1) {
                                uamodel.add([id_user, "Mengisi Data Produk Keluar"], function (error, rows, fields) {
                                    if (error) {
                                        console.log(error)
                                    }
                                });
                                req.session.notification = "Berhasil Ditambah";
                                req.session.notificationtype = "success";
                                res.redirect('/dataprodukkeluar/' + id_jenis_produk_keluar);
                            }
                        }
                    });
                }




            }
        });



    });
    /*
    */
};
exports.create = function (req, res) {
    var id_produk_keluar = req.params.id_produk_keluar;
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    var jenis = [];
    var id_user = req.session.user[0].id_user;
    produkintelmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            jenis = await rows;
        }
    });
    pmodel.getData([id_jenis_produk_keluar,id_user], function (error, rows, fields) {
        title = rows[0]['nama_jenis_produk_keluar'];
    });
    model.getData([id_produk_keluar,id_user], function (error, rows, fields) {
        if (error) {
            console.log(error);

        } else {
            if (rows[0]) { 
                res.render('dataprodukkeluaradd', { data: rows[0], jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "edit", title: title });
            } else {
                res.render('dataprodukkeluaradd', { jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "", title: title });
            }
        }
    });


};

exports.updateAction = function (req, res) {

    var id_user = req.session.user[0].id_user;
    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan_data_produk_intelijen;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;

    model.edit([id_user, id_subdit, tahun_data_produk_intelijen, bulan_data_produk_intelijen, jenis_produk_intelijen, jumlah_data_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Data Intelijen"], function (error, rows, fields) { });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/dataprodukintel');

        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_produk_keluar = req.params.id_produk_keluar;
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    refprodukkeluar.deleteAll([id_produk_keluar],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                model.delete([id_produk_keluar],
                    function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                        } else {
                            uamodel.add([id_user, "Menghapus Data Produk Keluar Intelijen"], function (error, rows, fields) {
                                if (error) {
                                    console.log(error)
                                }
                            });
                            req.session.notification = "Berhasil Dihapus";
                            req.session.notificationtype = "success";
                            res.redirect('/dataprodukkeluar/'+id_jenis_produk_keluar);
            
                        }
                    });

            }
        });

    
};
exports.indexpengiriman = function (req, res) {
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    var id_user = req.session.user[0].id_user;
    
    pengirimanproduk.getAll([id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification;
            delete req.session.notificationtype;
            res.render('pengirimanproduk', { moment: moment, data: rows, id_jenis_produk_keluar: id_jenis_produk_keluar, notification: notification, nottype: nottype, });

        }
    });
};
exports.pengiriman = function (req, res) {
    var jenis = [];
    var id_produk_keluar = req.params.id_produk_keluar;
    var id_user = req.session.user[0].id_user;
    produkintelmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            jenis = await rows;
        }
    });

    pengirimanproduk.getData([id_produk_keluar,id_user], function (error, rows, fields) {
        if (error) {
            console.log(error);

        } else {
            if (rows[0]) { 
                res.render('pengirimanprodukintel', { data: rows[0], jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "edit", title: title });
            } else {
                res.render('pengirimanprodukintel', { jenis: jenis });
            }
        }
    });
};
exports.deletepengiriman = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_produk_keluar = req.params.id_produk_keluar;

    pengirimanproduk.delete([id_produk_keluar],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user, "Menghapus Data Pengiriman Produk Keluar"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/pengirimanproduk/');

            }
        });

};

exports.pengirimanAction = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var nomor_produk_keluar = req.body.nomor_produk_keluar;
    var tanggal_produk_keluar = req.body.tanggal_produk_keluar;
    var perihal_produk_keluar = req.body.perihal_produk_keluar;
    //console.log(req.body);
    pengirimanproduk.add([id_user, tanggal_produk_keluar, perihal_produk_keluar, jenis_produk_intelijen, nomor_produk_keluar,], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user, "Mengisi Data Produk Intelijen Keluar"], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/pengirimanproduk/');
        }
    });
};

//////////

exports.delete1 = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_produk_keluar = req.params.id_produk_keluar;
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    refprodukkeluar.deleteAll([id_produk_keluar],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                model.delete([id_produk_keluar],
                    function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                        } else {
                            uamodel.add([id_user, "Menghapus Data Produk Keluar Intelijen"], function (error, rows, fields) {
                                if (error) {
                                    console.log(error)
                                }
                            });
                            req.session.notification = "Berhasil Dihapus";
                            req.session.notificationtype = "success";
                            res.redirect('/dataprodukkeluar/'+id_jenis_produk_keluar);
            
                        }
                    });

            }
        });

    
};

exports.index1 = function (req, res) {
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    var id_user = req.session.user[0].id_user;
    pmodel.getData([id_jenis_produk_keluar], function (error, rows, fields) {
        title = rows[0]['nama_jenis_produk_keluar'];
    });
    var title = "";
    model.getAll([id_jenis_produk_keluar,id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification;
            delete req.session.notificationtype;
            res.render('dataprodukkeluar1', { moment: moment, data: rows, id_jenis_produk_keluar: id_jenis_produk_keluar, notification: notification, nottype: nottype, title: title });

        }
    });
};
exports.create1 = function (req, res) {
    var id_produk_keluar = req.params.id_produk_keluar;
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    var jenis = [];
    var id_user = req.session.user[0].id_user;
    produkintelmodel.getAll(async function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else { 
            jenis = await rows;
        }
    });
    pmodel.getData([id_jenis_produk_keluar], function (error, rows, fields) {
        title = rows[0]['nama_jenis_produk_keluar'];
    });
    model.getData([id_produk_keluar,id_user], function (error, rows, fields) {
        if (error) {
            console.log(error);

        } else {
            if (rows[0]) { 
                res.render('dataprodukkeluaradd1', { data: rows[0], jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "edit", title: title });
            } else {
                res.render('dataprodukkeluaradd1', { jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "", title: title });
            }
        }
    });


};
exports.createAction1 = function (req, res) {
    
    var multer = require('multer');
    var path = require('path');
    const storage = multer.diskStorage({
        destination: path.join(__dirname + './../public/img/'),
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() +
                path.extname(file.originalname));
        }
    });
    const fileFilter = function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(pdf|PDF|jpg|JPG|jpeg|JPEG|PNG|png)$/)) {
            req.fileValidationError = 'Only pdf,png and jpg files are allowed!';
            return cb(new Error('Only pdf, png and jpg  files are allowed!'), false);
        }
        cb(null, true);
    };
    let upload = multer({ storage: storage, fileFilter: fileFilter }).any();
    upload(req, res, function (err) {
        req.session.notificationtype = "error";
        if (req.fileValidationError) {
            req.session.notification = req.fileValidationError;
        }
        else if (!req.file) {
            req.session.notification = 'Please select an file to upload';
        }
        else if (err instanceof multer.MulterError) {
            req.session.notification = 'Please select an file to upload';
        }
        else if (err) {
            req.session.notification = 'Please select an file to upload';
        }


        var id_user = req.session.user[0].id_user;
        var id_jenis_produk_keluar = req.body.id_jenis_produk_keluar;
        var nomor_produk_keluar = req.body.nomor_produk_keluar;
        var tanggal_produk_keluar = req.body.tanggal_produk_keluar;
        var kepada_produk_keluar = req.body.kepada_produk_keluar;
        var satker_produk_keluar = req.body.satker_produk_keluar;
        var perihal_produk_keluar = req.body.perihal_produk_keluar;
        model.add([id_user, id_jenis_produk_keluar, nomor_produk_keluar, tanggal_produk_keluar, kepada_produk_keluar, satker_produk_keluar, perihal_produk_keluar], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {

                var insertid = rows.insertId;
                for (let index = 0; index < req.files.length; index++) {
                    const file = req.files[index];
                    var nomor_ref_produk_keluar = req.body.input[index].nomor_ref_produk_keluar;
                    var jenis_ref_produk_keluar = req.body.input[index].jenis_produk_intelijen;
                    const fs = require('fs');
                    var img = fs.readFileSync(file.path);
                    var encode_image = img.toString('base64');
                    var buff = new Buffer(encode_image, 'base64')
                    refprodukkeluar.add([insertid, nomor_ref_produk_keluar, jenis_ref_produk_keluar, buff], function (error, rows, fields) {
                        if (error) {
                            console.log(error)
                        } else {
                            if (index == req.files.length - 1) {
                                uamodel.add([id_user, "Mengisi Data Produk Keluar"], function (error, rows, fields) {
                                    if (error) {
                                        console.log(error)
                                    }
                                });
                                req.session.notification = "Berhasil Ditambah";
                                req.session.notificationtype = "success";
                                res.redirect('/dataprodukkeluar1/' + id_jenis_produk_keluar);
                            }
                        }
                    });
                }




            }
        });



    });
};