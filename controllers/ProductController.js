const Product = require("../models/Product");
const { default: axios } = require("axios");

const getImageUrl = process.env.NODE_ENV === 'production'
  ? 'https://gr-mebel-admin.herokuapp.com/gr-admin/get-image'
  : 'http://localhost:4000/gr-admin/get-image';

module.exports = {
  addProduct: async (req, res, next) => {
    try {
      const { name, description, price, newPrice, discount, minPrice, keyWords, categoriesId, colorsId } = req.body;

      const imagePaths = [];
      if (req.files) {
        req.files.forEach(img => {
          imagePaths.push(img.filename);
        })
      }
      const images = JSON.stringify(imagePaths) || [];
      await Product.create({
        name, description, price, newPrice, discount, minPrice, images, keyWords, categoriesId, colorsId
      })
      return res.status(200).json({
        message: "Продукт успешно добавлен !!!"
      })

    } catch (error) {
      next(error)
    }
  },

  getProducts: async (req, res, next) => {
    try {
      const { currentPage } = req.params;
      const limit = 10;
      const products = await Product.find()
        .limit(limit * 1)
        .skip((currentPage - 1) * limit)
        .exec();
      const count = await Product.countDocuments();
      return res.status(200).json({
        products,
        totalPages: Math.ceil(count / limit),
        allProductsCount: count
      })
    } catch (error) {
      next(error)
    }
  },

  getAllProducts: async (req, res, next) => {
    try {
      const products = await Product.find({});
      return res.status(200).json({
        products,
      })
    } catch (error) {
      next(error)
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById({ '_id': id });
      if (product) {
        var updatedImages = [];
        JSON.parse(product.images).forEach(img => {
          updatedImages.push(img)
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

  getProductsByIds: async (req, res, next) => {
    try {
      const { productIds } = req.body;
      if (productIds) {
        const products = await Product.find({});
        const filteredProducts = [];
        productIds.forEach(productId => {
          products.find(product => {
            if (product._id == productId) filteredProducts.push(product)
          });
        })
        return res.status(200).json({
          products: filteredProducts
        })
      }
    } catch (error) {
      next(error)
    }
  },

  searchProduct: async (req, res, next) => {
    try {
      const { data } = req.body;
      const products = await Product.find({});
      var result = [];
      if (products) {
        products.forEach(product => {
          data.forEach(text => {
            const findedText = JSON.parse(product.keyWords).includes(text.toLowerCase());
            if (findedText) {
              result.push(product)
            }
          })
        })
        if (result.length) {
          result = result.filter((v, i, a) => a.findIndex(t => (t._id === v._id)) === i);
        }
      }
      if (result.length) {
        return res.status(200).json({
          products: result
        })
      } else {
        return res.status(200).json({
          products: []
        })
      }
    } catch (error) {
      next(error)
    }
  },

  updateProductById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, newPrice, discount, minPrice, keyWords, categoriesId, colorsId } = req.body;
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
            colorsId
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
    try {
      const { id } = req.params;
      const { images } = req.body;
      if (id, images) {
        const imgs = JSON.parse(images);
        for (img of imgs) {
          const imgPathArr = img.split("/");
          const imageName = imgPathArr[imgPathArr.length - 1];
          await axios.delete(`${getImageUrl}/${imageName}`);
        };
        await Product.findOneAndRemove({ "_id": id }, function (err) {
          if (!err) {
            return res.status(200).json({
              message: "Продукт успешно удалён !!!"
            })
          }
        })
      }
    } catch (error) {
      next(error)
    }
  },

  removeProductImage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { imgPath, images } = req.body;
      if (imgPath && id) {
        try {
          const imgPathArr = imgPath.split("/");
          const imageName = imgPathArr[imgPathArr.length - 1];
          await axios.delete(`${getImageUrl}/${imageName}`);
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
  },

  getProductByCategoryId: async (req, res, next) => {
    try {
      const { id } = req.params;
      var productsBycategoryId = [];
      const products = await Product.find({});
      products && products.forEach(product => {
        if (JSON.parse(product?.categoriesId)) {
          JSON.parse(product?.categoriesId).forEach(category => {
            if (category.value === id) productsBycategoryId.push(product);
          })
        }
      })
      return res.status(200).json({
        products: productsBycategoryId,
      })
    } catch (error) {
      next(error)
    }
  }
}