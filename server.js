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
app.get('/data/members', async (req, res) => {
    try {
        // Fetch member data from your JSON file
        const membersResponse = await fetch('https://shitosuplayers.xyz/data/members');
        const membersData = await membersResponse.json();

        // Function to fetch user data from osu! API
        async function fetchUserData(osuId) {
            const apiUrl = `https://osu.ppy.sh/api/get_user?k=${apiKey}&u=${osuId}`;
            const response = await fetch(apiUrl);
            const userData = await response.json();
            return userData[0]; // Assuming only one user is returned
        }

        // Fetch user data for each member
        const updatedMembersData = await Promise.all(
            Object.keys(membersData.members).map(async category => {
                const members = membersData.members[category];
                const updatedMembers = await Promise.all(
                    members.map(async member => {
                        const userData = await fetchUserData(member.osu_id);
                        if (userData) {
                            member.username = userData.username;
                            member.pp_rank = userData.pp_rank;
                            member.country = userData.country;
                        }
                        return member;
                    })
                );
                return { [category]: updatedMembers };
            })
        );

        // Combine updated member data into a single object
        const combinedData = updatedMembersData.reduce((acc, cur) => {
            const category = Object.keys(cur)[0];
            acc.members[category] = cur[category];
            return acc;
        }, { members: {} });

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching member data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
