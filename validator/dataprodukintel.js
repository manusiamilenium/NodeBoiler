//subdit
//jenis
//thun
//jumlah
const Joi = require('@hapi/joi')
const schema = Joi.object({
    id_subdit: Joi.number().required()
        .messages({
            "any.required": "Subdit harus dipilih",
            "number.base": "Subdit harus dipilih",
        }),
    jenis_produk_intelijen: Joi.number().required()
        .messages({
            "any.required": "Jenis Produk harus dipilih",
            "number.base": "Jenis Produk harus dipilih",
        }),
    tahun_data_produk_intelijen: Joi.number().required().min(2010)
        .messages({
            "number.min": "Format tahun produk salah",
            "number.invalid": "Tahun produk salah",
            "any.required": "tahun harus diisi"
        }),
    jumlah_data_produk_intelijen: Joi.number().min(1).required()
        .messages({
            "number.min": "Format jumlah salah",
            "any.required": "Jumlah harus diisi"
        }),
    bulan: Joi.number().required().min(1).max(12)
        .messages({
            "number.min": "Bulan harus dipilih",
            "number.invalid": "Bulan harus dipilih",
            "any.required": "Bulan harus dipilih",
            "number.base": "Bulan harus dipilih",
        }),
});

module.exports = (body) => {
    return schema.validate(body);
}