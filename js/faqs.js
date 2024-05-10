const faqs = document.querySelectorAll(".faqs");

faqs.forEach(faqs => {
    faqs.addEventListener("click", () => {
        faqs.classList.toggle("active");
    })
})