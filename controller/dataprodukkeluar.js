'use strict';

var response = require('../result');
var model = require('../model/dataprodukkeluar');
var uamodel = require('../model/useractivity');
var pmodel = require('../model/produkkeluar');
var produkintelmodel = require('../model/produkintel');
var refprodukkeluar = require('../model/refprodukkeluar');
var pengirimanproduk = require('../model/pengirimanproduk');
var moment = require('moment');
var validation = require('../validator/dataprodukkeluar.js');
exports.index = function (req, res) {
    req.session.menuactive = 3;
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    pmodel.getData([id_jenis_produk_keluar], function (error, rows, fields) {
        var id = rows[0]['id_jenis_produk_keluar']
        title = rows[0]['nama_jenis_produk_keluar'];
        if (id < 5) {
            title += " Terdistribusi ke K/L (IKU3)";
        } else {
            title += " Terdistribusi ke Satuan Kepolisian lain (IKU4)";
        }
        global.helper.render('dataprodukkeluar', req, res, { moment: moment, data: {}, id_jenis_produk_keluar: id_jenis_produk_keluar, title: title });
        /*
        model.getAll([id_jenis_produk_keluar, req.session.user.id_user], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                global.helper.render('dataprodukkeluar', req, res, { moment: moment, data: rows, id_jenis_produk_keluar: id_jenis_produk_keluar, title: title });
            }
        });*/
    });
};
exports.createAction = function (req, res) {


    var multer = require('multer');
    var path = require('path');

    let upload = multer({ storage: global.helper.getUploadStorage(multer, path), fileFilter: global.helper.getFileFilter }).any();
    upload(req, res, function (err) {
        var id_jenis_produk_keluar = req.body.id_jenis_produk_keluar;
        var title = req.body.title;
        const error = validation(req.body).error;
        if (error) {
             
            req.session.notification = error.message;
            req.session.notificationtype = "error";
            global.helper.getRefference(produkintelmodel, function (error, rows) {
                global.helper.render('dataprodukkeluaradd', req, res, { jenis: rows, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "", title: title, data: req.body });
            });
        }
        else {
            var nomor_produk_keluar = req.body.nomor_produk_keluar;
            var tanggal_produk_keluar = req.body.tanggal_produk_keluar;
            var kepada_produk_keluar = req.body.kepada_produk_keluar;
            var satker_produk_keluar = req.body.satker_produk_keluar;
            var perihal_produk_keluar = req.body.perihal_produk_keluar;
            model.add([req.session.user.id_user, id_jenis_produk_keluar, nomor_produk_keluar, tanggal_produk_keluar, kepada_produk_keluar, satker_produk_keluar, perihal_produk_keluar], function (error, rows, fields) {
                if (error) {
                    console.log(error)
                } else {
                    //delete the refference
                    var insertid = rows.insertId;
                    if (req.files.length < 1) {
                        model.delete([insertid],
                            function (error, rows, fields) {
                                if (error) {
                                    console.log(error)
                                } else {
                                    req.session.notification = 'Mohon lengkapi upload dokumen ';
                                    req.session.notificationtype = "error";
                                    global.helper.getRefference(produkintelmodel, function (error, rows) {
                                        global.helper.render('dataprodukkeluaradd', req, res, { jenis: rows, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "", title: title, data: req.body });
                                    });

                                }
                            });

                    } else {
                        for (let index = 0; index < req.files.length; index++) {
                            const file = req.files[index];
                            var nomor_ref_produk_keluar = req.body.input[index].nomor_ref_produk_keluar;
                            var jenis_ref_produk_keluar = req.body.input[index].jenis_produk_intelijen;
                            const fs = require('fs');
                            var img = fs.readFileSync(file.path);
                            var encode_image = img.toString('base64');
                            var buff = Buffer.from(encode_image, 'base64') //new Buffer(encode_image, 'base64')
                            refprodukkeluar.add([insertid, nomor_ref_produk_keluar, jenis_ref_produk_keluar, buff], function (error, rows, fields) {
                                if (error) {
                                    console.log(error)
                                } else {
                                    if (index == req.files.length - 1) {
                                        uamodel.loguser([req.session.user.id_user, "Mengisi Data Produk Keluar"],(r) => { });
                                        req.session.notification = "Berhasil Ditambah";
                                        req.session.notificationtype = "success";
                                        res.redirect('/dataprodukkeluar/' + id_jenis_produk_keluar);
                                    }
                                }
                            });
                        }
                    }

                }
            });
        }

    });

};
exports.create = function (req, res) {
    var id_produk_keluar = req.params.id_produk_keluar;
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    var jenis = [];
    global.helper.getRefference(produkintelmodel, function (error, rows) {
        jenis = rows;
        pmodel.getData([id_jenis_produk_keluar, req.session.user.id_user], function (error, rows, fields) {
            var id = rows[0]['id_jenis_produk_keluar']
            title = rows[0]['nama_jenis_produk_keluar'];
            if (id < 5) {
                title += " Terdistribusi ke K/L (IKU3)";
            } else {
                title += " Terdistribusi ke Satuan Kepolisian lain (IKU4)";
            }
            model.getData([id_produk_keluar, req.session.user.id_user], function (error, rows, fields) {
                if (error) {
                    console.log(error);

                } else {
                    if (rows[0]) {
                        res.render('dataprodukkeluaradd', { data: rows[0], jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "edit", title: title });
                    } else {
                        global.helper.render('dataprodukkeluaradd', req, res, { jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "", title: title, data: {} });
                        //res.render('dataprodukkeluaradd', { jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "", title: title });
                    }
                }
            });

        });
    });

};

