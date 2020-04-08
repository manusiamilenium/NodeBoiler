const Joi = require('@hapi/joi')
const schema = Joi.object({
    tahun_penggunaan_alsus: Joi.number().min(4).required(),
    jumlah_penggunaan_alsus: Joi.number().min(1).required(),
});
 
module.exports = (body)=>{
    return schema.validate(body);
}