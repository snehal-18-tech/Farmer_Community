const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const discussionSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question',required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = {
    Question: mongoose.model('Question', questionSchema),
    Discussion: mongoose.model('Discussion', discussionSchema)
};
