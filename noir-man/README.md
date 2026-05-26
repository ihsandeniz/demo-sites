# NOIR - Ultra Minimal Luxury Menswear Demo Site

A high-end, ultra-minimal luxury men's fashion e-commerce demo website built with vanilla HTML, CSS, and JavaScript.

## Project Structure

```
noir-man/
├── index.html              # Home page with hero, featured products, newsletter
├── products.html           # Product catalog with filters
├── product-detail.html     # Individual product page with gallery, size/color selection
├── cart.html              # Shopping cart management
├── checkout.html          # Checkout form and payment
├── about.html             # Brand story and values
├── contact.html           # Contact form and store info
├── style.css              # Unified styling (all pages)
└── main.js                # All interactivity (no framework)
```

## Design System

### Colors
- **Black**: `#0a0a0a` - Primary background
- **White**: `#fafafa` - Primary text
- **Gold**: `#c9a84c` - Accent color for CTAs and highlights
- **Gray**: `#2a2a2a` - Secondary background
- **Light Gray**: `#8a8a8a` - Secondary text

### Typography
- **Headings**: Playfair Display (serif) - elegant, timeless
- **Body**: Inter (sans-serif) - clean, readable
- **Logo**: Playfair Display, uppercase, 0.3em letter-spacing

### Key Features
- Ultra minimal aesthetic with generous whitespace
- Sticky header with cart counter
- Responsive hamburger menu (mobile)
- Product cards with hover overlays
- Marquee banner for announcements
- Cart system with localStorage persistence
- Smooth scroll behavior
- Gold border highlights on hover
- Newsletter subscription
- Product detail gallery with thumbnails
- Size and color selectors
- Collapsible accordion sections
- Full checkout flow
- Contact form with validation
- FAQ section with accordion

## Features

### Functional Features
1. **Cart Management**
   - Add/remove products
   - Update quantities
   - Persistent storage (localStorage)
   - Real-time cart count badge

2. **Product Pages**
   - Product gallery with thumbnail selection
   - Size selector
   - Color selector
   - Quick add to cart
   - "You May Also Like" related products
   - Collapsible description/specs

3. **Checkout**
   - Billing information form
   - Shipping address form
   - Payment information form
   - Order summary with real-time totals
   - Form validation

4. **Navigation**
   - Sticky header with active page highlight
   - Mobile hamburger menu
   - Cart icon with item count
   - Smooth page transitions

### UI/UX Elements
- Notification toasts for user feedback
- Hover effects on cards (zoom, border highlight)
- Filter pills with active states
- Form input validation with visual feedback
- Responsive grid layouts
- Sticky order summary panels

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Grid, flexbox, custom properties
- **Vanilla JavaScript** - No frameworks, lightweight
- **Google Fonts** - Inter and Playfair Display
- **Unsplash Images** - High-quality product photos

## File Sizes

- CSS: 25KB
- JS: 17KB
- HTML files: 6-9KB each
- Total: ~116KB

## Responsive Breakpoints

- Desktop: 1400px+ (full grid layouts)
- Tablet: 1024px (2-column layouts)
- Mobile: 768px (hamburger menu, 2-column grids)
- Small: 480px (single column, optimized spacing)

## Page Routes

| Page | Path | Purpose |
|------|------|---------|
| Home | `index.html` | Hero, featured products, newsletter |
| Shop | `products.html` | Full catalog with filters |
| Product Detail | `product-detail.html` | Single product view |
| Cart | `cart.html` | Shopping cart summary |
| Checkout | `checkout.html` | Order form and payment |
| About | `about.html` | Brand story and values |
| Contact | `contact.html` | Contact form and FAQ |

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Getting Started

1. Open `index.html` in a web browser
2. Navigate through pages using the header menu
3. Add products to cart
4. View cart and proceed to checkout
5. All data persists in browser localStorage

## Customization

### Colors
Edit CSS variables in `style.css` `:root` section:
```css
--color-black: #0a0a0a;
--color-gold: #c9a84c;
```

### Images
All product images use Unsplash direct links - easily replaceable with your own CDN URLs.

### Content
Each HTML file can be customized with your own:
- Product names and prices
- Brand story and descriptions
- Contact information
- Social media links
- Footer content

## Notes

- Cart data stored in `localStorage` under key `noir_cart`
- All forms are client-side validated
- No backend required - fully static/client-side
- Checkout form does not submit (demo only)
- Images are optimized Unsplash URLs with parameters
