// NOIR - Main JavaScript

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let cart = JSON.parse(localStorage.getItem('noir_cart')) || [];
let selectedProduct = null;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function saveCart() {
  localStorage.setItem('noir_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const size = document.querySelector('.size-option.active');
  const color = document.querySelector('.color-option.active');

  if (!size) {
    alert('Please select a size');
    return;
  }

  const existingItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.size === size.textContent &&
      item.color === (color?.textContent || 'Black')
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size.textContent,
      color: color?.textContent || 'Black',
      quantity: 1,
    });
  }

  saveCart();
  showNotification('Added to cart');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function updateCartItemQuantity(index, quantity) {
  if (quantity <= 0) {
    removeFromCart(index);
  } else {
    cart[index].quantity = quantity;
    saveCart();
    renderCart();
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #c9a84c;
    color: #0a0a0a;
    padding: 1rem 2rem;
    border-radius: 0;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease forwards;
  `;
  notification.textContent = message;

  if (!document.getElementById('noir-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'noir-notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================================================
// NAVIGATION
// ============================================================================

function setupNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const cartIcon = document.querySelector('.cart-icon');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Close menu when clicking nav link
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      updateActiveNavLink(link.getAttribute('href'));
    });
  });

  // Cart icon
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  updateActiveNavLink(currentPage);
}

function updateActiveNavLink(page) {
  document.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================================================
// PRODUCT DETAIL PAGE
// ============================================================================

function setupProductDetail() {
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.querySelector('.product-detail-image');
  const sizeOptions = document.querySelectorAll('.size-option');
  const colorOptions = document.querySelectorAll('.color-option');
  const addCartBtn = document.querySelector('.btn-add-cart');
  const accordions = document.querySelectorAll('.accordion-title');

  // Thumbnail selection
  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('src');
      mainImage.setAttribute('src', src);
      thumbnails.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Size selection
  sizeOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeOptions.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Color selection
  colorOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      colorOptions.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Add to cart
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      const productName = document.querySelector('.product-detail-info h1').textContent;
      const selectedSize = document.querySelector('.size-option.active')?.textContent || 'default';
      const selectedColor = document.querySelector('.color-option.active')?.textContent || 'Black';
      const product = {
        id: `${productName}-${selectedSize}-${selectedColor}`,
        name: productName,
        price: parseFloat(
          document.querySelector('.product-price-detail').textContent.replace('$', '')
        ),
        image: mainImage.getAttribute('src'),
      };
      addToCart(product);
    });
  }

  // Accordions
  accordions.forEach((accordion) => {
    accordion.addEventListener('click', () => {
      const content = accordion.nextElementSibling;
      const toggle = accordion.querySelector('.accordion-toggle');

      accordion.classList.toggle('active');
      toggle.classList.toggle('active');
      content.classList.toggle('active');
    });
  });
}

// ============================================================================
// PRODUCT GRID
// ============================================================================

function setupProductGrid() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const productCountEl = document.getElementById('productCount');
  const activeFiltersBar = document.getElementById('activeFiltersBar');
  const sortSelect = document.getElementById('sortSelect');
  const clearAllBtn = document.getElementById('clearAllFilters');

  // Filter state
  const activeFilters = { category: new Set(), price: new Set(), size: new Set() };

  function getPriceRange(value) {
    if (value === 'under-300') return [0, 299];
    if (value === '300-600') return [300, 600];
    if (value === 'over-600') return [601, Infinity];
    return null;
  }

  function cardMatchesFilters(card) {
    const category = card.dataset.category || '';
    const price = parseFloat(card.dataset.price) || 0;

    if (activeFilters.category.size > 0 && !activeFilters.category.has(category)) return false;

    if (activeFilters.price.size > 0) {
      const matchesAnyPrice = Array.from(activeFilters.price).some((val) => {
        const range = getPriceRange(val);
        return range && price >= range[0] && price <= range[1];
      });
      if (!matchesAnyPrice) return false;
    }

    // Size filter: no data-size on cards → show all when size filter active
    // (size is decorative for now — don't hide cards)

    return true;
  }

  function sortCards(cards) {
    const val = sortSelect ? sortSelect.value : 'default';
    const sorted = [...cards];
    if (val === 'price-asc') {
      sorted.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (val === 'price-desc') {
      sorted.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    } else if (val === 'name-asc') {
      sorted.sort((a, b) => {
        const na = a.querySelector('.product-name') ? a.querySelector('.product-name').textContent : '';
        const nb = b.querySelector('.product-name') ? b.querySelector('.product-name').textContent : '';
        return na.localeCompare(nb);
      });
    }
    return sorted;
  }

  function renderActiveTags() {
    if (!activeFiltersBar) return;
    activeFiltersBar.innerHTML = '';
    const labels = {
      'under-300': 'Under $300', '300-600': '$300–$600', 'over-600': 'Over $600',
    };
    ['category', 'price', 'size'].forEach((type) => {
      activeFilters[type].forEach((val) => {
        const tag = document.createElement('span');
        tag.className = 'active-filter-tag';
        const label = labels[val] || val;
        tag.innerHTML = `${label} <button aria-label="Remove filter ${label}" data-type="${type}" data-val="${val}">×</button>`;
        activeFiltersBar.appendChild(tag);
      });
    });
  }

  function applyFilters() {
    const visible = productCards.filter(cardMatchesFilters);
    const sorted = sortCards(visible);
    const hidden = productCards.filter((c) => !visible.includes(c));

    // Reorder DOM
    sorted.forEach((card) => {
      card.style.display = '';
      productsGrid.appendChild(card);
    });
    hidden.forEach((card) => { card.style.display = 'none'; });

    if (productCountEl) productCountEl.textContent = `${visible.length} product${visible.length !== 1 ? 's' : ''}`;
    renderActiveTags();
  }

  // Checkbox listeners (category + price)
  document.querySelectorAll('input[data-filter]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const type = checkbox.dataset.filter;
      if (checkbox.checked) {
        activeFilters[type].add(checkbox.value);
      } else {
        activeFilters[type].delete(checkbox.value);
      }
      applyFilters();
    });
  });

  // Size button listeners
  document.querySelectorAll('.filter-size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.value;
      if (activeFilters.size.has(val)) {
        activeFilters.size.delete(val);
        btn.classList.remove('active');
      } else {
        activeFilters.size.add(val);
        btn.classList.add('active');
      }
      applyFilters();
    });
  });

  // Remove tag × button
  if (activeFiltersBar) {
    activeFiltersBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-type]');
      if (!btn) return;
      const { type, val } = btn.dataset;
      activeFilters[type].delete(val);
      // Uncheck corresponding checkbox
      const cb = document.querySelector(`input[data-filter="${type}"][value="${val}"]`);
      if (cb) cb.checked = false;
      // Deactivate size button
      const sizeBtn = document.querySelector(`.filter-size-btn[data-value="${val}"]`);
      if (sizeBtn) sizeBtn.classList.remove('active');
      applyFilters();
    });
  }

  // Sort listener
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);

  // Clear all
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      ['category', 'price', 'size'].forEach((t) => activeFilters[t].clear());
      document.querySelectorAll('input[data-filter]').forEach((cb) => { cb.checked = false; });
      document.querySelectorAll('.filter-size-btn').forEach((b) => b.classList.remove('active'));
      if (sortSelect) sortSelect.value = 'default';
      applyFilters();
    });
  }

  // Quick Add button listeners
  productCards.forEach((card) => {
    const addBtn = card.querySelector('.btn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = card.querySelector('h4').textContent;
        showNotification(`${productName} added to cart`);
      });
    }
  });

  // Initial render
  applyFilters();
}

// ============================================================================
// CART PAGE
// ============================================================================

function renderCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.cart-summary');

  if (!cartItems) return;

  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="padding: var(--spacing-lg) 0; text-align: center; color: var(--color-light-gray);">Your cart is empty</p>';
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div class="cart-item-meta">Size: ${item.size} • Color: ${item.color}</div>
        <div class="cart-item-meta">Price: <strong>$${item.price}</strong></div>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
        <input type="number" class="qty-input" value="${item.quantity}" data-index="${index}" min="1">
        <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
      </div>
      <span class="cart-item-remove" data-index="${index}">Remove</span>
    `;
    cartItems.appendChild(cartItem);
  });

  // Event listeners for quantity controls
  document.querySelectorAll('.qty-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      const action = btn.getAttribute('data-action');
      const currentQty = cart[index].quantity;

      if (action === 'increase') {
        updateCartItemQuantity(index, currentQty + 1);
      } else {
        updateCartItemQuantity(index, currentQty - 1);
      }
    });
  });

  document.querySelectorAll('.qty-input').forEach((input) => {
    input.addEventListener('change', () => {
      const index = parseInt(input.getAttribute('data-index'));
      const qty = parseInt(input.value) || 1;
      updateCartItemQuantity(index, qty);
    });
  });

  document.querySelectorAll('.cart-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      removeFromCart(index);
    });
  });

  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;

  const summaryHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;

  const cartSummary = document.querySelector('.cart-summary');
  if (cartSummary) {
    const summaryContent = cartSummary.querySelector('[data-summary-content]');
    if (summaryContent) {
      summaryContent.innerHTML = summaryHTML;
    } else {
      const container = document.createElement('div');
      container.setAttribute('data-summary-content', 'true');
      container.innerHTML = summaryHTML;
      cartSummary.insertBefore(container, cartSummary.querySelector('.coupon-section'));
    }
  }
}

