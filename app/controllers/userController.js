const userModel = require('../models/user');
const otpModel = require('../models/otp');
const { hashPassword, comparePassword } = require('../helpers/passwordHelper');
const otpHelper = require('../helpers/otpHelper');
const mailconfig = require('../services/mailService');
const jwt = require('../services/jwtService');
const mailoption = require('../mail/mailOptions');
const moment = require('moment');

class UserController {
    create = async(req, res) => {

        const user = {
            email: req.body.email,
            //password: await hashPassword(req.body.password)
        };     

        const userCreate = new userModel.User(user);

        await userCreate.save().then(async result => {
            
            const otp = otpHelper.otpGenerate();

            otp.email = result.email;
            
            await new otpModel.Otp(otp).save().then(data => {

                mailconfig.transporter.sendMail(mailoption.otpMailOptions(result.email, data.otp)).then(info => {
                    
                    console.log(info);
        
                }).catch(err => {
        
                    console.error('Error while sending email '+err.message);
        
                });

                return res.status(200).send({
                    message: 'Registered Successfully, OTP sent to your email to verify',
                    data: result,
                    otp: data.otp
                });

            }).catch(err => {

                return res.status(500).send({
                    message: 'OTP failed to send',
                })
            });         

        }).catch(err => {

            return res.status(500).send({
                message: err.message,
            })
        });

        
    }

    
    confirmOtp = async(req,res) => {

        const user = await userModel.User.exists({email: req.body.email});
            
        if (user) {

            const otp = await otpModel.Otp.findOne({email: req.body.email}).sort({'createdAt': -1}).limit(1);
                
            if ((otp.otp == req.body.otp) && (otp.expired_at > moment().format('YYYY-MM-DD HH:mm'))) {
                
                await userModel.User.updateOne({ _id: user }, { $set: { is_email_verified: 1 } });

                const verify = await otpModel.Otp.updateOne({ _id: otp._id }, { $set: { is_verified: 1 } });

                return res.status(200).send({
                    message: 'Otp Verified.  You can login by creating the password',
                    data: verify           
                });
            }

            return res.status(404).send({
                message: 'Otp is not verified. Try to resend the verfification email',
            });
            

        } else {

            return res.status(404).send({
                message: 'No user found',
            });
        }         

    }

    login = async(req, res) => {

        const user = await userModel.User.findOne({email: req.body.email, is_deleted:0}).select('+password');
        
        if (user.is_email_verified == 0) {

            return res.status(400).send({
                'message': 'You need to verify your email',
            });
        }

        if (user && await comparePassword(req.body.password, user.password)) {
            
            const data = {
                "_id": user._id,
                "email": user.email,
                "is_email_verified": user.is_email_verified,
                "is_deleted": user.is_deleted,
            }
            data.token = await jwt.generateToken(data);

            return res.status(200).send({
                'message': 'Login Successfully',
                data: data
            });

        } else {
            return res.status(404).send({
                message: 'No users found'
            }); 
        }
    }

    dashboard = async(req, res) => {

        const user = await userModel.User.findOne({email: req.user.email});

        if (user) {

            return res.status(200).send({
                'message': 'User Details Fetched',
                data: user 
            });

        } else {

            return res.status(404).send({
                message: 'No users found'
            }); 
        }
    }

    password = async(req, res) => {

        const user = await userModel.User.findOne({email: req.body.email});

        if (!user) {

            return res.status(404).send({
                message: user
            });
        }

        if (req.body.password !== req.body.confirm_password) {

            return res.status(400).send({
                message: 'Password and Confirm Password should be same'
            });
        }

        const hashedPassword = await hashPassword(req.body.password);

        await userModel.User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } }).then(result => {
            
            return res.status(200).send({
                message: 'Password changed',
                data: result
            });

        }).catch(err => {

            return res.status(500).send({
                message: err.message,
            });  
        });

        

    }
}

module.exports = new UserController();