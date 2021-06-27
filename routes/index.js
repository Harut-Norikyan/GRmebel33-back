const express = require("express");
const router = express.Router();
const product = require('./product');
const user = require('./user');
const category = require('./category');
const aboutUs = require('./aboutUs');
const color = require('./color');

router.use("/product", product);
router.use("/user", user);
router.use("/category", category);
router.use("/aboutUs", aboutUs);
router.use("/color", color);


module.exports = router;