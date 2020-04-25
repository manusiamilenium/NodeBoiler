//nomor_produk_keluar -> number
//id_jenis_produk_keluar -> number
//title -> string
//tanggal_produk_keluar -> date
//kepada_produk_keluar -> string
//perihal_produk_keluar -> string
//input -> array

const Joi = require('@hapi/joi')
const subSchemaInput = Joi.object({
    nomor_ref_produk_keluar: Joi.string().required(),
    jenis_produk_intelijen: Joi.string().required()
}).required();

const schema = Joi.object({
    nomor_produk_keluar: Joi.string().required()
        .messages({
            "any.required": "Nomor harus diisi",
            "string.empty": "Nomor  harus diisi",
        }),
    id_jenis_produk_keluar: Joi.number().required()
        .messages({
            "any.required": "1",
            "number.base": "1",
        }),
    title: Joi.string().required()
        .messages({
            "any.required": "1",
        }),
    tanggal_produk_keluar: Joi.date().required()
        .messages({
            "any.required": "Tanggal produk keluar harus diisi",
            "date.base": "Format tanggal salah (YYYY-MM-DD)",
        }),
    kepada_produk_keluar: Joi.string().required()
        .messages({
            "string.empty": "Kepada tujuan  harus diisi",
            "any.required": "Kepada tujuan produk harus diisi",
        }),
    perihal_produk_keluar: Joi.string().required()
        .messages({
            "string.empty": "Perihal  harus diisi",
            "any.required": "Perihal harus diisi",
        }),
    input: Joi.array().min(1).items().required()
        .messages({
            "any.empty": "Produk dasar surat harus diupload",
            "any.required": "Produk dasar surat harus diupload",
        }),
});

module.exports = (body) => {
    return schema.validate(body);
}