// routes/activity_routes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// TODO: require models activity and user
const Activity = require('../models/activity_model');
const User = require('../models/user_model'); 

// GET /activities
router.get('/activities', (req, res, next) => {
  res.send('I am the activities route')
/*   Activity.find().populate('tasks')
    .then(allTheProjects => {
      res.json(allTheProjects);
    }) */
});


// POST /projects
// POST route => to create a new project
router.post('/projects', (req, res, next) => {

  Project.create({
    title: req.body.title,
    description: req.body.description,
    tasks: [],
    owner: req.user._id
  })
    .then(newProject => {
      res.json(newProject); // { title: '', description: '', _id: '123' }
    })
});


// GET /projects/19283719273587123jhf
// GET route => to get a specific project/detailed view
router.get('/projects/:identifier', (req, res, next) => {

  Project.findById(req.params.identifier)
    .then(response => {
      res.json(response);
    })
})

// PUT route => to update a specific project
router.put('/projects/:id', (req, res, next) => {

  Project.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      tasks: []
    })
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
})

// DELETE route => to delete a specific project
router.delete('/projects/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})


// PUT for updates
// router.put('/projects/:project_id'


module.exports = router;
