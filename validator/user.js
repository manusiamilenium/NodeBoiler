const Joi = require('@hapi/joi')
const schemaLogin = Joi.object({
    username: Joi.string() 
                .required()
                .messages({ 
                    "string.empty": "Username harus diisi",
                    //"string.min": `"username" should have a minimum length of {#limit}`,
                    //"string.max": `"username" should have a maximum length of {#limit}`,
                    "any.required": "Username harus diisi"
                  }),
    password: Joi.string() 
                .required()
                .messages({ 
                    "string.empty": "Password harus diisi", 
                    "any.required": "Password harus diisi"
                  }),

});
const schemaChangePass = Joi.object({
     
    password: Joi.string()
                .alphanum()
                .min(5)
                .max(30)
                .required()
                .messages({ 
                    "string.empty": "Password lama harus diisi", 
                    "string.min": `Password minimal {#limit} huruf`,
                    "any.required": "Password lama harus diisi"
                  }),
    password_new: Joi.string()
                .alphanum()
                .min(5)
                .max(30)
                .required()
                .messages({ 
                    "string.empty": "Password baru harus diisi", 
                    "string.min": `Password baru minimal {#limit} huruf`,
                    "any.required": "Password baru harus diisi"
                  }),
    repassword_new: Joi.string()
                .alphanum()
                .min(5)
                .max(30)
                .required()
                .valid(Joi.ref("password_new"))
                .messages({ 
                    "string.empty": "Password baru harus diisi", 
                    "any.required": "Password baru harus diisi",
                    "string.min": `Password baru minimal {#limit} huruf`, 
                    "any.only": `Password tidak sama`, 
                  }),

});

const validateLogin = (body)=>{
    return schemaLogin.validate(body);
}
const validateChangePass = (body)=>{
    return schemaChangePass.validate(body);
}
module.exports =  {validateLogin,validateChangePass}