const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Route to serve member data
app.get('/data/members', async (req, res) => {
    try {
        // Fetch member data from members.json
        const membersResponse = await fetch('https://shitosuplayers.xyz/data/members.json');
        const membersData = await membersResponse.json();

        // Function to fetch user data from osu! API
        async function fetchUserData(osuId) {
            const apiKey = '54340cac03339a8902a238ca2831b37762067fb3';
            const apiUrl = `https://osu.ppy.sh/api/get_user?k=${apiKey}&u=${osuId}`;
            const response = await fetch(apiUrl);
            const userData = await response.json();
            return userData[0]; // Assuming only one user is returned
        }

        // Fetch user data for each member
        for (const category in membersData.members) {
            for (const member of membersData.members[category]) {
                const userData = await fetchUserData(member.osu_id);
                if (userData) {
                    member.username = userData.username;
                    member.pp_rank = userData.pp_rank;
                    member.country = userData.country;
                }
            }
        }

        res.json(membersData);
    } catch (error) {
        console.error('Error fetching member data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
