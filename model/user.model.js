const admin = require('firebase-admin');


const userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    createdAt: { type: admin.database.ServerValue.TIMESTAMP },
    updatedAt: { type: admin.database.ServerValue.TIMESTAMP },
    isActive: { type: Boolean, default: true },
    profilePicture: { type: String, default: null },
};

module.exports = userSchema;