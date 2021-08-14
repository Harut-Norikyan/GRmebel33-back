const Color = require("../models/Color");

module.exports = {
  addColor: async (req, res, next) => {
    try {
      const { color, colorCode } = req.body;
      if (!color || !colorCode) {
        return;
      } else {
        await Color.create({ color, colorCode });
        return res.status(200).json({
          message: "Цвет успешно добавлен !!!"
        })
      }
    } catch (error) {
      next(error)
    }
  },

  updateColorById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { color, colorCode } = req.body;
      if (!color || !id || !colorCode) {
        return;
      } else {
        await Color.findOneAndUpdate({ "_id": id }, {
          $set: {
            color,
            colorCode
          }
        })
        return res.status(200).json({
          message: "Цвет успешно обновлен !!!"
        })
      }
    } catch (error) {
      next(error)
    }
  },

  getColors: async (req, res, next) => {
    try {
      const colors = await Color.find({});
      return res.status(200).json({
        colors
      })
    } catch (error) {
      next()
    }
  },

  getColorById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const color = await Color.findById({ '_id': id });
      return res.status(200).json({
        color
      })
    } catch (error) {
      next(error)
    }
  },

  removeColorById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Color.findOneAndRemove({ "_id": id })
      return res.status(200).json({
        message: "Цвет успешно удален !!!"
      })
    } catch (error) {
      next(error)
    }
  },
}