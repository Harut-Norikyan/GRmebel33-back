const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');

router.post("/add-product", auth, ProductController.addProduct);
router.get("/get-products", auth, ProductController.getProducts);
router.get("/get-product-by-id", auth, ProductController.getProductById);
router.get("/get-product-by-catrgory-name", auth, ProductController.getProductByCategoryName);
router.put("/update-product-by-id", auth, ProductController.updateProductById);
router.delete("/remove-product", auth, ProductController.removeProductById);

module.exports = router