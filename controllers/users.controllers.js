const { rtdb } = require('../config/db');
const userSchema = require('../model/user.model');
const { validateUserData } = require('../utils/user.validation');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/token.middleware');

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

module.exports = { createUser, loginUser };