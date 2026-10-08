/**
 * Al Hashimi Electrical Installation Works LLC
 * Language Switcher & Localization Module (English <-> Arabic)
 */

let currentLang = 'en';
const originalEnglishText = new Map();

function initLanguageSwitcher() {
  const switchBtn = document.getElementById('langSwitchBtn');
  if (!switchBtn) return;

  // Cache original English texts on first load
  cacheOriginalTexts();

  // Check saved preference or URL param
  const savedLang = localStorage.getItem('alhashimi_lang');
  if (savedLang === 'ar') {
    applyLanguage('ar');
  }

  switchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const nextLang = currentLang === 'en' ? 'ar' : 'en';
    applyLanguage(nextLang);
  });
}

function cacheOriginalTexts() {
  const elementsToCache = [
    // Top bar & buttons
    { sel: '#langSwitchBtn span', key: 'lang_btn' },
    { sel: '.top-bar-badge span', key: 'top_badge' },
    { sel: '#openRfqHeader', key: 'btn_quote' },
    
    // Brand Logo
    { sel: '.brand-logo .company-name', key: 'company_name' },
    { sel: '.brand-logo .company-sub', key: 'company_sub' },
    { sel: '.brand-logo .company-est', key: 'company_est' },

    // Nav Links
    { sel: 'a[href="#about"].nav-link', key: 'nav_about' },
    { sel: 'a[href="#awards"].nav-link', key: 'nav_awards' },
    { sel: 'a[href="#scope"].nav-link', key: 'nav_scope' },
    { sel: 'a[href="#calculator"].nav-link', key: 'nav_calculator' },
    { sel: 'a[href="#gallery"].nav-link', key: 'nav_projects' },
    { sel: 'a[href="#partners"].nav-link', key: 'nav_partners' },
    { sel: 'a[href="#contact"].nav-link', key: 'nav_contact' },

    // Hero Section
    { sel: '.hero-badge span', key: 'hero_badge' },
    { sel: '.hero-title', key: 'hero_title' },
    { sel: '.hero-subtitle', key: 'hero_subtitle' },
    { sel: '.hero-cta-group .open-rfq-btn span', key: 'hero_btn_rfq' },
    { sel: '.hero-cta-group a[href="#calculator"]', key: 'hero_btn_calc' },
    { sel: '.hero-cta-group a[href="#scope"]', key: 'hero_btn_scope' },
    { sel: '.spotlight-tag', key: 'hero_spotlight_tag' },
    { sel: '.spotlight-info strong', key: 'hero_spotlight_title' },
    { sel: '.spotlight-info span', key: 'hero_spotlight_sub' },

    // About Section
    { sel: '#about .section-sub', key: 'about_sub' },
    { sel: '#about .section-title', key: 'about_title' },
    { sel: '.quote-header span', key: 'about_quote_role' },
    { sel: '.lead-quote-card blockquote p', key: 'about_quote_text' },
    { sel: '.about-text p:first-of-type', key: 'about_p1' },
    { sel: '.about-text p:nth-of-type(2)', key: 'about_p2' },
    { sel: '.credentials-card h4', key: 'lic_title' },

    // Awards Section
    { sel: '#awards .section-sub', key: 'awards_sub' },
    { sel: '#awards .section-title', key: 'awards_title' },
    { sel: '#awards .section-desc', key: 'awards_desc' },
    { sel: '.awards-showcase-grid .showcase-card:first-child h4', key: 'awards_card1_title' },
    { sel: '.awards-showcase-grid .showcase-card:first-child p', key: 'awards_card1_desc' },
    { sel: '.awards-showcase-grid .showcase-card:last-child h4', key: 'awards_card2_title' },
    { sel: '.awards-showcase-grid .showcase-card:last-child p', key: 'awards_card2_desc' },

    // Scope Section
    { sel: '#scope .section-sub', key: 'scope_sub' },
    { sel: '#scope .section-title', key: 'scope_title' },
    { sel: '.scope-tab[aria-controls="panel-electrical"]', key: 'scope_tab1' },
    { sel: '.scope-tab[aria-controls="panel-lowcurrent"]', key: 'scope_tab2' },
    { sel: '.scope-tab[aria-controls="panel-plumbing"]', key: 'scope_tab3' },

    // Calculator Section
    { sel: '#calculator .section-sub', key: 'calc_sub' },
    { sel: '#calculator .section-title', key: 'calc_title' },
    { sel: '#calculator .section-desc', key: 'calc_desc' },
    { sel: '#transferCalcBtn', key: 'calc_btn_transfer' },

    // Projects Section
    { sel: '#gallery .section-sub', key: 'proj_sub' },
    { sel: '#gallery .section-title', key: 'proj_title' },
    { sel: '.port-filter-btn[data-port="all"]', key: 'proj_filter_all' },
    { sel: '.port-filter-btn[data-port="villa"]', key: 'proj_filter_villa' },
    { sel: '.port-filter-btn[data-port="commercial"]', key: 'proj_filter_comm' },
    { sel: '.port-filter-btn[data-port="industrial"]', key: 'proj_filter_ind' },
    { sel: '.port-filter-btn[data-port="mosque"]', key: 'proj_filter_mosque' },

    // Partners Section
    { sel: '#partners .section-sub', key: 'partner_sub' },
    { sel: '#partners .section-title', key: 'partner_title' },
    { sel: '.filter-btn[data-filter="all"]', key: 'partner_filter_all' },
    { sel: '.filter-btn[data-filter="consultant"]', key: 'partner_filter_cons' },
    { sel: '.filter-btn[data-filter="contractor"]', key: 'partner_filter_cont' },

    // Contact Section
    { sel: '#contact .section-sub', key: 'contact_sub' },
    { sel: '#contact .section-title', key: 'contact_title' },
    { sel: '#contact .section-desc', key: 'contact_desc' },
    { sel: '#submitBtn span', key: 'form_btn_submit' },
    { sel: '.drop-text', key: 'form_drop_text' },

    // Footer
    { sel: '.footer-desc', key: 'ftr_tagline' },
    { sel: '.footer-col:last-child h5', key: 'ftr_head_office' },
    { sel: '.bottom-inner p:first-child', key: 'ftr_rights' }
  ];

  elementsToCache.forEach(item => {
    const el = document.querySelector(item.sel);
    if (el) {
      originalEnglishText.set(item.key, { el, html: el.innerHTML });
    }
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('alhashimi_lang', lang);

  const htmlEl = document.documentElement;
  const switchBtnText = document.querySelector('#langSwitchBtn span');

  if (lang === 'ar') {
    htmlEl.setAttribute('lang', 'ar');
    htmlEl.setAttribute('dir', 'rtl');

    if (switchBtnText) {
      switchBtnText.textContent = 'English';
    }

    if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.ar) {
      const arDict = TRANSLATIONS.ar;
      for (const [key, val] of Object.entries(arDict)) {
        const cached = originalEnglishText.get(key);
        if (cached && cached.el) {
          cached.el.innerHTML = val;
        }
      }

      // Also update placeholders
      const searchInput = document.getElementById('partnerSearch');
      if (searchInput && arDict.partner_search_ph) {
        searchInput.placeholder = arDict.partner_search_ph;
      }
    }
  } else {
    htmlEl.setAttribute('lang', 'en');
    htmlEl.setAttribute('dir', 'ltr');

    if (switchBtnText) {
      switchBtnText.textContent = 'العربية';
    }

    // Restore original English text
    for (const [key, item] of originalEnglishText.entries()) {
      if (item && item.el) {
        item.el.innerHTML = item.html;
      }
    }

    // Restore search placeholder
    const searchInput = document.getElementById('partnerSearch');
    if (searchInput) {
      searchInput.placeholder = 'Search by consultant or contractor name (e.g., Emaar, Khatib, Bel-Yoahah)...';
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLanguageSwitcher, applyLanguage };
}
