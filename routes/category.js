const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');

router.post("/add-category", CategoryController.addCategory);
router.get("/get-categories", CategoryController.getCategories);
router.get("/get-category-by-id/:id", CategoryController.getCategoryById);
router.put("/update-category-by-id", CategoryController.updateCategoryById);
router.delete("/remove-category/:id", CategoryController.removeCategoryById);

module.exports = router;