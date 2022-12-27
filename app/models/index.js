const mongoose = require('mongoose');
const db = require('../../config/config');

async function connect() {
    try {
        const url = `mongodb://${db.DB_USERNAME}:${db.DB_PASSWORD}@${db.DB_HOST}:27017/${db.DB_NAME}`;
        await mongoose.connect(url, {
            //to avoid the DeprecationWarning.
            useNewUrlParser: true,
            //useFindAndModify: false,
            useUnifiedTopology: true,
            maxPoolSize: db.MAX_POOL //max no of connection in a pool
        });
            
        console.log('connected to database');
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connect
};