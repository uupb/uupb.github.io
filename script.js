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