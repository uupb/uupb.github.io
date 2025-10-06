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
    // --- Carousel Logic for multiple carousels ---
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentSlide = 0;

        if (slides.length === 0) return; // Skip if a carousel has no slides

        function showSlide(index) {
            // Hide all slides within this specific carousel
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

        // Event Listeners for this specific carousel's buttons
        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Initialize this carousel by showing its first slide
        showSlide(currentSlide);
    });
});