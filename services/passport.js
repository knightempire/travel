const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { rtdb } = require('../config/db'); // Firebase Realtime Database reference

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL, // Callback URL from Google Developer Console
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                const { id, emails, displayName, photos } = profile;
                const email = emails[0].value;
                const name = displayName || 'Unnamed User';
                const picture = photos[0].value || '';

                // Check if the user exists in Firebase Realtime Database
                const userRef = rtdb.ref('users').orderByChild('email').equalTo(email);
                const snapshot = await userRef.once('value');
                let existingUser = snapshot.val();

                if (existingUser) {
                    // If user already exists, log and send a message
                    console.log('User exists with email:', email); // Log to console
                    return done(null, { message: 'User already exists with this email.' });
                }

                // If the user doesn't exist, create a new user in the database
                const newUser = {
                    name,
                    email,
                    profilePicture: picture,
                    isActive: true,
                    isAdmin: false, // Modify based on your needs
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                const userRefNew = rtdb.ref('users').push();
                await userRefNew.set(newUser);

                // Return the created user to the callback
                return done(null, { user: newUser });
            } catch (error) {
                return done(error);
            }
        })
);

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;