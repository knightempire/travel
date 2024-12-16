const admin = require('firebase-admin');
const { getISTTimestamp } = require('../utils/time');


const userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, default: null },
    createdAt: {
        type: String,
        default: getISTTimestamp()
    },
    updatedAt: {
        type: String,
        default: getISTTimestamp()
    },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    profilePicture: { type: String, default: null },
};

module.exports = userSchema;