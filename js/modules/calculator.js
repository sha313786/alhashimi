/**
 * Al Hashimi Electrical Installation Works LLC
 * Module: Interactive Dubai Electrical Load & DEWA Connection Estimator
 * Computes TCL, MD, Breaker Rating, Substation Threshold & Updates Live SLD
 */

function initLoadCalculator() {
  const propType = document.getElementById('calcPropType');
  const areaInput = document.getElementById('calcArea');
  const areaSlider = document.getElementById('calcAreaSlider');
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

  // SLD Nodes
  const sldIncomerNode = document.getElementById('sldIncomerNode');
  const sldSubstationNode = document.getElementById('sldSubstationNode');
  const sldMdbNode = document.getElementById('sldMdbNode');

  if (!propType || !areaInput || !resTcl) return;

  // Preset Configurations
  const presets = {
    villa: { prop: 'villa', area: 5000, unit: 'sqft', cooling: 'dx', div: '0.70' },
    commercial: { prop: 'commercial', area: 25000, unit: 'sqft', cooling: 'district', div: '0.80' },
    warehouse: { prop: 'warehouse', area: 50000, unit: 'sqft', cooling: 'dx', div: '0.90' },
    mosque: { prop: 'mosque', area: 15000, unit: 'sqft', cooling: 'dx', div: '0.80' },
    hotel: { prop: 'hotel', area: 100000, unit: 'sqft', cooling: 'chiller', div: '0.80' }
  };

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const presetKey = btn.getAttribute('data-preset');
      const p = presets[presetKey];
      if (p) {
        propType.value = p.prop;
        areaInput.value = p.area;
        if (areaSlider) areaSlider.value = p.area;
        unitSelect.value = p.unit;
        coolingSelect.value = p.cooling;
        diversitySelect.value = p.div;
        calculate();
      }
    });
  });

  // Sync slider and input
  if (areaSlider && areaInput) {
    areaSlider.addEventListener('input', () => {
      areaInput.value = areaSlider.value;
      calculate();
    });

    areaInput.addEventListener('input', () => {
      if (areaSlider) areaSlider.value = areaInput.value;
      calculate();
    });
  }

  function calculate() {
    const rawArea = parseFloat(areaInput.value) || 0;
    const unit = unitSelect.value;
    // Convert to sq.m
    const areaSqM = unit === 'sqft' ? rawArea * 0.092903 : rawArea;

    // Base VA per sq.m
    const selectedOption = propType.options[propType.selectedIndex];
    const baseVA = parseFloat(selectedOption ? selectedOption.getAttribute('data-va') : 200) || 200;

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

    // Incomer breaker sizing (Amperes): I = (kVA * 1000) / (sqrt(3) * 415)
    const fullLoadAmps = (maximumDemandKVA * 1000) / (1.732 * 415);
    const standardBreakers = [63, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000];
    let recommendedBreaker = standardBreakers.find(b => b >= fullLoadAmps) || 4000;
    const breakerType = recommendedBreaker >= 800 ? '4-Pole ACB' : '4-Pole MCCB';

    // DEWA Substation threshold
    let substationText = "Direct LV Feeder";
    let substationDesc = "Standard DEWA distribution pillar feeder (No Substation room required)";
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
    resBreaker.textContent = `${recommendedBreaker}A (${breakerType})`;
    resSubstation.textContent = substationText;
    resSubstationDesc.textContent = substationDesc;

    if (maximumDemandKVA > 380) {
      resTimeline.innerHTML = `<strong>10 - 14 Business Days</strong> for Substation civil layout & equipment approval under Al Hashimi’s Golden Category priority channel (vs. 45+ days standard).`;
    } else {
      resTimeline.innerHTML = `<strong>5 - 7 Business Days</strong> for final inspection & meter installation under our Golden Category priority channel (vs. 25+ days standard).`;
    }

    // Update Live SLD Diagram Nodes
    if (sldIncomerNode) {
      sldIncomerNode.querySelector('.node-sub').textContent = maximumDemandKVA > 380 ? '11kV Grid Incomer' : 'LV 415V Pillar';
    }
    if (sldSubstationNode) {
      if (maximumDemandKVA > 380) {
        sldSubstationNode.classList.add('active');
        sldSubstationNode.querySelector('.node-name').textContent = maximumDemandKVA > 1500 ? '2x 1500kVA TR' : '11kV/415V TR';
        sldSubstationNode.querySelector('.node-sub').textContent = 'Substation Active';
      } else {
        sldSubstationNode.classList.remove('active');
        sldSubstationNode.querySelector('.node-name').textContent = 'LV Direct Tap';
        sldSubstationNode.querySelector('.node-sub').textContent = 'No Substation';
      }
    }
    if (sldMdbNode) {
      sldMdbNode.querySelector('.node-sub').textContent = `${recommendedBreaker}A ${breakerType}`;
    }
  }

  // Bind calculation events
  [propType, areaInput, unitSelect, coolingSelect, diversitySelect].forEach(el => {
    if (el) {
      el.addEventListener('input', calculate);
      el.addEventListener('change', calculate);
    }
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
        const valMap = {
          'villa': 'luxury-villa',
          'commercial': 'commercial-highrise',
          'warehouse': 'industrial-warehouse',
          'mosque': 'mosque-public',
          'hotel': 'hotel-hospital'
        };
        if (valMap[propType.value]) {
          projectType.value = valMap[propType.value];
        }
      }

      if (projectDetails) {
        const currentVal = projectDetails.value;
        const calcSummary = `Estimated Load: ${resTcl.textContent} TCL, ${resMd.textContent} MD, Incomer: ${resBreaker.textContent}, DEWA Status: ${resSubstation.textContent}. Area: ${areaInput.value} ${unitSelect.value}.`;
        if (!currentVal.includes('Estimated Load:')) {
          projectDetails.value = currentVal ? `${currentVal}\n\n[DEWA Calc Parameters]\n${calcSummary}` : `[DEWA Calc Parameters]\n${calcSummary}`;
        }
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        if (loadInput) {
          loadInput.focus();
          loadInput.style.borderColor = 'var(--gold-primary)';
          loadInput.style.boxShadow = '0 0 15px rgba(223, 155, 36, 0.4)';
          setTimeout(() => {
            loadInput.style.borderColor = '';
            loadInput.style.boxShadow = '';
          }, 2500);
        }
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLoadCalculator };
}
