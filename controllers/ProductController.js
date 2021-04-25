const Product = require("../models/Product");
const url = 'http://localhost:4000';
const path = require("path");
const fs = require('fs');

module.exports = {
  addProduct: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { name, description, price, newPrice, discount, minPrice, keyWords, categoriesId } = req.body;
      const imagePaths = [];
      if (req.files) {
        req.files.forEach(img => {
          imagePaths.push(img.filename);
        })
      }
      const images = JSON.stringify(imagePaths) || [];
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
      const product = await Product.findById({ '_id': id });
      if (product) {
        var updatedImages = [];
        JSON.parse(product.images).forEach(img => {
          // updatedImages.push(url + img.slice(7, img.length))
          updatedImages.push(url + "/" + img)
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
      const { id } = req.params;
      const { name, description, price, newPrice, discount, minPrice, keyWords, categoriesId } = req.body;
      // name, description, price, newPrice, discount, minPrice, images, keyWords, categoriesId
      // console.log(id);
      // console.log(req.body, "req.body");
      var product = await Product.findById({ "_id": id });
      if (product) {
        var productImages = [...JSON.parse(product.images)];
        if (req.files) {
          req.files.forEach(img => {
            productImages.push(img.filename);
          })
        }
        await Product.findByIdAndUpdate({ "_id": id }, {
          $set: {
            name,
            description,
            price,
            newPrice,
            discount,
            minPrice,
            "images": JSON.stringify(productImages),
            keyWords,
            categoriesId,
          }
        }).exec(function (error) {
          if (error) {
            next(error)
          } else {
            return res.status(200).json({
              message: "Продукт успешно обновлен !!!"
            })
          }
        })
      }
    } catch (error) {
      next(error)
    }
  },

  removeProductById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { id } = req.params;
      await Product.findOneAndRemove({ "_id": id }, function (err) {
        if (!err) {
          return res.status(200).json({
            message: "Продукт успешно удалён !!!"
          })
        }
      })
    } catch (error) {
      next(error)
    }
  },

  removeProductImage: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { id } = req.params;
      const { imgPath, images } = req.body;
      if (imgPath && id) {
        try {
          const imgPathArr = imgPath.split("/");
          const imageName = imgPathArr[imgPathArr.length - 1];
          const imgDir = path.join(__dirname, `../public/uploads/${imageName}`);
          fs.unlinkSync(imgDir);
          await Product.findByIdAndUpdate({ '_id': id }, { images });
          return res.status(200).json({
            message: "Фотография успешно удалена из сервера !!!"
          })
        } catch (error) {
          next(error);
        }
      }
    } catch (error) {
      next(error)
    }
  },

  makeTheMain: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { id } = req.params;
      const { images } = req.body;
      if (id && images) {
        await Product.findByIdAndUpdate({ "_id": id }, { images: JSON.stringify(images) });
        return res.status(200).json({
          message: "Выбранная вами фотография сделана главной !!!"
        })
      }
    } catch (error) {
      next(error)
    }
  }

}