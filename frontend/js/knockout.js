function clearUI() {
    // Hide header
    const header = document.querySelector('header');
    header.style.display = 'none';

    // Hide footer
    const footer = document.querySelector('footer');
    footer.style.display = 'none';

    // Hide beatmap background
    const beatmapBackground = document.querySelector('.beatmap-background');
    beatmapBackground.style.display = 'none';

    // Hide bgGrad and change background color to black
    const bgGrad = document.getElementById('bgGrad');
    bgGrad.style.display = 'none';
    document.body.style.backgroundColor = 'black';
}

const htmlFileName = window.location.pathname.split('/').pop();
let jsonFilePath;

if (htmlFileName.endsWith('')) {
    jsonFilePath = `/data/knockout/${htmlFileName.replace('', '.json')}`;
} else {
    jsonFilePath = `/data/knockout/${htmlFileName}.json`;
}

fetch(jsonFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error fetching leaderboard: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const leaderboardContainer = document.getElementById('leaderboard-container');
        const leaderboard = data.leaderboard;

        leaderboard.forEach((player, index) => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');

            const playerInfo = document.createElement('div');
            playerInfo.classList.add('player-info');

            const playerName = document.createElement('div');
            playerName.textContent = player.playername;
            playerName.classList.add('player-name');

            const playerScore = document.createElement('div');
            playerScore.textContent = `${player.score.toLocaleString()}`;
            playerScore.classList.add('player-score');

            const playerMaxCombo = document.createElement('div');
            playerMaxCombo.textContent = `${player.max_combo.toLocaleString()}x`;
            playerMaxCombo.classList.add('player-max-combo');

            const playerAcc = document.createElement('div');
            playerAcc.textContent = `${player.acc.toLocaleString()}%`;
            playerAcc.classList.add('player-acc');

            const playerMissCount = document.createElement('div');
            playerMissCount.textContent = `${player.misscount.toLocaleString()}x Miss`;
            playerMissCount.classList.add('player-miss-count');

            playerInfo.appendChild(playerName);
            playerInfo.appendChild(playerScore);
            playerInfo.appendChild(playerMaxCombo);
            playerInfo.appendChild(playerAcc);
            playerInfo.appendChild(playerMissCount);

            playerCard.appendChild(playerInfo);

            // Check if it's a top 3 player
            if (index < 3) {
                const topPlayerDiv = document.createElement('div');
                topPlayerDiv.classList.add('top-player');
                topPlayerDiv.textContent = player.playername;

                // Append to corresponding top player div
                if (index === 0) {
                    const firstPlacePlayer = document.querySelector('.first-place-player');
                    if (firstPlacePlayer) {
                        firstPlacePlayer.appendChild(topPlayerDiv);
                    }
                    playerCard.classList.add('first-place');
                } else if (index === 1) {
                    const secondPlacePlayer = document.querySelector('.second-place-player');
                    if (secondPlacePlayer) {
                        secondPlacePlayer.appendChild(topPlayerDiv);
                    }
                    playerCard.classList.add('second-place');
                } else if (index === 2) {
                    const thirdPlacePlayer = document.querySelector('.third-place-player');
                    if (thirdPlacePlayer) {
                        thirdPlacePlayer.appendChild(topPlayerDiv);
                    }
                    playerCard.classList.add('third-place');
                }
            }

            leaderboardContainer.appendChild(playerCard);

            // Add separator if not the last player
            if (index !== leaderboard.length - 1) {
                const separator = document.createElement('div');
                separator.classList.add('separator');
                leaderboardContainer.appendChild(separator);
            }
        });

        // Set beatmap background
        const beatmapLink = data.beatmap_link;
        const beatmapIdRegex = /\/(\d+)(?:#osu\/\d+)?$/;
        const match = beatmapLink.match(beatmapIdRegex);
        const beatmapId = match ? match[1] : null;
        if (beatmapId) {
            const beatmapBackgroundURL = `https://assets.ppy.sh/beatmaps/${beatmapId}/covers/raw.jpg`;
            const beatmapBackgroundDiv = document.querySelector('.beatmap-background');
            beatmapBackgroundDiv.style.backgroundImage = `url(${beatmapBackgroundURL})`;

            // Listen for scroll events
            window.addEventListener('scroll', () => {
                // Calculate margin-top based on scroll position
                const scrollPosition = window.scrollY;
                const backgroundMargin = scrollPosition * 0.5; // 20% of the scroll position
                beatmapBackgroundDiv.style.marginTop = `${backgroundMargin}px`;
            });
        }
    })
    .catch(error => console.error(error));
