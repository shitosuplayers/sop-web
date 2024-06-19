function updatePlayerInfo() {
    const apiKey = '54340cac03339a8902a238ca2831b37762067fb3'; // Replace with your osu! API key
    const username = document.getElementById('usernameInput').value.toLowerCase(); // Convert to lowercase
    const discord = document.getElementById('discordInput').value.toLowerCase(); // Convert to lowercase
    const status = document.getElementById('statusSelect').value;

    // Make API request to retrieve player info
    fetch(`https://osu.ppy.sh/api/get_user?k=${apiKey}&u=${username}`)
        .then(response => response.json())
        .then(data => {
            const player = data[0];
            const rank = `#${player.pp_rank}`;
            const country = player.country.toLowerCase(); // Convert country code to lowercase
            const flagUrl = `/media/images/flags/${country}.png`; // Assuming flags are stored in /images/flags folder
            const avatarUrl = `https://a.ppy.sh/${player.user_id}`;
            const osuUsername = player.username; // Retrieve username from API response

            // Update HTML with player info
            const playerInfoDiv = document.getElementById('playerInfo');
            playerInfoDiv.innerHTML = `
                <a href="https://osu.ppy.sh/users/${player.user_id}" class="profileLink"></a>
                <img src="${avatarUrl}" class="pfp">
                <div class="user-info">
                    <div class="icon-container">
                        <img src="${flagUrl}" class="flag">
                        <img src="/media/images/icons/osu/osu-standard-white.png" class="gamemode-icon">
                    </div>
                    <div class="name-rank">
                        <h1>${osuUsername}</h1> <!-- Display username from API response -->
                        <p>${rank}</p>
                    </div>
                </div>

                <div class="discord">
                    <img src="/media/images/icons/socials/discord-mark-white.svg" class="discord-icon">
                    <p>${discord}</p>
                </div>

                <div class="status ${getStatusClass(status)}">${status}</div>
                <div class="outline ${getStatusOutline(status)}"></div>
                <div class="shadow"></div>
            `;
        })
        .catch(error => console.error('Error:', error));
}

// Function to get the CSS class for the status
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'owner':
            return 'status-owner';
        case 'moderator':
            return 'status-moderator';
        case 'content manager':
            return 'status-content-manager';
        default:
            return 'status-member';
    }
}

// Function to get the outline class based on status
function getStatusOutline(status) {
    switch (status.toLowerCase()) {
        case 'owner':
            return 'outline-owner';
        case 'moderator':
            return 'outline-moderator';
        case 'content manager':
            return 'outline-content-manager';
        default:
            return 'outline';
    }
}
