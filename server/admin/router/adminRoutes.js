const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../model/adminSchema');
const bcrypt = require('bcrypt');

// Email validation regular expression
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.(com|net|org)$/;


router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill in all the required fields" });
  }

  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email address" });
  }

  try {
    const userExist = await Admin.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else {
      const user = new Admin({ name, email, password });
      await user.save();

    //   passport.authenticate('local')(req, res, () => {
        res.status(200).json({ success: true, message: "User registered successfully" });
    //   });
    }
  } catch(err) { 
    console.log(err); 
}
});

router.post('/login', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in the data" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const admin = await Admin.findOne({ email: email });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);

      token = await admin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "Signin successful" });
      }
    }
    else{
      res.status(400).json({error: "Invalid Credentials "});
  }  
  } catch(err) { 
    console.log(err); 
}
});


router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken'); 
    res.json({ message: "Logout successful" });
  });



module.exports = router;
