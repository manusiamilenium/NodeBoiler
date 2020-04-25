const Joi = require('@hapi/joi')
const schema = Joi.object({
    tahun_penggunaan_alsus: Joi.number().min(2010).required()
    .messages({ 
        "number.min": "Format tahun salah", 
        "any.required": "Tahun harus diisi",
        "number.base": "Format tahun salah",
      }),
    jumlah_penggunaan_alsus: Joi.number().min(1).required()
    .messages({ 
        "number.min": "Format jumlah salah", 
        "any.required": "Jumlah harus diisi",
        "number.base": "Format jumlah salah",
      }),
});
 
module.exports = (body)=>{
    return schema.validate(body);
}