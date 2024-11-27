require('dotenv').config();

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("./travel-70aa4-firebase-adminsdk-tuj3z-c18402faaa.json")
  ),
});

// Example: Firestore database instance
const db = admin.firestore();

// Example: Firebase Authentication instance
const auth = admin.auth();

console.log("Firebase is connected");
