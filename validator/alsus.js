const { body, validationResult } = require('express-validator')
const validationRules = () => {
    return [

        body('tahun_penggunaan_alsus').isNumeric().withMessage('Format harus Angka').isLength({ min: 5 }).withMessage('Format Tahun Salah'),

        body('jumlah_penggunaan_alsus').isNumeric().withMessage('Format Jumlah Salah').isLength({ min: 1 }).withMessage('Jumlah Tidak Boleh Kosong'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    let errorString="";
    errors.array().map(err => {
        errorString+=" "+err.msg+", ";
        extractedErrors.push({ [err.param]: err.msg })
    });
    req.session.notification = errorString;
    req.session.notificationtype = "error";
    global.helper.render('alsus_data_add', req, res, { edit: "", data: req.body });
}

module.exports = {
    validationRules,
    validate,
}