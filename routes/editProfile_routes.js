const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('multer-storage-cloudinary');
// package to allow <input type="file"> in forms
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  
  var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'my-cats', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
      cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
  });
  
  const uploadCloud = multer({ storage: storage });


// GET /activities
router.get('/editprofile', (req, res, next) => {
  res.render('/editprofile');
});

module.exports = router;