// ============================================================================
// CHECKOUT
// ============================================================================

function setupCheckout() {
  const checkoutForm = document.querySelector('.checkout-form');
  const placeOrderBtn = document.querySelector('.btn-checkout');

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      const form = checkoutForm;
      const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
      let isValid = true;

      inputs.forEach((input) => {
        if (input.value.trim() === '') {
          input.style.borderColor = '#ff6b6b';
          isValid = false;
        }
      });

      if (isValid) {
        showNotification('Order placed successfully!');
        setTimeout(() => {
          cart = [];
          saveCart();
          window.location.href = 'index.html';
        }, 2000);
      } else {
        showNotification('Please fill in all fields');
      }
    });
  }

  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const checkoutItems = document.querySelector('.checkout-items');
  if (!checkoutItems) return;

  checkoutItems.innerHTML = '';

  cart.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'checkout-item';
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
      <div class="checkout-item-details">
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-meta">Size: ${item.size}</div>
        <div class="checkout-item-meta">Qty: ${item.quantity}</div>
        <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `;
    checkoutItems.appendChild(itemElement);
  });

  updateCheckoutTotal();
}

function updateCheckoutTotal() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const totalElement = document.querySelector('[data-checkout-total]');
  if (totalElement) {
    totalElement.innerHTML = `
      <div class="summary-row">
        <span>Subtotal</span>
        <span>$${subtotal.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>$${total.toFixed(2)}</span>
      </div>
    `;
  }
}

// ============================================================================
// CONTACT FORM
// ============================================================================

function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const submitBtn = contactForm.querySelector('.btn-primary');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;

        inputs.forEach((input) => {
          if (input.value.trim() === '') {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
          } else {
            input.style.borderColor = '';
          }
        });

        if (isValid) {
          showNotification('Message sent! We will get back to you soon.');
          contactForm.reset();
        } else {
          showNotification('Please fill in all fields');
        }
      });
    }
  }
}

// ============================================================================
// NEWSLETTER
// ============================================================================

function setupNewsletter() {
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    const submitBtn = newsletterForm.querySelector('.btn-primary');
    const input = newsletterForm.querySelector('.newsletter-input');

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (input.value.trim().includes('@')) {
          showNotification('Successfully subscribed!');
          input.value = '';
        } else {
          showNotification('Please enter a valid email');
        }
      });
    }
  }
}

// ============================================================================
// FEATURED PRODUCTS INTERACTION
// ============================================================================

function setupFeaturedProducts() {
  const featuredCards = document.querySelectorAll('.featured-card');

  featuredCards.forEach((card) => {
    const addBtn = card.querySelector('.btn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = card.querySelector('h4').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        showNotification(`${productName} added to cart`);
      });
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // General setup
  setupNavigation();
  updateCartCount();

  // Page-specific setup
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (
    currentPage === 'product-detail.html' ||
    currentPage.startsWith('product-detail')
  ) {
    setupProductDetail();
  }

  if (currentPage === 'products.html' || currentPage.startsWith('products')) {
    setupProductGrid();
  }

  if (currentPage === 'cart.html' || currentPage.startsWith('cart')) {
    renderCart();
  }

  if (currentPage === 'checkout.html' || currentPage.startsWith('checkout')) {
    setupCheckout();
  }

  if (currentPage === 'contact.html' || currentPage.startsWith('contact')) {
    setupContactForm();
  }

  if (currentPage === 'index.html' || currentPage === '') {
    setupFeaturedProducts();
    setupNewsletter();
  }

  // Prevent form submission on Enter in checkout
  document.querySelectorAll('.form-input, .form-textarea').forEach((input) => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    });
  });
});

// ── Announcement Bar ──
(function() {
  const BAR_KEY = 'noir_announcement_dismissed_until';
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
  localStorage.setItem('noir_announcement_dismissed_until', Date.now() + 86400000);
}

// ── Product Card Interactions ──
document.querySelectorAll('.btn-quick-add').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const productId = this.dataset.id;
    const original = this.textContent;
    this.textContent = 'Added ✓';
    this.style.background = 'rgba(41,200,120,0.95)';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
    }, 1500);
  });
});

document.querySelectorAll('.color-swatch').forEach(function(swatch) {
  swatch.addEventListener('click', function(e) {
    e.stopPropagation();
    const card = this.closest('.product-card');
    card.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    this.classList.add('active');
  });
});

// ============================================================================
// FAZ 3 — Sidebar Filter Upgrade (Color, Size, Price)
// ============================================================================

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

  // Add results count element before product grid
  var grid = document.querySelector('.products-grid, .product-grid, #productsGrid');
  if (grid) {
    var countEl = document.createElement('div');
    countEl.className = 'filter-results-count';
    countEl.textContent = document.querySelectorAll('.product-card').length + ' products';
    grid.parentNode.insertBefore(countEl, grid);
  }
})();

// ============================================================================
// FAZ 4 — Wishlist
// ============================================================================

(function() {
  var WISHLIST_KEY = 'noir_wishlist';

  function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch(e) { return []; }
  }

  function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  }

  function updateWishlistUI() {
    var list = getWishlist();
    // Update all wishlist buttons on page
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
    // Update count badge
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
