/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Approved Partners & Consultants Directory (Search & Filter)
 */

function initPartnerDirectory() {
  const grid = document.getElementById('partnerGrid');
  const searchInput = document.getElementById('partnerSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const countNotice = document.getElementById('partnerCountNotice');

  if (!grid || typeof PARTNER_DATA === 'undefined') return;

  let currentFilter = 'all';
  let searchQuery = '';

  function render() {
    const filtered = PARTNER_DATA.filter(item => {
      const matchesType = currentFilter === 'all' || item.type === currentFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                            item.category.toLowerCase().includes(searchQuery);
      return matchesType && matchesSearch;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <p>No matching partners found for <strong>"${escapeHtml(searchQuery)}"</strong>.</p>
        </div>
      `;
    } else {
      const fragment = document.createDocumentFragment();
      filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `partner-card ${item.type}`;
        
        const typeBadge = item.type === 'consultant' 
          ? '<span class="pt-badge consultant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Consultant / Authority</span>'
          : '<span class="pt-badge contractor"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>Main Contractor</span>';

        card.innerHTML = `
          <div class="partner-card-header">
            ${typeBadge}
            <span class="p-verified" title="Registered Partner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:10px;height:10px;"><polyline points="20 6 9 17 4 12"/></svg></span>
          </div>
          <h4 class="partner-name">${escapeHtml(item.name)}</h4>
          <span class="partner-category">${escapeHtml(item.category)}</span>
        `;
        fragment.appendChild(card);
      });
      grid.appendChild(fragment);
    }

    if (countNotice) {
      countNotice.textContent = `Showing ${filtered.length} of ${PARTNER_DATA.length} recognized engineering partners`;
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      render();
    });
  }

  render();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initPartnerDirectory };
}
