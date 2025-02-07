// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Use bodyParser to handle JSON data
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));  // Assuming 'public' folder contains your static files

// In-memory cart storage (for demonstration purposes)
let cart = [];

// Route to serve marketplace.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'marketplace.html'));
});

// API route to handle adding to cart
app.post('/add-to-cart', (req, res) => {
    const { productId, productName, productPrice } = req.body;
    const productExists = cart.find(item => item.productId === productId);

    if (productExists) {
        productExists.quantity += 1; // If product is already in the cart, increase quantity
    } else {
        cart.push({
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            quantity: 1
        });
    }

    res.json({ cart });
});

// API route to get cart contents (for cart.html page)
app.get('/cart-items', (req, res) => {
    res.json(cart);
});

// API route to remove an item from cart
app.post('/remove-from-cart', (req, res) => {
    const { productId } = req.body;
    cart = cart.filter(item => item.productId !== productId);
    res.json({ cart });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
