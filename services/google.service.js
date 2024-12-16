// auth.js

const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');



// Initialize Google OAuth client with the Google Client ID
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to verify the Google ID token using Firebase Admin SDK
const verifyGoogleIdToken = async(idToken) => {
    try {
        // Verify the ID token with Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        throw new Error('Google ID token verification failed: ' + error.message);
    }
};

// Function to verify the Google ID token using Google OAuth
const verifyGoogleToken = async(idToken) => {
    try {
        // Verify the token with Google OAuth2 client
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // Client ID to match
        });
        const payload = ticket.getPayload();
        return payload; // Returns decoded Google OAuth payload
    } catch (error) {
        throw new Error('Google ID token verification failed: ' + error.message);
    }
};

module.exports = { verifyGoogleIdToken, verifyGoogleToken };