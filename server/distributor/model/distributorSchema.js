const mongoose = require('mongoose');
const Products = require('../../products/model/productSchema');


const distributorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  }]
});

 const Distributors = mongoose.model('Distributor', distributorSchema);
 module.exports = Distributors;