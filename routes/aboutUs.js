const express = require('express');
const router = express.Router();
const AboutUsController = require('../controllers/AboutUsController');
const auth = require('../middlewares/auth');

router.post("/add-about-us-description", auth, AboutUsController.addAboutUsText);
router.get("/get-about-us-description", AboutUsController.getAboutUsText);
router.put("/update-about-us-description", auth, AboutUsController.updateAboutUsText);

module.exports = router;