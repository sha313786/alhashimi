/**
 * Al Hashimi Electrical Installation Works LLC
 * Data Module: Approved Engineering Consultants, Government Authorities & Contractors
 * 
 * 81 Recognized Entities across Dubai & Northern Emirates (Est. 1988)
 */

const PARTNER_DATA = [
  // 1. Statutory Authorities & Master Developers
  { name: "Dubai Electricity and Water Authority (DEWA)", type: "authority", category: "Government Utility Authority", short: "DEWA", featured: true, scope: "Golden Category Sovereign Licensor & 1st Place Trophy" },
  { name: "Dubai Municipality", type: "authority", category: "Municipal & Permitting Authority", short: "DM", featured: true, scope: "Statutory Building Permitting & Engineering Clearances" },
  { name: "Emaar Property Management", type: "developer", category: "Master Property Developer", short: "EMAAR", featured: true, scope: "Pre-Approved Subcontractor for Communities & High-Rise" },

  // 2. Prestigious Engineering Consultancies (32 Entities)
  { name: "Khatib and Alami Consultant", type: "consultant", category: "Consolidated Engineering Consultant", short: "K&A", featured: true, scope: "Major Infrastructure, Substation & Commercial MEP" },
  { name: "Bel-Yoahah Engineering Consultants", type: "consultant", category: "Architectural & Engineering Consultant", short: "BY", featured: true, scope: "Historic UAE Landmark Architectural & MEP Engineering" },
  { name: "Adnan Saffarini Engineering Consultants", type: "consultant", category: "Architect & Engineering Consultant", short: "AS", featured: true, scope: "Landmark Residential Towers & High-Rise MEP" },
  { name: "Holford Associates Consultants", type: "consultant", category: "International Architectural Consultant", short: "HA", featured: true, scope: "Commercial, Retail & Luxury Residential MEP" },
  { name: "Gulf Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "GEC", scope: "Industrial Facilities & Commercial Buildings" },
  { name: "New Arch Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "NA", scope: "Engineering Design & Technical Supervision" },
  { name: "F.A. Backer Consultant", type: "consultant", category: "Engineering Consultant", short: "FAB", scope: "Civil, Structural & MEP Engineering" },
  { name: "Ramesh & Associates Architect Consultants", type: "consultant", category: "Architectural Consultant", short: "R&A", scope: "Architectural Planning & MEP Design" },
  { name: "Al Mujassam Architects Consultants", type: "consultant", category: "Architectural Consultant", short: "AMA", scope: "Architectural & Electromechanical Design" },
  { name: "Abdulla & Associate Architects Consultants", type: "consultant", category: "Architectural Consultant", short: "AAA", scope: "Commercial & Residential Developments" },
  { name: "Al Shurooq Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "ASE", scope: "Engineering & Technical Supervision" },
  { name: "Team 90 Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "T90", scope: "Comprehensive Engineering Services" },
  { name: "Anfal Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "AEC", scope: "Engineering Supervision & Approvals" },
  { name: "M.D. Bhatia & Bros. Consultants", type: "consultant", category: "Engineering Consultant", short: "MDB", scope: "Industrial & Commercial Projects" },
  { name: "Chelsia Hotel Management", type: "consultant", category: "Hospitality Consultant", short: "CHM", scope: "Hospitality & Leisure MEP Infrastructure" },
  { name: "Civic Engineering Consultants", type: "consultant", category: "Civil & MEP Consultant", short: "CEC", scope: "Civil Infrastructure & MEP Systems" },
  { name: "Paradise Engineering Consultant", type: "consultant", category: "Engineering Consultant", short: "PEC", scope: "Engineering Consultancy Services" },
  { name: "Al Majal Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "AME", scope: "Commercial & Residential Engineering" },
  { name: "Delta Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "DEC", scope: "Engineering & Infrastructure Design" },
  { name: "House of Experts Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "HOE", scope: "Specialized Engineering Advisory" },
  { name: "Al Jabbri Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "AJE", scope: "Engineering Consultancy Services" },
  { name: "Al Rimal Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "ARE", scope: "Engineering Design & Permitting" },
  { name: "Abdul Rahim Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "AREC", scope: "Architectural & MEP Solutions" },
  { name: "Al Waha Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "AWE", scope: "Engineering & Supervision" },
  { name: "Chawla Architects", type: "consultant", category: "Architectural Consultant", short: "CA", scope: "Architectural & MEP Coordination" },
  { name: "Al Thurath Engineering Consultants", type: "consultant", category: "Heritage & Engineering", short: "ATE", scope: "Heritage Conservation & Technical MEP" },
  { name: "Arab and Truck International Consultants", type: "consultant", category: "Specialized Consultant", short: "ATI", scope: "Industrial & Logistics Engineering" },
  { name: "Development Consulting", type: "consultant", category: "Project Development", short: "DC", scope: "Project Planning & Approvals" },
  { name: "Al Ghaith Engineering and Consultants", type: "consultant", category: "Engineering Consultant", short: "AGE", scope: "Engineering Design & Clearances" },
  { name: "Al Ajmi Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "AAE", scope: "Engineering Services" },
  { name: "Al Masheeq Engineering Consultants", type: "consultant", category: "Engineering Consultant", short: "MAS", scope: "Engineering Design & Supervision" },
  { name: "Free Line Consultants", type: "consultant", category: "Design Consultant", short: "FLC", scope: "Architectural & Technical Design" },

  // 3. Main General Contractors (46 Entities)
  { name: "Al Shafar Contracting Co. (ASGC)", type: "contractor", category: "Tier-1 Main General Contractor", short: "ASGC", featured: true, scope: "Turnkey High-Rise, Commercial & Infrastructure MEP" },
  { name: "Al Khayat Contracting L.L.C", type: "contractor", category: "Main General Contractor", short: "AKC", scope: "Commercial, Industrial & Substation Works" },
  { name: "Simplex Construction Co.", type: "contractor", category: "Building Contractor", short: "SMP", scope: "Building Construction & MEP Installations" },
  { name: "Bin Ghalietha Building Contracting", type: "contractor", category: "Civil & Building", short: "BGB", scope: "Residential & Commercial Developments" },
  { name: "Accenture Building Contracting LLC", type: "contractor", category: "Building Contractor", short: "ABC", scope: "Turnkey Building Contracting" },
  { name: "Al Aflaj Contracting L.L.C", type: "contractor", category: "Main Contractor", short: "AFC", scope: "Main Contracting & Electrical Works" },
  { name: "Al Ishrak Contracting", type: "contractor", category: "General Contracting", short: "AIC", scope: "General Construction & Building Services" },
  { name: "Al Thurath Al Arabi Contracting", type: "contractor", category: "Building Contractor", short: "ATA", scope: "Heritage & Modern Building Construction" },
  { name: "Al Abdooli Contracting L.L.C", type: "contractor", category: "Main Contractor", short: "AAC", scope: "Civil Contracting & MEP Subcontracting" },
  { name: "Dani Construction L.L.C", type: "contractor", category: "Commercial Contractor", short: "DNC", scope: "Commercial & Retail Facilities" },
  { name: "Al Milad Engineering Construction", type: "contractor", category: "Engineering Contracting", short: "MEC", scope: "Engineering Construction Services" },
  { name: "Al Hattab Contracting Co.", type: "contractor", category: "Main Contractor", short: "AHC", scope: "Building & Civil Construction" },
  { name: "Sumer Contracting L.L.C", type: "contractor", category: "Building Contractor", short: "SMC", scope: "General Building Construction" },
  { name: "Teeb Contracting L.L.C", type: "contractor", category: "General Contracting", short: "TBC", scope: "General Contracting Services" },
  { name: "Al Watan Construction", type: "contractor", category: "Civil Construction", short: "AWC", scope: "Civil Engineering & Infrastructure" },
  { name: "Inner Space Interior Design L.L.C", type: "contractor", category: "Fitout & Interior", short: "ISD", scope: "Corporate & Luxury Interior Fit-out" },
  { name: "Trident Technical Contracting L.L.C", type: "contractor", category: "Technical Contractor", short: "TTC", scope: "Specialized Technical Contracting" },
  { name: "Al Shaharco Contracting Co.", type: "contractor", category: "Contracting Company", short: "SHC", scope: "Building & General Contracting" },
  { name: "Al Matawi Contracting Co.", type: "contractor", category: "Building Contracting", short: "AMC", scope: "Civil & Structural Construction" },
  { name: "Al Jabbri Contracting Co.", type: "contractor", category: "General Contracting", short: "AJC", scope: "General Contracting Works" },
  { name: "Saleh Construction Co.", type: "contractor", category: "Main Contractor", short: "SCC", scope: "Turnkey Building Contracting" },
  { name: "Al Khushunidhi Contracting Co.", type: "contractor", category: "General Contracting", short: "AKN", scope: "General Building Works" },
  { name: "Emirates Sands Contracting", type: "contractor", category: "Building Contracting", short: "ESC", scope: "Civil Contracting & MEP Services" },
  { name: "Asiantec Building Contracting LLC", type: "contractor", category: "Main Contractor", short: "ATC", scope: "Commercial & Residential Contracting" },
  { name: "Axis General Maintenance Contracting LLC", type: "contractor", category: "Maintenance & Contracting", short: "AXS", scope: "Facilities Management & Electromechanical" },
  { name: "Promo Electromechanical LLC", type: "contractor", category: "MEP Partner", short: "PEM", scope: "Joint MEP Execution & Contracting" },
  { name: "Atlantas Technical Service LLC", type: "contractor", category: "Technical Services", short: "ATS", scope: "Technical Systems & Maintenance" },
  { name: "Prasad Gupta Building Contracting LLC", type: "contractor", category: "Building Contracting", short: "PGC", scope: "Building Construction Services" },
  { name: "Orama Contracting LLC", type: "contractor", category: "General Contracting", short: "ORM", scope: "General Building Projects" },
  { name: "Edif Contracting", type: "contractor", category: "Building Construction", short: "EDF", scope: "Building Construction & MEP" },
  { name: "Al Mas Design & Décor LLC", type: "contractor", category: "Interior & Fit-out", short: "AMD", scope: "Interior Architecture & Lighting Fit-out" },
  { name: "New System Engineering LLC", type: "contractor", category: "Engineering Systems", short: "NSE", scope: "Engineered Building Systems" },
  { name: "Dolf Technical Service LLC", type: "contractor", category: "Technical Services", short: "DTS", scope: "Technical Installation Services" },
  { name: "WMI Contracting LLC", type: "contractor", category: "General Contracting", short: "WMI", scope: "Building & Civil Construction" },
  { name: "KKTS Technical Service LLC", type: "contractor", category: "Technical Contracting", short: "KTS", scope: "Technical Services & Fit-out" },
  { name: "Bin Hazam Contracting", type: "contractor", category: "Building Contracting", short: "BHC", scope: "Commercial Building Contracting" },
  { name: "Jasaf Building Contracting LLC", type: "contractor", category: "Civil Construction", short: "JBC", scope: "Civil Construction & Electromechanical" },
  { name: "Green Bird Electromechanical LLC", type: "contractor", category: "Electromechanical", short: "GBE", scope: "Electromechanical Joint Contracting" },
  { name: "Ali Adnan General Maintenance LLC", type: "contractor", category: "General Maintenance", short: "AAM", scope: "Building Services & Maintenance" },
  { name: "Bin Madegah Contracting", type: "contractor", category: "General Contracting", short: "BMC", scope: "General Building Contracting" },
  { name: "Blue Ocean Electromechanical Contracting LLC", type: "contractor", category: "Electromechanical", short: "BOE", scope: "Electromechanical Contracting" },
  { name: "Mosaic Interior Design LLC", type: "contractor", category: "Design & Fitout", short: "MID", scope: "Interior Design & MEP Coordination" },
  { name: "City Falcon Technical Service LLC", type: "contractor", category: "Technical Services", short: "CFT", scope: "Technical Installations & Commissioning" },
  { name: "B.K.B. Engineering Services LLC", type: "contractor", category: "Engineering Services", short: "BKB", scope: "Engineering Services & Maintenance" },
  { name: "Royal Edge Contracting LLC", type: "contractor", category: "Building Contractor", short: "REC", scope: "Building Construction & Fit-out" },
  { name: "National Transport Contracting", type: "contractor", category: "Infrastructure & Transport", short: "NTC", scope: "Infrastructure & Utilities Support" }
];

// Helper to resolve clean monogram if not explicitly defined
function getPartnerMonogram(name, short) {
  if (short) return short;
  const cleaned = name.replace(/L\.L\.C|LLC|Co\.|&|and|\(|\)/gi, '').trim();
  const words = cleaned.split(/\s+/).filter(w => w.length > 1);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 3).toUpperCase();
}

// Attach helper
if (typeof window !== 'undefined') {
  window.getPartnerMonogram = getPartnerMonogram;
}

// Export for module systems (Node / Bundlers) while attaching to window for browsers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PARTNER_DATA, getPartnerMonogram };
}
