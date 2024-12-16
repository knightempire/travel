const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { rtdb } = require('../config/db'); // Firebase Realtime Database reference
const { generateToken } = require('../middleware/token.middleware'); // Import token generation function

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL, // Make sure it matches
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                const { id, emails, displayName, photos } = profile;
                const email = emails[0].value;
                const name = displayName || 'Unnamed User';
                const picture = photos && photos[0] ? photos[0].value : ''; // Ensure picture exists

                // Check if the user exists in Firebase Realtime Database
                const userRef = rtdb.ref('users').orderByChild('email').equalTo(email);
                const snapshot = await userRef.once('value');
                let existingUser = snapshot.val();

                if (existingUser) {
                    // If user exists, retrieve and send the necessary data
                    const userData = Object.values(existingUser)[0]; // Get the first (and only) user object
                    console.log('User exists with email:', email); // Log to console

                    // Generate token
                    const token = generateToken(userData);
                    console.log('Generated Token:', token); // Log token to verify it's created correctly

                    return done(null, {
                        message: 'User already exists with this email.',
                        user: {
                            email,
                            name: userData.name,
                            isAdmin: userData.isAdmin,
                            isActive: userData.isActive,
                            profilePicture: userData.profilePicture,
                            token: token, // Include token in the response
                        },
                    });
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

                // Generate token for the new user
                const token = generateToken(newUser);
                console.log('Generated Token:', token); // Log token to verify it's created correctly

                return done(null, { user: newUser, token });
            } catch (error) {
                console.error('Error during authentication:', error);
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