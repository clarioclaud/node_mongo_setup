const express = require('express');
const router = express.Router();

const validationMiddleware = require('../app/middleware/validation');
const { userAuthenticate } = require('../app/middleware/authenticate');
const { token } = require('../app/middleware/productAuthenticate');
const userSchemaValidation = require('../app/validation/userValidation');
const confirmOtpValidation = require('../app/validation/confirmOtpValidation');
const loginValidation = require('../app/validation/loginValidation');
const passwordValidation = require('../app/validation/passwordValidation');
const fileValidation = require('../app/validation/fileUploadValidation');
const productValidation = require('../app/validation/productValidation');
const userController = require('../app/controllers/userController');
const productController = require('../app/controllers/productController');
const multer = require('../app/helpers/fileUpload');


//Task 1 email and otp service
router.post('/register', validationMiddleware.validation(userSchemaValidation.userSchema), userController.create);
router.post('/confirmOtp', validationMiddleware.validation(confirmOtpValidation.confirmOtp), userController.confirmOtp);
router.post('/createPassword', validationMiddleware.validation(passwordValidation.password), userController.password);
router.post('/forgotPassword', validationMiddleware.validation(passwordValidation.password), userController.password);
router.post('/resetPassword', validationMiddleware.validation(passwordValidation.password), userController.password);
router.post('/login', validationMiddleware.validation(loginValidation.login), userController.login);
router.get('/dashboard', userAuthenticate, userController.dashboard);

//Task 2 Product Module 
router.post('/uploadCsv', token, multer.upload.single('file'), productController.csvupload);
router.get('/product/:serial_no',token, productController.getProduct);
router.post('/addProduct', token, multer.upload.single('image'), validationMiddleware.validation(productValidation.product), productController.create);
router.put('/updateProduct/:serial_no', token, multer.upload.single('image'), productController.update);
router.delete('/deleteProduct/:serial_no', token, productController.delete);
router.get('/allProducts', token, productController.allProduct);

module.exports = router;