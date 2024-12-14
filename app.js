// app.js
const express = require('express');
const { db, rtdb } = require('./config/db');

const userRoutes = require('./routes/user.router');
const app = express();
const port = 3005;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running and connected to Firebase!');
});


app.use('/user', userRoutes);
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