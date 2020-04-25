const Joi = require('@hapi/joi')
const schema = Joi.object({
    value_index_kepuasan: Joi.number().required()
        .messages({
            "any.required": "Nilai Index harus diisi",
            "number.base": "Nilai Index harus diisi",
        }),
});

module.exports = (body) => {
    return schema.validate(body);
}