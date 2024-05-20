document.addEventListener("DOMContentLoaded", function() {
    fetch('https://shitosuplayers.xyz/test-api')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched osu! API data:', data);
        })
        .catch(error => console.error('Error fetching osu! API data:', error));
});
