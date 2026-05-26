// ===== CONSTANTS & DATA =====

const PRODUCTS = [
  {
    id: 1,
    name: 'Silk Evening Clutch',
    category: 'Bags',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    description: 'Handcrafted silk clutch with mother-of-pearl details. Perfect for evening occasions.',
    colors: ['#f5e6c8', '#2c2c2c', '#8b6914'],
    limited: true
  },
  {
    id: 2,
    name: 'Diamond Collar Necklace',
    category: 'Jewelry',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    description: 'Timeless diamond collar necklace in 18k gold. An heirloom piece.',
    colors: ['#d4af37', '#ffffff'],
    limited: true
  },
  {
    id: 3,
    name: 'Oud de Luxe Parfum',
    category: 'Fragrances',
    price: 890,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    description: 'A sensual blend of oud, rose, and sandalwood. 50ml eau de parfum.',
    colors: ['#b8960c'],
    limited: false
  },
  {
    id: 4,
    name: 'Oversized Sunglasses',
    category: 'Accessories',
    price: 650,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    description: 'UV protection with vintage-inspired oversized frames.',
    colors: ['#2c2c2c', '#8b6914'],
    limited: false
  },
  {
    id: 5,
    name: 'Silk Twill Scarf',
    category: 'Accessories',
    price: 450,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    description: 'Hand-printed silk scarf with exclusive pattern. 90cm square.',
    colors: ['#f5e6c8', '#d4af37', '#2c2c2c'],
    limited: true
  },
  {
    id: 6,
    name: 'Precious Moment Watch',
    category: 'Accessories',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    description: 'Swiss-made watch with mother-of-pearl dial and leather strap.',
    colors: ['#d4af37', '#ffffff'],
    limited: false
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
      (product) => `
    <div class="product-card">
      ${product.limited ? '<div class="limited-badge">Limited Edition</div>' : ''}
      <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price.toLocaleString()}</div>
        <div class="product-card-footer">
          <a href="product-detail.html?id=${product.id}" class="btn product-btn">View</a>
          <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-product-id="${product.id}">♥</button>
        </div>
      </div>
    </div>
  `
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
        (product) => `
      <div class="product-card">
        ${product.limited ? '<div class="limited-badge">Limited Edition</div>' : ''}
        <img src="${product.image}" alt="${sanitizeHTML(product.name)}" class="product-image" loading="lazy" width="600" height="400">
        <div class="product-info">
          <div class="product-category">${sanitizeHTML(product.category)}</div>
          <h3 class="product-name">${sanitizeHTML(product.name)}</h3>
          <div class="product-price">$${product.price.toLocaleString()}</div>
          <div class="product-card-footer">
            <a href="product-detail.html?id=${product.id}" class="btn product-btn">View</a>
            <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-product-id="${product.id}">♥</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    container.querySelectorAll('.wishlist-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(parseInt(btn.dataset.productId));
      });
    });

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
