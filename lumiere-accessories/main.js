// ===== CONSTANTS & DATA =====

const PRODUCTS = [
  {
    id: 1,
    name: 'Heritage Bangle',
    category: 'Fine Jewelry',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    description: 'Hand-finished 18K yellow gold, secured with an iconic screw mechanism — a poetic nod to precision engineering and permanence. Each piece certified and handcrafted in Paris.',
    colors: ['#d4af37', '#c9a227'],
    limited: true
  },
  {
    id: 2,
    name: 'Luminescence Pearl Pendant',
    category: 'Fine Jewelry',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    description: 'A single South Sea pearl, 14–16mm, suspended on a hand-forged 18K white gold chain. GIA-certified. Eighty hours of atelier work distilled into one gesture.',
    colors: ['#f8f4ee', '#d4af37'],
    limited: true
  },
  {
    id: 3,
    name: 'Solitaire Heritage Ring',
    category: 'Haute Joaillerie',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    description: 'A round brilliant diamond, D–F colour, VS1 clarity, set in hand-fabricated platinum. By commission only. Each ring accompanied by a GIA certificate and full appraisal documentation.',
    colors: ['#e8e8e8', '#d4af37'],
    limited: true
  },
  {
    id: 4,
    name: 'Four Leaf Talisman Bracelet',
    category: 'Fine Jewelry',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    description: 'Eighteen-karat gold set with four brilliant-cut diamonds, pavé-set in a motif that has accompanied the Maison since 1924. A talisman for those who believe in the geometry of luck.',
    colors: ['#d4af37', '#ffffff'],
    limited: false
  },
  {
    id: 5,
    name: 'Celestial Link Bracelet',
    category: 'Fine Jewelry',
    price: 4100,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    description: 'Alternating oval and round links in 18K rose gold, each hand-polished to a satin finish. Forty-two hours of bench time. Adjustable length: 16–19cm.',
    colors: ['#c9a227', '#e8c8a0'],
    limited: false
  },
  {
    id: 6,
    name: 'Luminaire Jewelry Watch',
    category: 'Jewelry Watches',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    description: 'A Swiss manufacture movement encased in 18K white gold, the dial set entirely in pavé diamonds. Where horological precision meets haute joaillerie — time as an act of devotion.',
    colors: ['#e8e8e8', '#d4af37'],
    limited: true
  }
];

// ===== UTILITY FUNCTIONS =====

function sanitizeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getFromLocalStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage error:', e);
  }
}

function getActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path;
}

// ===== NAVIGATION =====

function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  }

  // Active nav link
  const currentPage = getActiveNav();
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Cart badge
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.querySelector('.icon-btn .badge');
  const cart = getFromLocalStorage('lumiere_cart', []);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ===== CART FUNCTIONS =====

function addToCart(productId, quantity = 1, color = null) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  let cart = getFromLocalStorage('lumiere_cart', []);
  const existingItem = cart.find((item) => item.id === productId && item.color === color);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      color: color,
      quantity: quantity
    });
  }

  saveToLocalStorage('lumiere_cart', cart);
  updateCartBadge();

  // Toast notification
  showToast(`Added to bag`);
}

function removeFromCart(productId, color) {
  let cart = getFromLocalStorage('lumiere_cart', []);
  cart = cart.filter((item) => !(item.id === productId && item.color === color));
  saveToLocalStorage('lumiere_cart', cart);
  updateCartBadge();

  // Refresh page if on cart page
  if (window.location.pathname.includes('cart')) {
    renderCart();
  }
}

function updateCartItemQuantity(productId, color, quantity) {
  let cart = getFromLocalStorage('lumiere_cart', []);
  const item = cart.find((item) => item.id === productId && item.color === color);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveToLocalStorage('lumiere_cart', cart);
  }
}

// ===== WISHLIST FUNCTIONS =====

function toggleWishlist(productId) {
  let wishlist = getFromLocalStorage('lumiere_wishlist', []);
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }

  saveToLocalStorage('lumiere_wishlist', wishlist);

  // Update UI
  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    if (btn.dataset.productId == productId) {
      btn.classList.toggle('active');
    }
  });
}

