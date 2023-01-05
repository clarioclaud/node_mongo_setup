const csv = require('csvtojson');
const moment = require('moment');
const productModel = require('../models/product');
const { PAGE_LIMIT } = require('../../config/config');
const fs = require('fs');

class ProductController {

    csvupload = (req, res) => {

        csv().fromFile(req.file.path).then(async result => {

            var data = [];

            for (let i = 0; i < result.length; i++) {
                var obj = {};
                obj.name = result[i]['name'];
                obj.serial_no = result[i]['serial_no'];
                obj.price = result[i]['price'];
                obj.image = result[i]['image'];
                obj.status = result[i]['status'];
                //obj.expiry = moment(result[i]['expiry']).format('YYYY-MM-DD');
                obj.expiry = result[i]['expiry'];
            }

            data.push(obj);

            await productModel.Product.insertMany(data).then(pro => {

                fs.unlink(req.file.path, function(err){
                    if(err) console.log(err)
                })

                return res.status(200).send({
                    message: 'Uploaded successfully'
                });

            }).catch(err => {

                fs.unlink(req.file.path, function(err){
                    if(err) console.log(err)
                })

                return res.status(500).send({
                    message: 'Failed to Upload'
                });

            })
        }).catch(error => {

            return res.status(500).send({
                message: error.message
            });
        });
    }

    create = async(req, res) => {
        
        const product = {
            name: req.body.name,
            serial_no: req.body.serial_no,
            price: req.body.price,
            image: '/products/'+req.file.filename,
            expiry: req.body.expiry // 2023-01-02
            //expiry: moment(req.body.expiry).format('YYYY-MM-DD')
        }

        await new productModel.Product(product).save().then(result => {
            return res.status(200).send({
                message: 'Product Added Successfully',
                data: result
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            });
        });
    }

    update = async(req, res) => {
      
        if (!req.params.id) {

            return res.status(400).send({
                message: 'Serial no required'
            });

        }

        const product = await productModel.Product.findOne({_id: req.params.id, is_deleted: 0});

        if (!product) {
            
            return res.status(404).send({
                message: 'No Product Found'
            });

        }

        const { name, price, expiry, status } = req.body;

        const productdetails = {
            name,
            price,
            //expiry: moment(expiry).format('YYYY-MM-DD'),
            expiry, // 2023-01-02
            image:'/products/'+req.file.filename,
            status
        };

        await product.updateOne(productdetails).then(async result => {

            const update = await productModel.Product.findOne({_id: req.params.id, is_deleted: 0})

            return res.status(200).send({
                message: 'Updated',
                data: update
            });
        }).catch(err => {

            return res.status(500).send({
                message: err.message
            });
        });
    }

    delete = async(req, res) => {

        if (!req.params.id) {

            return res.status(400).send({
                message: 'Serial no required'
            });
        }

        const product = await productModel.Product.findOne({_id: req.params.id, is_deleted: 0});

        if (!product) {
            
            return res.status(404).send({
                message: 'No Product Found to delete'
            });

        }

        await product.updateOne({is_deleted: 1}).then(result => {

            return res.status(200).send({
                message: 'Deleted'
            });

        }).catch(err => {

            return res.status(500).send({
                message: err.message
            })
        });
    }

    getProduct = async(req, res) => {

        try {
                 
            if (!req.params.id) {

                return res.status(400).send({
                    message: 'Serial no required'
                });
            }

            const product = await productModel.Product.findOne({_id: req.params.id, is_deleted:0});

            if (!product) {

                return res.status(404).send({
                    message: 'No Product Found'
                });
            }

            return res.status(200).send({
                message: 'Fetched',
                data: product
            });

        } catch (error) {

            return res.status(404).send({
                message: 'No Product Found'
            });  
        }
    }

    allProduct = async(req, res) => {

        try {

            const active = {
                is_deleted: 0
            };

            if (req.query.active) {
                
                active.status = req.query.active;
            }
            
            if (req.query.expiry) {

                active.expiry = req.query.expiry;
            }
            
            const products = await productModel.Product.find(active)
                                               .sort({'createdAt': -1})
                                               .skip(req.query.page * PAGE_LIMIT)
                                               .limit(PAGE_LIMIT);

            return res.status(200).send({
                message: 'Fetched',
                data: products
            });

        } catch (error) {

            return res.status(500).send({
                message: error.message
            });
        }     
        
    }

}

module.exports = new ProductController();