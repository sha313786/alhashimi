/**
 * Al Hashimi Electrical Installation Works LLC
 * Data Module: Approved Engineering Consultants, Government Authorities & Contractors
 * 
 * To add a new consultant or contractor in the future:
 * Add an object to the array:
 * { name: "Company Name", type: "consultant" | "contractor", category: "Category Label" }
 */

const PARTNER_DATA = [
  // 35 Consultants & Authorities
  { name: "Dubai Electricity and Water Authority (DEWA)", type: "consultant", category: "Government Authority" },
  { name: "Dubai Municipality", type: "consultant", category: "Municipal Authority" },
  { name: "Emaar Property Management", type: "consultant", category: "Master Developer" },
  { name: "Khatib and Alami Consultant", type: "consultant", category: "Engineering Consultant" },
  { name: "Bel-Yoahah Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Adnan Saffarini Engineering Consultants", type: "consultant", category: "Architect & Consultant" },
  { name: "Holford Associates Consultants", type: "consultant", category: "International Consultant" },
  { name: "Gulf Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "New Arch Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "F.A. Backer Consultant", type: "consultant", category: "Engineering Consultant" },
  { name: "Ramesh & Associates Architect Consultants", type: "consultant", category: "Architectural Consultant" },
  { name: "Al Mujassam Architects Consultants", type: "consultant", category: "Architectural Consultant" },
  { name: "Abdulla & Associate Architects Consultants", type: "consultant", category: "Architectural Consultant" },
  { name: "Al Shurooq Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Team 90 Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Anfal Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "M.D. Bhatia & Bros. Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Chelsia Hotel Management", type: "consultant", category: "Hospitality Consultant" },
  { name: "Civic Engineering Consultants", type: "consultant", category: "Civil & MEP Consultant" },
  { name: "Paradise Engineering Consultant", type: "consultant", category: "Engineering Consultant" },
  { name: "Al Majal Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Delta Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "House of Experts Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Al Jabbri Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Al Rimal Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Abdul Rahim Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Al Waha Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Chawla Architects", type: "consultant", category: "Architectural Consultant" },
  { name: "Al Thurath Engineering Consultants", type: "consultant", category: "Heritage & Engineering" },
  { name: "Arab and Truck International Consultants", type: "consultant", category: "Specialized Consultant" },
  { name: "Development Consulting", type: "consultant", category: "Project Development" },
  { name: "Al Ghaith Engineering and Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Al Ajmi Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Al Masheeq Engineering Consultants", type: "consultant", category: "Engineering Consultant" },
  { name: "Free Line Consultants", type: "consultant", category: "Design Consultant" },

  // 44 Main Contractors
  { name: "Al Khayat Contracting L.L.C", type: "contractor", category: "Main General Contractor" },
  { name: "Al Shafar Contracting Co.", type: "contractor", category: "Tier-1 Main Contractor" },
  { name: "Simplex Construction Co.", type: "contractor", category: "Building Contractor" },
  { name: "Bin Ghalietha Building Contracting", type: "contractor", category: "Civil & Building" },
  { name: "Accenture Building Contracting LLC", type: "contractor", category: "Building Contractor" },
  { name: "Al Aflaj Contracting L.L.C", type: "contractor", category: "Main Contractor" },
  { name: "Al Ishrak Contracting", type: "contractor", category: "General Contracting" },
  { name: "Al Thurath Al Arabi Contracting", type: "contractor", category: "Building Contractor" },
  { name: "Al Abdooli Contracting L.L.C", type: "contractor", category: "Main Contractor" },
  { name: "Dani Construction L.L.C", type: "contractor", category: "Commercial Contractor" },
  { name: "Al Milad Engineering Construction", type: "contractor", category: "Engineering Contracting" },
  { name: "Al Hattab Contracting Co.", type: "contractor", category: "Main Contractor" },
  { name: "Sumer Contracting L.L.C", type: "contractor", category: "Building Contractor" },
  { name: "Teeb Contracting L.L.C", type: "contractor", category: "General Contracting" },
  { name: "Al Watan Construction", type: "contractor", category: "Civil Construction" },
  { name: "Inner Space Interior Design L.L.C", type: "contractor", category: "Fitout & Interior" },
  { name: "Trident Technical Contracting L.L.C", type: "contractor", category: "Technical Contractor" },
  { name: "Al Shaharco Contracting Co.", type: "contractor", category: "Contracting Company" },
  { name: "Al Matawi Contracting Co.", type: "contractor", category: "Building Contracting" },
  { name: "Al Jabbri Contracting Co.", type: "contractor", category: "General Contracting" },
  { name: "Saleh Construction Co.", type: "contractor", category: "Main Contractor" },
  { name: "Al Khushunidhi Contracting Co.", type: "contractor", category: "General Contracting" },
  { name: "Emirates Sands Contracting", type: "contractor", category: "Building Contracting" },
  { name: "Asiantec Building Contracting LLC", type: "contractor", category: "Main Contractor" },
  { name: "Axis General Maintenance Contracting LLC", type: "contractor", category: "Maintenance & Contracting" },
  { name: "Promo Electromechanical LLC", type: "contractor", category: "MEP Partner" },
  { name: "Atlantas Technical Service LLC", type: "contractor", category: "Technical Services" },
  { name: "Prasad Gupta Building Contracting LLC", type: "contractor", category: "Building Contracting" },
  { name: "Orama Contracting LLC", type: "contractor", category: "General Contracting" },
  { name: "Edif Contracting", type: "contractor", category: "Building Construction" },
  { name: "Al Mas Design & Décor LLC", type: "contractor", category: "Interior & Fit-out" },
  { name: "New System Engineering LLC", type: "contractor", category: "Engineering Systems" },
  { name: "Dolf Technical Service LLC", type: "contractor", category: "Technical Services" },
  { name: "WMI Contracting LLC", type: "contractor", category: "General Contracting" },
  { name: "KKTS Technical Service LLC", type: "contractor", category: "Technical Contracting" },
  { name: "Bin Hazam Contracting", type: "contractor", category: "Building Contracting" },
  { name: "Jasaf Building Contracting LLC", type: "contractor", category: "Civil Construction" },
  { name: "Green Bird Electromechanical LLC", type: "contractor", category: "Electromechanical" },
  { name: "Ali Adnan General Maintenance LLC", type: "contractor", category: "General Maintenance" },
  { name: "Bin Madegah Contracting", type: "contractor", category: "General Contracting" },
  { name: "Blue Ocean Electromechanical Contracting LLC", type: "contractor", category: "Electromechanical" },
  { name: "Mosaic Interior Design LLC", type: "contractor", category: "Design & Fitout" },
  { name: "City Falcon Technical Service LLC", type: "contractor", category: "Technical Services" },
  { name: "B.K.B. Engineering Services LLC", type: "contractor", category: "Engineering Services" },
  { name: "Royal Edge Contracting LLC", type: "contractor", category: "Building Contractor" },
  { name: "National Transport Contracting", type: "contractor", category: "Infrastructure & Transport" }
];

// Export for module systems (Node / Bundlers) while attaching to window for browsers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PARTNER_DATA };
}
