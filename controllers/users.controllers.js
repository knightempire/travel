const { rtdb } = require('../config/db');
const userSchema = require('../model/user.model');
const { validateUserData } = require('../utils/user.validation');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/token.middleware');
const { verifyGoogleIdToken } = require('../services/google.service');

// Register with Google - (Google OAuth Login/Sign-up)
const registerWithGoogle = async(req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: 'ID token is required' });
        }

        // Verify the Google ID token using Firebase Admin SDK (or Google OAuth client)
        const decodedToken = await verifyGoogleIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        // Prepare the user data based on the decoded token
        const userData = {
            email,
            name: name || 'Unnamed User',
            profilePicture: picture || '',
            isActive: true,
            isAdmin: false, // Modify this depending on your requirements
            createdAt: userSchema.createdAt.default,
            updatedAt: userSchema.updatedAt.default,
        };

        // Validate user data (assuming validateUserData works for both new and existing user checks)
        const validationResponse = await validateUserData(userData, userSchema);

        if (!validationResponse.valid) {
            return res.status(400).json({ error: validationResponse.error });
        }

        // Check if the user already exists in the database
        const userRef = rtdb.ref('users').orderByChild('email').equalTo(email);
        const snapshot = await userRef.once('value');
        let existingUser = snapshot.val();

        if (existingUser) {
            // User exists, return existing user and JWT token
            const user = Object.values(existingUser)[0];
            const token = generateToken(user);

            return res.status(200).json({
                message: 'User already registered',
                user,
                token,
            });
        }

        // If the user doesn't exist, create a new user in the database
        const newUser = {
            name: userData.name,
            email: userData.email,
            profilePicture: userData.profilePicture,
            isActive: userData.isActive,
            isAdmin: userData.isAdmin,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        };

        // Add the new user to the Firebase Realtime Database
        const userRefNew = rtdb.ref('users').push();
        await userRefNew.set(newUser);

        // Generate a JWT token for the new user
        const token = generateToken(newUser);

        // Respond with success and user data along with the JWT token
        res.status(201).json({
            message: 'User registered successfully with Google',
            user: newUser,
            token,
        });

    } catch (error) {
        console.error("Error registering with Google:", error.message);
        res.status(500).json({ error: 'Error registering user with Google' });
    }
};

// Login User - (Google Sign-In)
const loginWithGoogle = async(req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: 'ID token is required' });
        }

        // Verify the Google ID token using Firebase Admin SDK (or Google OAuth client)
        const decodedToken = await verifyGoogleIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        // Prepare the user data based on the decoded token
        const userData = {
            email,
            name: name || 'Unnamed User',
            profilePicture: picture || '',
        };

        // Check if the user exists in the database
        const userRef = rtdb.ref('users').orderByChild('email').equalTo(email);
        const snapshot = await userRef.once('value');
        let existingUser = snapshot.val();

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found, please register' });
        }

        // User exists, return user data and JWT token
        const user = Object.values(existingUser)[0];
        const token = generateToken(user);

        res.status(200).json({
            message: 'Login successful',
            user: {...user, token },
        });

    } catch (error) {
        console.error("Error logging in with Google:", error.message);
        res.status(500).json({ error: 'Error logging in user with Google' });
    }
};

// Create a new user
const createUser = async(req, res) => {
    try {
        console.log('Received data:', req.body);

        const userData = req.body;

        if (!userData || !userData.name || !userData.email || !userData.hashedPassword) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const validationResponse = await validateUserData(userData, userSchema);

        if (!validationResponse.valid) {
            return res.status(400).json({ error: validationResponse.error });
        }

        if (!rtdb) {
            return res.status(500).json({ error: 'Firebase Realtime Database is not connected' });
        }

        const hashedPassword = await bcrypt.hash(userData.hashedPassword, 10);

        const newUser = {
            name: userData.name,
            email: userData.email,
            hashedPassword: hashedPassword,
            createdAt: userSchema.createdAt.default,
            updatedAt: userSchema.updatedAt.default,
            isActive: userData.isActive !== undefined ? userData.isActive : userSchema.isActive.default,
            isAdmin: userData.isAdmin !== undefined ? userData.isAdmin : userSchema.isAdmin.default,
            profilePicture: userData.profilePicture !== undefined ? userData.profilePicture : userSchema.profilePicture.default,
        };

        const userRef = rtdb.ref('users').push();
        await userRef.set(newUser);

        res.status(201).json({
            message: "User created successfully",
        });

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Error creating user" });
    }
};

// Login a user
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userSnapshot = await rtdb.ref('users').orderByChild('email').equalTo(email).once('value');

        if (!userSnapshot.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userSnapshot.val();
        const userId = Object.keys(user)[0];
        const dbUser = user[userId];

        const passwordMatch = await bcrypt.compare(password, dbUser.hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: userId, ...dbUser });

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: { id: userId, name: dbUser.name, email: dbUser.email, isAdmin: dbUser.isAdmin },
        });

    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ error: 'Error logging in user' });
    }
};

module.exports = { createUser, loginUser, registerWithGoogle, loginWithGoogle };