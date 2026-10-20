const fs = require('fs');
const path = require('path');

// 1. Gather all CSS
const cssFiles = [
  'css/variables.css',
  'css/base.css',
  'css/header.css',
  'css/hero.css',
  'css/about.css',
  'css/scope.css',
  'css/awards.css',
  'css/calculator.css',
  'css/projects.css',
  'css/partners.css',
  'css/safety-faq.css',
  'css/contact.css',
  'css/modals.css',
  'css/footer.css',
  'css/responsive.css',
  'css/rtl.css'
];

let allCss = cssFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n\n');

// 2. Add Client Showcase Top Bar CSS
const showcaseBarCss = `
/* Client Showcase Presentation Header Bar */
.showcase-banner {
  background: linear-gradient(90deg, #070a10 0%, #151d2e 50%, #070a10 100%);
  border-bottom: 2px solid var(--gold-primary);
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}
.showcase-banner-inner {
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.showcase-badge-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 0.90rem;
  font-weight: 600;
}
.showcase-badge-pill {
  background: var(--gold-gradient);
  color: #0b0f19;
  font-size: 0.70rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  letter-spacing: 0.8px;
  text-transform: uppercase;
}
.showcase-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.showcase-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.80rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}
.showcase-btn-print {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.showcase-btn-print:hover {
  background: rgba(255, 255, 255, 0.2);
}
.showcase-btn-wa {
  background: #25d366;
  color: #000;
  border: 1px solid #1ebe5d;
  font-weight: 700;
}
.showcase-btn-wa:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}
@media print {
  .showcase-banner, .site-header, .floating-contact-stack, .btn-gold, .header-actions {
    display: none !important;
  }
}
`;

allCss += '\n' + showcaseBarCss;

// 3. Base64 Images
const logoB64 = 'data:image/png;base64,' + fs.readFileSync('alhashimi-logo.png').toString('base64');
const holderB64 = 'data:image/jpeg;base64,' + fs.readFileSync('dewa-award-holder.jpg').toString('base64');
const ceremonyB64 = 'data:image/jpeg;base64,' + fs.readFileSync('dewa-award-ceremony.jpg').toString('base64');
const villaB64 = 'data:image/jpeg;base64,' + fs.readFileSync('project-luxury-villa.jpg').toString('base64');
const complexB64 = 'data:image/jpeg;base64,' + fs.readFileSync('project-residential-complex.jpg').toString('base64');
const fav32B64 = 'data:image/png;base64,' + fs.readFileSync('favicon-32x32.png').toString('base64');
const appleB64 = 'data:image/png;base64,' + fs.readFileSync('apple-touch-icon.png').toString('base64');
const svgB64 = 'data:image/svg+xml;base64,' + fs.readFileSync('favicon.svg').toString('base64');

// 4. Gather HTML body
let html = fs.readFileSync('index.html', 'utf8');

// Replace external CSS link with inline <style>
html = html.replace(/<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?">/, '<style>' + allCss + '</style>');

// Replace images with base64 embedded data URIs for 100% portable offline viewing
html = html.replace(/href="favicon\.svg\?v=2"/g, 'href="' + svgB64 + '"');
html = html.replace(/href="favicon-32x32\.png\?v=2"/g, 'href="' + fav32B64 + '"');
html = html.replace(/href="favicon-16x16\.png\?v=2"/g, 'href="' + fav32B64 + '"');
html = html.replace(/href="favicon\.ico\?v=2"/g, 'href="' + fav32B64 + '"');
html = html.replace(/href="apple-touch-icon\.png\?v=2"/g, 'href="' + appleB64 + '"');
html = html.replace(/src="alhashimi-logo\.png"/g, 'src="' + logoB64 + '"');
html = html.replace(/href="alhashimi-logo\.png"/g, 'href="' + logoB64 + '"');
html = html.replace(/src="dewa-award-holder\.jpg"/g, 'src="' + holderB64 + '"');
html = html.replace(/data-photo="dewa-award-holder\.jpg"/g, 'data-photo="' + holderB64 + '"');

html = html.replace(/src="dewa-award-ceremony\.jpg"/g, 'src="' + ceremonyB64 + '"');
html = html.replace(/data-photo="dewa-award-ceremony\.jpg"/g, 'data-photo="' + ceremonyB64 + '"');

html = html.replace(/src="project-luxury-villa\.jpg"/g, 'src="' + villaB64 + '"');
html = html.replace(/src="project-residential-complex\.jpg"/g, 'src="' + complexB64 + '"');

// 5. Gather all JS
const jsDataProjects = fs.readFileSync('js/data/projects.js', 'utf8')
  .replace('"project-luxury-villa.jpg"', '"' + villaB64 + '"')
  .replace('"project-residential-complex.jpg"', '"' + complexB64 + '"');

const jsFiles = [
  fs.readFileSync('js/utils.js', 'utf8'),
  fs.readFileSync('js/data/translations.js', 'utf8'),
  jsDataProjects,
  fs.readFileSync('js/data/partners.js', 'utf8'),
  fs.readFileSync('js/modules/i18n.js', 'utf8'),
  fs.readFileSync('js/modules/clock.js', 'utf8'),
  fs.readFileSync('js/modules/calculator.js', 'utf8'),
  fs.readFileSync('js/modules/projects.js', 'utf8'),
  fs.readFileSync('js/modules/credentials.js', 'utf8'),
  fs.readFileSync('js/modules/partners.js', 'utf8'),
  fs.readFileSync('js/modules/rfq.js', 'utf8'),
  fs.readFileSync('js/modules/ui.js', 'utf8'),
  fs.readFileSync('js/main.js', 'utf8')
];

let allJs = jsFiles.join('\n\n');

// Replace script tags at bottom with inline <script>
const scriptTagsRegex = /<!-- Application Data Modules -->[\s\S]*?<!-- Main Application Coordinator -->[\s\S]*?<script src="js\/main\.js(?:\?[^"]*)?"><\/script>/;
html = html.replace(scriptTagsRegex, '<script>\n' + allJs + '\n</script>');

// 6. Insert Client Showcase Banner right after <body>
const showcaseBannerHtml = `
  <!-- Client Presentation & Showcase Action Bar -->
  <div class="showcase-banner" role="region" aria-label="Client Presentation Mode">
    <div class="showcase-banner-inner">
      <div class="showcase-badge-title">
        <span class="showcase-badge-pill">Client Showcase</span>
        <span>Al Hashimi Electrical Installation Works LLC &bull; DEWA Golden Category 1st Place MEP Prequalification</span>
      </div>
      <div class="showcase-actions">
        <button class="showcase-btn showcase-btn-print" onclick="window.print()" title="Print or Save this Showcase as PDF">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print / Save PDF
        </button>
        <a href="https://wa.me/971528974123?text=Hello%20Mr.%20Binoji%2C%20reviewing%20Al%20Hashimi%20Electrical%20Showcase%20Profile.%20Let%27s%20discuss%20our%20project." target="_blank" rel="noopener" class="showcase-btn showcase-btn-wa" title="Connect with Managing Director Mr. Binoji on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
          WhatsApp Binoji (+971 52 897 4123)
        </a>
      </div>
    </div>
  </div>
`;

html = html.replace('<body>', '<body>\n' + showcaseBannerHtml);

// Save showcase.html and client-showcase.html
fs.writeFileSync('showcase.html', html, 'utf8');
fs.writeFileSync('client-showcase.html', html, 'utf8');

console.log('Successfully generated self-contained showcase.html (' + (html.length / 1024).toFixed(1) + ' KB)');
