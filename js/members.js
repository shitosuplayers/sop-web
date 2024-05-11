document.addEventListener("DOMContentLoaded", function() {
    var notice = document.querySelector('.notice');
    setTimeout(function() {
        notice.classList.add('active');
    }, 100);
});



// Get all flag elements
const flags = document.querySelectorAll('.flag');

// Loop through each flag element
flags.forEach(flag => {
    // Get the flag source
    const flagSrc = flag.getAttribute('src');
    
    // Check if the flag source exists
    fetch(flagSrc)
        .then(response => {
            // If the flag exists, do nothing
            if (!response.ok) {
                // If the flag does not exist, set the fallback flag source
                flag.setAttribute('src', '/media/images/flags/__.png');
            }
        })
        .catch(error => {
            // If there's an error, set the fallback flag source
            flag.setAttribute('src', '/media/images/flags/__.png');
        });
});
