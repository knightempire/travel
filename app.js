const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const { db, rtdb } = require('./config/db'); // Assuming you have this file configured
const userRoutes = require('./routes/user.router');

dotenv.config(); // Loads .env file

const app = express();
const port = 3005;

app.use(cors());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running and connected to Firebase!');
});

// User routes
app.use('/user', userRoutes);

// Check Firebase connection
app.get('/check-db', (req, res) => {
    rtdb.ref('.info/connected').once('value', (snapshot) => {
        if (snapshot.val() === true) {
            res.send('Connected to Firebase Realtime Database.');
        } else {
            res.send('Failed to connect to Firebase Realtime Database.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});