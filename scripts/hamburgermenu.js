function mountFloatingNavigation() {
  var header = document.querySelector('header');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!header) return;

  header.className = 'site-header';
  if (!header.querySelector('.floating-nav')) {
    header.innerHTML = `
      <nav class="floating-nav" aria-label="Primary">
        <ul class="floating-nav-list">
          <li><a class="floating-nav-link floating-nav-home" href="index.html#top" aria-label="Home" data-nav-key="home"><img src="bearicon.svg" alt="" width="24" height="24"></a></li>
          <li><a class="floating-nav-link" href="index.html#projects-section" data-nav-key="design">Design</a></li>
          <li><a class="floating-nav-link" href="creative.html" data-nav-key="creative">Creative</a></li>
          <li><a class="floating-nav-link" href="technical.html" data-nav-key="technical">Technical</a></li>
          <li><a class="floating-nav-link" href="about.html" data-nav-key="about">About</a></li>
        </ul>
      </nav>`;
  }

  document.body.id = 'top';

  var links = Array.from(document.querySelectorAll('[data-nav-key]'));
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var floatingNav = document.querySelector('.floating-nav');

  function updateNavDepth() {
    floatingNav.classList.toggle('is-scrolled', window.scrollY > 32);
  }

  function setActive(key) {
    links.forEach(function (link) {
      var active = link.dataset.navKey === key;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if (currentPath === 'about.html') setActive('about');
  else if (currentPath === 'creative.html') setActive('creative');
  else if (currentPath === 'technical.html') setActive('technical');
  else if (currentPath !== 'index.html') setActive('home');
  else setActive('home');

  window.addEventListener('scroll', updateNavDepth, { passive: true });
  updateNavDepth();

  document.querySelectorAll('[data-nav-section]').forEach(function (section) {
    section.style.scrollMarginTop = '104px';
  });

  if (currentPath === 'index.html') {
    var observedSections = [
      { element: document.querySelector('.hero-shell'), key: 'home' },
      { element: document.querySelector('[data-nav-section="design"]'), key: 'design' }
    ].filter(function (section) { return section.element; });

    function updateActiveSection() {
      var current = observedSections.find(function (section) {
        var bounds = section.element.getBoundingClientRect();
        return bounds.top <= window.innerHeight * 0.45 && bounds.bottom > window.innerHeight * 0.45;
      });
      setActive(current ? current.key : 'home');
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var destination = new URL(link.href, window.location.href);
      if (destination.pathname === window.location.pathname && destination.hash) {
        var target = document.querySelector(destination.hash);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
          history.replaceState(null, '', destination.hash);
        }
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountFloatingNavigation);
} else {
  mountFloatingNavigation();
}
