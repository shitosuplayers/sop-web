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

// Add entries for URLs without .html extension
Object.keys(pageTitles).forEach(key => {
    if (key.endsWith('.html')) {
        const urlWithoutHtml = key.slice(0, -5); // Remove .html extension
        pageTitles[urlWithoutHtml] = pageTitles[key];
    }
});

// Set header title based on the current page URL
if (pageTitles[currentPageUrl]) {
    headerTitle.textContent = pageTitles[currentPageUrl];
} else {
    // Extract the title from the URL
    const pageTitle = currentPageUrl.split('/').pop();
    headerTitle.textContent = pageTitle;
}

// Set active class for nav-item links
navItemLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (currentPageUrl.includes(linkHref) || (linkHref === '/index.html' && currentPageUrl === '/')) {
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
