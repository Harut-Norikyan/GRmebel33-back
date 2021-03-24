const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutUsSchema = new Schema({
  description: String,
});

const AboutUs = mongoose.model('aboutUs', AboutUsSchema);

module.exports = AboutUs;