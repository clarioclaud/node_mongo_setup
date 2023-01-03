const Joi = require('joi');

const fileUpload = Joi.object().keys({
    file: Joi.string()
}); 

module.exports = {
    fileUpload
};