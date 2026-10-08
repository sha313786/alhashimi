/**
 * Al Hashimi Electrical Installation Works LLC
 * Data Module: Featured Projects & Case Studies
 * 
 * To add a new project in the future:
 * 1. Add a new key (e.g. 7, 8, etc.) to PROJECT_CASE_STUDIES
 * 2. Fill in title, category, client, consultant, location, powerLoad, scope, status, image, and description
 */

const PROJECT_CASE_STUDIES = {
  1: {
    title: "Palatial Luxury Villa Compound – Emirates Hills & Al Barsha",
    category: "Luxury Residential Compound",
    client: "Prominent Private VIP Client",
    consultant: "Premier Architectural & Engineering Consultancy",
    location: "Emirates Hills / Al Barsha, Dubai",
    powerLoad: "1,200 kVA (3-Phase 415V)",
    scope: "Complete Turnkey MEP (High/Low Voltage, Automated Facade Lighting, ELV, Pressurized Water Boosters, Sanitary)",
    status: "Completed & DEWA Energized",
    image: "project-luxury-villa.jpg",
    description: "Execution of complete electro-mechanical and public health installations for a prestigious multi-structure luxury private villa estate. Included custom Main Distribution Boards (MDBs), underground feeder reticulation, architectural landscape illumination, automated swimming pool pump filtration, and high-spec sanitary automation. Energized flawlessly on the first DEWA site inspection."
  },
  2: {
    title: "Multi-Unit Commercial & Residential Complex – Deira / Port Saeed",
    category: "Commercial & Residential High-Rise",
    client: "Leading Property Development Group",
    consultant: "Bel-Yoahah Engineering Consultants",
    location: "Deira / Port Saeed, Dubai",
    powerLoad: "3,500 kW / 4,200 kVA",
    scope: "2x 1500 kVA Substation Integration, Busbar Risers, SMDBs, Final DBs, Automatic Capacitor Banks, Stormwater Sump Drainage",
    status: "Completed & Energized",
    image: "project-residential-complex.jpg",
    description: "Turnkey electrical infrastructure for a prominent multi-storey commercial and residential complex in the commercial hub of Deira. The scope incorporated dual 11kV substation coordination, copper sandwich busbar risers servicing all floors, individual tenant sub-metering, and automatic power factor correction banks maintaining PFC above 0.96 per DEWA specifications."
  },
  3: {
    title: "Heavy Logistics & Distribution Complex – Al Quoz & Dubai Industrial City",
    category: "Industrial Logistics Facility",
    client: "Major Logistics & Cold Chain Operator",
    consultant: "Gulf Engineering Consultants",
    location: "Al Quoz & Dubai Industrial City",
    powerLoad: "2,000 kVA Dedicated Substation",
    scope: "11kV Substation Room, Heavy Plant Feeder Cables, Cable Ladders, Fire Alarm & High-Bay Industrial Lighting",
    status: "Completed & Energized",
    image: null,
    description: "Turnkey industrial power distribution encompassing dedicated transformer room civil/electrical execution, cable ladder tray networks, high-bay LED illumination, standby diesel generator synchronization, and compliance with Dubai Civil Defence and Dubai Municipality industrial standards."
  },
  4: {
    title: "Grand Friday Mosque & Community Hall – Dubai Jurisdiction",
    category: "Religious & Community Public Architecture",
    client: "Dubai Islamic Affairs & Charitable Activities Department (IACAD)",
    consultant: "Al Thurath Engineering Consultants",
    location: "Dubai, United Arab Emirates",
    powerLoad: "850 kW Connected Load",
    scope: "Acoustic Zone Public Address (PA), Minaret Floodlighting, Solar Thermodynamic Water Heating, Hygienic Ablution Plumbing",
    status: "Completed & Dedicated",
    image: null,
    description: "Specialized electrical, acoustic sound reinforcement, and hydraulic plumbing installation for a prominent Friday community mosque. Featured architectural minaret lighting, automated prayer timer call systems, and solar-assisted water heating adhering to Dubai Green Building Regulations (Al Sa'fat)."
  },
  5: {
    title: "Contemporary Twin Luxury Residences – Nad Al Sheba",
    category: "Private Luxury Villas",
    client: "Private UAE National Family",
    consultant: "Adnan Saffarini Engineering Consultants",
    location: "Nad Al Sheba, Dubai",
    powerLoad: "600 kVA Connected Load",
    scope: "Smart Home Automation Panels, Variable Speed Booster Pumps, Central Battery Emergency Lighting, SIRA CCTV",
    status: "Completed & Energized",
    image: null,
    description: "Dual luxury villas constructed with state-of-the-art smart lighting control, SIRA-compliant security surveillance, concealed sound attenuation drainage piping, and automated irrigation pump systems. Handed over with full DEWA meter release."
  },
  6: {
    title: "G+4 Mixed-Use Commercial Center – Hor Al Anz",
    category: "Commercial & Retail Development",
    client: "Commercial Real Estate Directorate",
    consultant: "Civic Engineering Consultants",
    location: "Hor Al Anz / Deira, Dubai",
    powerLoad: "1,800 kW Connected Load",
    scope: "Complete MV/LV Electrical Distribution, Retail Tenant Metering, Centralized Fire Safety, Drainage & Grease Interceptors",
    status: "Completed & Energized",
    image: null,
    description: "Commercial and office facility near Al Hashimi's operations base in Deira. Delivered comprehensive electrical containment, tenant distribution switchgear, parking ventilation controls, and reliable municipal utility energization."
  }
};

// Export for module systems (Node / Bundlers) while attaching to window for browsers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECT_CASE_STUDIES };
}
