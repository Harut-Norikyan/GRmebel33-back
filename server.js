const express = require("express");
const { host, port } = require("./config")
const path = require('path')
const app = express();
const cors = require("./middlewares/cors");
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