const express = require('express');
const router = express.Router();
const AboutUsController = require('../controllers/AboutUsController');
const auth = require('../middlewares/auth');

router.post("/add-about-us-description", AboutUsController.addAboutUsText);
router.get("/get-about-us-description", AboutUsController.getAboutUsText);
router.put("/update-about-us-description", AboutUsController.updateAboutUsText);

module.exports = router;