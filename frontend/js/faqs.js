// Select all question elements
const questions = document.querySelectorAll('.question');

// Loop through each question element and add a click event listener
questions.forEach(question => {
    question.addEventListener('click', () => {
        // Toggle the 'active' class on the parent 'faqs' element
        question.closest('.faqs').classList.toggle('active');
    });
});
