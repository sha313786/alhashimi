/**
 * Al Hashimi Electrical Installation Works LLC
 * Main JavaScript Application Entrypoint
 * Coordinates all modular subsystems:
 * - Clock & Live Hours (js/modules/clock.js)
 * - Load & Tariff Estimator (js/modules/calculator.js)
 * - Projects & Case Studies (js/modules/projects.js + js/data/projects.js)
 * - Credentials & DEWA Modal (js/modules/credentials.js)
 * - Partners Directory (js/modules/partners.js + js/data/partners.js)
 * - RFQ & WhatsApp Dispatch (js/modules/rfq.js)
 * - UI & Navigation Drawer (js/modules/ui.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initLanguageSwitcher === 'function') initLanguageSwitcher();
  if (typeof initLiveDubaiClock === 'function') initLiveDubaiClock();
  if (typeof initPartnerDirectory === 'function') initPartnerDirectory();
  if (typeof initScopeTabs === 'function') initScopeTabs();
  if (typeof initLoadCalculator === 'function') initLoadCalculator();
  if (typeof initProjectPortfolio === 'function') initProjectPortfolio();
  if (typeof initDewaVerificationModal === 'function') initDewaVerificationModal();
  if (typeof initRfqModal === 'function') initRfqModal();
  if (typeof initPhotoLightbox === 'function') initPhotoLightbox();
  if (typeof initContactForm === 'function') initContactForm();
  if (typeof initMobileMenu === 'function') initMobileMenu();
  if (typeof initStatCounters === 'function') initStatCounters();
  if (typeof initBackToTop === 'function') initBackToTop();
  if (typeof initFileUploadPreview === 'function') initFileUploadPreview();
});