function isInWishlist(productId) {
  const wishlist = getFromLocalStorage('lumiere_wishlist', []);
  return wishlist.includes(productId);
}

// ===== PRODUCT RENDERING =====

function renderProducts(filterCategory = null) {
  const container = document.querySelector('.products-grid');
  if (!container) return;

  let productsToRender = PRODUCTS;
  if (filterCategory && filterCategory !== 'All') {
    productsToRender = PRODUCTS.filter((p) => p.category === filterCategory);
  }

  container.innerHTML = productsToRender
    .map(
      (product, index) => {
        const colorSwatches = product.colors.slice(0, 3).map(
          (color) => `<button class="color-swatch" style="background:${color}" title="${color}"></button>`
        ).join('');
        const extraColors = product.colors.length > 3 ? ` <span class="swatch-more">+${product.colors.length - 3}</span>` : '';
        const badgeClass = index === 0 || index === 1 ? 'badge-limited' : (index === 2 || index === 3 ? 'badge-new' : '');
        const badge = badgeClass ? `<span class="badge ${badgeClass}">${badgeClass === 'badge-limited' ? 'LIMITED' : 'NEW'}</span>` : '';

        return `
    <div class="product-card" data-id="${product.id}" data-colors="${product.colors.join(',')}">
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image product-image-primary" loading="lazy" width="600" height="400">
        <img src="${product.image.replace('?w=600', '?w=601') || product.image.split('?')[0] + '?w=601&q=' + (product.image.includes('q=') ? product.image.split('q=')[1] : '80')}" alt="${product.name} detail" class="product-image product-image-secondary" loading="lazy" width="600" height="400">
        <div class="product-badges">
          ${badge}
        </div>
        <button class="btn-quick-add" data-id="${product.id}">Discover</button>
      </div>
      <div class="product-info">
        <div class="product-swatches">
          ${colorSwatches}${extraColors}
        </div>
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price.toLocaleString()}</div>
        <div class="product-card-footer">
          <a href="product-detail.html?id=${product.id}" class="btn product-btn">View</a>
          <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-product-id="${product.id}">♥</button>
        </div>
      </div>
    </div>
  `;
      }
    )
    .join('');

  // Add wishlist listeners
  document.querySelectorAll('.wishlist-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = parseInt(btn.dataset.productId);
      toggleWishlist(productId);
    });
  });

  // Add quick-add and color swatch listeners
  initProductCardInteractions();
}

