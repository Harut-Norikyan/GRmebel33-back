const express = require("express");
const cors = require("./middlewares/cors");
const { host, port } = require("./config")
const path = require('path');
const ConnectGridMongo = require('./files')

const app = express();
app.use(cors);
const router = require("./routes/index");
const connectDb = require('./db');

var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/uploads')));
app.use("/gr-admin", router);
connectDb();
ConnectGridMongo(app);
app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`)
});