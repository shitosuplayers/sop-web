const bgGrad = document.getElementById('bgGrad');
const imageUrl = '/media/images/grad.png';

bgGrad.style.backgroundImage = 'linear-gradient(var(--background), var(--backgroundGrad))';

const img = new Image();
img.src = imageUrl;
img.onload = () => bgGrad.style.backgroundImage = `url(${img.src})`;
img.onerror = () => console.log("Image failed to load");

window.addEventListener('DOMContentLoaded', () => {
    const headerTitle = document.querySelector('.nav-branding h1');
    const pageTitle = window.location.pathname.split('/').pop().split('.')[0];
    headerTitle.textContent = pageTitle;
    document.title = pageTitle;

    const headerSolid = document.getElementById('headerSolid');
    window.addEventListener('scroll', () => headerSolid.classList.toggle('show', window.pageYOffset > 0));

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburger.addEventListener("click", () => [hamburger, navMenu].forEach(el => el.classList.toggle("active")));

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => [hamburger, navMenu].forEach(el => el.classList.remove("active"))));

    const socialLinks = {
        discord: "https://discord.gg/8peUKrkCTj",
        twitter: "https://twitter.com/shitosuplayers",
        youtube: "https://youtube.com/@shitosuplayers",
        instagram: "https://instagram.com/shitosuplayers/"
    };

    document.querySelectorAll('.nav-socials a, .footer-content .socials a').forEach(link => {
        const socialClass = link.classList[0];
        if (socialLinks[socialClass]) link.href = socialLinks[socialClass];
    });

    // Function to add 'active' class to the appropriate nav item
    const setActiveNavItem = () => {
        const currentUrl = window.location.pathname;
        document.querySelectorAll('.nav-item').forEach(item => {
            const link = item.querySelector('a').getAttribute('href');
            item.classList.toggle('active', currentUrl.includes(link));
        });
    };

    // Call the function initially to set the active nav item
    setActiveNavItem();
});
