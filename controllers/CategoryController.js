const Category = require("../models/Category");
const { default: axios } = require("axios");

const getImageUrl = process.env.NODE_ENV === 'production'
  ? 'https://gr-mebel-admin.herokuapp.com/gr-admin/get-image'
  : 'http://localhost:4000/gr-admin/get-image';

module.exports = {
  
  addCategory: async (req, res, next) => {
    try {
      const { categoryName } = req.body;
      if (categoryName && req.file) {
        const imagePaths = [req.file.filename];
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
      next()
    }
  },

  getCategoryById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findById({ '_id': id });
      if (category) {
        var images = [];
        JSON.parse(category.images).forEach(img => {
          images.push(img)
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
      const imagesArr = [req.file.filename];
      if (imagesArr.length) {
        const imgPathArr = imgPath.split("/");
        const oldImageName = imgPathArr[imgPathArr.length - 1];
        if (req.file.filename !== oldImageName) {
          await axios.delete(`${getImageUrl}/${oldImageName}`);
        }
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
      const cat = await Category.findOne({ "_id": id });
      const img = JSON.parse(cat.images)[0];
      await axios.delete(`${getImageUrl}/${img}`);
      await Category.findOneAndRemove({ "_id": id })
      return res.status(200).json({
        message: "Категория успешно удалена !!!"
      })
    } catch (error) {
      next(error)
    }
  },
}