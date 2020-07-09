const express = require('express');
const router = express.Router();
const axios = require('axios');
const cloudinary = require('cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
// package to allow <input type="file"> in forms
const multer = require('multer');
const User = require('../models/User_model')
const ensureLogin = require('connect-ensure-login'); //Middleware for authentication 


const uploader = require('../configs/cloudinary');

// this route only stores into cloudinary
router.post('/api/image', uploader.single("imageUrl"), (req, res, next) => {
console.log(req.params.id)
  // send over the cloudinary URL to React
  res.json({ image_url: req.file.path })
})


router.put('/api/image', (req, res, next) => {

  User.findByIdAndUpdate(req.params.id,
    {
      profielPicUrl: req.body.image_url,
    })
    .then(() => {
      res.json({ message: `New profile pic for ${req.params.id} is updated successfully.` });
    })
})




module.exports = router;
