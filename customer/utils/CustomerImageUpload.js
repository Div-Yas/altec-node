const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/assets/uploads/outlets/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-outlets-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;
