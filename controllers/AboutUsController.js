const AboutUs = require("../models/AboutUs");

module.exports = {
  addAboutUsText: async (req, res, next) => {
    
    try {
      const { description } = req.body;
      await AboutUs.create({ description });
      return res.status(200).json({
        message: "Текст успешно добавлен !!!"
      })
    } catch (error) {
      next(error)
    }
  },

  getAboutUsText: async (req, res, next) => {
    
    try {
      const data = await AboutUs.findOne({});
      return res.status(200).json({
        data
      })
    } catch (error) {
      next(error)
    }
  },

  updateAboutUsText: async (req, res, next) => {
    
    try {
      const { description, descId } = req.body;
      const data = await AboutUs.findOneAndUpdate({ "_id": descId }, { description })
      return res.status(200).json({
        message: "Текст успешно обновлен !!!",
        data
      })
    } catch (error) {
      next(error)
    }
  },
}