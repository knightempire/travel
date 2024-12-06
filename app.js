// app.js
const express = require('express');
const { db, rtdb } = require('./db/db'); // Import Firebase instances

const app = express();
const port = 3005;

// Simple route to check server status
app.get('/', (req, res) => {
    res.send('Server is running and connected to Firebase!');
});



// Example route to check Firebase Realtime Database connection
app.get('/check-db', (req, res) => {
    rtdb.ref('.info/connected').once('value', (snapshot) => {
        if (snapshot.val() === true) {
            res.send('Connected to Firebase Realtime Database.');
        } else {
            res.send('Failed to connect to Firebase Realtime Database.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});