const express = require('express');
const router = express.Router();
const Distributors = require('../../distributor/model/distributorSchema')



//For Adding the distributor we will use router.post
router.post('/distributors/new', async (req,res)=>{
    const { name, address, contactInfo } = req.body;
    if (!name || !address || !contactInfo) {
        return res.status(422).json({ error: "Please fill all the required fields" });
    }
    const distributor = new Distributors({ name, address, contactInfo });
    try {
        const savedDistributor = await distributor.save();
        res.status(201).json({ message: "Distributor added successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//For Getting all the distributors data we will use router.get
router.get('/distributors',async(req,res)=>{
  try{
  const distributor = await Distributors.find().populate('products');
  res.json(distributor);
  } catch(err){
    res.status(500).json({message:"Cant Find Distributors"})
  }
})

//For Getting Specific distributor's data 
router.get('/distributors/:id', async (req, res) => {
  try {
    const distributor = await Distributors.findOne({ _id: req.params.id });
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.json(distributor);
  } catch (err) {
    res.status(500).json({ message: "Can't find distributors" });
  }
});

//For Updating Specific distributor's data with put method
router.put('/distributors/:id', async (req, res) => {
  try {
    const distributor = await Distributors.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.json(distributor);
  } catch (err) {
    res.status(500).json({ message: "Can't update distributor" });
  }
})

//For Updating distributor's data with addition of product through patch(can also use put)
router.patch('/distributors/:id', async (req, res) => {
  try {
    const distributor = await Distributors.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { products: req.body.productId } },
      { new: true }
    );
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.json(distributor);
  } catch(err){
    res.status(500).json({ message: "Can't update distributor" });
  }
})






//For Deleting Specific distributor's data with delete method
router.delete('/distributors/:id', async (req, res) => {
  try {
    const distributor = await Distributors.findOneAndDelete(
      { _id: req.params.id },
      req.body
    );
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.json(distributor);
  } catch (err) {
    res.status(500).json({ message: "Can't Delete distributor" });
  }
})









  



module.exports = router;







