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
    // The slide strip is a flex row showing 3 slides at once (1 below 600px);
    // buttons translate the strip one slide at a time and wrap with a jump-cut.
    const carousels = document.querySelectorAll('.carousel-container');

    const visibleCount = () =>
        window.matchMedia('(max-width: 600px)').matches ? 1 : 3;

    carousels.forEach(carousel => {
        const strip = carousel.querySelector('.carousel-slides');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');

        if (!strip || slides.length === 0) return; // Skip if a carousel has no slides

        let index = 0;

        function maxIndex() {
            return Math.max(0, slides.length - visibleCount());
        }

        function render(animate = true) {
            if (!animate) strip.style.transition = 'none';
            const slideWidth = 100 / visibleCount();
            strip.style.transform = `translateX(-${index * slideWidth}%)`;
            if (!animate) {
                void strip.offsetWidth; // flush styles before restoring transition
                strip.style.transition = '';
            }
        }

        function nextSlide() {
            if (index >= maxIndex()) {
                index = 0;
                render(false); // wrap with a jump-cut
            } else {
                index += 1;
                render();
            }
        }

        function prevSlide() {
            if (index <= 0) {
                index = maxIndex();
                render(false); // wrap with a jump-cut
            } else {
                index -= 1;
                render();
            }
        }

        // Event Listeners for this specific carousel's buttons
        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }

        // Keep the index valid when the visible count changes
        window.addEventListener('resize', () => {
            index = Math.min(index, maxIndex());
            render(false);
        });

        // Position the strip for the initial state
        render(false);
    });
});
