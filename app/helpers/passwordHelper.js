const bcrypt = require('bcrypt');
const { BCRYPT_SALT } = require('../../config/config');

const hashPassword = async(password) => {

    const salt = await bcrypt.genSalt(Number(BCRYPT_SALT));

    return bcrypt.hash(password, salt);
};

const comparePassword = async(password, hashedPassword) => {

    return bcrypt.compare(password, hashedPassword);

};

module.exports = {
    hashPassword,
    comparePassword
}
