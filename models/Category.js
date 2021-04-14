const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: String,
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;