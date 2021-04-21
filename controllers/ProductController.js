const Product = require("../models/Product");
const url = "http://localhost:4000"

module.exports = {
  addProduct: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { name, description, price, newPrice, discount, minPrice, keyWords, categoriesId } = req.body;
      var images = [];
      if (req.files) {
        req.files && req.files.forEach(element => {
          images.push(element.path);
        });
      }
      images = JSON.stringify(images)
      await Product.create({
        name, description, price, newPrice, discount, minPrice, images, keyWords, categoriesId
      })
      return res.status(200).json({
        message: "Продукт успешно добавлен !!!"
      })

    } catch (error) {
      next(error)
    }
  },

  getProducts: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const products = await Product.find({})
      return res.status(200).json({
        products
      })
    } catch (error) {
      next(error)
    }
  },

  getProductById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { id } = req.params;
      var product = await Product.findById({ '_id': id });
      if (product) {
        var updatedImages = [];
        JSON.parse(product.images).forEach(img => {
          updatedImages.push(url + img.slice(7, img.length))
        })
        product.images = JSON.stringify(updatedImages);
      }
      return res.status(200).json({
        product
      })
    } catch (error) {
      next(error)
    }
  },

  getProductByCategoryName: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

  updateProductById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

  removeProductById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

}