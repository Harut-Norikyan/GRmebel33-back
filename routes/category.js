const express = require('express');
const multer = require('multer');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const auth = require('../middlewares/auth');
const storage = require('../storage');
const upload = multer({ storage })

router.post("/add-category", auth, upload.single('image'), CategoryController.addCategory);
router.get("/get-categories/:currentPage", CategoryController.getCategories);
router.get("/get-category-by-id/:id", CategoryController.getCategoryById);
router.put("/update-category-by-id", auth, upload.single('image'), CategoryController.updateCategoryById);
router.delete("/remove-category/:id", auth, CategoryController.removeCategoryById);

module.exports = router;