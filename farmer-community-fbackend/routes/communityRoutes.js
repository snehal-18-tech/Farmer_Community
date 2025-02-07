const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Discussion  = require('../models/Community');
// const Question = require('../models/Question');
const { Question, Discussion } = require('../models/Community');

// Route to post a new question
router.post('/post-question', async (req, res) => {
    try {
        console.log('Received request body:', req.body);  // Log the request body
        const { author, content, category } = req.body;

        // Check if required fields are missing
        if (!author || !content || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if author is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ message: 'Invalid author ID.' });
        }

        // Create a new question
        const newQuestion = new Question({ author, content, category });
        await newQuestion.save();

        res.status(201).json({ message: 'Question posted successfully!', question: newQuestion });
    } catch (error) {
        console.error('Error posting question:', error);  // Log the error on the server side
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to post an answer to a question
router.post('/post-answer', async (req, res) => {
    try {
        const { authorId, questionId, content } = req.body;

        const newAnswer = new Discussion({
            author: authorId,
            question: questionId,
            content: content
        });

        await newAnswer.save();
        res.status(201).json({ message: 'Answer posted successfully', answer: newAnswer });
    } catch (err) {
        res.status(400).json({ message: 'Error posting answer', error: err });
    }
});

// Route to get all answers for a specific question
router.get('/answers/:questionId', async (req, res) => {
    try {
        const { questionId } = req.params;
        console.log(`Fetching answers for question ID: ${questionId}`);

        const answers = await Discussion.find({ question: questionId }).populate('author', 'username');
        console.log('Answers fetched:', answers);

        res.status(200).json(answers);
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ message: 'Error fetching answers', error });
    }
});

// Route to get all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find().populate('author', 'username'); // Only populate the `username` field
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
