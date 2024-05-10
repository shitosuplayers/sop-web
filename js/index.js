document.addEventListener("DOMContentLoaded", function () {
    // Get references to the elements
    const sopMeetup = document.querySelector('.sopMeetup');
    const sopEvents = document.querySelector('.sopEvents');
    const sopMeetupBg = document.getElementById('sopMeetupBg');
    const sopEventsBg = document.getElementById('sopEventsBg');

    // Function to check if an element is in the middle of the viewport
    function isInMiddle(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
    }

    // Function to update opacity based on element position
    function updateOpacity() {
        // Check if sopMeetup is in the middle of the screen
        if (isInMiddle(sopMeetup)) {
            sopMeetupBg.style.opacity = '0.4';
        } else {
            sopMeetupBg.style.opacity = '0';
        }

        // Check if sopEvents is in the middle of the screen
        if (isInMiddle(sopEvents)) {
            sopEventsBg.style.opacity = '0.4';
        } else {
            sopEventsBg.style.opacity = '0';
        }
    }

    // Add event listener for scroll event to update opacity
    window.addEventListener('scroll', updateOpacity);

    // Initial update to set opacity based on initial position
    updateOpacity();
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutUs = document.querySelector('.about-us');
    const aboutUsParagraph = document.querySelector('.about-us p');

    // Function to check if the top of the about-us div is past the middle of the viewport
    function isAboutUsPastMiddle() {
        const rect = aboutUs.getBoundingClientRect();
        return rect.top > window.innerHeight / 2;
    }

    // Function to update visibility based on about-us position
    function updateAboutUsVisibility() {
        // Check if about-us is past the middle of the screen
        if (isAboutUsPastMiddle()) {
            aboutUsParagraph.classList.add('hidden');
        } else {
            aboutUsParagraph.classList.remove('hidden');
        }
    }

    // Add event listener for scroll event to update visibility
    window.addEventListener('scroll', updateAboutUsVisibility);

    // Initial update to set visibility based on initial position
    updateAboutUsVisibility();
});


// Function to update the Twitter timeline height
function updateTwitterTimelineHeight() {
    var twitterTimeline = document.getElementById('twitterTimeline');
    var vw = window.innerWidth; // Get the viewport width
    var height = vw * 0.462; // Adjust this multiplier as needed
    twitterTimeline.setAttribute('data-height', height + 'px');
}

// Calculate and update the height initially
updateTwitterTimelineHeight();

// Recalculate and update the height whenever the window is resized
window.addEventListener('resize', updateTwitterTimelineHeight);