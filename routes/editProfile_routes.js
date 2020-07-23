const express = require('express');
const router = express.Router();
// package to allow <input type="file"> in forms
const User = require('../models/User_model')



const uploader = require('../configs/cloudinary');

// this route only stores into cloudinary
// router.put('/api/image', uploader.single("imageUrl"), (req, res, next) => {
//   console.log(req.user._id)
//   // send over the cloudinary URL to React
//   res.json({ image_url: req.file.path })
// })


//posts new profile pic in User
router.put('/image', uploader.single("imageUrl"), (req, res, next) => {

  User.findByIdAndUpdate(req.user._id,
    {
      profilePicUrl: req.file.path,
    })
    .then(() => { 
      res.json({ image_url: req.file.path })
    })
})

// save all the data from input fields
router.put('/editprofile', (req, res, next) => {
console.log("here is date",req.body)
  User.findByIdAndUpdate(req.user._id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      myFavoriteActivities: req.body.myFavoriteActivities,
      myInterests: req.body.myInterests,

    })
    .then(() => { 
      res.json({ message: 'Edit successfully!' })
    }).catch(error => {
      console.log('This is the error:',error)
    })
})

// router.put('/api/image', (req, res, next) => {

//   User.findByIdAndUpdate(req.params.id,
//     {
//       profielPicUrl: req.body.image_url,
//     })
//     .then(() => {
//       res.json({ message: `New profile pic for ${req.params.id} is updated successfully.` });
//     })
// })




module.exports = router;
