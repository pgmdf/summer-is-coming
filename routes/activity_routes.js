// routes/activity_routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// TODO: require models activity and user
const Activity = require('../models/Activity_model');
// const User = require('../models/User_model'); 

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


  // TODO: add timeStamp
  Activity.create({
    title: req.body.title,
    tags: newTags.split(' ').join('').split(','),
    description: req.body.description,
    pictureUrl: req.file ? req.file.secure_url : undefined,
    location: req.body.location,
    rating: req.body.rating,
    createdBy: req.user._id,
    comments: req.body.comments,
    completedBy: req.body.completedBy,
    $currentDate: { timeStamp: true }})
    .then(newActivity => {
      res.json(newActivity);
    })
});


// GET /activities/19283719273587123jhf
router.get('/activities/:identifier', (req, res, next) => {
  Activity.findById(req.params.identifier).populate('createdBy')
    .then(response => {
      res.json(response);
    })
})

// PUT route => to update a specific project
router.put('/activities/:identifier', (req, res, next) => {

  // TODO: updates should only be performed by creator and admins

  User.findByIdAndUpdate(req.params.id,
    {
      myFavoriteActivities: req.params.favorite
    })
    .then(() => {
      res.json({ message: `Activity with ${req.params.id} is updated successfully.` });
    })
})

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
