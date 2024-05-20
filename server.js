const express = require('express');
const fetch = require('node-fetch');
const app = express();
const apiKey = '54340cac03339a8902a238ca2831b37762067fb3'; // Replace with your API key

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Route to test osu! API connection
app.get('/test-api', async (req, res) => {
    try {
        const osuId = '15794645'; // Example osu! ID for testing
        const apiUrl = `https://osu.ppy.sh/api/get_user?k=${apiKey}&u=${osuId}`;
        const response = await fetch(apiUrl);
        const userData = await response.json();

        if (userData && userData.length > 0) {
            res.json(userData[0]); // Return the first user data object
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching osu! API data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
