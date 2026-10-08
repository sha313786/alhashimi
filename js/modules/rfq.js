/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Tender RFQ Form, WhatsApp Bridge & File Upload Simulation
 */

function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const company = formData.get('companyName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const projectType = formData.get('projectType');
    const load = formData.get('connectedLoad') || 'Not specified';
    const details = formData.get('projectDetails') || '';

    // Collect scopes
    const scopes = Array.from(form.querySelectorAll('input[name="scope"]:checked'))
                        .map(cb => cb.value)
                        .join(', ');

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Encrypting & Dispatching Tender Scope...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Submit Tender Inquiry';

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

      feedback.className = 'form-feedback success';
      feedback.removeAttribute('hidden');
      feedback.innerHTML = `
        <div class="feedback-inner">
          <div class="fb-icon">&#10004;</div>
          <div>
            <strong>Tender Inquiry Successfully Transmitted!</strong><br>
            Thank you, ${escapeHtml(fullName)}. Your tender documentation for <em>${escapeHtml(company)}</em> has been routed directly to Managing Director <strong>Mr. Binoji K. Varghese</strong> (info@alhashimidxb.com).
            <div class="feedback-actions">
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-submit">
                <span>&#128172; Forward Directly to Binoji on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      `;

      form.reset();
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
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
        <span class="f-icon">&#128196;</span>
        <span class="f-name">${escapeHtml(file.name)} (${sizeMb} MB)</span>
        <span class="f-check">&#10004; Attached</span>
      `;
      preview.appendChild(item);
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initContactForm, initFileUploadPreview };
}
