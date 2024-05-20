document.addEventListener("DOMContentLoaded", function() {
    // Show notice after a short delay
    setTimeout(() => document.querySelector('.notice').classList.add('active'), 100);
    
    fetch('http://localhost:3000/data/members')
        .then(response => response.json())
        .then(data => {
            // Access member data and render it in your HTML
            console.log(data); // You can see the fetched data in the console
            // Render the data in your HTML as needed
        })
        .catch(error => console.error('Error fetching member data:', error));
});
