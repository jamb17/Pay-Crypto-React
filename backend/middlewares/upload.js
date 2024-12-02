import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

export default upload;
