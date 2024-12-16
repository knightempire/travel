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
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Check if the user object is available


        // If the user already exists, send a 400 with a message
        if (req.user.message === 'User already exists with this email.') {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!req.user || !req.user.user) {
            // If no user data exists, handle the error gracefully
            return res.status(400).json({ message: 'Authentication failed or user data is missing.' });
        }

        // Safe to access the user data
        const { name, email, profilePicture } = req.user.user;

        console.log('Authenticated User:', req.user.user); // Log the authenticated user data

        // Return the user data to the client
        res.status(200).json({
            message: 'User successfully logged in or registered',
            user: { name, email, profilePicture },
        });
    }
);



module.exports = user;