/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: DEWA Golden Category Credential Verification Modal
 */

function initDewaVerificationModal() {
  const modal = document.getElementById('dewaVerifyModal');
  const openBtn = document.getElementById('openDewaModalBtn');
  const closeBtn = document.getElementById('closeDewaModalBtn');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => modal.showModal());
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.close());
  }

  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      modal.close();
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initDewaVerificationModal };
}
