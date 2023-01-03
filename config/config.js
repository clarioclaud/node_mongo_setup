require('dotenv').config();

module.exports = {
    PORT : process.env.PORT || 3000,
    DB_USERNAME : process.env.DB_USERNAME || '',
    DB_PASSWORD : process.env.DB_PASSWORD || '',
    DB_NAME : process.env.DB_DATABASE,
    DB_HOST : process.env.DB_HOST,
    MAX_POOL : 10,
    MIN_POOL : 0,
    BCRYPT_SALT : process.env.BCRYPT_SALT || 10,
    EXPIRE_TIME : process.env.EXPIRE_TIME || 10,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_PORT: process.env.MAIL_PORT,
    APP_NAME: process.env.APP_NAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'VRK2D0rFsHGJosZAmMW5LlujgLUSWxZwAoTcgo2gSaRttYPuPmbRWOaBh0mtQWts',
    JWT_EXPIRES_AT: process.env.JWT_EXPIRES_AT || '1d',
    JWT_TOKEN_SOURCE: 'auth-token',
    APP_URL: process.env.APP_URL || '',
    PAGE_LIMIT: process.env.PAGE_LIMIT || 10,
    KEY: process.env.KEY || '7sdsewqf24435636gfh'
};