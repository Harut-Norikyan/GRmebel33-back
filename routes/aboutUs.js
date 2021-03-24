const express = require('express');
const router = express.Router();
const AboutUsController = require('../controllers/AboutUsController');
const auth = require('../middlewares/auth');

router.post("/add-about-us-text", auth, AboutUsController.addAboutUsText);
router.get("/get-about-us-text", auth, AboutUsController.getAboutUsText);
router.put("/update-about-us-text", auth, AboutUsController.updateAboutUsText);
router.delete("/remove-about-us-text", auth, AboutUsController.removeAboutUsText);

module.exports = router;