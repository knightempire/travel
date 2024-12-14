const { rtdb } = require('../config/db'); // Import the Firebase Realtime Database instance

// Validate user data against the schema
const validateUserData = async(userData, schema) => {
    // Validate required fields
    for (const field in schema) {
        if (schema[field].required && !userData[field]) {
            console.log(`${field} is required`);
            return { valid: false, error: `${field} is required` };
        }
    }

    // Check for email uniqueness in Realtime Database
    if (userData.email) {
        const emailSnapshot = await rtdb.ref('users').orderByChild('email').equalTo(userData.email).once('value');

        if (emailSnapshot.exists()) {
            console.log('Email already exists');
            return { valid: false, error: 'Email already exists' };
        }
    }

    // If no validation errors
    return { valid: true };
};

module.exports = { validateUserData };