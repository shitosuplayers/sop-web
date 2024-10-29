document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop().split(".")[0];
    document.querySelectorAll(".nav-item").forEach(item => {
        const href = item.querySelector("a").getAttribute("href");
        item.classList.toggle("active", currentPage === href.split("/").pop().split(".")[0] || (!currentPage && href === '/'));
    });
});

const bgGrad = document.getElementById('bgGrad');
const img = new Image();
const imageUrl = '/assets/images/grad.png';
bgGrad.style.backgroundImage = 'linear-gradient(var(--background), var(--backgroundGrad))';
img.src = imageUrl;
img.onload = () => bgGrad.style.backgroundImage = `url(${img.src})`;
img.onerror = () => console.log("Image failed to load");

window.addEventListener('scroll', () => document.getElementById('headerSolid').classList.toggle('show', window.pageYOffset > 0));

const [hamburger, navMenu] = [document.querySelector(".hamburger"), document.querySelector(".nav-menu")];
hamburger.addEventListener("click", () => [hamburger, navMenu].forEach(el => el.classList.toggle("active")));
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => [hamburger, navMenu].forEach(el => el.classList.remove("active"))));