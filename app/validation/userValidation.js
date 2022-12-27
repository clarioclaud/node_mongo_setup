const Joi = require('joi');

const userSchema = Joi.object().keys({
    email: Joi.string().email().trim(true).required(),
    //password: Joi.string().min(6).max(20).required()
});

module.exports = {
    userSchema
};