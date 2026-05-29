// === Koru Kitchen — Main Script ===

// ============================================================================
// MODÜL 1: AnnouncementBar
// ============================================================================
(function() {
  const bar = document.getElementById('announcementBar');
  if (!bar) return;
  if (localStorage.getItem('koru_ann_dismissed') === '1') {
    bar.style.display = 'none';
    return;
  }
  const items = bar.querySelectorAll('.announcement-item');
  let current = 0;
  if (items.length > 1) {
    setInterval(() => {
      items[current].classList.remove('active');
      current = (current + 1) % items.length;
      items[current].classList.add('active');
    }, 4000);
  }
})();

function dismissAnnouncement() {
  const bar = document.getElementById('announcementBar');
  if (bar) bar.style.display = 'none';
  localStorage.setItem('koru_ann_dismissed', '1');
}

// ============================================================================
// MODÜL 2: MobileMenu
// ============================================================================
(function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

// ============================================================================
// MODÜL 3: StickyHeader
// ============================================================================
(function() {
  const header = document.getElementById('header');
  if (!header) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    if (y > lastY && y > 200) header.style.transform = 'translateY(-100%)';
    else header.style.transform = 'translateY(0)';
    lastY = y;
  }, { passive: true });
})();

// ============================================================================
// MODÜL 4: MenuFilter (menu.html için)
// ============================================================================
(function() {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('[data-cat]');
  if (!tabs.length || !cards.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
})();

// ============================================================================
// MODÜL 5: GalleryFilter (gallery.html için)
// ============================================================================
(function() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');
  if (!tabs.length || !items.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      items.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
})();

// ============================================================================
// MODÜL 6: Lightbox (gallery.html için)
// ============================================================================
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lightboxImg.src = img.src.replace(/w=\d+/, 'w=1200');
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();

// ============================================================================
// MODÜL 7: TeamFlipCards (team.html için)
// ============================================================================
(function() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
})();

// ============================================================================
// MODÜL 8: TestimonialCarousel (index.html için)
// ============================================================================
(function() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!track || !dots.length) return;

  const items = track.querySelectorAll('.testimonial-item');
  let current = 0;
  let autoTimer;

  function goTo(idx) {
    current = (idx + items.length) % items.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); startAuto(); });
  });
  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', startAuto);
  startAuto();
})();

// ============================================================================
// MODÜL 9: ReservationForm (contact.html için)
// ============================================================================
(function() {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  const phoneInput = form.querySelector('input[type="tel"]');

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (phoneInput) {
      const v = phoneInput.value.trim();
      if (!/^[0-9\s\+\-]{10,15}$/.test(v)) {
        phoneInput.style.borderColor = '#e57373';
        phoneInput.focus();
        return;
      }
      phoneInput.style.borderColor = '';
    }

    const data = { id: Date.now(), date: new Date().toISOString(), fields: {} };
    new FormData(form).forEach((val, key) => { data.fields[key] = val; });

    const existing = JSON.parse(localStorage.getItem('koru_reservations') || '[]');
    existing.push(data);
    localStorage.setItem('koru_reservations', JSON.stringify(existing));

    form.style.display = 'none';
    const success = document.getElementById('formSuccess');
    if (success) success.style.display = 'block';
  });
})();

// ============================================================================
// MODÜL 10: ScrollAnimations + WhatsAppFAB
// ============================================================================
(function() {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
  }

  const fab = document.getElementById('whatsappFab');
  if (fab) {
    window.addEventListener('scroll', () => {
      fab.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Koru Kitchen loaded');
});
