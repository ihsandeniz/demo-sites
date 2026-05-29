// === IronForge Gym — Main Script ===

// ============================================================================
// MODÜL 1: AnnouncementBar
// ============================================================================
(function() {
  const bar = document.querySelector('.announcement-bar');
  if (!bar) return;
  if (localStorage.getItem('ironforge_ann_dismissed') === '1') {
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
  const closeBtn = bar.querySelector('.announcement-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      bar.style.display = 'none';
      localStorage.setItem('ironforge_ann_dismissed', '1');
    });
  }
})();

// ============================================================================
// MODÜL 2: MobileMenu
// ============================================================================
(function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
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
  const header = document.querySelector('header');
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
// MODÜL 4: GalleryFilter (gallery.html için)
// ============================================================================
(function() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item[data-cat]');
  if (!tabs.length || !items.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      items.forEach(item => {
        if (cat === 'all') {
          item.style.display = '';
        } else {
          const itemCats = (item.dataset.cat || '').split(' ');
          item.style.display = itemCats.includes(cat) ? '' : 'none';
        }
      });
    });
  });
})();

// ============================================================================
// MODÜL 5: Lightbox (gallery.html için)
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
// MODÜL 6: TeamFlipCards (team.html için)
// ============================================================================
(function() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
})();

// ============================================================================
// MODÜL 7: TestimonialCarousel (index.html için)
// ============================================================================
(function() {
  const track = document.getElementById('testimonialTrack');
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
// MODÜL 8: FAQAccordion (programs.html için)
// ============================================================================
(function() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ============================================================================
// MODÜL 9: MembershipForm (contact.html için)
// ============================================================================
(function() {
  const form = document.getElementById('membershipForm');
  if (!form) return;

  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) dateInput.max = new Date().toISOString().split('T')[0];

  const phoneInput = form.querySelector('input[type="tel"]');

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (phoneInput) {
      const v = phoneInput.value.trim();
      if (!/^[0-9\s\+\-]{10,15}$/.test(v)) {
        phoneInput.style.borderColor = '#E8FF00';
        phoneInput.focus();
        return;
      }
      phoneInput.style.borderColor = '';
    }

    const data = { id: Date.now(), date: new Date().toISOString(), fields: {} };
    new FormData(form).forEach((val, key) => { data.fields[key] = val; });

    const existing = JSON.parse(localStorage.getItem('ironforge_memberships') || '[]');
    existing.push(data);
    localStorage.setItem('ironforge_memberships', JSON.stringify(existing));

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
  console.log('IronForge Gym loaded');
});
