const Joi = require('joi');

const login = Joi.object().keys({
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().required()
});

module.exports = {
    login
};