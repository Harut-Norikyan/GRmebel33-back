const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');

module.exports = storage = new GridFsStorage({
  url: 'mongodb+srv://GRmebel:GagikRoman889@cluster0.t8qsa.mongodb.net/GRmebel33',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

