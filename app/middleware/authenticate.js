const jwt = require('../services/jwtService');
const { JWT_TOKEN_SOURCE }= require('../../config/config');

const userAuthenticate = async(req, res, next) => {

    if (!req.headers.authorization) {

        return res.status(403).send({

            message: 'Authorization Token is required'

        });
    }

    const token = req.headers.authorization.split(" ")[1];
       
    jwt.verifyToken(token).then(decodeToken => {
        
        if (decodeToken && decodeToken.source === JWT_TOKEN_SOURCE) {
            
            req.user = decodeToken;

            next();

        }else{

            return res.status(401).send({message: "Access denied"});
        }

    }).catch(err => {

        return res.status(401).send({message: err.message});
    });
}

module.exports = {
    userAuthenticate  
};