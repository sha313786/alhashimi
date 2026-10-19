/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Approved Partners & Consultants Directory (Executive Registry)
 */

function initPartnerDirectory() {
  const grid = document.getElementById('partnerGrid');
  const searchInput = document.getElementById('partnerSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const statsBadge = document.getElementById('partnerStatsBadge');
  const toggleBtn = document.getElementById('partnerDirectoryToggle');
  const toggleWrap = document.getElementById('directoryToggleWrap');
  const toggleText = document.getElementById('partnerToggleText');
  const toggleIcon = document.getElementById('partnerToggleIcon');

  if (!grid || typeof PARTNER_DATA === 'undefined') return;

  const DEFAULT_COLLAPSED_COUNT = 12;
  let isExpanded = false;
  let currentFilter = 'all';
  let searchQuery = '';

  function getTypeDetails(type) {
    switch (type) {
      case 'authority':
        return {
          label: 'Statutory Authority',
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`
        };
      case 'developer':
        return {
          label: 'Master Developer',
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>`
        };
      case 'contractor':
        return {
          label: 'Main Contractor',
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
        };
      case 'consultant':
      default:
        return {
          label: 'Consulting Engineers',
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`
        };
    }
  }

  function resolveMonogram(item) {
    if (typeof getPartnerMonogram === 'function') {
      return getPartnerMonogram(item.name, item.short);
    }
    return item.short || item.name.slice(0, 3).toUpperCase();
  }

  function render() {
    // Filter logic
    const filtered = PARTNER_DATA.filter(item => {
      let matchesType = true;
      if (currentFilter === 'authority') {
        matchesType = (item.type === 'authority' || item.type === 'developer');
      } else if (currentFilter !== 'all') {
        matchesType = (item.type === currentFilter);
      }

      const query = searchQuery.toLowerCase();
      const matchesSearch = !query ||
                            item.name.toLowerCase().includes(query) ||
                            (item.category && item.category.toLowerCase().includes(query)) ||
                            (item.scope && item.scope.toLowerCase().includes(query)) ||
                            (item.short && item.short.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });

    // Determine slice
    const shouldSlice = !isExpanded && currentFilter === 'all' && !searchQuery;
    const displayList = shouldSlice ? filtered.slice(0, DEFAULT_COLLAPSED_COUNT) : filtered;

    grid.innerHTML = '';

    if (displayList.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:36px;height:36px;color:var(--gold-primary);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h4>No Recognized Entities Found</h4>
          <p>No pre-qualified partners match <strong>"${escapeHtml(searchQuery)}"</strong>.</p>
          <button type="button" class="btn btn-secondary btn-sm reset-filter-btn" style="margin-top:14px;">Reset Search & Filters</button>
        </div>
      `;
      const resetBtn = grid.querySelector('.reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          searchQuery = '';
          currentFilter = 'all';
          filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
          render();
        });
      }
    } else {
      const fragment = document.createDocumentFragment();
      displayList.forEach(item => {
        const card = document.createElement('div');
        const isFeatured = !!item.featured;
        card.className = `partner-card ${item.type}${isFeatured ? ' featured-tier1' : ''}`;
        
        const typeInfo = getTypeDetails(item.type);
        const monogram = resolveMonogram(item);
        const premierBadge = isFeatured 
          ? `<span class="f-premier-badge" title="Tier-1 Sovereign / Landmark Partner"><svg viewBox="0 0 24 24" fill="currentColor" style="width:10px;height:10px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Premier</span>` 
          : '';

        card.innerHTML = `
          <div class="partner-card-header">
            <div class="partner-monogram ${item.type}">${escapeHtml(monogram)}</div>
            <div class="partner-meta-top">
              ${premierBadge}
              <span class="pt-badge ${item.type}">
                ${typeInfo.icon}
                <span>${escapeHtml(typeInfo.label)}</span>
              </span>
              <span class="p-verified" title="Verified Pre-Qualification">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:10px;height:10px;"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Approved</span>
              </span>
            </div>
          </div>
          <div class="partner-card-body">
            <h4 class="partner-name">${escapeHtml(item.name)}</h4>
            <p class="partner-scope-text">${escapeHtml(item.scope || item.category)}</p>
            <div class="partner-card-footer">
              <span class="partner-category-tag">${escapeHtml(item.category)}</span>
              <span class="partner-loc-tag">Dubai, UAE</span>
            </div>
          </div>
        `;
        fragment.appendChild(card);
      });
      grid.appendChild(fragment);
    }

    // Toggle button visibility & text
    if (toggleWrap) {
      if (searchQuery || currentFilter !== 'all' || filtered.length <= DEFAULT_COLLAPSED_COUNT) {
        toggleWrap.style.display = 'none';
      } else {
        toggleWrap.style.display = 'flex';
        if (toggleText) {
          toggleText.textContent = isExpanded 
            ? `Collapse Registry (${DEFAULT_COLLAPSED_COUNT} Featured)` 
            : `View Complete Registry (${PARTNER_DATA.length} Entities)`;
        }
        if (toggleIcon) {
          toggleIcon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    }

    // Stats badge update
    if (statsBadge) {
      if (searchQuery) {
        statsBadge.innerHTML = `Found <strong>${filtered.length}</strong> matching entities for "<em>${escapeHtml(searchQuery)}</em>"`;
      } else if (currentFilter !== 'all') {
        const categoryName = currentFilter === 'authority' ? 'Authorities & Developers' :
                             currentFilter === 'consultant' ? 'Engineering Consultancies' : 'Main Contractors';
        statsBadge.innerHTML = `Showing all <strong>${filtered.length}</strong> recognized ${categoryName}`;
      } else if (shouldSlice) {
        statsBadge.innerHTML = `Showing <strong>${displayList.length}</strong> of <strong>${PARTNER_DATA.length}</strong> recognized entities (Pre-Qualified)`;
      } else {
        statsBadge.innerHTML = `Showing all <strong>${PARTNER_DATA.length}</strong> recognized engineering partners`;
      }
    }
  }

  // Filter Button Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      // Automatically expand on specific category filter
      if (currentFilter !== 'all') {
        isExpanded = true;
      }
      render();
    });
  });

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (searchQuery) {
        isExpanded = true;
      }
      render();
    });
  }

  // Toggle Button Listener
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      render();
      if (!isExpanded) {
        const directoryBlock = document.querySelector('.partner-directory-block');
        if (directoryBlock) {
          directoryBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  render();
}

// Module export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initPartnerDirectory };
}
