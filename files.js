const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

module.exports = function ConnectGridMongo(app) {
  const conn = mongoose.createConnection('mongodb+srv://GRmebel:GagikRoman889@cluster0.t8qsa.mongodb.net/GRmebel33', {
    useNewUrlParser: true,
  });
  let gfs;
  conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    app.get('/gr-admin/get-image/:imageName', (req, res) => {
      gfs.files.findOne({ filename: req.params.imageName }, (err, file) => {
        if (!file || file.length === 0) {
          return res.json({ message: "No file" })
        } else {
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        }
      })
    });
    app.delete('/gr-admin/get-image/:imageName', (req, res) => {
      gfs.remove({ filename: req.params.imageName, root: 'uploads' }, (err) => {
        if (err) return res.status(400).json({ removed: false, err });
        else return res.status(200).json({ removed: true });
      })
    });
  });
  console.log("Mongo GirdFs is connected");
}