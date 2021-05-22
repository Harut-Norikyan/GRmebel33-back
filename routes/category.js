const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/fileUpload');

router.post("/add-category", auth, upload, CategoryController.addCategory);
router.get("/get-categories/:currentPage", CategoryController.getCategories);
router.get("/get-category-by-id/:id", CategoryController.getCategoryById);
router.put("/update-category-by-id", auth, upload, CategoryController.updateCategoryById);
router.delete("/remove-category/:id", auth, CategoryController.removeCategoryById);

module.exports = router;