function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'));
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    document.body.innerHTML = '<h1>Product not found</h1>';
    return;
  }

  const container = document.querySelector('.product-detail');
  if (!container) return;

  container.innerHTML = `
    <div class="product-gallery">
      <div class="gallery-main">
        <img id="mainImage" src="${product.image}" alt="${product.name}">
      </div>
    </div>
    <div class="product-details">
      <div class="product-collection">— ${product.category} —</div>
      <h1 class="product-title">${product.name}</h1>
      <p class="product-description">${product.description}</p>
      <div class="product-price-detail">$${product.price.toLocaleString()}</div>

      <div class="product-options">
        <div class="option-group">
          <label class="option-label">Color</label>
          <div class="color-options">
            ${product.colors
              .map(
                (color, idx) => `
              <div class="color-circle" style="background-color: ${color}${idx === 0 ? '; border-color: var(--gold)' : ''}" data-color="${color}"></div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="option-group">
          <label class="option-label">Quantity</label>
          <div class="quantity-input">
            <button class="quantity-btn" id="quantityMinus">−</button>
            <input type="number" id="quantity" value="1" min="1" max="10">
            <button class="quantity-btn" id="quantityPlus">+</button>
          </div>
        </div>
      </div>

      <div class="product-actions">
        <button class="btn primary btn-add-bag" id="addToBagBtn">Add to Bag</button>
        <button class="btn secondary btn-wishlist" id="wishlistBtn">♥ Wishlist</button>
      </div>

      <div class="product-note">
        ✓ Free delivery & returns on all orders
      </div>

      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-title">
            <span>Description</span>
            <span class="accordion-icon">▼</span>
          </div>
          <div class="accordion-content">
            <p>${product.description}</p>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-title">
            <span>Details & Care</span>
            <span class="accordion-icon">▼</span>
          </div>
          <div class="accordion-content">
            <p>Crafted with premium materials. Hand-finished by our artisans. Store in provided dust bag. Clean with soft cloth.</p>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-title">
            <span>Delivery</span>
            <span class="accordion-icon">▼</span>
          </div>
          <div class="accordion-content">
            <p>Free standard delivery within 5-7 business days. Express delivery available. Free returns within 30 days.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Color selection
  let selectedColor = product.colors[0];
  document.querySelectorAll('.color-circle').forEach((circle) => {
    circle.addEventListener('click', () => {
      document.querySelectorAll('.color-circle').forEach((c) => c.style.borderColor = 'transparent');
      circle.style.borderColor = 'var(--gold)';
      selectedColor = circle.dataset.color;
    });
  });

  // Quantity
  const quantityInput = document.getElementById('quantity');
  document.getElementById('quantityMinus').addEventListener('click', () => {
    quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
  });
  document.getElementById('quantityPlus').addEventListener('click', () => {
    quantityInput.value = Math.min(10, parseInt(quantityInput.value) + 1);
  });

  // Add to bag
  document.getElementById('addToBagBtn').addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    addToCart(product.id, quantity, selectedColor);
  });

  // Wishlist
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (isInWishlist(product.id)) {
    wishlistBtn.classList.add('active');
  }
  wishlistBtn.addEventListener('click', () => {
    toggleWishlist(product.id);
    wishlistBtn.classList.toggle('active');
  });

  // Accordion
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const title = item.querySelector('.accordion-title');
    title.addEventListener('click', () => {
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.accordion-icon');

      content.classList.toggle('active');
      icon.classList.toggle('active');
    });
  });
}

// ===== CART PAGE =====

function renderCart() {
  const container = document.querySelector('.bag-items');
  const summary = document.querySelector('.bag-summary');

  if (!container) return;

  const cart = getFromLocalStorage('lumiere_cart', []);

  if (cart.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem;">Your bag is empty.</p>';
    if (summary) {
      summary.innerHTML = '<p style="text-align: center;">No items</p>';
    }
    return;
  }

  let subtotal = 0;

  container.innerHTML = cart
    .map(
      (item) => {
        subtotal += item.price * item.quantity;
        return `
      <div class="bag-item">
        <img src="${sanitizeHTML(item.image)}" alt="${sanitizeHTML(item.name)}" class="bag-item-image">
        <div class="bag-item-details">
          <h3 class="bag-item-name">${sanitizeHTML(item.name)}</h3>
          <div class="bag-item-variant">${item.color ? 'Color: ' + sanitizeHTML(item.color) : 'Standard'}</div>
          <div class="bag-item-footer">
            <div class="bag-item-price">$${item.price.toLocaleString()}</div>
            <div class="bag-item-qty">
              <input type="number" value="${item.quantity}" min="1" max="10" data-product-id="${item.id}" data-color="${sanitizeHTML(item.color)}" class="qty-input" style="width: 50px; padding: 0.3rem; border: 1px solid #ddd;">
            </div>
            <button class="bag-item-remove" data-product-id="${item.id}" data-color="${sanitizeHTML(item.color)}">Remove</button>
          </div>
        </div>
      </div>
    `;
      }
    )
    .join('');

  if (summary) {
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    summary.innerHTML = `
      <div class="bag-summary-title">Order Summary</div>
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toLocaleString()}</span>
      </div>
      <div class="summary-row">
        <span>Tax (10%)</span>
        <span>$${tax.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <label class="gift-checkbox">
          <input type="checkbox" id="giftWrap">
          Complimentary gift wrapping
        </label>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span class="amount">$${total.toLocaleString()}</span>
      </div>
      <a href="checkout.html" class="btn primary btn-checkout">Proceed to Checkout</a>
      <a href="products.html" style="display: block; text-align: center; margin-top: 1rem; color: var(--gold); text-decoration: none;">Continue Shopping</a>
    `;
  }

  // Event listeners
  document.querySelectorAll('.qty-input').forEach((input) => {
    input.addEventListener('change', () => {
      const productId = parseInt(input.dataset.productId);
      const color = input.dataset.color || null;
      const quantity = parseInt(input.value);
      updateCartItemQuantity(productId, color, quantity);
      renderCart();
    });
  });

  document.querySelectorAll('.bag-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.productId);
      const color = btn.dataset.color || null;
      removeFromCart(productId, color);
    });
  });
}

