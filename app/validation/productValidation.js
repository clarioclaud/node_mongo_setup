const Joi = require('joi');

const product = Joi.object().keys({
    name: Joi.string().required(true),
    serial_no : Joi.string().required(true),
    price: Joi.number().required(true),
    image: Joi.any(),
    expiry: Joi.date().required(true).greater(Date.now()+ 48 * 60 * 60 * 1000)
});

module.exports = {
    product
};