const express = require("express");
const cors = require("./middlewares/cors");
// const https = require('https');
// const fs = require('fs');
const { host, port } = require("./config")
const path = require('path')

// const cert = fs.readFileSync(__dirname + '/ssl/ssl.crt', 'utf-8');
// const key = fs.readFileSync(__dirname + '/ssl/ssl.key', 'utf-8');

const app = express();
app.use(cors);
const router = require("./routes/index");
const connectDb = require('./db');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/uploads')));
app.use("/gr-admin", router);
connectDb();

// const server = https.createServer({ key, cert }, app);

app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`)
});