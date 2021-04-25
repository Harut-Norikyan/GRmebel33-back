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
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage }).array("images[]", 20);
module.exports = upload;
