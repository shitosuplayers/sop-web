const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Route to test osu! API
app.get('/test-api', async (req, res) => {
    const apiKey = '54340cac03339a8902a238ca2831b37762067fb3'; // Replace with your API key
    const osuUserId = '15794645'; // Replace with a valid osu! user ID
    const apiUrl = `https://osu.ppy.sh/api/get_user?k=${apiKey}&u=${osuUserId}`;

    try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        console.log('Response from osu! API:', responseData);
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching osu! API data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
