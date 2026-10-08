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
const holderB64 = 'data:image/jpeg;base64,' + fs.readFileSync('dewa-award-holder.jpg').toString('base64');
const ceremonyB64 = 'data:image/jpeg;base64,' + fs.readFileSync('dewa-award-ceremony.jpg').toString('base64');
const villaB64 = 'data:image/jpeg;base64,' + fs.readFileSync('project-luxury-villa.jpg').toString('base64');
const complexB64 = 'data:image/jpeg;base64,' + fs.readFileSync('project-residential-complex.jpg').toString('base64');

// 4. Gather HTML body
let html = fs.readFileSync('index.html', 'utf8');

// Replace external CSS link with inline <style>
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>' + allCss + '</style>');

// Replace images with base64 embedded data URIs for 100% portable offline viewing
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
const scriptTagsRegex = /<!-- Application Data Modules -->[\s\S]*?<!-- Main Application Coordinator -->[\s\S]*?<script src="js\/main\.js"><\/script>/;
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
          &#128438; Print / Save PDF
        </button>
        <a href="https://wa.me/971528974123?text=Hello%20Mr.%20Binoji%2C%20reviewing%20Al%20Hashimi%20Electrical%20Showcase%20Profile.%20Let%27s%20discuss%20our%20project." target="_blank" rel="noopener" class="showcase-btn showcase-btn-wa" title="Connect with Managing Director Mr. Binoji on WhatsApp">
          &#128172; WhatsApp Binoji (+971 52 897 4123)
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
