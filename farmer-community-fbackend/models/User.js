// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Make sure this is required and unique
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create an index for username for better performance
userSchema.index({ username: 1 });

module.exports = mongoose.model('User', userSchema);
