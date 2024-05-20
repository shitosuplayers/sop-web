document.addEventListener("DOMContentLoaded", function() {
    fetch('https://84.210.67.128//test-api')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched osu! API data:', data);
        })
        .catch(error => console.error('Error fetching osu! API data:', error));
});
