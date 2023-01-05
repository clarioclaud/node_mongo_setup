const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_EXPIRES_AT, JWT_TOKEN_SOURCE } = require('../../config/config');

const generateToken = (user) => {
    try {
        const payload = {
            source: JWT_TOKEN_SOURCE,
            ...user
        }

        return jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRES_AT
        });

    } catch (error) {

        throw error;
    }
}

const verifyToken = async (token) => {
    try {

        return jwt.verify(token, JWT_SECRET_KEY);

    } catch (error) {

        throw error;
    }
}

module.exports = {
    generateToken,
    verifyToken
};
 