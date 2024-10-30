import express from 'express';
import fetch from 'node-fetch'; // Make sure you have node-fetch installed
import pool from '../db/db.js'; // Import the database connection
const router = express.Router();

// Route to get member data
router.get('/', async (req, res) => {
    try {
        // Get osuAccessToken from the request
        const osuAccessToken = req.osuAccessToken;

        // Query to get osu_user_id, discord_username, and role from the members table
        const [members] = await pool.query('SELECT osu_user_id, discord_username, role FROM members');

        // Create an array of fetch promises for each user ID
        const userPromises = members.map(member =>
            fetch(`https://osu.ppy.sh/api/v2/users/${member.osu_user_id}/osu`, {
                headers: {
                    Authorization: `Bearer ${osuAccessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        );

        // Wait for all fetch promises to resolve
        const userResponses = await Promise.all(userPromises);

        // Check for errors in responses and parse JSON data
        const userData = await Promise.all(
            userResponses.map(async response => {
                if (!response.ok) {
                    throw new Error(`Error fetching user data: ${response.statusText}`);
                }
                const data = await response.json(); // Parse JSON data
                // Return only the required fields
                return {
                    id: data.id,
                    username: data.username,
                    discord: data.discord,
                    avatar_url: data.avatar_url,
                    country_code: data.country_code,
                    global_rank: data.statistics.global_rank
                };
            })
        );

        // Combine user data with member info
        const combinedData = members.map((member, index) => ({
            ...member,
            osuData: userData[index] // Attach fetched osu! data
        }));

        // Render the EJS template with the combined data
        res.render('members', {
            title: 'Members',
            headerTitle: 'Members',
            members: combinedData // Pass the combined user data to the EJS view
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: error.message }); // Handle errors gracefully
    }
});

export default router;
