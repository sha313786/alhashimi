/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Interactive Dubai Electrical Load & DEWA Connection Estimator
 * Computes TCL, MD, Breaker Rating, and Substation Room Threshold
 */

function initLoadCalculator() {
  const propType = document.getElementById('calcPropType');
  const areaInput = document.getElementById('calcArea');
  const unitSelect = document.getElementById('calcUnit');
  const coolingSelect = document.getElementById('calcCooling');
  const diversitySelect = document.getElementById('calcDiversity');

  const resTcl = document.getElementById('resTcl');
  const resKva = document.getElementById('resKva');
  const resMd = document.getElementById('resMd');
  const resBreaker = document.getElementById('resBreaker');
  const resSubstation = document.getElementById('resSubstation');
  const resSubstationDesc = document.getElementById('resSubstationDesc');
  const resTimeline = document.getElementById('resTimeline');
  const transferBtn = document.getElementById('transferCalcBtn');

  if (!propType || !areaInput || !resTcl) return;

  function calculate() {
    const rawArea = parseFloat(areaInput.value) || 0;
    const unit = unitSelect.value;
    // Convert to sq.m
    const areaSqM = unit === 'sqft' ? rawArea * 0.092903 : rawArea;

    // Base VA per sq.m
    const selectedOption = propType.options[propType.selectedIndex];
    const baseVA = parseFloat(selectedOption.getAttribute('data-va')) || 180;

    // Cooling factor
    let coolingMultiplier = 1.0;
    if (coolingSelect.value === 'district') {
      coolingMultiplier = 0.55; // District cooling saves ~45% electrical load
    } else if (coolingSelect.value === 'chiller') {
      coolingMultiplier = 1.15; // Chiller starting current / condenser pumps
    }

    // Total VA
    let totalVA = areaSqM * baseVA * coolingMultiplier;
    let totalKVA = totalVA / 1000;
    let totalKW = totalKVA * 0.90; // Standard 0.90 power factor

    // Applied diversity
    const diversity = parseFloat(diversitySelect.value) || 0.80;
    const maximumDemandKVA = totalKVA * diversity;

    // Incomer breaker sizing (Amperes): I = (kVA * 1000) / (sqrt(3) * 400)
    const fullLoadAmps = (maximumDemandKVA * 1000) / (1.732 * 415);
    const standardBreakers = [63, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000];
    let recommendedBreaker = standardBreakers.find(b => b >= fullLoadAmps) || 4000;

    // DEWA Substation threshold: Typically > 400 kVA requires dedicated 11kV Substation Room
    let substationText = "Direct LV Feeder";
    let substationDesc = "Standard DEWA distribution pillar feeder (No Substation required)";
    if (maximumDemandKVA > 1500) {
      substationText = "2x Dedicated 11kV Substations";
      substationDesc = "Requires 2x 1500kVA Transformers & 11kV Switchgear Room";
    } else if (maximumDemandKVA > 380) {
      substationText = "Dedicated 11kV Substation Room";
      substationDesc = "Requires DEWA 11kV/415V Transformer room on ground/basement";
    }

    // Output formatting
    resTcl.textContent = `${totalKW.toLocaleString('en-US', { maximumFractionDigits: 1 })} kW`;
    resKva.textContent = `${totalKVA.toLocaleString('en-US', { maximumFractionDigits: 1 })} kVA (at 0.90 PF)`;
    resMd.textContent = `${maximumDemandKVA.toLocaleString('en-US', { maximumFractionDigits: 1 })} kVA`;
    resBreaker.textContent = `${recommendedBreaker}A (${recommendedBreaker >= 800 ? '4-Pole ACB' : '4-Pole MCCB'})`;
    resSubstation.textContent = substationText;
    resSubstationDesc.textContent = substationDesc;

    if (maximumDemandKVA > 380) {
      resTimeline.innerHTML = `<strong>10 - 14 Business Days</strong> for Substation civil layout & equipment approval under Al Hashimi’s Golden Category priority channel.`;
    } else {
      resTimeline.innerHTML = `<strong>5 - 7 Business Days</strong> for final inspection & meter installation under our Golden Category priority channel (vs. 25+ days standard).`;
    }
  }

  // Bind calculation events
  [propType, areaInput, unitSelect, coolingSelect, diversitySelect].forEach(el => {
    el.addEventListener('input', calculate);
    el.addEventListener('change', calculate);
  });

  calculate();

  // Transfer calculation to RFQ form
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const loadInput = document.getElementById('connectedLoadInput');
      const projectType = document.getElementById('projectType');
      const projectDetails = document.getElementById('projectDetails');

      if (loadInput) {
        loadInput.value = `${resTcl.textContent} (${resKva.textContent.split(' ')[0]} kVA)`;
      }

      if (projectType) {
        if (propType.value === 'villa') projectType.value = 'luxury-villa';
        else if (propType.value === 'commercial') projectType.value = 'commercial-highrise';
        else if (propType.value === 'warehouse') projectType.value = 'industrial-warehouse';
        else if (propType.value === 'mosque') projectType.value = 'mosque-public';
        else if (propType.value === 'hotel') projectType.value = 'hotel-hospital';
      }

      if (projectDetails) {
        projectDetails.value = `Estimated Load from Al Hashimi Calculator: ${resTcl.textContent} / ${resMd.textContent} Max Demand. Breaker: ${resBreaker.textContent}. Area: ${areaInput.value} ${unitSelect.value}. Cooling: ${coolingSelect.value}.`;
      }

      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLoadCalculator };
}
