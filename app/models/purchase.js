const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Confirm', 'Shipped', 'Delivered'],
        default: 'Pending',
        required: true
    },

    delivered_date: {
        type: Date
    },

    is_deleted: {
        type: Boolean,
        default: false,
        required: true
    }
        
},{
    timestamps: true
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    Purchase
};