/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Live Dubai Clock (GST, UTC+4) & Business Hours Monitor
 */

function initLiveDubaiClock() {
  const clockText = document.getElementById('dubaiTimeText');
  const statusBadge = document.getElementById('officeStatusBadge');

  if (!clockText) return;

  function updateClock() {
    // Current UTC time + 4 hours for Dubai (GST)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const dubaiTime = new Date(utcTime + (3600000 * 4));

    const hours24 = dubaiTime.getHours();
    const minutes = dubaiTime.getMinutes().toString().padStart(2, '0');
    const seconds = dubaiTime.getSeconds().toString().padStart(2, '0');
    const day = dubaiTime.getDay(); // 0 is Sunday, 1 is Monday, ... 6 is Saturday

    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = (hours24 % 12) || 12;

    clockText.textContent = `Dubai (GST): ${hours12}:${minutes}:${seconds} ${ampm}`;

    // Office hours: Mon-Fri 8am-6pm, Sat 8am-1pm, Sun closed
    let isOpen = false;
    if (day >= 1 && day <= 5) {
      isOpen = (hours24 >= 8 && hours24 < 18);
    } else if (day === 6) {
      isOpen = (hours24 >= 8 && hours24 < 13);
    }

    if (statusBadge) {
      if (isOpen) {
        statusBadge.textContent = 'Office Open';
        statusBadge.className = 'office-status open';
      } else {
        statusBadge.textContent = 'Support 24/7 On-Call';
        statusBadge.className = 'office-status oncall';
      }
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLiveDubaiClock };
}
