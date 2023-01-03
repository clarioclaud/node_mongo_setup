const { exist } = require('joi');
const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        
        if (file.mimetype === 'text/csv') {

            cb(null, 'app/public/csv/');

        } else {
            cb(null, 'app/public/products/');
        }
        
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'text/csv') {
        
        cb(null, true);
    
    } else {
        
        cb(null, false);
    }
}

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = {
    upload
};
