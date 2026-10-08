/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Landmark Projects Portfolio & Case Studies Modal
 */

function initProjectPortfolio() {
  const filterBtns = document.querySelectorAll('.port-filter-btn');
  const cards = document.querySelectorAll('.project-photo-card');
  const modal = document.getElementById('caseStudyModal');
  const csTitle = document.getElementById('csTitle');
  const csBody = document.getElementById('csBody');
  const closeBtn = document.getElementById('closeCaseStudyBtn');

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-port');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Case Study Modal
  document.querySelectorAll('.open-case-study-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-proj');
      const data = typeof PROJECT_CASE_STUDIES !== 'undefined' ? PROJECT_CASE_STUDIES[projId] : null;
      if (!data || !modal) return;

      csTitle.textContent = data.title;
      csBody.innerHTML = `
        <div class="cs-modal-content">
          ${data.image ? `<div class="cs-img-wrap"><img src="${data.image}" alt="${data.title}" class="cs-img"></div>` : ''}
          <div class="cs-details-grid">
            <div class="cs-item"><strong>Location:</strong> <span>${data.location}</span></div>
            <div class="cs-item"><strong>Connected Load:</strong> <span class="gold-text">${data.powerLoad}</span></div>
            <div class="cs-item"><strong>Consultant:</strong> <span>${data.consultant}</span></div>
            <div class="cs-item"><strong>Client / Type:</strong> <span>${data.client} (${data.category})</span></div>
            <div class="cs-item cs-full"><strong>Scope of Works:</strong> <span>${data.scope}</span></div>
            <div class="cs-item cs-full"><strong>DEWA Status:</strong> <span class="badge-pill">${data.status}</span></div>
          </div>
          <div class="cs-desc">
            <h4>Engineering Scope & Execution Overview</h4>
            <p>${data.description}</p>
          </div>
          <div class="cs-footer-cta">
            <button class="btn btn-gold btn-block open-rfq-from-cs" onclick="document.getElementById('caseStudyModal').close(); document.getElementById('contact').scrollIntoView({behavior:'smooth'});">
              Inquire About Similar Project Scope
            </button>
          </div>
        </div>
      `;
      modal.showModal();
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        modal.close();
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initProjectPortfolio };
}
