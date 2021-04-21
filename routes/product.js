const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/fileUpload');

router.post("/add-product", upload, ProductController.addProduct);
router.get("/get-products", ProductController.getProducts);
router.get("/get-product-by-id/:id", ProductController.getProductById);
router.get("/get-product-by-catrgory-name", ProductController.getProductByCategoryName);
router.put("/update-product-by-id", ProductController.updateProductById);
router.delete("/remove-product", ProductController.removeProductById);

module.exports = router;