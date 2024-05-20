// Server side
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const apiKey = '54340cac03339a8902a238ca2831b37762067fb3'; // Replace with your API key

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Route to fetch member data
app.get('/test-api', async (req, res) => {
    try {
        // Fetch data from the osu! API
        const apiUrl = `https://osu.ppy.sh/api/get_user?k=${apiKey}&u=xiraphotography`;
        const response = await fetch(apiUrl);
        
        // Log the raw response content
        const responseData = await response.text();
        console.log('Response from osu! API:', responseData);

        // Parse the response as JSON
        const userData = JSON.parse(responseData);
        
        // Send the parsed JSON response to the client
        res.json(userData);
    } catch (error) {
        console.error('Error fetching osu! API data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
