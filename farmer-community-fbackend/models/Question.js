const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,  // References the 'User' model
        ref: 'User',  // Ensure User model is imported and exists
        required: true
    },
    content: {
        type: String,  // Question content
        required: true
    },
    category: {
        type: String,  // Question category (e.g., 'General', 'Equipment')
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set creation date
    }
});

// Export the model
module.exports = mongoose.model('Question', questionSchema);
