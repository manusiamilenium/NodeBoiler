/*
var bulan_kegiatan_intelijen = req.body.bulan;
    var tahun_kegiatan_intelijen = req.body.tahun_kegiatan_intelijen;
    var jenis_kegiatan_intelijen = req.body.jenis_kegiatan_intelijen;
    var jumlah_kegiatan_intelijen = req.body.jumlah_kegiatan_intelijen;
    var reduksi_kegiatan_intelijen = req.body.reduksi_kegiatan_intelijen;
    var uraian_kegiatan_intelijen = req.body.uraian_kegiatan_intelijen;
    */
const Joi = require('@hapi/joi')
const helper = require('./helper.js')
const wordValidation = (value, helpers) => {

    if (helper.wordCount(value) > 50) {
        return helpers.error("any.invalid");
    }

    return value;
};
const schema = Joi.object({
    tahun_kegiatan_intelijen: Joi.number().required().min(2010)
        .messages({
            "number.min": "Format tahun salah *misal 2010", 
            "any.required": "Tahun harus diisi",
            "number.base": "Format tahun salah",
        }),
    jenis_kegiatan_intelijen: Joi.number().required()
        .messages({
            "any.required": "Jenis Kegiatan harus dipilih",
            "number.base": "Jenis Kegiatan harus dipilih",
        }),
    jumlah_kegiatan_intelijen: Joi.number().min(1).required()
        .messages({
            "number.min": "Format Total kegiatan salah",
            "any.required": "Total kegiatan harus diisi",
            "number.base": "Format Total kegiatan salah",
        }),
    reduksi_kegiatan_intelijen: Joi.number().min(1).required()
        .messages({
            "number.min": "Format jumlah reduksi salah",
            "any.required": "Jumlah reduksi harus diisi",
            "number.base": "Format Total kegiatan mereduksi salah",
        }),
    uraian_kegiatan_intelijen: Joi.string().custom(wordValidation, 'uraian 100 kata').required()
        .messages({
            "any.invalid": "Kalimat terlalu panjang, maksimal 50 kata",
            "string.empty": "Uraian harus diisi"
        }),
        bulan: Joi.number().required().min(1).max(12)
        .messages({
            "number.min": "Bulan harus dipilih",
            "number.invalid": "Bulan harus dipilih",
            "number.required": "Bulan harus dipilih",
            "number.base": "Bulan harus dipilih",
        }),
});

module.exports = (body) => {
    return schema.validate(body);
}