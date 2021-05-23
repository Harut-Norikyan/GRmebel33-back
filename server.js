const express = require("express");
const { host, port } = require("./config")
const path = require('path')
const app = express();
const cors = require("./middlewares/cors");
// const cors = require('cors');
// app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Authorization,Accept,content-type,application/json');
//     next();
// });
app.use(cors);
const router = require("./routes/index");
const connectDb = require('./db');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/uploads')));
app.use("/gr-admin", router);
connectDb();
app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`)
});