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

    // Stats
    { sel: '.stats-card-grid .stat-card:nth-child(1) .stat-label', key: 'stat_years_label' },
    { sel: '.stats-card-grid .stat-card:nth-child(1) .stat-desc', key: 'stat_years_desc' },
    { sel: '.stats-card-grid .stat-card:nth-child(2) .stat-label', key: 'stat_awards_label' },
    { sel: '.stats-card-grid .stat-card:nth-child(2) .stat-desc', key: 'stat_awards_desc' },
    { sel: '.stats-card-grid .stat-card:nth-child(3) .stat-label', key: 'stat_projects_label' },
    { sel: '.stats-card-grid .stat-card:nth-child(3) .stat-desc', key: 'stat_projects_desc' },
    { sel: '.stats-card-grid .stat-card:nth-child(4) .stat-label', key: 'stat_zero_label' },
    { sel: '.stats-card-grid .stat-card:nth-child(4) .stat-desc', key: 'stat_zero_desc' },

    // About Section
    { sel: '#about .section-sub', key: 'about_sub' },
    { sel: '#about .section-title', key: 'about_title' },
    { sel: '.intro-card .card-heading', key: 'about_card_title' },
    { sel: '.intro-card .lead-text', key: 'about_quote_text' },
    { sel: '.intro-card p:not(.lead-text)', key: 'about_p1' },
    { sel: '.sig-name', key: 'sig_name' },
    { sel: '.sig-title', key: 'sig_title' },
    { sel: '.sig-award-note', key: 'sig_award_note' },
    { sel: '.credentials-card .card-heading', key: 'lic_title' },
    { sel: '.credentials-card > p', key: 'lic_desc' },

    // Awards Section
    { sel: '.golden-holder-ribbon', key: 'awards_ribbon' },
    { sel: '#awards .section-title', key: 'awards_title' },
    { sel: '#awards .section-desc', key: 'awards_desc' },
    { sel: '.holder-spotlight-card .trophy-verified-row strong', key: 'trophy_verified' },
    { sel: '.holder-spotlight-card .photo-caption', key: 'trophy_caption' },
    { sel: '.trophy-quote-box em', key: 'trophy_quote' },
    { sel: '.ceremony-spotlight-card .trophy-verified-row strong', key: 'ceremony_verified' },
    { sel: '.ceremony-spotlight-card .photo-caption', key: 'ceremony_caption' },
    { sel: '.comparison-matrix-header h3', key: 'comp_title' },
    { sel: '.comparison-matrix-header p', key: 'comp_desc' },

    // Scope Section
    { sel: '#scope .section-sub', key: 'scope_sub' },
    { sel: '#scope .section-title', key: 'scope_title' },
    { sel: '#scope .section-desc', key: 'scope_desc' },
    { sel: '#tab-elec', key: 'scope_tab1' },
    { sel: '#tab-elv', key: 'scope_tab2' },
    { sel: '#tab-plumb', key: 'scope_tab3' },
    { sel: '#tab-dewa', key: 'scope_tab4' },

    // Calculator Section
    { sel: '#calculator .section-sub', key: 'calc_sub' },
    { sel: '#calculator .section-title', key: 'calc_title' },
    { sel: '#calculator .section-desc', key: 'calc_desc' },
    { sel: '#transferCalcBtn span', key: 'calc_btn_transfer' },

    // Projects Section
    { sel: '#gallery .section-sub', key: 'proj_sub' },
    { sel: '#gallery .section-title', key: 'proj_title' },
    { sel: '#gallery .section-desc', key: 'proj_desc' },
    { sel: '.port-filter-btn[data-port="all"]', key: 'proj_filter_all' },
    { sel: '.port-filter-btn[data-port="villa"]', key: 'proj_filter_villa' },
    { sel: '.port-filter-btn[data-port="commercial"]', key: 'proj_filter_comm' },
    { sel: '.port-filter-btn[data-port="industrial"]', key: 'proj_filter_ind' },
    { sel: '.port-filter-btn[data-port="public"]', key: 'proj_filter_mosque' },

    // Partners Section
    { sel: '#partners .section-sub', key: 'partner_sub' },
    { sel: '#partners .section-title', key: 'partner_title' },
    { sel: '#partners .section-desc', key: 'partner_desc' },
    { sel: '.filter-btn[data-filter="all"]', key: 'partner_filter_all' },
    { sel: '.filter-btn[data-filter="consultant"]', key: 'partner_filter_cons' },
    { sel: '.filter-btn[data-filter="contractor"]', key: 'partner_filter_cont' },

    // Contact Section
    { sel: '#contact .section-sub', key: 'contact_sub' },
    { sel: '#contact .section-title', key: 'contact_title' },
    { sel: '#contact .contact-info-panel > p', key: 'contact_desc' },
    { sel: '#submitBtn span:first-child', key: 'form_btn_submit' },

    // Footer
    { sel: '.company-desc', key: 'ftr_tagline' },
    { sel: '.footer-col:last-child h5', key: 'ftr_head_office' },
    { sel: '.bottom-inner p:first-child', key: 'ftr_rights' }
  ];

  elementsToCache.forEach(item => {
    const el = document.querySelector(item.sel);
    if (el) {
      originalEnglishText.set(item.key, { el, html: el.innerHTML });
    }
  });

  // Also cache any elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && !originalEnglishText.has(key)) {
      originalEnglishText.set(key, { el, html: el.innerHTML });
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

      // Also update search input placeholder
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
      searchInput.placeholder = 'Search consultants, contractors, developers...';
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLanguageSwitcher, applyLanguage };
}
