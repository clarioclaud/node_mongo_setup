const { verify } = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../../config/config');

const transporter = nodemailer.createTransport({
    // host: config.MAIL_HOST,
    // port: config.MAIL_PORT,
    // secure: false,
    // requireTLS: true,
    service: 'gmail',
    auth: {
        user: config.MAIL_USERNAME,
        pass: config.MAIL_PASSWORD
    }
});

module.exports = {
    transporter
};