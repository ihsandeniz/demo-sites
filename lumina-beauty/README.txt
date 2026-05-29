# Lumina Beauty — Güzellik Salonu Demo Sitesi

## DOSYALAR

✓ index.html (301 satır)
  - Tam sayfa yapısı: Duyuru bar → Header → Hero → Hizmetler → Galeri → Ekip → Yorumlar → CTA → Footer
  - WhatsApp FAB bağlantısı: +90 555 1234567 (placeholder — güncelleyin)
  - Tüm sayfalar: services.html, gallery.html, team.html, contact.html (FAZ 2'de)

✓ style.css (1159 satır)
  - Design Tokens: --cream, --rose, --gold, --sage, --dark vb.
  - Fonts: Playfair Display (heading) + Inter (body) Google Fonts
  - Responsive: 1024px, 768px, 480px breakpoint'leri
  - Animasyonlar: slideIn, fadeInScale, scroll-reveal, hover effects

✓ main.js (145 satır)
  - Mobile menü toggle
  - Duyuru bar rotasyonu (5s aralık)
  - Testimonial carousel (8s otomatik geçiş)
  - Scroll reveal animation (IntersectionObserver)
  - WhatsApp FAB gösterim mantığı
  - Nav active state on scroll

## TASARIM ÖZELLİKLERİ

Renk Paleti:
  • Cream (#F5F0E8) — Ana arka plan
  • Rose (#C4958A) — Aksan renk
  • Gold (#C9A84C) — Vurgu
  • Dark (#1A1410) — Metin & arka plan
  • Sage (#A8B5A0) — Soft accent

Tipografi:
  • Başlıklar: Playfair Display, clamp() responsive sizing
  • Gövde: Inter 400/500/600 weights
  • Line-height: 1.7 (paragraflar), 1.1-1.3 (başlıklar)

Bileşenler:
  • Sticky Header with backdrop blur
  • Bento Grid Services (featured card 2 span)
  • Horizontal Gallery Scroll
  • Team Cards with hover zoom
  • Testimonial Carousel (dots navigation)
  • WhatsApp FAB (fixed, scroll-triggered)

Responsive:
  • Desktop: Full grid layouts
  • Tablet (1024px): 2-column grids
  • Mobile (768px): Single column, hamburger menu
  • Small (480px): Compact padding, touch-friendly

## PLACEHOLDER DEĞERLERİ

⚠️ Aşağıdaki değerler güncellenmelidir:

1. WhatsApp Numarası: +905551234567 (line 260 in index.html)
   Gerçek: +90 XXX XXX XX XX formatında

2. Sosyal Medya Bağlantıları: Footer'da IG/FB/TK/WA placeholder (Lines 244-247)
   Gerçek: https://instagram.com/luminabeauty, vs.

3. Resimler: Unsplash URLs (all loaded via CDN)
   Gerçek: Müşteri fotoları local `images/` klasörüne

4. E-posta: contact.html sayfasında (FAZ 2)

5. Telefon: contact.html sayfasında (FAZ 2)

## FAZ 2 GÖREVLERI

Services.html, Gallery.html, Team.html, Contact.html sayfalarını oluştur
  • Aynı header/footer + matching CSS
  • Contact: Form (name, email, phone, service, message, date/time)
  • Services: Detaylı hizmet kartları, pricing
  • Gallery: Lightbox image gallery
  • Team: Extended team bios

## GELIŞTIRME NOTLARI

• Google Fonts preconnect: Faster font loading
• Unsplash CDN: 60+ high-res images, auto-optimization
• CSS Custom Properties: Dark mode kolaylığı için ready
• JavaScript: Vanilla (framework-free), ~8KB minified
• Accessibility: ARIA labels, semantic HTML, color contrast WCAG AA

## TEST ETME

1. Browser'da index.html aç:
   file:///home/ihsan/Masaüstü/vibe-cod-organized/RAW/projects/demo-sites/lumina-beauty/index.html

2. Kontrol edilecek:
   ✓ Mobile menu hamburger (768px altında)
   ✓ Duyuru bar rotasyonu (her 5 saniye)
   ✓ Testimonial carousel (dots tıklanabilir)
   ✓ Scroll animasyonlar (Services/Team section'lar)
   ✓ WhatsApp FAB scroll sonrası görün
   ✓ Responsive design (480px, 768px, 1024px)

## DOSYA KONUM

/home/ihsan/Masaüstü/vibe-cod-organized/RAW/projects/demo-sites/lumina-beauty/
