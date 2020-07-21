const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');


// require the user model 
const User = require('../models/User_model');


// SMTP
let transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: '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',
  },
});


authRoutes.post('/signup', (req, res, next) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;


  const tokenArr = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 10)
  ); // [ 1, 4, 5, 8 ]
  const token = tokenArr.join(''); // "1458"

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({ message: 'Please make your password at least 8 characters long for security reasons.' });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {

    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }
    transporter
      .sendMail({
        from: '"Welcome to Summer-is-Coming" <summeriscoming@zippymail.info>',
        to: email,
        subject: 'Please verify your e-mail',
        text: `Welcome to Summer-is-Coming. Thanks for signing up. To complete your registration, please confirm your account with this link: ${process.env.BACKEND_URL}/api/verify-email-link/${token}`,
        html: `Welcome to Summer-is-Coming. Thanks for signing up. To complete your registration, please confirm your account with this link: <a href="${process.env.BACKEND_URL}/api/verify-email-link/${token}">hier!</a>`,
      }).then(() => {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const aNewUser = new User({
          username: username,
          email: email,
          password: hashPass,
          token: token
        });

        aNewUser.save(err => {
          if (err) {
            res.status(400).json({ message: 'Saving user to database went wrong.' });
            return;
          }

          // Automatically log in user after sign up
          // .login() here is actually a predefined passport method
          req.login(aNewUser, (err) => {

            if (err) {
              res.status(500).json({ message: 'Login after signup went bad.' });
              return;
            }

            // Send the user's information to the frontend
            // We can use also: res.status(200).json(req.user);
            res.status(200).json(aNewUser);
          });
        });
      }).catch(error => {
        console.log("something wrong", error)
      })
  });
});

authRoutes.get('/verify-email-link/:token', (req, res) => {
  if (req.user.token === req.params.token) {
    req.user.verifiedEmail = true;
    req.user.save().then(() => {
      // more professional : res.redirect and set a flash message before

      res.redirect(process.env.FRONTEND_URL + '/activities');
    });
  }
});

// GOOGLE LOGIN ROUTE

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);



authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong authenticating user' });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});


// GET "/checkuser" allows the client to check to see:
// (a) if we are logged-in
// (b) the details of the logged-in user (if any)
authRoutes.get("/checkuser", (req, res, next) => {
  if (req.user) {
    res.json({ userDoc: req.user });
  } else {
    res.json({ userDoc: null });
  }
});

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

module.exports = authRoutes;