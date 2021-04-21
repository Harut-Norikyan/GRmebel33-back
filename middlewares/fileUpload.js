// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     console.log(file);
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + '.' + extension);
//   }
// });
// const upload = multer({ storage: storage }).single('images');
// module.exports = upload;

const multer = require("multer");
const path = require("path");
var fs = require('fs');
var shell = require('shelljs');
const storage = multer.diskStorage({
  // SET STORAGE

  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname, "../public/uploads"));
    var dir = path.join("uploads");
    if (!fs.existsSync(dir)) {
      shell.mkdir('-p', dir);
      cb(null, "./uploads")
    } else {
      cb(null, "./uploads")
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage }).array("images[]", 20);

module.exports = upload;
