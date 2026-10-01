(() => {
  const footer = document.querySelector('footer');

  if (!footer) {
    return;
  }

  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-copy">
      <p class="footer-kicker">Thanks for visiting!</p>
      <h1 class="footer-headline">LET’S MAKE SOMETHING PEOPLE WANT TO COME BACK TO.</h1>
    </div>
    <div class="footer-social" role="group" aria-label="Social links">
      <a class="footer-social-link" href="mailto:ashleyhuang.ny@gmail.com" aria-label="Email Ashley Huang" title="Email Ashley Huang">
        <img src="images/email.png" alt="">
      </a>
      <a class="footer-social-link" href="https://www.linkedin.com/in/ashleyhuang-ny" target="_blank" rel="noreferrer" aria-label="Ashley Huang on LinkedIn" title="Ashley Huang on LinkedIn">
        <img src="images/linkedin.png" alt="">
      </a>
      <a class="footer-social-link" href="https://github.com/ashleyh859" target="_blank" rel="noreferrer" aria-label="Ashley Huang on GitHub" title="Ashley Huang on GitHub">
        <img src="images/github.png" alt="">
      </a>
    </div>
    <p class="footer-credit">© Ashley Huang 2026</p>
    <p class="footer-location">Based in Brooklyn, NY</p>
  `;

  document.querySelectorAll('.footer-credit').forEach((credit) => {
    if (!footer.contains(credit)) {
      credit.remove();
    }
  });
})();
