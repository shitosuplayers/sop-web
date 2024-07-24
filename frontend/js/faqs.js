// Select all question elements
const questions = document.querySelectorAll('.question');

// Loop through each question element and add a click event listener
questions.forEach(question => {
    question.addEventListener('click', () => {
        // Remove the 'active' class from all '.faqs' elements
        document.querySelectorAll('.faqs.active').forEach(faq => {
            faq.classList.remove('active');
        });

        // Toggle the 'active' class on the parent '.faqs' element of the clicked question
        question.closest('.faqs').classList.toggle('active');
    });
});
