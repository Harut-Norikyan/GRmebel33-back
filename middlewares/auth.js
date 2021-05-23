const jwt = require('jsonwebtoken');
const { secret } = require("../config");
const User = require("../models/User");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token === 'null' || !token) {
      return res.status(401).json({
        message: "Unauthorized request !!!"
      })
    };
    let verifiedUser = jwt.verify(token, secret);
    if (!verifiedUser) {
      return res.status(401).json({
        message: "Unauthorized request !!!"
      })
    }
    const user = await User.findById(verifiedUser.id);
    if (user) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized request !!!"
      })
    }
  } catch (e) {
    next();
    return res.status(401).json({
      message: e
    })
  }
};