// === Veridis Hukuk — Main Script ===

// ============================================================================
// MODÜL 1: AnnouncementBar
// ============================================================================
(function() {
  const bar = document.getElementById('announcementBar');
  if (!bar) return;
  if (localStorage.getItem('veridis_ann_dismissed') === '1') {
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
  localStorage.setItem('veridis_ann_dismissed', '1');
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
// MODÜL 4: ServiceFilter (hizmetler.html için)
// ============================================================================
(function() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.service-card[data-cat]');
  if (!tabs.length || !cards.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach(card => {
        if (!cat) {
          card.style.display = '';
        } else {
          const cardCats = (card.dataset.cat || '').split(' ');
          card.style.display = cardCats.includes(cat) ? '' : 'none';
        }
      });
    });
  });
})();

// ============================================================================
// MODÜL 5: CaseFilter (basarilar.html için)
// ============================================================================
(function() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.case-card[data-cat]');
  if (!tabs.length || !cards.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach(card => {
        card.style.display = (!cat || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
})();

// ============================================================================
// MODÜL 6: TeamFlipCards (avukatlar.html için)
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
  const wrapper = document.getElementById('testimonialsWrapper');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!wrapper || !dots.length) return;

  const items = wrapper.querySelectorAll('.testimonial-item');
  let current = 0;
  let autoTimer;

  function goTo(idx) {
    current = (idx + items.length) % items.length;
    wrapper.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); startAuto(); });
  });
  wrapper.addEventListener('mouseenter', () => clearInterval(autoTimer));
  wrapper.addEventListener('mouseleave', startAuto);
  startAuto();
})();

// ============================================================================
// MODÜL 8: ConsultationForm (iletisim.html için)
// ============================================================================
(function() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  const phoneInput = form.querySelector('input[type="tel"]');

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (phoneInput) {
      const v = phoneInput.value.trim();
      if (!/^[0-9\s\+\-]{10,15}$/.test(v)) {
        phoneInput.style.borderColor = '#C9A84C';
        phoneInput.focus();
        return;
      }
      phoneInput.style.borderColor = '';
    }

    const refNo = String(Date.now()).slice(-6);
    const data = { id: Date.now(), ref: refNo, date: new Date().toISOString(), fields: {} };
    new FormData(form).forEach((val, key) => { data.fields[key] = val; });

    const existing = JSON.parse(localStorage.getItem('veridis_consultations') || '[]');
    existing.push(data);
    localStorage.setItem('veridis_consultations', JSON.stringify(existing));

    form.style.display = 'none';
    const success = document.getElementById('formSuccess');
    if (success) {
      const refEl = success.querySelector('.reference-number');
      if (refEl) refEl.textContent = `Başvuru No: #${refNo}`;
      success.classList.add('show');
      success.style.display = 'block';
    }
  });
})();

// ============================================================================
// MODÜL 9: ScrollAnimations
// ============================================================================
(function() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
})();

// ============================================================================
// MODÜL 10: WhatsAppFAB
// ============================================================================
(function() {
  const fab = document.getElementById('whatsappFab');
  if (!fab) return;
  window.addEventListener('scroll', () => {
    fab.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
})();

document.addEventListener('DOMContentLoaded', () => {
  console.log('Veridis Hukuk loaded');
});
