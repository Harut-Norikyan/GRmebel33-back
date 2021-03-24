const express = require("express");
const path = require('path')
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 4000;
const hostname = 'localhost';
const router = require("./routes/index");
const connectDb = require('./db');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));
// app.use("/", router);
connectDb();
app.listen(PORT,hostname, function(){
    console.log(`CORS-enabled web server listening on port ${PORT}`)
});
