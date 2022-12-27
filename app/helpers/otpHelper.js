const moment = require('moment');
const { EXPIRE_TIME } = require('../../config/config');
const otpModel = require('../models/otp');

const otpGenerate = () => {

    const otp = Math.floor(1000 + Math.random() * 9000);

    const otp_expiry_at = moment().add(EXPIRE_TIME, 'minutes').format('Y-M-D HH:mm');

    const otp_details = {
        otp : otp,
        expired_at : otp_expiry_at
    };

    return otp_details;

};

module.exports = {
    otpGenerate
};

