// routes/user_routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// TODO: require models activity and user
const Activity = require('../models/Activity_model');
const User = require('../models/User_model'); 

// GET /activities
router.get('/user', (req, res, next) => {
  res.send('I am the user route')

  // TODO: delete, if activities aren't listed
/*   Activity.find().populate('tasks')
    .then(allTheProjects => {
      res.json(allTheProjects);
    }) */

});


// POST /activities
// POST route => to create a new activity
router.post('/user', (req, res, next) => {

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profilePicUrl: req.file ? req.file.secure_url : undefined,
    //myFavoriteActivities: req.body.myFavoriteActivities,
    myInterests: req.body.myInterests,
    created: req.body.date
  })
    .then(newActivity => {
      res.json(newActivity); // { title: '', description: '', _id: '123' }
    })
});


// GET /activities/19283719273587123jhf
// GET route => to get a specific activity/detailed view
router.get('/user/:identifier/profile', (req, res, next) => {
res.send(`I am id ${req.params.identifier} of an user and showing actual profile page`)

  /* Activity.findById(req.params.identifier)
    .then(response => {
      res.json(response);
    }) */
})

// PUT route => to update a specific user profile
router.put('/user/:identifier/update', (req, res, next) => {

// TODO: updates should only be performed by creator and admins

  User.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      tasks: []
    })
    .then(() => {
      res.json({ message: `User with ${req.params.id} is updated successfully.` });
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