// ===== PRODUCTS PAGE =====

function initProductsPage() {
  const container = document.querySelector('.products-grid');
  if (!container) return;

  let activeCategory = 'All';
  let activeSort = '';

  function getFilteredSorted() {
    let list = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
    if (activeSort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (activeSort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else if (activeSort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }

  function renderFiltered() {
    const list = getFilteredSorted();

    container.innerHTML = list
      .map(
        (product, index) => {
          const colorSwatches = product.colors.slice(0, 3).map(
            (color) => `<button class="color-swatch" style="background:${color}" title="${color}"></button>`
          ).join('');
          const extraColors = product.colors.length > 3 ? ` <span class="swatch-more">+${product.colors.length - 3}</span>` : '';
          const badgeClass = index === 0 || index === 1 ? 'badge-limited' : (index === 2 || index === 3 ? 'badge-new' : '');
          const badge = badgeClass ? `<span class="badge ${badgeClass}">${badgeClass === 'badge-limited' ? 'LIMITED' : 'NEW'}</span>` : '';

          return `
      <div class="product-card" data-id="${product.id}" data-colors="${product.colors.join(',')}">
        <div class="product-image-wrapper">
          <img src="${product.image}" alt="${sanitizeHTML(product.name)}" class="product-image product-image-primary" loading="lazy" width="600" height="400">
          <img src="${product.image.replace('?w=600', '?w=601') || product.image.split('?')[0] + '?w=601&q=' + (product.image.includes('q=') ? product.image.split('q=')[1] : '80')}" alt="${sanitizeHTML(product.name)} detail" class="product-image product-image-secondary" loading="lazy" width="600" height="400">
          <div class="product-badges">
            ${badge}
          </div>
          <button class="btn-quick-add" data-id="${product.id}">Discover</button>
        </div>
        <div class="product-info">
          <div class="product-swatches">
            ${colorSwatches}${extraColors}
          </div>
          <div class="product-category">${sanitizeHTML(product.category)}</div>
          <h3 class="product-name">${sanitizeHTML(product.name)}</h3>
          <div class="product-price">$${product.price.toLocaleString()}</div>
          <div class="product-card-footer">
            <a href="product-detail.html?id=${product.id}" class="btn product-btn">View</a>
            <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-product-id="${product.id}">♥</button>
          </div>
        </div>
      </div>
    `;
        }
      )
      .join('');

    container.querySelectorAll('.wishlist-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(parseInt(btn.dataset.productId));
      });
    });

    // Add quick-add and color swatch listeners
    initProductCardInteractions();

    const countEl = document.querySelector('.product-count');
    if (countEl) countEl.textContent = `Showing ${list.length} item${list.length !== 1 ? 's' : ''}`;
  }

  document.querySelectorAll('.category-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderFiltered();
    });
  });

  const sortSelect = document.querySelector('.sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderFiltered();
    });
  }

  renderFiltered();
}

// ===== CHECKOUT PAGE =====

