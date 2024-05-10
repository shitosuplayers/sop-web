window.addEventListener('scroll', function () {
    var headerSolid = document.getElementById('headerSolid');
    if (window.pageYOffset > 0) {
        headerSolid.classList.add('show');
    } else {
        headerSolid.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const logoImg = document.querySelector('.logo-img');

    if (logoImg) {
        const originalSrc = logoImg.src;
        const alternativeSrc = logoImg.getAttribute('data-alt-src');

        logoImg.addEventListener('mouseover', function () {
            logoImg.src = alternativeSrc;
        });

        logoImg.addEventListener('mouseout', function () {
            logoImg.src = originalSrc;
        });
    }
});

const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
}))