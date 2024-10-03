const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/assets/uploads/salesman-img/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-salesman-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;