function initCheckoutPage() {
  const cart = getFromLocalStorage('lumiere_cart', []);
  let total = 0;

  const summaryItems = document.querySelector('.checkout-summary');
  if (summaryItems) {
    summaryItems.innerHTML = `<h3>Order Summary</h3>`;

    cart.forEach((item) => {
      total += item.price * item.quantity;
      const itemHtml = `
        <div class="checkout-item">
          <span class="checkout-item-name">${sanitizeHTML(item.name)}</span>
          <span class="checkout-item-qty">x${item.quantity}</span>
          <span class="checkout-item-price">$${(item.price * item.quantity).toLocaleString()}</span>
        </div>
      `;
      summaryItems.innerHTML += itemHtml;
    });

    const tax = total * 0.1;
    const grandTotal = total + tax;

    summaryItems.innerHTML += `
      <div style="border-top: 1px solid var(--border); padding-top: 1rem; margin-top: 1rem;">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>$${total.toLocaleString()}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total" style="border: none; padding: 0; margin-top: 1rem;">
          <span>Total</span>
          <span class="amount">$${grandTotal.toLocaleString()}</span>
        </div>
      </div>
    `;
  }

  // Form submission
  const form = document.querySelector('.checkout-form');
  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Validate form
        const email = form.querySelector('[name="email"]')?.value;
        const phone = form.querySelector('[name="phone"]')?.value;

        if (!email || !phone) {
          alert('Please fill in all required fields');
          return;
        }

        // Clear cart
        saveToLocalStorage('lumiere_cart', []);
        updateCartBadge();

        // Show success
        showToast('Order placed successfully!');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      });
    }
  }
}

// ===== ANIMATIONS & OBSERVERS =====

function initIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('section, .collection-card, .product-card').forEach((el) => {
    observer.observe(el);
  });
}

// ===== PRODUCT CARD INTERACTIONS =====

