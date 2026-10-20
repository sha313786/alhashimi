/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: UI Interactions (Scroll-Spy, Navigation, Tabs, Modals, Lightbox, Counters, Back-to-Top)
 */

function initScopeTabs() {
  const tabs = document.querySelectorAll('.scope-tab');
  const panels = document.querySelectorAll('.scope-panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panelId = tab.getAttribute('aria-controls');
      const targetPanel = document.getElementById(panelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.hidden = false;
      }
    });
  });
}

function initRfqModal() {
  const modal = document.getElementById('rfqModal');
  const openButtons = document.querySelectorAll('.open-rfq-btn');
  const closeButton = document.getElementById('closeModalBtn');
  const quickForm = document.getElementById('quickRfqForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.showModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.close();
    });
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    const dialogRect = modal.getBoundingClientRect();
    if (
      e.clientX < dialogRect.left ||
      e.clientX > dialogRect.right ||
      e.clientY < dialogRect.top ||
      e.clientY > dialogRect.bottom
    ) {
      modal.close();
    }
  });

  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quickName').value;
      const contact = document.getElementById('quickContact').value;
      
      const waMsg = encodeURIComponent(`Hello Mr. Binoji, callback request from ${name} (${contact}) regarding MEP subcontract prequalification.`);
      const waLink = `https://wa.me/971528974123?text=${waMsg}`;

      alert(`Thank you, ${name}! Your callback request has been prioritized directly to Managing Director Mr. Binoji K. Varghese.`);
      window.open(waLink, '_blank');
      quickForm.reset();
      modal.close();
    });
  }
}

function initPhotoLightbox() {
  const lightbox = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const triggers = document.querySelectorAll('.photo-wrapper[data-photo]');

  if (!lightbox || !lightboxImg) return;

  triggers.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const photoSrc = wrapper.getAttribute('data-photo');
      const caption = wrapper.getAttribute('data-caption');
      
      lightboxImg.src = photoSrc;
      lightboxCaption.textContent = caption || '';
      lightbox.showModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.close();
    });
  }

  lightbox.addEventListener('click', (e) => {
    const dialogRect = lightbox.getBoundingClientRect();
    if (
      e.clientX < dialogRect.left ||
      e.clientX > dialogRect.right ||
      e.clientY < dialogRect.top ||
      e.clientY > dialogRect.bottom
    ) {
      lightbox.close();
    }
  });
}

function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  const links = document.querySelectorAll('.nav-link');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen.toString());
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!window.IntersectionObserver) return;

  let hasRun = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasRun) {
      hasRun = true;
      statNumbers.forEach(numEl => {
        const target = parseInt(numEl.getAttribute('data-target'), 10);
        let count = 0;
        const speed = target > 500 ? 15 : 45;

        const updateCount = () => {
          const step = Math.ceil(target / 35);
          count += step;
          const suffix = target >= 35 && target < 500 ? '+' : target >= 500 ? '+' : target === 3 ? 'x' : '';
          if (count < target) {
            numEl.textContent = `${count.toLocaleString()}${suffix}`;
            setTimeout(updateCount, speed);
          } else {
            numEl.textContent = `${target.toLocaleString()}${suffix}`;
          }
        };
        updateCount();
      });
    }
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.hero-stats-row, .stats-card-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (btn) {
      if (scrollPos > 450) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    if (header) {
      if (scrollPos > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Scroll-Spy for Navigation
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initScopeTabs,
    initRfqModal,
    initPhotoLightbox,
    initMobileMenu,
    initStatCounters,
    initBackToTop,
    initScrollSpy
  };
}
