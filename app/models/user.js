const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist'],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        //required: [true, 'Password is required'],
        select: false
    },
    is_email_verified: {
        type: Number,
        required: true,
        default: 0
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false
    }
    
},{
    timestamps: true,
    // {
    //     createdAt : created_at,
    //     updatedAt : updated_at
    // }
    
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
