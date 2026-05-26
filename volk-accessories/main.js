/* ==========================================
   VOLK ACCESSORIES — MAIN JS
   Cart, Navigation, Interactions
   ========================================== */

// ==================== PRODUCTS DATABASE ====================

const PRODUCTS = [
  {
    id: 1,
    code: 'VK-ACC-01',
    name: 'MODULAR CHEST RIG',
    price: 145,
    category: 'bags',
    material: ['x-pac', 'nylon'],
    stock: 'low-stock',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    specs: {
      material: 'X-Pac VX21 Laminate / 500D Nylon',
      attachment: 'MOLLE-Compatible System',
      closure: 'YKK #10 Zipper',
      weight: '280g',
    },
  },
  {
    id: 2,
    code: 'VK-ACC-02',
    name: 'SLING CARRY PACK',
    price: 125,
    category: 'bags',
    material: ['nylon', 'cordura'],
    stock: 'in-stock',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    specs: {
      material: '1000D Cordura Nylon',
      base: 'Vibram® Reinforced',
      seams: 'Taped (Water-Resistant)',
      capacity: '6L',
    },
  },
  {
    id: 3,
    code: 'VK-ACC-03',
    name: 'MINIMAL BACKPACK',
    price: 180,
    category: 'bags',
    material: ['x-pac', 'nylon'],
    stock: 'in-stock',
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80',
    specs: {
      material: 'X-Pac VX42 / UHMWPE Fiber',
      capacity: '20L',
      closure: 'YKK Aquaguard® Waterproof Zipper',
      straps: 'Padded Dyneema Webbing',
    },
  },
  {
    id: 4,
    code: 'VK-ACC-04',
    name: 'INDUSTRIAL WEB BELT',
    price: 65,
    category: 'belts',
    material: ['nylon', 'hardware'],
    stock: 'in-stock',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
    specs: {
      material: '50mm Mil-Spec Nylon Webbing',
      buckle: 'Stainless Steel G-Hook',
      width: '50mm',
      sizes: 'S / M / L / XL',
    },
  },
  {
    id: 5,
    code: 'VK-ACC-05',
    name: 'MODULAR CHAIN ATTACHMENT',
    price: 45,
    category: 'accessories',
    material: ['stainless-steel'],
    stock: 'in-stock',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    specs: {
      material: '316L Marine-Grade Stainless Steel',
      attachment: 'Universal MOLLE Loop',
      finish: 'Matte Black PVD',
      weight: '95g',
    },
  },
  {
    id: 6,
    code: 'VK-ACC-07',
    name: 'BALLISTIC GLOVES',
    price: 85,
    category: 'accessories',
    material: ['nylon', 'synthetic'],
    stock: 'low-stock',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
    specs: {
      material: '500D Nylon Shell / Kevlar® Palm',
      knuckles: 'TPR Impact-Resistant',
      closure: 'Velcro Wrist Strap',
      sizes: 'S / M / L / XL',
    },
  },
  {
    id: 7,
    code: 'VK-ACC-08',
    name: 'TACTICAL NECK GAITER',
    price: 42,
    category: 'accessories',
    material: ['synthetic'],
    stock: 'in-stock',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
    specs: {
      material: 'Polartec® Power Stretch Pro',
      uv: 'UPF 50+ Protection',
      weight: '65g',
      packSize: 'Pocketable',
    },
  },
  {
    id: 8,
    code: 'VK-ACC-11',
    name: 'GHOST WALLET',
    price: 58,
    category: 'wallets',
    material: ['synthetic', 'nylon'],
    stock: 'in-stock',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
    specs: {
      material: 'X-Pac VX07 Ultra-Thin Laminate',
      rfid: 'RFID Blocking Layer',
      capacity: '6 Cards + Cash Slot',
      weight: '12g',
    },
  },
];

// ==================== CART MANAGEMENT ====================

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('volk-cart') || '[]');
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        ...product,
        quantity,
      });
    }
    this.save();
    this.updateUI();
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.save();
    this.updateUI();
  }

  updateQuantity(id, quantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.save();
      this.updateUI();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  save() {
    localStorage.setItem('volk-cart', JSON.stringify(this.items));
  }

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  }

  updateUI() {
    const cartCount = document.querySelector('.cart-count');
    const count = this.getCount();
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
}

const cart = new Cart();

// ==================== NAVIGATION ====================

function setupNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // Close menu on link click
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('active');
      if (nav) nav.classList.remove('active');
    });
  });

  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ==================== MARQUEE TEXT ====================

function setupMarquee() {
  const marqueeContent = document.querySelector('.marquee-content');
  if (!marqueeContent) return;

  const text = marqueeContent.textContent;
  const span = document.createElement('span');
  span.textContent = text;
  marqueeContent.appendChild(span);
}

// ==================== CART ICON ====================

function setupCartIcon() {
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
  cart.updateUI();
}

// ==================== PRODUCT CARDS ====================

