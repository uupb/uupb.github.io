// script.js
function toggleExpand(element) {
    // Toggle the 'expanded' class on the clicked element
    element.classList.toggle('expanded');

    // Collapse other expanded boxes
    const allBoxes = document.querySelectorAll('.link-box.expandable');
    allBoxes.forEach(box => {
        if (box !== element && box.classList.contains('expanded')) {
            box.classList.remove('expanded');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel Logic ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Show the correct slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event Listeners for Carousel
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Initialize carousel by showing the first slide
    if (slides.length > 0) {
        showSlide(currentSlide);
    }
});