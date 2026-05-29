// Lumina Beauty — main.js
// 10 IIFE Modules for demo site functionality

// ============================================================================
// Module 1: AnnouncementBar
// ============================================================================
(function() {
  const bar = document.getElementById('announcementBar');
  if (!bar) return;

  // LocalStorage dismiss
  if (localStorage.getItem('lumina_ann_dismissed') === '1') {
    bar.style.display = 'none';
    document.body.style.paddingTop = '0';
    return;
  }

  // Rotating messages
  const items = bar.querySelectorAll('.announcement-item');
  let current = 0;
  if (items.length > 1) {
    setInterval(() => {
      items[current].classList.remove('active');
      current = (current + 1) % items.length;
      items[current].classList.add('active');
    }, 3500);
  }
})();

function dismissAnnouncement() {
  const bar = document.getElementById('announcementBar');
  if (bar) bar.style.display = 'none';
  localStorage.setItem('lumina_ann_dismissed', '1');
}

// ============================================================================
// Module 2: MobileMenu
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

  // Overlay click close
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ============================================================================
// Module 3: StickyHeader
// ============================================================================
(function() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    // Hide on scroll down, show on scroll up (optional UX)
    if (y > lastY && y > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastY = y;
  }, { passive: true });
})();

// ============================================================================
// Module 4: ServiceFilter (services.html için)
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
        if (cat === 'all' || card.dataset.cat === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ============================================================================
// Module 5: GalleryFilter (gallery.html için)
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
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();

// ============================================================================
// Module 6: Lightbox (gallery.html için)
// ============================================================================
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src.replace('w=400', 'w=1200');
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
})();

// ============================================================================
// Module 7: TeamFlipCards (team.html için)
// ============================================================================
(function() {
  // Touch/click flip for mobile (CSS handles hover on desktop)
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
})();

// ============================================================================
// Module 8: TestimonialCarousel (index.html için)
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
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      goTo(i);
      startAuto();
    });
  });

  track.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.addEventListener('mouseleave', startAuto);

  startAuto();
})();

// ============================================================================
// Module 9: AppointmentForm (contact.html için)
// ============================================================================
(function() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  // Set min date = today
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // Phone validation
  const phoneInput = form.querySelector('input[type="tel"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate phone
    if (phoneInput) {
      const phoneVal = phoneInput.value.trim();
      if (!/^[0-9\s\+\-]{10,15}$/.test(phoneVal)) {
        phoneInput.style.borderColor = '#e57373';
        phoneInput.focus();
        return;
      }
      phoneInput.style.borderColor = '';
    }

    // Collect data
    const data = {
      id: Date.now(),
      date: new Date().toISOString(),
      fields: {}
    };
    new FormData(form).forEach((val, key) => { data.fields[key] = val; });

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('lumina_appointments') || '[]');
    existing.push(data);
    localStorage.setItem('lumina_appointments', JSON.stringify(existing));

    // Show success state
    const formCard = form.closest('.contact-form-card') || form.parentElement;
    form.style.display = 'none';

    const success = document.getElementById('formSuccess');
    if (success) success.style.display = 'block';
    else {
      const div = document.createElement('div');
      div.className = 'form-success';
      div.innerHTML = '<div style="text-align:center;padding:48px 24px"><div style="font-size:3rem;margin-bottom:16px">✅</div><h3 style="font-family:var(--font-heading);color:var(--dark);margin-bottom:12px">Randevunuz Alındı!</h3><p style="color:var(--text-muted)">En kısa sürede sizi arayacağız.</p></div>';
      formCard.appendChild(div);
    }
  });
})();

// ============================================================================
// Module 10: ScrollAnimations + WhatsAppFAB
// ============================================================================
(function() {
  // Scroll animations
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  }

  // WhatsApp FAB visibility
  const fab = document.getElementById('whatsappFab');
  if (fab) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        fab.classList.add('visible');
      } else {
        fab.classList.remove('visible');
      }
    }, { passive: true });
  }
})();

// ============================================================================
// Init
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Lumina Beauty loaded');
});
