const Category = require("../models/Category");

module.exports = {
  addCategory: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { categoryName } = req.body;
      await Category.create({ categoryName })
      return res.status(200).json({
        message: "Категория успешно добавлена !!!"
      })
    } catch (error) {
      next(error)
    }
  },

  getCategories: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
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
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { id } = req.params;
      const category = await Category.findById({ "_id": id });
      return res.status(200).json({
        category
      })
    } catch (error) {
      next(error)
    }
  },

  updateCategoryById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { categoryName, id } = req.body;
      await Category.findOneAndUpdate({ "_id": id }, { categoryName })
      return res.status(200).json({
        message: "Категория успешно обновлена !!!"
      })
    } catch (error) {
      next(error)
    }
  },

  removeCategoryById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
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