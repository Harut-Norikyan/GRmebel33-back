const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  newPrice: Number,
  discount: Boolean,
  images: String,
  category: String,
  keyWords: String,
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;