const express = require('express');
const router = express.Router();
require('../../db/conn');
const Products = require('../../products/model/productSchema');



//For Adding the product we will use router.post
router.post('/products/new', async (req,res)=>{

    const {name, brand, modelNumber, price, specifications} = req.body;
    if (!name || !brand || !modelNumber || !price || !specifications){
        return res.status(422).json({error: "Please fill the field properties"});
    }
    const products = new Products({ name, brand, modelNumber, price, specifications });
    try{
        const savedProduct = await products.save();
        res.status(201).json({message:"Product Added successfully"});
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
    


});

//For Getting the all products data we will use router.get
router.get('/products',async(req,res)=>{
    try{
    const product = await Products.find();
    res.json(product);
    } catch(err){
      res.status(500).json({message:"Cant Find Products"})
    }
  })

  //For Getting Specific Product's data 
router.get('/products/:id', async (req, res) => {
    try {
      const product = await Products.findOne({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: "Can't find Products" });
    }
  });

  //For Updating Specific product's data with put method
router.put('/products/:id', async (req, res) => {
    try {
      const product = await Products.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: "Can't update Product" });
    }
  })


  //For Deleting Specific product's data with delete method
router.delete('/products/:id', async (req, res) => {
    try {
      const product = await Products.findOneAndDelete(
        { _id: req.params.id },
        req.body
      );
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: "Can't Delete product" });
    }
  })





module.exports = router;