function initProductCardInteractions() {
  // Quick-add button interactions
  document.querySelectorAll('.btn-quick-add').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const original = this.textContent;
      this.textContent = '✓ Added';
      setTimeout(() => { this.textContent = original; }, 1500);
    });
  });

  // Color swatch interactions
  document.querySelectorAll('.color-swatch').forEach(function(swatch) {
    swatch.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.product-card');
      card.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ===== TOAST NOTIFICATION =====

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--gold);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 2px;
    font-size: 0.9rem;
    z-index: 10000;
    animation: slideInUp 0.3s ease;
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideInUp 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== INIT =====

document.addEventListener('DOMContentLoaded', () => {
  // Add slideInUp animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize common features
  initNavigation();
  initIntersectionObserver();
  initProductCardInteractions();

  // Page-specific initialization
  const path = window.location.pathname;

  if (path.includes('products.html')) {
    initProductsPage();
  } else if (path.includes('product-detail.html')) {
    renderProductDetail();
  } else if (path.includes('cart.html')) {
    renderCart();
  } else if (path.includes('checkout.html')) {
    initCheckoutPage();
  }
});

// ── Announcement Bar ──
(function() {
  const BAR_KEY = 'lumiere_announcement_dismissed_until';
  const bar = document.getElementById('announcementBar');
  if (!bar) return;

  const dismissed = localStorage.getItem(BAR_KEY);
  if (dismissed && Date.now() < parseInt(dismissed)) {
    bar.style.display = 'none';
    return;
  }

  document.body.classList.add('has-announcement');

  const items = bar.querySelectorAll('.announcement-item');
  let current = 0;

  setInterval(function() {
    items[current].classList.remove('active');
    current = (current + 1) % items.length;
    items[current].classList.add('active');
  }, 4000);
})();

function dismissAnnouncement() {
  const bar = document.getElementById('announcementBar');
  if (bar) {
    bar.style.display = 'none';
    document.body.classList.remove('has-announcement');
  }
  localStorage.setItem('lumiere_announcement_dismissed_until', Date.now() + 86400000);
}

// ── FAZ 3 — Sidebar Filters ──
(function() {
  var activeFilters = { color: [], size: [], price: null };

  function applyFilters() {
    var cards = document.querySelectorAll('.product-card');
    var visible = 0;
    cards.forEach(function(card) {
      var show = true;
      if (activeFilters.color.length > 0) {
        var cardColors = (card.dataset.colors || '').split(',').map(function(c){ return c.trim(); });
        var hasColor = activeFilters.color.some(function(c) { return cardColors.indexOf(c) !== -1; });
        if (!hasColor) show = false;
      }
      if (activeFilters.size.length > 0) {
        var cardSizes = (card.dataset.sizes || '').split(',').map(function(s){ return s.trim(); });
        var hasSize = activeFilters.size.some(function(s) { return cardSizes.indexOf(s) !== -1; });
        if (!hasSize) show = false;
      }
      if (activeFilters.price) {
        var priceEl = card.querySelector('.product-price, .price');
        if (priceEl) {
          var priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
          var price = parseFloat(priceText);
          if (price < activeFilters.price.min || price > activeFilters.price.max) show = false;
        }
      }
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    var countEl = document.querySelector('.filter-results-count');
    if (countEl) countEl.textContent = visible + ' products';
  }

  document.querySelectorAll('.filter-swatch').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var val = this.dataset.value;
      var idx = activeFilters.color.indexOf(val);
      if (idx === -1) { activeFilters.color.push(val); this.classList.add('active'); }
      else { activeFilters.color.splice(idx, 1); this.classList.remove('active'); }
      applyFilters();
    });
  });

  document.querySelectorAll('.filter-size').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var val = this.dataset.value;
      var idx = activeFilters.size.indexOf(val);
      if (idx === -1) { activeFilters.size.push(val); this.classList.add('active'); }
      else { activeFilters.size.splice(idx, 1); this.classList.remove('active'); }
      applyFilters();
    });
  });

  document.querySelectorAll('.filter-price').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var isActive = this.classList.contains('active');
      document.querySelectorAll('.filter-price').forEach(function(b) { b.classList.remove('active'); });
      if (isActive) { activeFilters.price = null; }
      else {
        this.classList.add('active');
        activeFilters.price = { min: parseFloat(this.dataset.min), max: parseFloat(this.dataset.max) };
      }
      applyFilters();
    });
  });

  var clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      activeFilters = { color: [], size: [], price: null };
      document.querySelectorAll('.filter-swatch,.filter-size,.filter-price').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.product-card').forEach(function(c) { c.classList.remove('hidden'); });
      var countEl = document.querySelector('.filter-results-count');
      if (countEl) countEl.textContent = document.querySelectorAll('.product-card').length + ' products';
    });
  }

  var grid = document.querySelector('.products-grid, .product-grid');
  if (grid && window.location.pathname.includes('products.html')) {
    var countEl = document.createElement('div');
    countEl.className = 'filter-results-count';
    countEl.textContent = document.querySelectorAll('.product-card').length + ' products';
    grid.parentNode.insertBefore(countEl, grid);
  }
})();

// ── FAZ 4 — Wishlist Heart Buttons & Nav Icon ──
(function() {
  var WISHLIST_KEY = 'lumiere_wishlist';

  function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch(e) { return []; }
  }

  function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  }

  function updateWishlistUI() {
    var list = getWishlist();
    document.querySelectorAll('.btn-wishlist').forEach(function(btn) {
      var id = btn.dataset.id;
      if (list.indexOf(id) !== -1) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Add to wishlist');
      }
    });
    var countEls = document.querySelectorAll('.wishlist-count');
    countEls.forEach(function(el) {
      if (list.length > 0) {
        el.textContent = list.length;
        el.style.display = 'inline-flex';
      } else {
        el.style.display = 'none';
      }
    });
  }

  function toggleWishlist(id, btn) {
    var list = getWishlist();
    var idx = list.indexOf(id);
    if (idx === -1) { list.push(id); }
    else { list.splice(idx, 1); }
    saveWishlist(list);
    btn.classList.add('pop');
    btn.addEventListener('animationend', function() { btn.classList.remove('pop'); }, { once: true });
    updateWishlistUI();
  }

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.btn-wishlist');
    if (!btn) return;
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(btn.dataset.id, btn);
  });

  updateWishlistUI();
})();
