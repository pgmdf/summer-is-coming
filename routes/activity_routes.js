// routes/activity_routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const uploader = require('../configs/cloudinary');
const Activity = require('../models/Activity_model');
const User = require('../models/User_model');

// GET /activities
router.get('/activities', (req, res, next) => {

  Activity.find()
    .then(activities => {
      res.json(activities);
    })

});


// POST /activities/add
// POST route => to create a new activity
router.post('/activities/add', (req, res, next) => {

  // sets all tags to lower case
  let newTags = req.body.tags.toLowerCase()

  Activity.create({
    title: req.body.title,
    tags: newTags.split(' ').join('').split(','),
    description: req.body.description,
    pictureUrl: req.body.activityPicture ? req.body.activityPicture : "https://cdn.pixabay.com/photo/2014/04/02/11/00/runner-305189_960_720.png",
    location: req.body.location,
    /* TODO: #rating finish in beta-version 
    rating: req.body.rating, */
    createdBy: req.user._id,
    comments: req.body.comments,
    completedBy: req.body.completedBy,
    $currentDate: { timeStamp: true }
  })
    .then(newActivity => {
      res.json(newActivity);
    })
});



router.post('/activities/addImage', uploader.single("imageUrl"), (req, res, next) => {

  res.json({ pictureUrl: req.file.path })

});



// GET /activities/19283719273587123jhf
router.get('/activities/:identifier', (req, res, next) => {
  Activity.findById(req.params.identifier).populate('createdBy')
    .then(response => {
      res.json(response);
    })
})

// PUT route => to update a specific user
router.put('/activities/:identifier', (req, res, next) => {

  User.findByIdAndUpdate(req.user._id,
    {
      myFavoriteActivities: req.body.myFavoriteActivitiesArr,
      myBucketlist: req.body.myBucketlistArr
    }, { new: true })
    .then((response) => {
      res.json(response);
    })
})


// GET activities comment
router.get('/activities/:identifier/comment', (req, res, next) => {
  Activity.findById(req.params.identifier).populate('createdBy')
    .then(response => {
      res.json(response);
    })
})

// PUT activities comment => to update a specific activity
router.put('/activities/:identifier/comment', (req, res, next) => {
  Activity.findByIdAndUpdate(req.params.identifier,
    {
      $push: { comments: req.body.comments }
    }, { new: true })
    .then((response) => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

//upload activity picture if needed
// router.put('/activity/image', uploader.single("imageUrl"), (req, res, next) => {

//   User.findByIdAndUpdate(req.user._id,
//     {
//       profilePicUrl: req.file.path,
//     })
//     .then(() => { 
//       res.json({ image_url: req.file.path })
//     })
// })

// DELETE route => to delete a specific activity
router.delete('/activities/:identifier', (req, res, next) => {

  // TODO: deletion should only be performed by creator and admins

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Activity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Activity with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


module.exports = router;
