# Al Hashimi Electrical Installation Works LLC - Official Corporate Website

A modern, responsive, and enterprise-grade corporate web application for **Al Hashimi Electrical Installation Works LLC** (Dubai, UAE), celebrating 36+ years of MEP engineering excellence and **DEWA Golden Category 1st Place Holder** accreditation.

---

## 📁 Modular Architecture Guide (For Future Expansion)

The codebase has been decoupled into dedicated, modular files so that you can easily add more details, sections, and data in the future without cluttering a single file:

```
alhashimi-electrical-website/
│
├── index.html                   # Master HTML structure
├── package.json                 # Project scripts (npm run dev)
├── styles.css                   # Master CSS manifest (imports modular stylesheets)
├── app.js                       # Backward-compatible script loader
│
├── css/                         # Modular CSS System
│   ├── variables.css            # Colors, gold gradients, fonts, shadows, transitions
│   ├── base.css                 # Reset, typography, utility classes, buttons
│   ├── header.css               # Top bar, sticky header, logo emblem, main navigation
│   ├── hero.css                 # Hero banner, glowing sphere, KPI counter grid
│   ├── about.css                # Company overview, executive leadership, licenses
│   ├── awards.css               # DEWA Golden Category spotlight & ceremony showcase
│   ├── scope.css                # Scope of works tabs, panels, engineering capabilities
│   ├── calculator.css           # Electrical load & DEWA tariff calculator
│   ├── projects.css             # Project gallery, filter tabs, photo cards
│   ├── partners.css             # 79+ consultant & contractor directory, testimonials
│   ├── safety-faq.css           # HSE safety compliance, QA/QC, FAQ accordion
│   ├── contact.css              # Office location map, personnel contacts, RFQ form
│   ├── modals.css               # Case study modal, DEWA credentials modal, lightbox
│   ├── footer.css               # Corporate footer, floating WhatsApp, back-to-top
│   └── responsive.css           # Tablet and mobile responsive media queries
│
└── js/                          # Modular JavaScript System
    ├── main.js                  # Master coordinator (initializes all subsystems)
    ├── utils.js                 # Reusable utility functions (HTML escaping, formatting)
    │
    ├── data/                    # Dynamic Data Stores (Easy to add new records!)
    │   ├── projects.js          # Case study details (Loads, consultants, scopes)
    │   └── partners.js          # 79+ Consultants, authorities & main contractors
    │
    └── modules/                 # Functional Feature Modules
        ├── clock.js             # Live Dubai GST clock & office business hours status
        ├── calculator.js        # DEWA electrical load, breaker & substation estimator
        ├── projects.js          # Portfolio category filtering & case study modal
        ├── credentials.js       # DEWA Golden Category credential modal handler
        ├── partners.js          # Real-time search & filter for partners directory
        ├── rfq.js               # Tender RFQ submission, WhatsApp dispatch & file upload
        └── ui.js                # Tabs, modals, mobile drawer, stat counters, back-to-top
```

---

## 🛠️ How to Add More Details in the Future

### 1. Adding a New Landmark Project
Open [`js/data/projects.js`](file:///C:/Users/SRB%20TrollersYT/.gemini/antigravity/scratch/alhashimi-electrical-website/js/data/projects.js) and add a new entry to `PROJECT_CASE_STUDIES`:
```javascript
7: {
  title: "Your Project Title",
  category: "Commercial / Residential / Industrial",
  client: "Client Name",
  consultant: "Consultancy Name",
  location: "Dubai Area",
  powerLoad: "Load (e.g. 1,500 kVA)",
  scope: "HV/LV, Substation, Plumbing, ELV",
  status: "Completed & Energized",
  image: "your-project-photo.jpg",
  description: "Detailed engineering execution description..."
}
```

### 2. Adding a New Approved Consultant or Contractor
Open [`js/data/partners.js`](file:///C:/Users/SRB%20TrollersYT/.gemini/antigravity/scratch/alhashimi-electrical-website/js/data/partners.js) and add to `PARTNER_DATA`:
```javascript
{ name: "Consultant / Contractor Name", type: "consultant" /* or "contractor" */, category: "Engineering Consultant" }
```

### 3. Styling Specific Components
Instead of searching through a 3,000-line file, open the specific stylesheet:
- Header adjustments: `css/header.css`
- Load calculator styling: `css/calculator.css`
- Color themes & gold palettes: `css/variables.css`
- Project card styling: `css/projects.css`

---

## 🚀 How to Run Locally

Start the local development server:
```bash
npm run dev
```
Then visit **http://localhost:3000** in your browser.

---

## 🏢 Corporate Accreditation
- **Company**: Al Hashimi Electrical Installation Works L.L.C.
- **Accreditation**: DEWA Golden Category 1st Place MEP Contractor
- **Established**: 1988 in Dubai, UAE (36+ Years)
- **Leadership**: Managing Director Mr. Binoji K. Varghese (`+971 52 897 4123`)
- **DED Commercial License**: No. 118049
- **Dubai Chamber**: Reg. 129303
- **D-U-N-S®**: 534466896
