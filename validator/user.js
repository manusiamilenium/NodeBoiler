const Joi = require('@hapi/joi')
const schemaLogin = Joi.object({
    username: Joi.string()
                .alphanum() 
                .required(),
    password: Joi.string()
                .alphanum() 
                .required(), 

});
const schemaChangePass = Joi.object({
     
    password: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
    password_new: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
    repassword_new: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required().equal(Joi.ref("password_new")),

});

const validateLogin = (body)=>{
    return schemaLogin.validate(body);
}
const validateChangePass = (body)=>{
    return schemaChangePass.validate(body);
}
module.exports =  {validateLogin,validateChangePass}