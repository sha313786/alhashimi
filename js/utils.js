/**
 * Al Hashimi Electrical Installation Works LLC
 * Utility Functions Module
 */

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { escapeHtml };
}
