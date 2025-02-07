const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const communityRoutes = require('./routes/communityRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/farmer_community', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/community', communityRoutes);
app.use('/api/users', userRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Farmer Community API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Assuming you are using Express and a middleware for authentication
app.get('/api/user', (req, res) => {
    const userId = req.user ? req.user.id : null; // Fetch user ID from session or token
    res.json({ userId });
});



