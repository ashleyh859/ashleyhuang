// scroll-animations.js
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.scroll-hidden');

    function checkVisibility() {
      const windowHeight = window.innerHeight;
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          element.classList.add('scroll-visible');
        } else {
          element.classList.remove('scroll-visible');
        }
      });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
  });
