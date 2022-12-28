const express = require('express');
const router = express.Router();

const validationMiddleware = require('../app/middleware/validation');
const { userAuthenticate } = require('../app/middleware/authenticate');
const userSchemaValidation = require('../app/validation/userValidation');
const confirmOtpValidation = require('../app/validation/confirmOtpValidation');
const loginValidation = require('../app/validation/loginValidation');
const passwordValidation = require('../app/validation/passwordValidation');
const userController = require('../app/controllers/userController');

router.post('/register', validationMiddleware.validation(userSchemaValidation.userSchema), userController.create);
router.post('/confirmOtp', validationMiddleware.validation(confirmOtpValidation.confirmOtp), userController.confirmOtp);
router.post('/createPassword', validationMiddleware.validation(passwordValidation.password), userController.password);
router.post('/forgotPassword', validationMiddleware.validation(passwordValidation.password), userController.password);
router.post('/resetPassword', validationMiddleware.validation(passwordValidation.password), userController.password);
router.post('/login', validationMiddleware.validation(loginValidation.login), userController.login);
router.get('/dashboard', userAuthenticate, userController.dashboard);

module.exports = router;