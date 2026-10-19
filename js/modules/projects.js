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

      const mediaHeader = data.image 
        ? `<div class="cs-img-wrap"><img src="${data.image}" alt="${data.title}" class="cs-img"></div>`
        : `<div class="cs-img-wrap" style="height:180px; background:linear-gradient(135deg, #091220 0%, #15243e 100%); display:flex; align-items:center; justify-content:center; border:1px solid var(--gold-border);">
            <div style="text-align:center;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:44px; height:44px; margin:0 auto 10px; color:var(--gold-light); display:block;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <span style="font-family:var(--font-sans); font-size:0.95rem; color:var(--gold-light); font-weight:700; letter-spacing:0.5px;">DEWA Approved Architectural CAD Schematic</span>
            </div>
           </div>`;

      csBody.innerHTML = `
        <div class="cs-modal-content">
          ${mediaHeader}
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
