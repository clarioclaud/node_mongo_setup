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
const orderController = require('../app/controllers/orderController');
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
router.get('/product/:id',token, productController.getProduct);
router.post('/addProduct', token, multer.upload.single('image'), validationMiddleware.validation(productValidation.product), productController.create);
router.put('/updateProduct/:id', token, multer.upload.single('image'), productController.update);
router.delete('/deleteProduct/:id', token, productController.delete);
router.get('/allProducts', userAuthenticate, productController.allProduct);
router.put("/purchaseStatusChange/:order_id", token, orderController.statusChange);
router.get("/allOrders", token, orderController.allOrders);

//Task 3 Product purchase (Order) by user - List of products in users page (Task 2 allProducts endpoint)
router.post('/order/:product_id', userAuthenticate, orderController.orderPlace);
router.get('/listOfOrders', userAuthenticate, orderController.orderList);
router.get('/orderPurchased/:order_id', userAuthenticate, orderController.getOneOrder);

module.exports = router;