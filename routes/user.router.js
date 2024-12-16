const express = require("express");
const passport = require("../services/passport");
const { createUser, loginUser, registerWithGoogle } = require("../controllers/users.controllers");

// Initialize Express Router
const user = express.Router();

// Middleware for Passport.js initialization
user.use(passport.initialize());
user.use(passport.session()); // Optional, for session support (requires session setup)

// POST route for user registration
user.post('/register', createUser);

// POST route for user login
user.post('/login', loginUser);

// POST route for Google registration
user.post('/google/register', registerWithGoogle);

// Google OAuth login route using Passport.js
user.get('/auth/google', (req, res, next) => {
    console.log('Called /auth/google endpoint'); // Debugging log
    passport.authenticate('google', {
        scope: [
            'profile',
            'email',
            'openid',
            'https://www.googleapis.com/auth/user.birthday.read',
            'https://www.googleapis.com/auth/user.phonenumbers.read'
        ],
        redirectUri: 'http://localhost:3005/user/auth/google/callback' // Make sure this is correct
    })(req, res, next);
});

user.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'https://exploreiq.vercel.app/signin' }),
    (req, res) => {
        if (!req.user || !req.user.user) {
            console.log('User data missing');
            return res.status(400).json({ message: 'Authentication failed or user data is missing.' });
        }

        const { name, email, profilePicture, token } = req.user.user;
        console.log('Authenticated User:', req.user.user); // Check if token is in user data

        const redirectUrl = `https://exploreiq.vercel.app/welcome/?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&profilePicture=${encodeURIComponent(profilePicture)}&token=${encodeURIComponent(token)}`;
        console.log('Redirecting to:', redirectUrl); // Log the redirect URL
        res.redirect(redirectUrl);
    }
);



module.exports = user;