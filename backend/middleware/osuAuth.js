import fetch from 'node-fetch';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });

let cachedToken = null;
let tokenExpiration = null;

const getOsuAccessToken = async () => {
    if (cachedToken && Date.now() < tokenExpiration) {
        return cachedToken; // Return the cached token if it's still valid
    }
    
    const response = await fetch('https://osu.ppy.sh/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.OSU_CLIENT_ID,
            client_secret: process.env.OSU_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: 'public'
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiration = Date.now() + (data.expires_in * 1000); // Set expiration based on API response

    return cachedToken;
};

// Middleware to attach access token to the request
const osuAuthMiddleware = async (req, res, next) => {
    try {
        req.osuAccessToken = await getOsuAccessToken();
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export the middleware
export default osuAuthMiddleware;
