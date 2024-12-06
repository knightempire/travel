// db/project.js
require('dotenv').config();
const admin = require("firebase-admin");

const databaseURL = process.env.FIREBASE_DB_URL;
const credentialsPath = process.env.FIREBASE_CREDENTIALS_PATH;

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(require(credentialsPath)),
    databaseURL: databaseURL, // Connect to the Realtime Database URL
});

const db = admin.firestore(); // Firestore instance
const rtdb = admin.database(); // Realtime Database instance

// Check Firebase Realtime Database connection
rtdb.ref('.info/connected').once('value', (snapshot) => {
    if (snapshot.val() === true) {
        console.log("Successfully connected to Firebase Realtime Database.");
    } else {
        console.log("Failed to connect to Firebase Realtime Database.");
    }
});

module.exports = { db, rtdb };