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

  // 0. Initialize Cloud Live Sync (Firebase Firestore)
  let db = null;
  const fbConfig = window.FIREBASE_CONFIG;
  const isCloudEnabled = typeof firebase !== 'undefined' && fbConfig && fbConfig.projectId && fbConfig.projectId.trim() !== '';

  if (isCloudEnabled) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(fbConfig);
      }
      db = firebase.firestore();
      console.log('Al Hashimi: Firebase Cloud Live Sync active.');
    } catch (err) {
      console.warn('Al Hashimi: Firebase init notice:', err);
    }
  }

  // 1. Load and merge any Custom Projects from LocalStorage (Instant Cache)
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

  // 1b. Auto-Migrate Local Projects to Cloud & Listen for Global Live Updates
  async function setupCloudSync() {
    if (!db) return;

    // A. Listen for live updates from all devices worldwide
    try {
      db.collection('portfolio_projects').onSnapshot((snapshot) => {
        let changed = false;
        snapshot.docChanges().forEach((change) => {
          const docData = change.doc.data();
          const docId = change.doc.id || docData.id;

          if (change.type === 'added' || change.type === 'modified') {
            if (typeof PROJECT_CASE_STUDIES !== 'undefined') {
              PROJECT_CASE_STUDIES[docId] = docData;
              changed = true;
            }
          }
          if (change.type === 'removed') {
            if (typeof PROJECT_CASE_STUDIES !== 'undefined') {
              delete PROJECT_CASE_STUDIES[docId];
              changed = true;
            }
            if (grid) {
              const card = grid.querySelector(`[data-proj-id="${docId}"]`);
              if (card) card.remove();
            }
          }
        });

        if (changed) {
          syncGridCards();
          renderManageList();
        }
      }, (err) => {
        console.warn('Firestore live listener notice:', err);
      });
    } catch (err) {
      console.warn('Error attaching Firestore listener:', err);
    }

    // B. Auto-migrate: If this client has projects in localStorage not yet in Cloud, upload them automatically!
    try {
      const stored = localStorage.getItem('alhashimi_custom_projects');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          for (const p of list) {
            if (p && p.id) {
              const ref = db.collection('portfolio_projects').doc(p.id);
              const snap = await ref.get();
              if (!snap.exists) {
                await ref.set(p);
                console.log('Auto-migrated local project to Cloud:', p.title);
              }
            }
          }
        }
      }
    } catch (migErr) {
      console.warn('Cloud migration notice:', migErr);
    }
  }

  setupCloudSync();

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

  // 3. Render any custom cards in the DOM (Newly added projects appear FIRST)
  function syncGridCards() {
    if (!grid || typeof PROJECT_CASE_STUDIES === 'undefined') return;

    // Collect custom projects and sort newest first
    const customKeys = Object.keys(PROJECT_CASE_STUDIES)
      .filter(id => PROJECT_CASE_STUDIES[id] && PROJECT_CASE_STUDIES[id].isCustom)
      .sort((a, b) => {
        const timeA = new Date(PROJECT_CASE_STUDIES[a].createdAt || 0).getTime();
        const timeB = new Date(PROJECT_CASE_STUDIES[b].createdAt || 0).getTime();
        return timeB - timeA; // Newest first
      });

    // Prepend custom cards to the top of the grid in reverse order so the newest is at the very top
    [...customKeys].reverse().forEach(id => {
      const data = PROJECT_CASE_STUDIES[id];
      let card = grid.querySelector(`[data-proj-id="${id}"]`);
      if (!card) {
        const temp = document.createElement('div');
        temp.innerHTML = buildCardHTML(id, data).trim();
        card = temp.firstElementChild;
      }
      // Keep card at the top of the grid (newest project first)
      grid.prepend(card);
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
  const tabLeadsBtn = document.getElementById('adminTabLeadsBtn');
  const panelAdd = document.getElementById('adminPanelAdd');
  const panelManage = document.getElementById('adminPanelManage');
  const panelLeads = document.getElementById('adminPanelLeads');
  const adminLeadsCount = document.getElementById('adminLeadsCount');
  const adminLeadsList = document.getElementById('adminLeadsList');
  const clearLeadsBtn = document.getElementById('clearLeadsBtn');

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

  // Cloud Sync Status Indicator
  function updateCloudSyncStatus() {
    const dot = document.getElementById('cloudSyncDot');
    const text = document.getElementById('cloudSyncText');
    const subtext = document.getElementById('cloudSyncSubtext');

    if (!dot || !text) return;

    if (db) {
      dot.style.background = '#22c55e';
      dot.style.boxShadow = '0 0 10px #22c55e';
      text.textContent = 'Cloud Live Sync: Active (Connected to Firebase)';
      text.style.color = '#86efac';
      if (subtext) subtext.textContent = 'Synced across all devices worldwide';
    } else {
      dot.style.background = '#eab308';
      dot.style.boxShadow = '0 0 10px #eab308';
      text.textContent = 'Cloud Sync: Awaiting Firebase Config';
      text.style.color = '#fde047';
      if (subtext) subtext.textContent = 'Saving locally (Paste config to activate global sync)';
    }
  }

  // Open Admin Modal
  function openAdmin() {
    if (!adminModal) return;
    const isAuthed = sessionStorage.getItem('alhashimi_admin_auth') === 'true';

    try {
      updateCloudSyncStatus();
    } catch(e) {}

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

    try {
      if (!adminModal.open) {
        if (typeof adminModal.showModal === 'function') {
          adminModal.showModal();
        } else {
          adminModal.setAttribute('open', '');
          adminModal.style.display = 'block';
        }
      }
    } catch (err) {
      adminModal.setAttribute('open', '');
      adminModal.style.display = 'block';
    }
  }

  function closeAdmin() {
    if (!adminModal) return;
    try {
      if (typeof adminModal.close === 'function') {
        adminModal.close();
      } else {
        adminModal.removeAttribute('open');
        adminModal.style.display = 'none';
      }
    } catch(e) {
      adminModal.removeAttribute('open');
      adminModal.style.display = 'none';
    }
    // Clean up hash from URL so clicking it again works!
    if (window.location.hash === '#admin' || window.location.hash === '#manage' || window.location.hash === '#projects-admin' || window.location.hash === '#leads') {
      try {
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      } catch(e) {}
    }
  }

  if (openAdminBtn) openAdminBtn.addEventListener('click', openAdmin);
  if (footerAdminLink) footerAdminLink.addEventListener('click', openAdmin);

  // Private Non-Public Admin Triggers:
  // 1. URL Hash & Query Parameter triggers
  function checkAdminTriggers() {
    const urlParams = new URLSearchParams(window.location.search);
    const hasAdminParam = urlParams.get('admin') === 'true' || urlParams.get('admin') === '1';
    const hasAdminHash = window.location.hash === '#admin' || window.location.hash === '#manage' || window.location.hash === '#projects-admin' || window.location.hash === '#leads';

    if (hasAdminParam || hasAdminHash) {
      openAdmin();
    }
  }
  checkAdminTriggers();
  window.addEventListener('hashchange', checkAdminTriggers);
  window.addEventListener('load', checkAdminTriggers);

  // Intercept any click on links with #admin or #manage
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href*="#admin"], a[href*="#manage"], [data-admin-trigger]');
    if (anchor) {
      e.preventDefault();
      openAdmin();
    }
  });

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
  window.openAdmin = openAdmin;

  if (closeAdminBtn) closeAdminBtn.addEventListener('click', closeAdmin);
  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      const rect = adminModal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        closeAdmin();
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
      updateCloudSyncStatus();
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
      updateCloudSyncStatus();
      switchAdminTab('add');
      renderManageList();
      showToast('Quick demo admin access granted.');
    });
  }

  // Switch Admin Tabs
  function switchAdminTab(tabName) {
    if (tabAddBtn) tabAddBtn.classList.remove('active');
    if (tabManageBtn) tabManageBtn.classList.remove('active');
    if (tabLeadsBtn) tabLeadsBtn.classList.remove('active');

    if (panelAdd) panelAdd.style.display = 'none';
    if (panelManage) panelManage.style.display = 'none';
    if (panelLeads) panelLeads.style.display = 'none';

    if (tabName === 'add') {
      if (tabAddBtn) tabAddBtn.classList.add('active');
      if (panelAdd) panelAdd.style.display = 'block';
    } else if (tabName === 'manage') {
      if (tabManageBtn) tabManageBtn.classList.add('active');
      if (panelManage) panelManage.style.display = 'block';
      renderManageList();
      updateExportCode();
    } else if (tabName === 'leads') {
      if (tabLeadsBtn) tabLeadsBtn.classList.add('active');
      if (panelLeads) panelLeads.style.display = 'block';
      renderLeadsList();
    }
  }

  if (tabAddBtn) tabAddBtn.addEventListener('click', () => switchAdminTab('add'));
  if (tabManageBtn) tabManageBtn.addEventListener('click', () => switchAdminTab('manage'));
  if (tabLeadsBtn) tabLeadsBtn.addEventListener('click', () => switchAdminTab('leads'));

  // Smart Canvas Image Resizer & Compressor (keeps uploads fast and under cloud limits)
  function compressImage(file, maxWidth = 1200, quality = 0.8) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let w = img.width;
          let h = img.height;
          if (w > maxWidth) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }

  // Local Image File to Base64 Reader
  if (imageFileInput) {
    imageFileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file (PNG, JPG, WebP).');
          return;
        }
        if (imagePreview) imagePreview.innerHTML = '<span style="color:#d4af37;">Optimizing photo...</span>';
        const dataUrl = await compressImage(file);
        if (imageHidden) imageHidden.value = dataUrl;
        if (imagePreview) {
          imagePreview.innerHTML = `<img src="${dataUrl}" alt="Preview">`;
        }
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

      // 2b. Persist to Cloud Database (Firebase Firestore)
      if (db) {
        db.collection('portfolio_projects').doc(newId).set(newProj)
          .then(() => {
            console.log('Project synced to Cloud Firestore globally:', newProj.title);
          })
          .catch((cloudErr) => {
            console.warn('Cloud sync error:', cloudErr);
            showToast('Saved locally. Cloud sync warning: ' + cloudErr.message);
          });
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
      if (db) {
        showToast(`Project "${finalTitle}" published & synced to Cloud globally!`);
      } else {
        showToast(`Project "${finalTitle}" published to portfolio!`);
      }
    });
  }

  // Render Projects in Manage Tab (Newest custom projects first)
  function renderManageList() {
    if (!adminProjList || typeof PROJECT_CASE_STUDIES === 'undefined') return;

    const keys = Object.keys(PROJECT_CASE_STUDIES).sort((a, b) => {
      const projA = PROJECT_CASE_STUDIES[a];
      const projB = PROJECT_CASE_STUDIES[b];
      // Custom projects first
      if (projA.isCustom && !projB.isCustom) return -1;
      if (!projA.isCustom && projB.isCustom) return 1;
      // Among custom projects, newest first
      const timeA = new Date(projA.createdAt || 0).getTime();
      const timeB = new Date(projB.createdAt || 0).getTime();
      return timeB - timeA;
    });

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

    // Remove from Cloud Database (Firebase Firestore)
    if (db) {
      db.collection('portfolio_projects').doc(id).delete()
        .then(() => {
          console.log('Project removed from Cloud Firestore:', id);
        })
        .catch((delErr) => console.warn('Cloud delete notice:', delErr));
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

      // Clear from Cloud Database (Firebase Firestore)
      if (db) {
        db.collection('portfolio_projects').get().then(snapshot => {
          snapshot.forEach(doc => doc.ref.delete());
        }).catch(err => console.warn('Cloud reset notice:', err));
      }

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

  // ==========================================================================
  // 7. Cloud Leads & Inquiry Management Subsystem
  // ==========================================================================
  let cachedLeads = [];

  function initLeadsListener() {
    // 1. Initial load from local cache for instant UI response
    try {
      cachedLeads = JSON.parse(localStorage.getItem('alhashimi_leads') || '[]');
      if (adminLeadsCount) adminLeadsCount.textContent = cachedLeads.length;
    } catch(e) {}

    // 2. Real-time Cloud Firestore Listener for tender inquiries
    if (db) {
      try {
        db.collection('tender_inquiries').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
          const list = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            list.push({ ...data, id: doc.id });
          });
          cachedLeads = list;
          try {
            localStorage.setItem('alhashimi_leads', JSON.stringify(list));
          } catch(e) {}
          if (adminLeadsCount) adminLeadsCount.textContent = list.length;
          if (panelLeads && panelLeads.style.display === 'block') {
            renderLeadsList();
          }
        }, (err) => console.warn('Leads listener notice:', err));
      } catch (err) {
        console.warn('Could not attach leads listener:', err);
      }
    }
  }

  initLeadsListener();

  function renderLeadsList() {
    if (!adminLeadsList) return;

    if (!cachedLeads || cachedLeads.length === 0) {
      adminLeadsList.innerHTML = `
        <div class="admin-leads-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
          </svg>
          <h4 style="color:#ffffff; margin-bottom:6px; font-size:1rem;">No Inquiries Received Yet</h4>
          <p style="margin:0; font-size:0.82rem;">Any tender quote requests or direct callback inquiries submitted by visitors on the website will appear here in real-time!</p>
        </div>
      `;
      return;
    }

    let html = '';
    cachedLeads.forEach(lead => {
      const isTender = lead.type && lead.type.includes('Tender');
      const typeClass = isTender ? 'tender' : 'callback';
      const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
      const waLink = cleanPhone ? `https://wa.me/${cleanPhone.replace('+', '')}` : '#';
      const formattedDate = lead.createdAt ? new Date(lead.createdAt).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }) : 'Recent';

      const esc = (txt) => {
        if (!txt) return '';
        if (typeof escapeHtml === 'function') return escapeHtml(txt);
        return String(txt).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      };

      html += `
        <div class="admin-lead-card" data-lead-id="${lead.id}">
          <div class="admin-lead-header">
            <span class="admin-lead-type ${typeClass}">${esc(lead.type || 'Tender Lead')}</span>
            <span class="admin-lead-time">🕒 ${formattedDate}</span>
          </div>
          <div class="admin-lead-body">
            <div class="admin-lead-field">
              <strong>Client / Contact:</strong>
              <span>${esc(lead.fullName || 'Anonymous')}</span>
            </div>
            <div class="admin-lead-field">
              <strong>Organization / Entity:</strong>
              <span>${esc(lead.company || 'Not specified')}</span>
            </div>
            <div class="admin-lead-field">
              <strong>Mobile / WhatsApp:</strong>
              <span style="color:#4ade80;">${esc(lead.phone || 'N/A')}</span>
            </div>
            <div class="admin-lead-field">
              <strong>Official Email:</strong>
              <span>${esc(lead.email || 'N/A')}</span>
            </div>
            <div class="admin-lead-field">
              <strong>Classification & Load:</strong>
              <span>${esc(lead.projectType || 'General')} &bull; ${esc(lead.connectedLoad || '')}</span>
            </div>
            <div class="admin-lead-field">
              <strong>Required Scope:</strong>
              <span>${esc(lead.scopes || 'Full MEP')}</span>
            </div>
          </div>
          ${lead.details ? `<div class="admin-lead-details"><strong>Project Notes:</strong> ${esc(lead.details)}</div>` : ''}
          <div class="admin-lead-actions">
            ${cleanPhone ? `<a href="tel:${cleanPhone}" class="btn-lead-action btn-lead-call">📞 Call Client</a>` : ''}
            ${cleanPhone ? `<a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-lead-action btn-lead-wa">💬 WhatsApp</a>` : ''}
            ${lead.email && lead.email.includes('@') ? `<a href="mailto:${lead.email}" class="btn-lead-action btn-lead-email">✉️ Send Email</a>` : ''}
            <button type="button" class="btn-lead-action btn-lead-del" data-del-lead="${lead.id}">Delete</button>
          </div>
        </div>
      `;
    });

    adminLeadsList.innerHTML = html;

    // Attach delete listeners
    adminLeadsList.querySelectorAll('.btn-lead-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const leadId = btn.getAttribute('data-del-lead');
        deleteLead(leadId);
      });
    });
  }

  function deleteLead(id) {
    if (!confirm('Remove this inquiry from your inbox?')) return;

    cachedLeads = cachedLeads.filter(l => l.id !== id);
    try {
      localStorage.setItem('alhashimi_leads', JSON.stringify(cachedLeads));
    } catch(e) {}

    if (db) {
      db.collection('tender_inquiries').doc(id).delete()
        .then(() => console.log('Lead removed from Cloud Firestore:', id))
        .catch(err => console.warn(err));
    }

    if (adminLeadsCount) adminLeadsCount.textContent = cachedLeads.length;
    renderLeadsList();
    showToast('Inquiry removed from inbox.');
  }

  // Clear all leads button
  if (clearLeadsBtn) {
    clearLeadsBtn.addEventListener('click', () => {
      if (!confirm('Clear all received leads from your inbox?')) return;
      if (db) {
        db.collection('tender_inquiries').get().then(snap => {
          snap.forEach(d => d.ref.delete());
        }).catch(e => console.warn(e));
      }
      cachedLeads = [];
      localStorage.removeItem('alhashimi_leads');
      if (adminLeadsCount) adminLeadsCount.textContent = '0';
      renderLeadsList();
      showToast('All inquiries cleared.');
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initProjectPortfolio };
}
