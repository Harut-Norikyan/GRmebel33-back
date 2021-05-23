const Category = require("../models/Category");
const { host, port } = require("../config");
const url = `http://${host}:${port}`;
const path = require("path");
const fs = require('fs');

module.exports = {
  addCategory: async (req, res, next) => {
    
    try {
      const { categoryName } = req.body;
      if (categoryName && req.files) {
        const imagePaths = [];
        if (req.files) {
          req.files.forEach(img => {
            imagePaths.push(img.filename);
          })
        }
        const images = JSON.stringify(imagePaths) || [];
        await Category.create({ categoryName, images })
        return res.status(200).json({
          message: "Категория успешно добавлена !!!"
        })
      }
    } catch (error) {
      next(error)
    }
  },

  getCategories: async (req, res, next) => {
    
    try {
      const { currentPage } = req.params;
      const limit = 10;
      const categories = await Category.find()
        .limit(limit * 1)
        .skip((currentPage - 1) * limit)
        .exec();
      const count = await Category.countDocuments();
      return res.status(200).json({
        categories,
        totalPages: Math.ceil(count / limit),
      })
    } catch (error) {

    }
  },

  getCategoryById: async (req, res, next) => {
    
    try {
      const { id } = req.params;
      const category = await Category.findById({ '_id': id });
      if (category) {
        var images = [];
        JSON.parse(category.images).forEach(img => {
          // updatedImages.push(url + img.slice(7, img.length))
          images.push(url + "/" + img)
        })
        category.images = JSON.stringify(images);
      }
      return res.status(200).json({
        category
      })
    } catch (error) {
      next(error)
    }
  },

  updateCategoryById: async (req, res, next) => {
    
    try {
      const { categoryName, categoryId, imgPath } = req.body;
      const imagesArr = [];
      if (req.files) {
        req.files.forEach(img => {
          imagesArr.push(img.filename);
        })
      }
      if (imagesArr.length) {
        const imgPathArr = imgPath.split("/");
        const oldImageName = imgPathArr[imgPathArr.length - 1];
        const imgDir = path.join(__dirname, `../public/uploads/${oldImageName}`);
        fs.unlinkSync(imgDir);
        await Category.findOneAndUpdate({ "_id": categoryId }, {
          $set: {
            categoryName,
            "images": JSON.stringify(imagesArr),
          }
        })
      } else {
        await Category.findOneAndUpdate({ "_id": categoryId }, { categoryName })
      }
      return res.status(200).json({
        message: "Категория успешно обновлена !!!"
      })
    } catch (error) {
      next(error)
    }
  },

  removeCategoryById: async (req, res, next) => {
    
    try {
      const { id } = req.params;
      await Category.findOneAndRemove({ "_id": id })
      return res.status(200).json({
        message: "Категория успешно удалена !!!"
      })
    } catch (error) {
      next(error)
    }
  },

}