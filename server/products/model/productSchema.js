const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    modelNumber: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    specifications: {
      type: String,
      required: true
    }
  });
  
  const Products = mongoose.model('Products', productSchema);
  module.exports = Products;