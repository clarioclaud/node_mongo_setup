const purchaseModel = require('../models/purchase');
const { PAGE_LIMIT } = require('../../config/config');

class orderController {

    orderPlace = async(req, res) => {

        const order = {
            user: req.user._id,
            product: req.params.product_id
        };

        await new purchaseModel.Purchase(order).save().then(result => {

            return res.status(200).send({
                message: 'Order Placed Successfully',
                data: result
            });

        }).catch(err => {

            return res.status(500).send({
                message: err.message
            });

        });


    }

    orderList = async(req, res) => {

        try {

            const orders = await purchaseModel.Purchase.find({user: req.user._id, is_deleted: 0})
                                                        .select('-user')
                                                        .populate('product')
                                                        .sort({'createdAt': -1})                                                       
                                                        .skip(req.params.page * PAGE_LIMIT)
                                                        .limit(PAGE_LIMIT);

            return res.status(200).send({
                message: 'Orders Fetched',
                data: orders
            });

        } catch (error) {
            
            return res.status(500).send({
                message: error.message,
            });
        }
    }

    getOneOrder = async(req, res) => {

        await purchaseModel.Purchase.find({user: req.user._id, _id: req.params.order_id, is_deleted: 0})
                                    .select('-user')
                                    .populate('product')
                                    .then(result => {

                                        return res.status(200).send({
                                            message: 'Order Fetched',
                                            data: result
                                        });
                                    }).catch(err => {

                                        return res.status(404).send({
                                            message: 'Order Not Found'
                                        });
                                    });
    }

    statusChange = async(req, res) => {
        
        if (!req.body.status) {

            return res.status(400).send({
                message: "status is required, Select any one status from "+purchaseModel.Purchase.schema.path('status').enumValues
            });
        }
        
        await purchaseModel.Purchase.findOne({_id: req.params.order_id, is_deleted: 0}).then(async result => {

            await result.updateOne({status: req.body.status}).then(data => {

                return res.status(200).send({
                    message: 'Status Changed',
                    data: data
                });
    
            }).catch(err => {
    
                return res.status(500).send({
                    message: err.message,
                });
    
            });

        }).catch(err => {
    
            return res.status(404).send({
                message: 'Order Not Found'
            });

        });
        
    }

    allOrders = async(req, res) => {

        try {
            
            const orders = await purchaseModel.Purchase.aggregate([
                                                        { $match: {is_deleted: false} },
                                                        { $sort: {'createdAt': -1}},
                                                        { $lookup: {
                                                            "from": "users",
                                                            "localField": "user",
                                                            "foreignField": "_id",
                                                            "as": "user"
                                                        }},
                                                        { $lookup: {
                                                            "from": "products",
                                                            "localField": "product",
                                                            "foreignField": "_id",
                                                            "as": "product"
                                                        }},
                                                        { $project: {"user.password":0}},
                                                        { $skip: PAGE_LIMIT * req.query.page},
                                                        { $limit: parseInt(PAGE_LIMIT)}                                                                                       
                                                    ]);

            return res.status(200).send({
                message: 'Orders Fetched',
                data: orders
            });

        } catch (error) {
            
            return res.status(500).send({
                message: error.message,
            });
        }
    }
}

module.exports = new orderController();