function renderProducts(products) {
  const container = document.querySelector('.products-container');
  if (!container) return;

  const stockLabel = { 'in-stock': 'IN STOCK', 'low-stock': 'LOW STOCK', 'out-of-stock': 'SOLD OUT' };

  container.innerHTML = products
    .map(
      product => `
    <div class="product-card">
      <div class="product-image">
        ${product.stock && product.stock !== 'in-stock' ? `<div class="stock-badge ${product.stock}">${stockLabel[product.stock]}</div>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-overlay">
          <button class="btn btn-primary product-add-btn" onclick="addToCartFromCard(${product.id})" ${product.stock === 'out-of-stock' ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>ADD TO CART</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-code">${product.code}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toLocaleString()}</div>
        <a href="product-detail.html?id=${product.id}" style="margin-top: auto;">
          <button class="btn btn-ghost" style="width: 100%;">VIEW DETAILS</button>
        </a>
      </div>
    </div>
  `,
    )
    .join('');
}

function addToCartFromCard(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    cart.addItem(product, 1);
    showNotification('Added to cart');
  }
}

// ==================== PRODUCT DETAIL ====================

function setupProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'));
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) return;

  // Breadcrumb
  const breadcrumb = document.getElementById('detailBreadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="index.html">HOME</a><span class="breadcrumb-sep">›</span><a href="products.html">SHOP</a><span class="breadcrumb-sep">›</span><span class="breadcrumb-current">${product.name}</span>`;
  }

  // Set product data
  document.querySelector('.detail-code').textContent = product.code;
  document.querySelector('.detail-title').textContent = product.name;
  document.querySelector('.detail-price').textContent = `$${product.price.toLocaleString()}`;

  // Gallery main image
  const galleryMain = document.querySelector('.gallery-main img');
  if (galleryMain) galleryMain.src = product.image;

  // Specs list
  const specsList = document.querySelector('.specs-list');
  if (specsList) {
    specsList.innerHTML = Object.entries(product.specs)
      .map(
        ([key, value]) => `
      <li>
        <span>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}</span>
        <span>${value}</span>
      </li>
    `,
      )
      .join('');
  }

  // Add to cart button
  const addBtn = document.querySelector('.detail-buttons .btn-primary');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const qtyInput = document.querySelector('.quantity-input');
      const quantity = parseInt(qtyInput.value) || 1;
      cart.addItem(product, quantity);
      showNotification('Added to cart');
      qtyInput.value = 1;
    });
  }

  // Stock status
  const stockEl = document.getElementById('detailStock');
  if (stockEl && product.stock) {
    const stockMap = {
      'in-stock':     { label: 'IN STOCK',  sub: 'Ships within 24 hours',    color: '#4ade80' },
      'low-stock':    { label: 'LOW STOCK', sub: 'Only a few left — order soon', color: 'var(--accent)' },
      'out-of-stock': { label: 'SOLD OUT',  sub: 'Join the waitlist',         color: '#f87171' },
    };
    const s = stockMap[product.stock];
    stockEl.innerHTML = `<div style="font-size:0.875rem;color:${s.color};font-weight:700;letter-spacing:0.06em;margin-bottom:4px;">${s.label}</div><div style="font-weight:600;text-transform:uppercase;font-size:0.8rem;">${s.sub}</div>`;
  }

  // Quantity selector
  setupQuantitySelector();

  // Accordion
  setupAccordion();
}

function setupQuantitySelector() {
  const buttons = document.querySelectorAll('.quantity-selector button');
  const input = document.querySelector('.quantity-input');

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      const current = parseInt(input.value) || 1;
      const isPlus = e.target.textContent === '+';
      input.value = Math.max(1, isPlus ? current + 1 : current - 1);
    });
  });
}

function setupAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      // Close others
      items.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
}

// ==================== FILTERS & PRODUCTS PAGE ====================

