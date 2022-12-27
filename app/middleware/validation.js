//For Joi validation

const options = {
    abortEarly: true,
    convert: true,
    allowUnknown: true,
    stripUnknown: true
};

const validation = (schema) => {

    return (req, res, next) => {
        const {error} = schema.validate({...req.body, ...req.query, ...req.params, ...req.files}, options);

        const errors = error;

        if (errors != null) {

            return res.status(400).json({
                status: 400,
                message: errors.message
            });
        
        }

        next();
    }

}

module.exports = {
    validation
};