// routes/activity_routes.js
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const axios = require('axios')

// GET 
router.get('/weather', (req, res, next) => {
    axios.get('http://api.weatherstack.com/current?access_key=8b9535ce9c370993f09aa89054601587&query=Berlin')
    .then((response) => {
        // console.log('response.data',response.data)
        res.json(response.data);
      })
});


module.exports = router;
