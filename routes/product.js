const express = require('express');
const multer = require('multer');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const auth = require('../middlewares/auth');
const storage = require('../storage');
const upload = multer({ storage });

router.post("/add-product", auth, upload.array('images[]'), ProductController.addProduct);
router.get("/get-products/:currentPage", ProductController.getProducts);
router.get("/get-all-products", ProductController.getAllProducts);
router.get("/get-product-by-id/:id", ProductController.getProductById);
router.post("/get-products-by-id", ProductController.getProductsByIds);
router.put("/update-product/:id", auth, upload.array('images[]'), ProductController.updateProductById);
router.post("/remove-product/:id", auth, ProductController.removeProductById);
router.post("/remove-product-image/:id", auth, ProductController.removeProductImage);
router.post("/make-the-main/:id", auth, ProductController.makeTheMain);
router.post("/search", ProductController.searchProduct);
router.get("/get-product-by-category-id/:id", ProductController.getProductByCategoryId);

module.exports = router;