exports.updateAction = function (req, res) {

    var id_subdit = req.body.id_subdit;
    var tahun_data_produk_intelijen = req.body.tahun_data_produk_intelijen;
    var bulan_data_produk_intelijen = req.body.bulan_data_produk_intelijen;
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var jumlah_data_produk_intelijen = req.body.jumlah_data_produk_intelijen;

    model.edit([req.session.user.id_user, id_subdit, tahun_data_produk_intelijen, bulan_data_produk_intelijen, jenis_produk_intelijen, jumlah_data_produk_intelijen], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.loguser([req.session.user.id_user, "Mengedit Data Intelijen"],(r) => { }); 
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/dataprodukintel');

        }
    });
};
exports.delete = function (req, res) {
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
                            uamodel.loguser([req.session.user.id_user, "Menghapus Data Produk Keluar Intelijen"],(r) => { });
                            req.session.notification = "Berhasil Dihapus";
                            req.session.notificationtype = "success";
                            res.redirect('/dataprodukkeluar/' + id_jenis_produk_keluar);

                        }
                    });

            }
        });
};
exports.indexpengiriman = function (req, res) {
    var id_jenis_produk_keluar = req.params.id_jenis_produk_keluar;
    var title = "";
    global.helper.render('pengirimanproduk', req, res, { moment: moment, data: {}, id_jenis_produk_keluar: id_jenis_produk_keluar, });
    /*
    pengirimanproduk.getAll([req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            global.helper.render('pengirimanproduk', req, res, { moment: moment, data: rows, id_jenis_produk_keluar: id_jenis_produk_keluar, });
        }
    });*/
};
exports.pengiriman = function (req, res) {
    var id_produk_keluar = req.params.id_produk_keluar;
    global.helper.getRefference(produkintelmodel, function (error, reffs) {
        pengirimanproduk.getData([id_produk_keluar, req.session.user.id_user], function (error, rows, fields) {
            if (error) {
                console.log(error);

            } else {
                if (rows[0]) {
                    res.render('pengirimanprodukintel', { data: rows[0], jenis: jenis, id_jenis_produk_keluar: id_jenis_produk_keluar, edit: "edit", title: title });
                } else {
                    global.helper.render('pengirimanprodukintel', req, res, { jenis: reffs, data: {} });
                    //res.render('pengirimanprodukintel', { jenis: jenis });
                }
            }
        });
    });


};
exports.deletepengiriman = function (req, res) {
    var id_produk_keluar = req.params.id_produk_keluar;
    pengirimanproduk.delete([id_produk_keluar],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.loguser([req.session.user.id_user, "Menghapus Data Pengiriman Produk Keluar"],(r) => { });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/pengirimanproduk/');

            }
        });

};

exports.pengirimanAction = function (req, res) {
    var jenis_produk_intelijen = req.body.jenis_produk_intelijen;
    var nomor_produk_keluar = req.body.nomor_produk_keluar;
    var tanggal_produk_keluar = req.body.tanggal_produk_keluar;
    var perihal_produk_keluar = req.body.perihal_produk_keluar;
    if (nomor_produk_keluar == "" || tanggal_produk_keluar == "" || perihal_produk_keluar == "") {
        req.session.notification = 'Mohon lengkapi isian';
        req.session.notificationtype = "error";
        global.helper.getRefference(produkintelmodel, function (error, reffs) {
            global.helper.render('pengirimanprodukintel', req, res, { jenis: reffs, data: req.body });
        });
    } else {
         
        pengirimanproduk.add([req.session.user.id_user, tanggal_produk_keluar, perihal_produk_keluar, jenis_produk_intelijen, nomor_produk_keluar,], function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.loguser([req.session.user.id_user, "Mengisi Data Produk Intelijen Keluar"],(r) => { });
                req.session.notification = "Berhasil Ditambah";
                req.session.notificationtype = "success";
                res.redirect('/pengirimanproduk/');
            }
        });
    }
};