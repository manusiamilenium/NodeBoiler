const Joi = require('@hapi/joi')
const helper = require('./helper.js')
const wordValidation = (value, helpers) => { 

    if (helper.wordCount(value) > 50) {
      return helpers.error("any.invalid");
    }
   
    return value;
  };

const schema = Joi.object({
  bulan: Joi.number().required().min(1).max(12)
    .messages({ 
        "number.min": "Format bulan kejadian salah", 
        "number.invalid": "Bulan kejadian salah", 
        "any.required": "bulan kejadian harus diisi"
      }),
      tahun_kejadian_menonjol: Joi.number().min(2000).required()
      .messages({ 
          "number.min": "Format tahun salah", 
          "any.required": "Tahun harus diisi"
        }),
  jumlah_kejadian_menonjol: Joi.number().min(1).required()
    .messages({ 
        "number.min": "Format jumlah salah", 
        "any.required": "Jumlah harus diisi"
      }),
  uraian_kejadian_menonjol: Joi.string().custom(wordValidation,'uraian 100 kata').required()
      .messages({ 
          "any.invalid": "Kalimat terlalu panjang, maksimal 50 kata", 
          "any.required": "Jumlah harus diisi"
        }),
    id_subdit: Joi.number().required()
        .messages({  
            "any.required": "Subdit harus dipilih"
          }),
});
 
module.exports = (body)=>{
    return schema.validate(body);
}