const express = require('express');
const router = express.Router();
const ColorController = require('../controllers/ColorController');
const auth = require('../middlewares/auth');

router.post("/add-color", auth, ColorController.addColor);
router.post("/update-color/:id", auth, ColorController.updateColorById);
router.get("/get-colors", ColorController.getColors);
router.get("/get-color-by-id/:id", ColorController.getColorById);
router.delete("/remove-color-by-id/:id", auth, ColorController.removeColorById);

module.exports = router;