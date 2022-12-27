const email = require('../services/mailService');
const { MAIL_USERNAME, EXPIRE_TIME, APP_NAME } = require('../../config/config')

class mailOptions {

    otpMailOptions = (toMail, otp) => {

        const options = {
            from: MAIL_USERNAME,
            to: toMail,
            subject: 'Verification Email',
            text: APP_NAME,
            html: `<b>Verify Your Email</b><br>
                   <h4>Your OTP is ${otp} which is expired within ${EXPIRE_TIME} minutes<h4><br>
                   <p>Thanks & Regards<br>
                   ${APP_NAME}</p>`
        }

        return options;
    }
}

module.exports = new mailOptions();