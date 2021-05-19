const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/fileUpload');

router.post("/add-product", auth, upload, ProductController.addProduct);
router.get("/get-products/:currentPage", ProductController.getProducts);
router.get("/get-all-products", ProductController.getAllProducts);
router.get("/get-product-by-id/:id", ProductController.getProductById);
router.put("/update-product/:id", auth, upload, ProductController.updateProductById);
router.post("/remove-product/:id", auth, ProductController.removeProductById);
router.post("/remove-product-image/:id", auth, ProductController.removeProductImage);
router.post("/make-the-main/:id", auth, ProductController.makeTheMain);
router.post("/search", ProductController.searchProduct);
router.get("/get-product-by-category-id/:id", ProductController.getProductByCategoryId);

module.exports = router;