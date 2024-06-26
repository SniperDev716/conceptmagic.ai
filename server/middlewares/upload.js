const { randomUUID } = require('crypto');
const fs = require('fs');
const multer = require('multer');

const uploader = {
    storage: function () {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const dir = `public/upload`;
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                cb(null, dir);
            },
            filename: function (req, file, cb) {
                cb(null, req.user._id + '_' + Date.now() + '_' + randomUUID() + '_' + file.originalname.replace(/ /g, '_'));
            },
        });
        return storage;
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif|webp)$/i)) {
            return cb(new Error('Only Image file type are allowed!', false));
        }
        cb(null, true);
    },
};

const upload = multer({
    storage: uploader.storage(),
    fileFilter: uploader.fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
});

module.exports = upload.single('file');
