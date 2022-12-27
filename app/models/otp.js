const mongoose = require('mongoose');

const otpschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },

    expired_at: {
        type: String,
        required: true
    },

    is_verified: {
        type: Number,
        default: 0,
        required: true
    },

    is_deleted: {
        type: Number,
        required: true,
        default: false
    }
},{
    timestamps: true
});

const Otp = mongoose.model('Otp', otpschema);

module.exports = {
    Otp
};