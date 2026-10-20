/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Landmark Projects Portfolio, Case Studies Modal & Admin Project Management
 */

function initProjectPortfolio() {
  const grid = document.getElementById('projectGalleryGrid');
  const modal = document.getElementById('caseStudyModal');
  const csTitle = document.getElementById('csTitle');
  const csBody = document.getElementById('csBody');
  const closeBtn = document.getElementById('closeCaseStudyBtn');
  const allCountEl = document.getElementById('allProjectsCount');

  // 1. Load and merge any Custom Projects from LocalStorage
  function loadCustomProjects() {
    try {
      const stored = localStorage.getItem('alhashimi_custom_projects');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list)) {
          list.forEach(proj => {
            if (proj && proj.id && typeof PROJECT_CASE_STUDIES !== 'undefined') {
              PROJECT_CASE_STUDIES[proj.id] = proj;
            }
          });
        }
      }
    } catch (e) {
      console.warn('Could not load custom projects from localStorage', e);
    }
  }

  loadCustomProjects();

  // 2. Helper: Generate Card HTML for a project
  function buildCardHTML(id, data) {
    const categoryKey = data.categoryKey || 'commercial';
    let imgHtml = '';

    if (data.image) {
      imgHtml = `<img src="${data.image}" alt="${data.title}" class="proj-img" loading="lazy">`;
    } else {
      let iconSvg = '';
      let bgClass = 'commercial-bg';
      let blueprintLabel = 'DEWA Commercial Blueprint';

      if (categoryKey === 'villa') {
        bgClass = 'villa-bg';
        blueprintLabel = 'VIP Residence CAD Schematic';
        iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>';
      } else if (categoryKey === 'industrial') {
        bgClass = 'industrial-bg';
        blueprintLabel = 'DEWA Industrial Blueprint';
        iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><circle cx="6" cy="14" r="1.5"/><circle cx="18" cy="14" r="1.5"/></svg>';
      } else if (categoryKey === 'public') {
        bgClass = 'mosque-bg';
        blueprintLabel = 'Awqaf Public Health CAD';
        iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c-3 3-5 5.5-5 8.5a5 5 0 0 0 10 0C17 8.5 15 6 12 3z"/><path d="M4 14h16v7H4z"/><path d="M9 21v-4a3 3 0 0 1 6 0v4"/><line x1="2" y1="21" x2="22" y2="21"/></svg>';
      } else {
        bgClass = 'commercial-bg';
        blueprintLabel = 'Mixed-Use Substation Blueprint';
        iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M10 22v-4h4v4"/></svg>';
      }

      imgHtml = `
        <div class="project-img-placeholder ${bgClass}">
          <div class="ph-icon">${iconSvg}</div>
          <span class="ph-blueprint-badge">${blueprintLabel}</span>
        </div>
      `;
    }

    const customBadge = data.isCustom ? `<span class="custom-proj-badge">Admin Added</span>` : '';
    const shortScope = data.scope ? (data.scope.length > 36 ? data.scope.slice(0, 33) + '...' : data.scope) : 'Full Turnkey MEP';
    const shortClient = data.client ? (data.client.length > 25 ? data.client.slice(0, 22) + '...' : data.client) : 'Private VIP';
    const summaryText = data.summary || (data.description ? (data.description.length > 125 ? data.description.slice(0, 122) + '...' : data.description) : '');

    return `
      <div class="project-photo-card" data-category="${categoryKey}" data-proj-id="${id}">
        <div class="project-img-wrapper">
          ${imgHtml}
          ${customBadge}
          <span class="project-tag">${data.category || 'Featured Execution'}</span>
          <div class="project-load-pill">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> 
            ${data.powerLoad || 'DEWA Energized'}
          </div>
        </div>
        <div class="project-card-info">
          <div class="project-meta">
            <span class="p-loc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${data.location || 'Dubai, UAE'}
            </span>
            <span class="p-status energized">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              ${data.status || 'DEWA Energized'}
            </span>
          </div>
          <h4>${data.title}</h4>
          <p>${summaryText}</p>
          <div class="project-specs-bar">
            <span><strong>Scope:</strong> ${shortScope}</span>
            <span><strong>Client:</strong> ${shortClient}</span>
          </div>
          <button class="btn-link-details open-case-study-btn" data-proj="${id}">View Full Engineering Case Study &rarr;</button>
        </div>
      </div>
    `;
  }

  // 3. Render any custom cards not yet in the DOM
  function syncGridCards() {
    if (!grid || typeof PROJECT_CASE_STUDIES === 'undefined') return;

    Object.keys(PROJECT_CASE_STUDIES).forEach(id => {
      const data = PROJECT_CASE_STUDIES[id];
      const existing = grid.querySelector(`[data-proj-id="${id}"]`);
      if (!existing && data.isCustom) {
        const temp = document.createElement('div');
        temp.innerHTML = buildCardHTML(id, data).trim();
        const newCard = temp.firstElementChild;
        grid.appendChild(newCard);
      }
    });

    // Update count in header
    if (allCountEl) {
      allCountEl.textContent = Object.keys(PROJECT_CASE_STUDIES).length;
    }

    rebindCaseStudyButtons();
    applyCurrentFilter();
  }

  // 4. Filtering Logic
  let activeFilter = 'all';
  const filterBtns = document.querySelectorAll('.port-filter-btn');

  function applyCurrentFilter() {
    const cards = document.querySelectorAll('.project-photo-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (activeFilter === 'all' || cat === activeFilter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-port') || 'all';
      applyCurrentFilter();
    });
  });

  // 5. Open Case Study Modal
  function rebindCaseStudyButtons() {
    document.querySelectorAll('.open-case-study-btn').forEach(btn => {
      if (btn._hasBound) return;
      btn._hasBound = true;

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
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        modal.close();
      }
    });
  }

  // Initialize standard grid cards
  syncGridCards();

  // Proactively remove any legacy admin buttons if present in cached DOM
  const staleFooterLink = document.getElementById('footerAdminLink');
  if (staleFooterLink) {
    const parentLi = staleFooterLink.closest('li');
    if (parentLi) parentLi.remove();
    else staleFooterLink.remove();
  }
  const staleAdminBtn = document.getElementById('openAdminProjectBtn');
  if (staleAdminBtn) staleAdminBtn.remove();

  // ==========================================================================
  // 6. Admin Project Management System
  // ==========================================================================
  const adminModal = document.getElementById('adminProjectModal');
  const openAdminBtn = document.getElementById('openAdminProjectBtn');
  const footerAdminLink = document.getElementById('footerAdminLink');
  const closeAdminBtn = document.getElementById('closeAdminModalBtn');

  const adminAuthView = document.getElementById('adminAuthView');
  const adminDashboardView = document.getElementById('adminDashboardView');
  const adminPinInput = document.getElementById('adminPinInput');
  const adminUnlockBtn = document.getElementById('adminUnlockBtn');
  const adminDemoUnlockBtn = document.getElementById('adminDemoUnlockBtn');
  const adminPinError = document.getElementById('adminPinError');

  const tabAddBtn = document.getElementById('adminTabAddBtn');
  const tabManageBtn = document.getElementById('adminTabManageBtn');
  const panelAdd = document.getElementById('adminPanelAdd');
  const panelManage = document.getElementById('adminPanelManage');

  const addForm = document.getElementById('addProjectForm');
  const imageFileInput = document.getElementById('projImageFile');
  const imagePreview = document.getElementById('projImgPreview');
  const imageHidden = document.getElementById('projImageData');
  const clearFormBtn = document.getElementById('clearProjectFormBtn');

  const adminProjList = document.getElementById('adminProjList');
  const adminActiveCount = document.getElementById('adminActiveCount');
  const adminExportCode = document.getElementById('adminExportCode');
  const copyExportCodeBtn = document.getElementById('copyExportCodeBtn');
  const downloadProjectsJsBtn = document.getElementById('downloadProjectsJsBtn');
  const resetCustomProjectsBtn = document.getElementById('resetCustomProjectsBtn');

  // Floating Toast Notification
  function showToast(message) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.className = 'admin-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg class="admin-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Open Admin Modal
  function openAdmin() {
    if (!adminModal) return;
    const isAuthed = sessionStorage.getItem('alhashimi_admin_auth') === 'true';

    if (isAuthed) {
      if (adminAuthView) adminAuthView.style.display = 'none';
      if (adminDashboardView) adminDashboardView.style.display = 'block';
      switchAdminTab('add');
      renderManageList();
    } else {
      if (adminAuthView) adminAuthView.style.display = 'block';
      if (adminDashboardView) adminDashboardView.style.display = 'none';
      if (adminPinInput) {
        adminPinInput.value = '';
        setTimeout(() => adminPinInput.focus(), 150);
      }
      if (adminPinError) adminPinError.style.display = 'none';
    }

    adminModal.showModal();
  }

  if (openAdminBtn) openAdminBtn.addEventListener('click', openAdmin);
  if (footerAdminLink) footerAdminLink.addEventListener('click', openAdmin);

  // Private Non-Public Admin Triggers:
  // 1. URL Hash trigger: visiting #admin or #manage-projects
  function checkAdminHash() {
    if (window.location.hash === '#admin' || window.location.hash === '#manage' || window.location.hash === '#projects-admin') {
      openAdmin();
    }
  }
  checkAdminHash();
  window.addEventListener('hashchange', checkAdminHash);

  // 2. Secret Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdmin();
    }
  });

  // 3. Secret Triple-Click on footer copyright text
  const copyrightText = document.querySelector('.footer-bottom p');
  if (copyrightText) {
    let clickTally = 0;
    let clickTimer = null;
    copyrightText.addEventListener('click', () => {
      clickTally++;
      clearTimeout(clickTimer);
      if (clickTally >= 3) {
        clickTally = 0;
        openAdmin();
      } else {
        clickTimer = setTimeout(() => { clickTally = 0; }, 800);
      }
    });
  }

  // 4. Global window helper for console
  window.openProjectAdmin = openAdmin;

  if (closeAdminBtn && adminModal) {
    closeAdminBtn.addEventListener('click', () => adminModal.close());
    adminModal.addEventListener('click', (e) => {
      const rect = adminModal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        adminModal.close();
      }
    });
  }

  // PIN Unlock Verification
  function verifyPin() {
    const pin = adminPinInput ? adminPinInput.value.trim() : '';
    if (pin === '1988') {
      sessionStorage.setItem('alhashimi_admin_auth', 'true');
      if (adminAuthView) adminAuthView.style.display = 'none';
      if (adminDashboardView) adminDashboardView.style.display = 'block';
      if (adminPinError) adminPinError.style.display = 'none';
      switchAdminTab('add');
      renderManageList();
      showToast('Admin center unlocked successfully.');
    } else {
      if (adminPinError) adminPinError.style.display = 'block';
      if (adminPinInput) adminPinInput.select();
    }
  }

  if (adminUnlockBtn) adminUnlockBtn.addEventListener('click', verifyPin);
  if (adminPinInput) {
    adminPinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        verifyPin();
      }
    });
  }

  if (adminDemoUnlockBtn) {
    adminDemoUnlockBtn.addEventListener('click', () => {
      sessionStorage.setItem('alhashimi_admin_auth', 'true');
      if (adminAuthView) adminAuthView.style.display = 'none';
      if (adminDashboardView) adminDashboardView.style.display = 'block';
      switchAdminTab('add');
      renderManageList();
      showToast('Quick demo admin access granted.');
    });
  }

  // Switch Admin Tabs
  function switchAdminTab(tabName) {
    if (tabName === 'add') {
      if (tabAddBtn) tabAddBtn.classList.add('active');
      if (tabManageBtn) tabManageBtn.classList.remove('active');
      if (panelAdd) panelAdd.style.display = 'block';
      if (panelManage) panelManage.style.display = 'none';
    } else {
      if (tabAddBtn) tabAddBtn.classList.remove('active');
      if (tabManageBtn) tabManageBtn.classList.add('active');
      if (panelAdd) panelAdd.style.display = 'none';
      if (panelManage) panelManage.style.display = 'block';
      renderManageList();
      updateExportCode();
    }
  }

  if (tabAddBtn) tabAddBtn.addEventListener('click', () => switchAdminTab('add'));
  if (tabManageBtn) tabManageBtn.addEventListener('click', () => switchAdminTab('manage'));

  // Local Image File to Base64 Reader
  if (imageFileInput) {
    imageFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file (PNG, JPG, WebP).');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          if (imageHidden) imageHidden.value = dataUrl;
          if (imagePreview) {
            imagePreview.innerHTML = `<img src="${dataUrl}" alt="Preview">`;
          }
        };
        reader.readAsDataURL(file);
      } else {
        if (imageHidden) imageHidden.value = '';
        if (imagePreview) imagePreview.innerHTML = '<span>No Photo (Auto Blueprint)</span>';
      }
    });
  }

  // Clear Form
  if (clearFormBtn && addForm) {
    clearFormBtn.addEventListener('click', () => {
      addForm.reset();
      if (imageHidden) imageHidden.value = '';
      if (imagePreview) imagePreview.innerHTML = '<span>No Photo (Auto Blueprint)</span>';
    });
  }

  // Category Names Map
  const CATEGORY_NAMES = {
    villa: 'Luxury Villas & Private Compounds',
    commercial: 'Commercial, Retail & High-Rise',
    industrial: 'Industrial Facilities & Logistics',
    public: 'Mosques & Public Architecture'
  };

  // Submit & Publish New Project
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('projTitle').value.trim();
      const categoryKey = document.getElementById('projCategory').value || 'commercial';
      const location = document.getElementById('projLocation').value.trim();
      const powerLoad = document.getElementById('projPower').value.trim();
      const scope = document.getElementById('projScope').value.trim();
      const client = document.getElementById('projClient').value.trim();
      const consultant = document.getElementById('projConsultant').value.trim();
      const status = document.getElementById('projStatus').value || 'Completed & DEWA Energized';
      const image = imageHidden ? imageHidden.value : null;
      const summary = document.getElementById('projSummary').value.trim();
      const description = document.getElementById('projDescription').value.trim();

      // All fields are fully optional with smart engineering defaults
      const finalTitle = title || 'Dubai Landmark Engineering Project';
      const finalLocation = location || 'Dubai, United Arab Emirates';
      const finalPower = powerLoad || 'High & Low Voltage Substation';
      const finalScope = scope || 'Turnkey Electrical, Switchgear & MEP Installation';
      const finalClient = client || 'Private Client / Developer';
      const finalConsultant = consultant || 'Authority Registered Engineering Consultant';
      const finalStatus = status || 'Completed & DEWA Energized';
      const finalDesc = description || (summary ? summary : `Turnkey electromechanical engineering, switchgear distribution, and statutory authority clearances executed to premier UAE technical standards by Al Hashimi Electrical Installation Works LLC.`);
      const finalSummary = summary || (finalDesc.length > 120 ? finalDesc.slice(0, 117) + '...' : finalDesc);

      const newId = 'custom_' + Date.now();
      const newProj = {
        id: newId,
        title: finalTitle,
        category: CATEGORY_NAMES[categoryKey] || 'Commercial, Retail & High-Rise',
        categoryKey: categoryKey,
        client: finalClient,
        consultant: finalConsultant,
        location: finalLocation,
        powerLoad: finalPower,
        scope: finalScope,
        status: finalStatus,
        image: image || null,
        summary: finalSummary,
        description: finalDesc,
        isCustom: true,
        createdAt: new Date().toISOString()
      };

      // 1. Add to in-memory data
      if (typeof PROJECT_CASE_STUDIES !== 'undefined') {
        PROJECT_CASE_STUDIES[newId] = newProj;
      }

      // 2. Persist to localStorage
      try {
        let customList = JSON.parse(localStorage.getItem('alhashimi_custom_projects') || '[]');
        customList.push(newProj);
        localStorage.setItem('alhashimi_custom_projects', JSON.stringify(customList));
      } catch (err) {
        console.warn('Could not persist to localStorage:', err);
      }

      // 3. Render into DOM Grid
      if (grid) {
        const temp = document.createElement('div');
        temp.innerHTML = buildCardHTML(newId, newProj).trim();
        const newCard = temp.firstElementChild;
        grid.prepend(newCard); // place newest at top of grid

        // Rebind handlers
        rebindCaseStudyButtons();
        applyCurrentFilter();

        // Highlight animation
        newCard.classList.add('admin-card-pulse');
        setTimeout(() => newCard.classList.remove('admin-card-pulse'), 3000);

        // Smooth scroll to card
        setTimeout(() => {
          newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 350);
      }

      // Update counters
      if (allCountEl && typeof PROJECT_CASE_STUDIES !== 'undefined') {
        allCountEl.textContent = Object.keys(PROJECT_CASE_STUDIES).length;
      }

      // Reset form
      addForm.reset();
      if (imageHidden) imageHidden.value = '';
      if (imagePreview) imagePreview.innerHTML = '<span>No Photo (Auto Blueprint)</span>';

      // Close modal & toast
      if (adminModal) adminModal.close();
      showToast(`Project "${title}" published to portfolio!`);
    });
  }

  // Render Projects in Manage Tab
  function renderManageList() {
    if (!adminProjList || typeof PROJECT_CASE_STUDIES === 'undefined') return;

    const keys = Object.keys(PROJECT_CASE_STUDIES);
    if (adminActiveCount) adminActiveCount.textContent = keys.length;

    let html = '';
    keys.forEach(id => {
      const p = PROJECT_CASE_STUDIES[id];
      const isCustom = p.isCustom || false;
      const typeBadge = isCustom 
        ? '<span class="admin-proj-type-tag custom">Custom Admin</span>'
        : '<span class="admin-proj-type-tag builtin">Built-in Core</span>';

      const deleteBtn = isCustom 
        ? `<button type="button" class="btn-del-proj" data-del-id="${id}" title="Remove this custom project">Delete</button>`
        : '<span style="font-size:0.72rem; color:#64748b;">Protected</span>';

      html += `
        <div class="admin-proj-row" data-manage-id="${id}">
          <div class="admin-proj-info">
            <strong>${p.title}</strong>
            <span>${p.category} &bull; ${p.powerLoad} &bull; ${p.location}</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            ${typeBadge}
            ${deleteBtn}
          </div>
        </div>
      `;
    });

    adminProjList.innerHTML = html;

    // Attach delete listeners
    adminProjList.querySelectorAll('.btn-del-proj').forEach(btn => {
      btn.addEventListener('click', () => {
        const delId = btn.getAttribute('data-del-id');
        deleteCustomProject(delId);
      });
    });

    updateExportCode();
  }

  // Delete Custom Project
  function deleteCustomProject(id) {
    if (!confirm('Are you sure you want to remove this custom project from the portfolio?')) return;

    // Remove from in-memory
    if (typeof PROJECT_CASE_STUDIES !== 'undefined') {
      delete PROJECT_CASE_STUDIES[id];
    }

    // Remove from localStorage
    try {
      let customList = JSON.parse(localStorage.getItem('alhashimi_custom_projects') || '[]');
      customList = customList.filter(p => p.id !== id);
      localStorage.setItem('alhashimi_custom_projects', JSON.stringify(customList));
    } catch (e) {
      console.warn(e);
    }

    // Remove from DOM grid
    if (grid) {
      const card = grid.querySelector(`[data-proj-id="${id}"]`);
      if (card) card.remove();
    }

    // Update count
    if (allCountEl && typeof PROJECT_CASE_STUDIES !== 'undefined') {
      allCountEl.textContent = Object.keys(PROJECT_CASE_STUDIES).length;
    }

    renderManageList();
    showToast('Custom project removed from live grid.');
  }

  // Generate JavaScript Code for js/data/projects.js
  function updateExportCode() {
    if (!adminExportCode || typeof PROJECT_CASE_STUDIES === 'undefined') return;

    const out = {};
    Object.keys(PROJECT_CASE_STUDIES).forEach(k => {
      const src = PROJECT_CASE_STUDIES[k];
      out[k] = {
        title: src.title,
        category: src.category,
        categoryKey: src.categoryKey || 'commercial',
        client: src.client,
        consultant: src.consultant,
        location: src.location,
        powerLoad: src.powerLoad,
        scope: src.scope,
        status: src.status,
        image: src.image ? (src.image.startsWith('data:') ? '[Base64 Image Data]' : src.image) : null,
        description: src.description
      };
    });

    const code = `/**
 * Al Hashimi Electrical Installation Works LLC
 * Data Module: Featured Projects & Case Studies
 * Exported via Portfolio Administration Center
 */

const PROJECT_CASE_STUDIES = ${JSON.stringify(out, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECT_CASE_STUDIES };
}`;

    adminExportCode.value = code;
  }

  // Copy Code Button
  if (copyExportCodeBtn) {
    copyExportCodeBtn.addEventListener('click', () => {
      if (!adminExportCode) return;
      adminExportCode.select();
      navigator.clipboard.writeText(adminExportCode.value)
        .then(() => {
          const original = copyExportCodeBtn.innerHTML;
          copyExportCodeBtn.innerHTML = '<span>✔ Copied to Clipboard!</span>';
          setTimeout(() => copyExportCodeBtn.innerHTML = original, 2500);
        })
        .catch(() => {
          document.execCommand('copy');
          alert('Code copied to clipboard.');
        });
    });
  }

  // Download projects.js File
  if (downloadProjectsJsBtn) {
    downloadProjectsJsBtn.addEventListener('click', () => {
      if (!adminExportCode) return;
      const blob = new Blob([adminExportCode.value], { type: 'text/javascript;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'projects.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded updated projects.js file.');
    });
  }

  // Reset Custom Projects
  if (resetCustomProjectsBtn) {
    resetCustomProjectsBtn.addEventListener('click', () => {
      if (!confirm('Reset custom projects? This will remove all admin-added projects and revert to the default 6 landmark projects.')) return;
      localStorage.removeItem('alhashimi_custom_projects');

      // Remove custom cards from DOM
      if (grid) {
        grid.querySelectorAll('.custom-proj-badge').forEach(badge => {
          const card = badge.closest('.project-photo-card');
          if (card) {
            const id = card.getAttribute('data-proj-id');
            if (id && typeof PROJECT_CASE_STUDIES !== 'undefined') {
              delete PROJECT_CASE_STUDIES[id];
            }
            card.remove();
          }
        });
      }

      if (allCountEl && typeof PROJECT_CASE_STUDIES !== 'undefined') {
        allCountEl.textContent = Object.keys(PROJECT_CASE_STUDIES).length;
      }

      renderManageList();
      showToast('Portfolio reset to default 6 projects.');
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initProjectPortfolio };
}
