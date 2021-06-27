const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  newPrice: Number,
  discount: Boolean,
  minPrice: Boolean,
  images: String,
  keyWords: String,
  categoriesId: String,
  colorsId: String
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;