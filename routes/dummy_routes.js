// routes/activity_routes.js
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();


// GET /activities
router.get('/dummy', (req, res, next) => {
  res.render('/dummy');
});

module.exports = router;
