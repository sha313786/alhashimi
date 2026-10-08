/**
 * Al Hashimi Electrical Installation Works LLC
 * Master Application Entrypoint & Backward-Compatible Loader
 * 
 * The codebase is now organized into clean, dedicated modules:
 * - Data:       js/data/projects.js, js/data/partners.js
 * - Modules:    js/modules/clock.js, js/modules/calculator.js, js/modules/projects.js,
 *               js/modules/credentials.js, js/modules/partners.js, js/modules/rfq.js,
 *               js/modules/ui.js
 * - Utilities:  js/utils.js
 * - Coordinator: js/main.js
 */

(function () {
  // If modules are already loaded via HTML script tags, do not re-inject
  if (typeof initLiveDubaiClock === 'function') return;

  const scriptFiles = [
    'js/utils.js',
    'js/data/translations.js',
    'js/data/projects.js',
    'js/data/partners.js',
    'js/modules/i18n.js',
    'js/modules/clock.js',
    'js/modules/calculator.js',
    'js/modules/projects.js',
    'js/modules/credentials.js',
    'js/modules/partners.js',
    'js/modules/rfq.js',
    'js/modules/ui.js',
    'js/main.js'
  ];

  scriptFiles.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  });
})();
