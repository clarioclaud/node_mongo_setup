const Joi = require('joi');

const password = Joi.object().keys({
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(6).max(20).required(),
    confirm_password: Joi.string().required()
});

module.exports = {
    password
};