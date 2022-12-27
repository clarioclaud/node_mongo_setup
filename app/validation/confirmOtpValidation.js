const Joi = require('joi');

const confirmOtp = Joi.object().keys({
    email: Joi.string().email().trim(true).required(),
    otp: Joi.string().required()
});

module.exports = {
    confirmOtp
};