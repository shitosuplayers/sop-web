document.addEventListener("DOMContentLoaded", function() {
    var notice = document.querySelector('.notice');
    setTimeout(function() {
        notice.classList.add('active');
    }, 100);
});