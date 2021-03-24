const User = require("../models/Product");

module.exports = {
  registration: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const user = User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        error: error
      });
      next(error)
    }
  },

  getUsers: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

  updateUserById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

  removeUserById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

}