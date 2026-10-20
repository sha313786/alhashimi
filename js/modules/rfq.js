/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Tender RFQ Form, WhatsApp Bridge, File Upload & Email Dispatch
 */

function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const fullName = (formData.get('fullName') || '').toString().trim();
    const company = (formData.get('companyName') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const projectType = (formData.get('projectType') || '').toString().trim();
    const load = (formData.get('connectedLoad') || '').toString().trim() || 'Not specified';
    const details = (formData.get('projectDetails') || '').toString().trim();

    // Collect scopes
    const scopes = Array.from(form.querySelectorAll('input[name="scope"]:checked'))
                        .map(cb => cb.value)
                        .join(', ');

    const loader = submitBtn.querySelector('.btn-loader');
    const labelSpan = submitBtn.querySelector('span:not(.btn-loader)');
    submitBtn.disabled = true;
    if (labelSpan) labelSpan.textContent = 'Encrypting & Dispatching Tender Scope...';
    if (loader) loader.removeAttribute('hidden');

    const leadData = {
      id: 'lead_' + Date.now(),
      type: 'Tender Scope & Quotation',
      fullName: fullName || 'Prospective Partner',
      company: company || 'Not specified',
      email: email || 'Not specified',
      phone: phone || 'Not specified',
      projectType: projectType || 'Commercial / High-Rise',
      connectedLoad: load,
      scopes: scopes || 'Full Turnkey MEP',
      details: details || 'Tender scope submitted via website quotation portal',
      createdAt: new Date().toISOString()
    };

    // 1. Store lead in Google Cloud Firestore (Admin Leads Inbox)
    if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
      try {
        await firebase.firestore().collection('tender_inquiries').doc(leadData.id).set(leadData);
        console.log('Tender lead stored in Cloud Firestore:', leadData.id);
      } catch (e) {
        console.warn('Cloud lead save warning:', e);
      }
    }

    // 2. Local fallback storage
    try {
      const storedLeads = JSON.parse(localStorage.getItem('alhashimi_leads') || '[]');
      storedLeads.unshift(leadData);
      localStorage.setItem('alhashimi_leads', JSON.stringify(storedLeads));
    } catch (e) {}

    // 3. Web3Forms Email Dispatch to info@alhashimillc.com / alhashimi1988@gmail.com
    const web3FormsKey = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.web3FormsAccessKey) ||
                         localStorage.getItem('alhashimi_web3forms_key') ||
                         '';
    let emailDispatched = false;

    if (web3FormsKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `[TENDER INQUIRY] ${company || 'New Project'} - ${fullName || 'Client'}`,
            from_name: 'Al Hashimi Website Tender Portal',
            replyto: email && email.includes('@') ? email : 'info@alhashimillc.com',
            name: fullName || 'Prospective Partner',
            company: company || 'Not specified',
            email: email || 'Not specified',
            phone: phone || 'Not specified',
            project_classification: projectType,
            connected_load: load,
            scope_of_works: scopes || 'Full Turnkey MEP',
            project_details: details || 'No additional remarks provided.',
            submitted_at: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }) + ' (Dubai GST)'
          })
        });
        const resData = await response.json();
        if (resData.success) {
          emailDispatched = true;
          console.log('Web3Forms email dispatched successfully.');
        } else {
          console.warn('Web3Forms returned:', resData);
        }
      } catch (err) {
        console.warn('Web3Forms fetch error:', err);
      }
    }

    submitBtn.disabled = false;
    if (labelSpan) labelSpan.textContent = 'Submit Tender Inquiry';
    if (loader) loader.setAttribute('hidden', '');

    const waMsg = encodeURIComponent(
      `Hello Mr. Binoji,\n\nTender inquiry from ${fullName} (${company}):\n` +
      `• Phone: ${phone}\n` +
      `• Email: ${email}\n` +
      `• Project: ${projectType}\n` +
      `• Load: ${load}\n` +
      `• Scope: ${scopes}\n` +
      `• Details: ${details}`
    );

    const waLink = `https://wa.me/971528974123?text=${waMsg}`;

    const emailNotice = emailDispatched
      ? `A confirmation email has been dispatched to <strong>info@alhashimillc.com</strong> &amp; routed directly to Managing Director <strong>Mr. Binoji K. Varghese</strong>.`
      : `Your tender inquiry has been routed directly to Managing Director <strong>Mr. Binoji K. Varghese</strong> (info@alhashimillc.com) and logged in our Cloud Leads Inbox.`;

    feedback.className = 'form-feedback success';
    feedback.removeAttribute('hidden');
    feedback.innerHTML = `
      <div class="feedback-inner">
        <div class="fb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:16px;height:16px;"><polyline points="20 6 9 17 4 12"/></svg></div>
        <div>
          <strong>Tender Inquiry Successfully Transmitted!</strong><br>
          Thank you, ${escapeHtml(fullName || 'Partner')}. ${emailNotice}
          <div class="feedback-actions">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-submit">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:6px;"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
              <span>Forward Directly to Binoji on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    `;

    form.reset();
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

function initFileUploadPreview() {
  const dropZone = document.getElementById('fileDropZone');
  const fileInput = document.getElementById('tenderFileInput');
  const preview = document.getElementById('fileListPreview');

  if (!dropZone || !fileInput || !preview) return;

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  ['dragleave', 'dragend'].forEach(evt => {
    dropZone.addEventListener(evt, () => dropZone.classList.remove('drag-over'));
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      handleFiles(fileInput.files);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFiles(fileInput.files);
    }
  });

  function handleFiles(files) {
    preview.innerHTML = '';
    preview.removeAttribute('hidden');
    Array.from(files).forEach((file) => {
      const item = document.createElement('div');
      item.className = 'file-preview-item';
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      item.innerHTML = `
        <span class="f-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
        <span class="f-name">${escapeHtml(file.name)} (${sizeMb} MB)</span>
        <span class="f-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:3px;"><polyline points="20 6 9 17 4 12"/></svg>Attached</span>
      `;
      preview.appendChild(item);
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initContactForm, initFileUploadPreview };
}
