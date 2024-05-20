var bgGrad = document.getElementById('bgGrad');
var imageUrl = '/media/images/grad.png';

// Display linear gradient while the image is loading
bgGrad.style.backgroundImage = 'linear-gradient(var(--background), var(--backgroundGrad))';

// Create an image element
var img = new Image();

// Set the image source
img.src = imageUrl;

// When the image loads successfully, switch the background to the image
img.onload = function() {
    bgGrad.style.backgroundImage = `url(${img.src})`;
};

// If the image fails to load, keep the linear gradient as the background
img.onerror = function() {
    console.log("Image failed to load");
};

window.addEventListener('DOMContentLoaded', function () {
    const currentPageUrl = window.location.pathname || '/'; // Use '/' if pathname is empty
    const headerSolid = document.getElementById('headerSolid');
    const headerTitle = document.querySelector('.nav-branding h1');
    const navItemLinks = document.querySelectorAll('.nav-menu .nav-item a');

    const pageTitles = {
        '/': 'shit osu! players', // Default title for home page
        '/index.html': 'shit osu! players',
        '/index': 'shit osu! players',
        '/html/members.html': 'Members',
        '/html/members': 'Members',
        '/html/faqs.html': 'FAQs',
        '/html/faqs': 'FAQs',
        // Add more page titles as needed
    };

    // Set header title based on the current page URL
    let pageTitle = pageTitles[currentPageUrl] || currentPageUrl.split('/').pop().split('.')[0];
    headerTitle.textContent = pageTitle;

    // Set active class for nav-item links
    navItemLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPath = linkHref.endsWith('.html') ? linkHref.slice(0, -5) : linkHref; // Remove .html extension if present
        const currentPath = currentPageUrl.endsWith('.html') ? currentPageUrl.slice(0, -5) : currentPageUrl; // Remove .html extension if present
        if (currentPath === linkPath || (linkPath === '/index' && currentPath === '/')) {
            link.parentNode.classList.add('active');
        }
    });

    // Scroll event listener for header opacity animation
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 0) {
            headerSolid.classList.add('show');
        } else {
            headerSolid.classList.remove('show');
        }
    });

    // Add event listener for hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Add event listener for nav-link clicks
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // Define your social links in an object
    const socialLinks = {
        discord: "https://discord.gg/8peUKrkCTj",
        twitter: "https://twitter.com/shitosuplayers",
        youtube: "https://youtube.com/@shitosuplayers",
        instagram: "https://instagram.com/shitosuplayers/"
    };

    // Replace the href attributes of the social links in the navigation menu
    document.querySelectorAll('.nav-socials a').forEach(link => {
        const socialName = link.classList[0]; // Extract social class name
        if (socialLinks[socialName]) {
            link.href = socialLinks[socialName];
        }
    });

    // Replace the href attributes of the social icons in the footer
    document.querySelectorAll('.footer-content .socials a').forEach(link => {
        const socialClass = link.classList[0]; // Extract social class name
        if (socialLinks[socialClass]) {
            link.href = socialLinks[socialClass];
        }
    });
});
