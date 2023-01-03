const mongoose = require('mongoose');
const { APP_URL } = require('../../config/config');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    serial_no: {
        type: String,
        unique: true,
        required: true
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    image: {
        type: String,
        get: v => v ? APP_URL+v : ''
    },

    status: {
        type: Number,
        required: true,
        default: 1
    },

    expiry: {
        type: String
    },

    is_deleted: {
        type: Number,
        default: 0,
        required: true
    }
    
}, {
    timestamps: true,

    toObject: { getters: true },

    toJSON: { getters: true },

});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
}