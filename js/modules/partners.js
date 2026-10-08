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
          ? '<span class="pt-badge consultant">&#128220; Consultant / Authority</span>'
          : '<span class="pt-badge contractor">&#128736; Main Contractor</span>';

        card.innerHTML = `
          <div class="partner-card-header">
            ${typeBadge}
            <span class="p-verified" title="Registered Partner">&#10004;</span>
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
