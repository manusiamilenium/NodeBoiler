const Joi = require('@hapi/joi')
const schema = Joi.object({
    tahun_penggunaan_alsus: Joi.number().min(2000).required()
    .messages({ 
        "number.min": "Format tahun salah", 
        "any.required": "Tahun harus diisi"
      }),
    jumlah_penggunaan_alsus: Joi.number().min(1).required()
    .messages({ 
        "number.min": "Format jumlah salah", 
        "any.required": "Jumlah harus diisi"
      }),
});
 
module.exports = (body)=>{
    return schema.validate(body);
}