const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcrypt');

const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');

const Products = require('./products/model/productSchema');
const Distributors = require('./distributor/model/distributorSchema');
const Admin = require('./admin/model/adminSchema');

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Passport.js configuration
app.use(passport.initialize());
// app.use(passport.session());


exports.local = passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Routes
app.use(require('./products/router/productRoutes'));
app.use(require('./distributor/router/distributorRoutes'));
app.use(require('./admin/router/adminRoutes'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at Port No ${PORT}`);
});
