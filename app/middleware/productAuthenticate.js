const { KEY } = require('../../config/config');

const token = (req, res, next) => {

    if (!req.headers.token) {

        return res.status(403).send({

            message: 'Token is required'

        });
    }

    if (req.headers.token !== KEY) {

        return res.status(403).send({

            message: 'Invalid Token'

        });
    }

    next();
}

module.exports = {
    token
};