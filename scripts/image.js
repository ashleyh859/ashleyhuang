// Function to toggle image scale
function toggleScale(element) {
    const imageContainer = element;
    if (imageContainer.style.transform === 'scale(1.1)') {
        imageContainer.style.transform = 'scale(1)';
    } else {
        imageContainer.style.transform = 'scale(1.1)';
    }
}