function setupFilters() {
  const activeCategories = new Set();
  const activePrices = new Set();
  const activeMaterials = new Set();
  let activeSort = '';

  function priceMatches(price) {
    if (activePrices.size === 0) return true;
    if (activePrices.has('under-500') && price < 500) return true;
    if (activePrices.has('500-1000') && price >= 500 && price <= 1000) return true;
    if (activePrices.has('over-1000') && price > 1000) return true;
    return false;
  }

  function applyFilters() {
    let filtered = PRODUCTS.filter(p => {
      const catMatch = activeCategories.size === 0 || activeCategories.has(p.category);
      const priceMatch = priceMatches(p.price);
      const matMatch = activeMaterials.size === 0 || (p.material && p.material.some(m => activeMaterials.has(m)));
      return catMatch && priceMatch && matMatch;
    });

    if (activeSort === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (activeSort === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (activeSort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    renderProducts(filtered);

    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = filtered.length;
  }

  document.querySelectorAll('.filter-option input').forEach(input => {
    input.addEventListener('change', () => {
      const cat = input.getAttribute('data-category');
      const price = input.getAttribute('data-price');
      const mat = input.getAttribute('data-material');

      if (cat) input.checked ? activeCategories.add(cat) : activeCategories.delete(cat);
      if (price) input.checked ? activePrices.add(price) : activePrices.delete(price);
      if (mat) input.checked ? activeMaterials.add(mat) : activeMaterials.delete(mat);

      applyFilters();
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      applyFilters();
    });
  }

  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeCategories.clear();
      activePrices.clear();
      activeMaterials.clear();
      activeSort = '';
      document.querySelectorAll('.filter-option input').forEach(i => { i.checked = false; });
      if (sortSelect) sortSelect.value = '';
      applyFilters();
    });
  }
}

// ==================== CART PAGE ====================

function setupCartPage() {
  renderCartTable();
  renderCartSummary();

  const tbody = document.querySelector('.cart-table tbody');
  if (!tbody) return;

  // Event delegation — listeners survive renderCartTable() re-renders
  tbody.addEventListener('change', e => {
    if (e.target.classList.contains('qty-input')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      const quantity = parseInt(e.target.value) || 1;
      cart.updateQuantity(productId, quantity);
      renderCartTable();
      renderCartSummary();
    }
  });

  tbody.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      cart.removeItem(productId);
      renderCartTable();
      renderCartSummary();
    }
  });
}

function renderCartTable() {
  const tbody = document.querySelector('.cart-table tbody');
  if (!tbody) return;

  if (cart.items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:40px;">Cart is empty</td></tr>';
    return;
  }

  tbody.innerHTML = cart.items
    .map(
      item => `
    <tr>
      <td>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-code">${item.code}</div>
      </td>
      <td><input type="number" class="qty-input" value="${item.quantity}" data-id="${item.id}" min="1"></td>
      <td>$${item.price.toLocaleString()}</td>
      <td>
        <div style="margin-bottom:8px;">$${(item.price * item.quantity).toLocaleString()}</div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </td>
    </tr>
  `,
    )
    .join('');
}

function renderCartSummary() {
  const summaryPanel = document.querySelector('.summary-panel');
  if (!summaryPanel) return;

  const subtotal = cart.getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  summaryPanel.innerHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toLocaleString()}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>${shipping === 0 ? 'FREE' : '$' + shipping.toLocaleString()}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>$${total.toLocaleString()}</span>
    </div>
    <button class="btn btn-primary" style="width: 100%; margin-top: 16px;" onclick="proceedToCheckout()">CHECKOUT</button>
  `;
}

function proceedToCheckout() {
  if (cart.items.length === 0) {
    showNotification('Cart is empty');
    return;
  }
  window.location.href = 'checkout.html';
}

// ==================== CHECKOUT PAGE ====================

function setupCheckoutPage() {
  const submitBtn = document.querySelector('.btn-primary');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const form = document.querySelector('.checkout-form');
      if (validateForm(form)) {
        showNotification('Order confirmed! Thank you.');
        cart.clear();
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }
    });
  }

  // Display order summary
  renderCheckoutSummary();
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ff6b6b';
      valid = false;
    } else {
      input.style.borderColor = 'var(--accent)';
    }
  });

  return valid;
}

function renderCheckoutSummary() {
  const summaryContainer = document.querySelector('.checkout-summary');
  if (!summaryContainer) return;

  const subtotal = cart.getTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  let html = '<h3>Order Summary</h3>';
  cart.items.forEach(item => {
    html += `
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">
        <span>${item.name} × ${item.quantity}</span>
        <span>$${(item.price * item.quantity).toLocaleString()}</span>
      </div>
    `;
  });
  html += `
    <div style="display:flex;justify-content:space-between;padding:16px 0;font-weight:700;color:var(--accent);">
      <span>Total</span>
      <span>$${total.toLocaleString()}</span>
    </div>
  `;

  summaryContainer.innerHTML = html;
}

// ==================== NOTIFICATIONS ====================

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--accent);
    color: #000;
    padding: 12px 24px;
    border-radius: 0;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupMarquee();
  setupCartIcon();

  // Page-specific setup
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (currentPage === 'products.html' || currentPage === '') {
    renderProducts(PRODUCTS);
    setupFilters();
  }

  if (currentPage === 'product-detail.html') {
    setupProductDetail();
  }

  if (currentPage === 'cart.html') {
    setupCartPage();
  }

  if (currentPage === 'checkout.html') {
    setupCheckoutPage();
  }

  // Gallery thumbnails
  const thumbs = document.querySelectorAll('.thumb');
  const galleryMain = document.querySelector('.gallery-main img');

  thumbs.forEach((thumb, index) => {
    if (index === 0) thumb.classList.add('active');
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const img = thumb.querySelector('img');
      if (galleryMain && img) {
        galleryMain.src = img.src;
      }
    });
  });
});

// ==================== EXPORT FOR HTML ====================

window.addToCartFromCard = addToCartFromCard;
window.proceedToCheckout = proceedToCheckout;
