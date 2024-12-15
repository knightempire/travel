const { rtdb } = require('../config/db');


const validateUserData = async(userData, schema) => {

    for (const field in schema) {
        if (schema[field].required && !userData[field]) {
            console.log(`${field} is required`);
            return { valid: false, error: `${field} is required` };
        }
    }


    if (userData.email) {
        const emailSnapshot = await rtdb.ref('users').orderByChild('email').equalTo(userData.email).once('value');

        if (emailSnapshot.exists()) {
            console.log('Email already exists');
            return { valid: false, error: 'Email already exists' };
        }
    }


    return { valid: true };
};

module.exports = { validateUserData };