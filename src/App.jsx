/* ============================================================================
   S I HEALTHCARE LAB — Single-file React application (App.jsx)
   Stack: React 18 + Tailwind CSS (CDN or postcss) + vanilla JS
   Everything (styles, data, components, modals, animations) lives in this file.
   ----------------------------------------------------------------------------
   Quick setup:
     npm create vite@latest si-healthcare -- --template react
     npm i && npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
     content: ["./index.html", "./src/ ** / *.{js,jsx}"]  (remove spaces)
     Paste this file as src/App.jsx
   ========================================================================== */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import siLogo from "./assets/silogo.jpeg";
/* ============================================================================
   1. BRAND CONFIG  — change values here only
   ========================================================================== */

const BRAND = {
  name: "S I Healthcare Lab",
  short: "S I HEALTHCARE",
  initials: "S I",
  tagline: "From Lab to Report — All in one",
  phoneDisplay: "+91 86014 60315",
  phone: "8601460315",
  whatsapp: "918601460315",
  email: "connect@sihealthcarelab.in",
  city: "Mumbai",
  year: new Date().getFullYear(),
};

const waLink = (msg) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    msg || `Hello ${BRAND.name}, I would like to book a test.`
  )}`;

/* ============================================================================
   2. MEDIA  — swap these URLs with your own assets any time
   ========================================================================== */

const IMG = {
  hero1:
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=80",
  hero2:
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1920&q=80",
  hero3:
    "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?auto=format&fit=crop&w=1920&q=80",
  hero4:
    "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1920&q=80",
  homeVisit:
    "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=80",
  about:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
  g1: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  g2: "https://images.unsplash.com/photo-1559757175-05b4d8b0c1a0?auto=format&fit=crop&w=1200&q=80",
  g3: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80",
  g4: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  g5: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80",
  g6: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80",
  radiology:
    "https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?auto=format&fit=crop&w=1400&q=80",
};

// Replace with your own uploaded mp4 (e.g. /videos/lab.mp4 in /public)
const VIDEO = {
  hero: "https://cdn.coverr.co/videos/coverr-a-doctor-in-a-laboratory-5730/1080p.mp4",
  story:
    "https://cdn.coverr.co/videos/coverr-scientist-working-in-a-lab-1573/1080p.mp4",
  poster: IMG.hero1,
};

/* =========================================================================
   3. CONTENT DATA
   ======================================================================== */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Blood Tests", href: "#tests" },
  { label: "Via Home Visit", href: "#home-visit" },
  { label: "Health Packages", href: "#packages" },
  { label: "Radiology", href: "#radiology" },
  { label: "Contact", href: "#contact" },
];

const HERO_SLIDES = [
    {
    type: "video",
    src: VIDEO.hero,
    poster: IMG.hero2,
    kicker: "Free home sample collection",
    title: "A phlebotomist at your door within 60 minutes.",
    sub: "Sterile, single-use kits. Trained staff. Zero collection charges.",
  },
  {
    type: "image",
    src: IMG.hero1,
    kicker: "NABL certified partner labs",
    title: "Because your health deserves care, not compromise.",
    sub: "Comprehensive diagnostics collected from the comfort of your home.",
  },
  {
    type: "image",
    src: IMG.hero3,
    kicker: "Reports in 6 hours",
    title: "Faster reports, straight to your WhatsApp.",
    sub: "Most routine reports are delivered the same day, digitally signed.",
  },
  {
    type: "image",
    src: IMG.hero4,
    kicker: "Up to 60% off",
    title: "Premium lab quality at honest prices.",
    sub: "Partnered with India's most trusted diagnostic networks.",
  },
];

const STATS = [
  { value: 10000, suffix: "+", label: "Happy patients" },
  { value: 24, suffix: "/7", label: "Support available" },
  { value: 100, suffix: "%", label: "Home collection" },
  { value: 0, text: "NABL", label: "Certified labs" },
];

const LAB_PARTNERS = [
  "Suburban Diagnostics",
  "Metropolis Labs",
  "Agilius Diagnostics",
  "Dr. Lal Pathlabs",
  "Thyrocare",
  "Redcliffe Labs",
];

const CATEGORIES = [
  { name: "Allergy Testing", desc: "Comprehensive allergy diagnostics", icon: "allergy", q: "Allergy" },
  { name: "Cancer Screening", desc: "Early detection saves lives", icon: "cancer", q: "CA " },
  { name: "Diabetes Management", desc: "Complete diabetes care", icon: "diabetes", q: "Glucose" },
  { name: "Fever Diagnostics", desc: "Quick fever assessment", icon: "fever", q: "Dengue" },
  { name: "Full Body Checkup", desc: "Comprehensive health screening", icon: "body", q: "CBC" },
  { name: "Hair & Skin Care", desc: "Specialised dermatology panels", icon: "skin", q: "Vitamin" },
  { name: "Heart Health", desc: "Cardiac care & monitoring", icon: "heart", q: "Lipid" },
  { name: "Thyroid Testing", desc: "Thyroid function assessment", icon: "thyroid", q: "Thyroid" },
];

/* [ name, mrp, price, group ] */
const TESTS_RAW = [
  ["CBC (Complete Blood Count), Blood", 363, 330, "Routine"],
  ["ESR (Erythrocyte Sedimentation Rate), Blood", 220, 200, "Routine"],
  ["Routine Examination, Urine", 220, 200, "Routine"],
  ["HbA1c (Hemoglobin A1c), Blood", 682, 620, "Diabetes"],
  ["Glucose, Fasting, Plasma", 121, 110, "Diabetes"],
  ["Glucose, Post Prandial (PP), Plasma", 121, 110, "Diabetes"],
  ["Glucose, Random, Plasma", 121, 110, "Diabetes"],
  ["Insulin, Fasting, Serum", 979, 890, "Diabetes"],
  ["Insulin, Post Prandial, Serum", 979, 890, "Diabetes"],
  ["Thyroid Function Profile (TFT), Free", 891, 810, "Thyroid"],
  ["Total TFT (T3, T4, TSH)", 891, 810, "Thyroid"],
  ["TSH (Thyroid Stimulating Hormone)", 484, 440, "Thyroid"],
  ["Free T3 (Triiodothyronine), Serum", 451, 410, "Thyroid"],
  ["Free T4", 451, 410, "Thyroid"],
  ["Anti Thyroperoxidase (TPO) Antibody", 1452, 1320, "Thyroid"],
  ["Anti Thyroid Antibody (ATAB) Panel", 2530, 2300, "Thyroid"],
  ["Lipid Profile", 869, 790, "Heart"],
  ["Cholesterol, Total, Serum", 286, 260, "Heart"],
  ["Triglycerides, Serum", 506, 460, "Heart"],
  ["Cholesterol, HDL, Serum", 429, 390, "Heart"],
  ["Cholesterol, LDL, Serum", 561, 510, "Heart"],
  ["hsCRP (High Sensitivity CRP), Serum", 869, 790, "Heart"],
  ["Homocysteine, Plasma", 1496, 1360, "Heart"],
  ["Creatine Kinase (CK), Total, Serum", 594, 540, "Heart"],
  ["LDH (Lactate Dehydrogenase)", 561, 510, "Heart"],
  ["Kidney Function Test (KFT)", 1694, 1540, "Kidney"],
  ["Urea / Blood Urea Nitrogen (BUN), Serum", 264, 240, "Kidney"],
  ["Creatinine / eGFR, Serum", 264, 240, "Kidney"],
  ["Uric Acid, Serum", 264, 240, "Kidney"],
  ["Electrolytes", 594, 540, "Kidney"],
  ["Microalbumin, Albumin/Creatinine Ratio, Urine", 737, 670, "Kidney"],
  ["Liver Function Test (LFT)", 1155, 1050, "Liver"],
  ["Bilirubin, Total/Direct/Indirect, Serum", 319, 290, "Liver"],
  ["SGOT / AST (Aspartate Aminotransferase)", 264, 240, "Liver"],
  ["SGPT / ALT (Alanine Aminotransferase)", 264, 240, "Liver"],
  ["GGT (Gamma-Glutamyl Transferase), Serum", 506, 460, "Liver"],
  ["Alkaline Phosphatase", 275, 250, "Liver"],
  ["Total Protein, Serum", 363, 330, "Liver"],
  ["Vitamin D (25-Hydroxy D2 & D3), Total", 1870, 1700, "Vitamins"],
  ["Vitamin B12", 1276, 1160, "Vitamins"],
  ["Folic Acid, Serum", 1331, 1210, "Vitamins"],
  ["Ferritin", 979, 890, "Vitamins"],
  ["Iron Profile (without Ferritin)", 1386, 1260, "Vitamins"],
  ["Calcium, Serum", 286, 260, "Vitamins"],
  ["Magnesium, Serum", 561, 510, "Vitamins"],
  ["Dengue NS1 Antigen, Serum", 660, 600, "Fever"],
  ["Anti Dengue Antibody, IgG, Serum", 660, 600, "Fever"],
  ["Anti Dengue Antibody, IgM, Serum", 660, 600, "Fever"],
  ["Malaria Parasite (MP) Antigen, Rapid Card", 737, 670, "Fever"],
  ["Widal Test, Serum", 616, 560, "Fever"],
  ["Chikungunya, IgM, Serum", 1276, 1160, "Fever"],
  ["CRP (C-Reactive Protein)", 627, 570, "Fever"],
  ["Procalcitonin", 3630, 3300, "Fever"],
  ["Anti Leptospira Antibody, IgM, Serum", 1397, 1270, "Fever"],
  ["CA 125, Serum", 1441, 1310, "Cancer"],
  ["CA 19-9, Serum", 1584, 1440, "Cancer"],
  ["CA 15-3, Serum", 1584, 1440, "Cancer"],
  ["CEA (Carcinoembryonic Antigen), Serum", 924, 840, "Cancer"],
  ["PSA (Prostate Specific Antigen), Total", 979, 890, "Cancer"],
  ["PSA, Free & Total, Serum", 1815, 1650, "Cancer"],
  ["Cervical Cancer Screen Panel", 3047, 2770, "Cancer"],
  ["Cytology - PAP Smear, LBC, Collected Sample", 803, 730, "Cancer"],
  ["Allergy Panel, 107 Allergens, LIA", 6600, 6000, "Allergy"],
  ["Allergy Panel, Comprehensive", 16830, 15300, "Allergy"],
  ["Allergy Panel, Food, Vegetarian", 5610, 5100, "Allergy"],
  ["Allergy Panel, Food, Non-Vegetarian", 6490, 5900, "Allergy"],
  ["Allergen, Dust Mite, IgE, Serum", 1452, 1320, "Allergy"],
  ["Allergen, Milk, IgE, Serum", 1441, 1310, "Allergy"],
  ["Allergen, Peanut, IgE, Serum", 1441, 1310, "Allergy"],
  ["IgE (Immunoglobin E)", 1155, 1050, "Allergy"],
  ["Beta - Human Chorionic Gonadotropin (HCG)", 825, 750, "Women"],
  ["Anti-Mullerian Hormone (AMH)", 2299, 2090, "Women"],
  ["Estradiol (E2)", 737, 670, "Women"],
  ["FSH (Follicle Stimulating Hormone)", 616, 560, "Women"],
  ["LH (Luteinizing Hormone)", 616, 560, "Women"],
  ["Prolactin", 627, 570, "Women"],
  ["FSH, LH & Prolactin Panel", 1573, 1430, "Women"],
  ["Progesterone", 737, 670, "Women"],
  ["Dual Marker (Single & Twin)", 2420, 2200, "Women"],
  ["Triple Marker", 3080, 2800, "Women"],
  ["Quadruple Marker", 3300, 3000, "Women"],
  ["Pregnancy Test, Urine (UPT)", 506, 460, "Women"],
  ["TORCH Profile B, IgM & IgG", 3839, 3490, "Women"],
  ["Testosterone, Total", 792, 720, "Men"],
  ["Testosterone, Free & Bioavailable", 2002, 1820, "Men"],
  ["DHEAS (Dehydroepiandrosterone Sulphate)", 1221, 1110, "Men"],
  ["Routine Examination, Semen", 616, 560, "Men"],
  ["HBsAg (Hepatitis B Surface Antigen), Serum", 616, 560, "Infection"],
  ["Anti HCV (Hepatitis C Virus) Antibody", 1276, 1160, "Infection"],
  ["Anti HAV (Hepatitis A Virus) Antibody, IgM", 1331, 1210, "Infection"],
  ["Anti HIV Antibody, Rapid, Serum", 682, 620, "Infection"],
  ["H3 Profile (HIV, Hepatitis B, Hepatitis C)", 2233, 2030, "Infection"],
  ["VDRL, Serum", 330, 300, "Infection"],
  ["Bacterial Culture & Sensitivity, Urine", 1155, 1050, "Infection"],
  ["TB Culture, Sputum", 1210, 1100, "Infection"],
  ["Mantoux Test (MT)", 330, 300, "Infection"],
  ["PT (Prothrombin Time) & INR, Plasma", 451, 410, "Coagulation"],
  ["PTT / aPTT (Partial Thromboplastin Time)", 594, 540, "Coagulation"],
  ["D-dimer", 1595, 1450, "Coagulation"],
  ["Platelet Count, Blood", 286, 260, "Coagulation"],
  ["Fibrinogen - C, Plasma", 1100, 1000, "Coagulation"],
  ["Bleeding Time, Blood", 55, 50, "Coagulation"],
  ["Clotting Time, Blood", 66, 60, "Coagulation"],
  ["RA (Rheumatoid Arthritis) Factor", 737, 670, "Autoimmune"],
  ["Anti CCP Antibody, IgG", 1639, 1490, "Autoimmune"],
  ["HLA B27 Detection, PCR, Blood", 2530, 2300, "Autoimmune"],
  ["ANCA, Serum", 2299, 2090, "Autoimmune"],
  ["Anti Phospholipid Syndrome (APS) Profile", 5225, 4750, "Autoimmune"],
  ["Anti Streptolysin-O Antibody (ASO)", 737, 670, "Autoimmune"],
  ["Hemoglobin (Hb)", 286, 260, "Routine"],
  ["WBC (White Blood Cell) Count, Blood", 286, 260, "Routine"],
  ["Routine Examination, Stool", 220, 200, "Routine"],
  ["Occult Blood, Stool", 209, 190, "Routine"],
  ["Cortisol, Early Morning (AM), Serum", 869, 790, "Hormones"],
  ["PTH (Parathyroid Hormone)", 1815, 1650, "Hormones"],
  ["Hemoglobin Electrophoresis / HPLC, Blood", 1386, 1260, "Hormones"],
  ["Protein Electrophoresis, Serum", 1155, 1050, "Hormones"],
];

const TESTS = TESTS_RAW.map((t, i) => ({
  id: i + 1,
  name: t[0],
  mrp: t[1],
  price: t[2],
  group: t[3],
  key: t[0].split(/[(,]/)[0].trim(),
}));

const TEST_GROUPS = ["All", ...Array.from(new Set(TESTS.map((t) => t.group)))];

const PACKAGES = [
  {
    name: "ProSelf Copper",
    mrp: 2999,
    price: 999,
    params: 67,
    popular: false,
    blurb:
      "Essential tests for general health monitoring with anemia, diabetes and organ function assessment.",
    highlights: [
      "Complete Blood Count (CBC)",
      "Diabetes Panel (FBS)",
      "Heart Health (Lipid Profile)",
      "Liver Function (SGPT)",
    ],
    detail: [
      ["Anemia", "CBC"],
      ["Diabetes", "FBS"],
      ["Heart", "Lipid Profile"],
      ["Liver", "SGPT"],
      ["Kidneys", "Creatinine, eGFR, Urine Routine"],
      ["Bone & Joints", "Uric Acid"],
    ],
  },
  {
    name: "ProSelf Bronze",
    mrp: 3999,
    price: 1999,
    params: 73,
    popular: false,
    blurb:
      "Enhanced health assessment with additional diabetes and liver monitoring parameters.",
    highlights: [
      "All Copper package tests",
      "Enhanced diabetes panel",
      "Advanced liver function",
      "Comprehensive kidney tests",
    ],
    detail: [
      ["Anemia", "CBC"],
      ["General", "ESR"],
      ["Diabetes", "FBS, Glyco-Hb"],
      ["Heart", "Lipid Profile"],
      ["Liver", "SGPT, SGOT"],
      ["Kidneys", "BUN, Urea, Creatinine, eGFR, Sodium, Potassium, Chloride, Urine Routine"],
      ["Bone & Joints", "Uric Acid"],
    ],
  },
  {
    name: "ProSelf Silver",
    mrp: 6999,
    price: 3999,
    params: 87,
    popular: true,
    blurb:
      "Comprehensive health package with thyroid, vitamin analysis and advanced screening.",
    highlights: [
      "All Bronze package tests",
      "Thyroid function tests",
      "Vitamin profile",
      "Advanced heart markers",
    ],
    detail: [
      ["Anemia", "CBC"],
      ["General", "ESR"],
      ["Diabetes", "FBS, Glyco-Hb"],
      ["Heart", "Lipid Profile"],
      ["Liver", "SGPT, SGOT"],
      ["Kidneys", "BUN, Urea, Creatinine, eGFR, Sodium, Potassium, Chloride, Urine Routine"],
      ["Bone & Joints", "Uric Acid, Calcium, Phosphorus"],
      ["Thyroid", "FT3, FT4, TSH"],
      ["Vitamins", "Vit B12, Vit D"],
    ],
  },
  {
    name: "ProSelf Gold 40s (For Him)",
    mrp: 9999,
    price: 4999,
    params: 92,
    popular: false,
    blurb:
      "Designed for men over 40 with comprehensive hormone and cardiac assessments.",
    highlights: [
      "Complete male health profile",
      "Advanced heart assessment",
      "Comprehensive diabetes panel",
      "Specialised male hormones",
    ],
    detail: [
      ["Anemia", "CBC, Iron Studies with Ferritin"],
      ["General", "ESR"],
      ["Diabetes", "FBS, Glyco-Hb"],
      ["Heart", "Lipid Profile, Homocysteine, hs-CRP"],
      ["Liver", "Bilirubin, SGPT, SGOT, GGT, Total Proteins, Albumin, Globulin, A/G ratio, Alk Phos"],
      ["Kidneys", "BUN, Urea, Creatinine, eGFR, Sodium, Potassium, Chloride, Urine Routine"],
      ["Bone & Joints", "Uric Acid, Calcium, Phosphorus"],
      ["Thyroid", "FT3, FT4, TSH"],
      ["Vitamins", "Vit B12, Vit D"],
    ],
  },
  {
    name: "ProSelf Gold 40s (For Her)",
    mrp: 9999,
    price: 4999,
    params: 98,
    popular: false,
    blurb:
      "Tailored for women over 40 with specialised female health markers.",
    highlights: [
      "Complete female health profile",
      "Hormone assessment",
      "Bone health analysis",
      "Comprehensive wellness panel",
    ],
    detail: [
      ["Anemia", "CBC, Iron Studies with Ferritin"],
      ["General", "ESR"],
      ["Diabetes", "FBS, Glyco-Hb"],
      ["Heart", "Lipid Profile, Homocysteine, hs-CRP"],
      ["Liver", "Bilirubin, SGPT, SGOT, GGT, Total Proteins, Albumin, Globulin, A/G ratio, Alk Phos"],
      ["Kidneys", "BUN, Urea, Creatinine, eGFR, Sodium, Potassium, Chloride, Urine Routine"],
      ["Bone & Joints", "Uric Acid, Calcium, Phosphorus"],
      ["Thyroid", "FT3, FT4, TSH"],
      ["Vitamins", "Vit B12, Vit D"],
      ["Female Hormones", "Estradiol, FSH, LH"],
    ],
  },
  {
    name: "ProSelf Couple",
    mrp: 22000,
    price: 10999,
    params: 204,
    popular: false,
    blurb:
      "Designed for couples with extensive testing for both partners.",
    highlights: [
      "Complete health assessment for both",
      "Comprehensive hormone panel",
      "Advanced cardiac & metabolic tests",
      "Specialised couple wellness",
    ],
    detail: [
      ["Anemia", "CBC x 2, Iron Studies with Ferritin x 2"],
      ["General", "ESR x 2"],
      ["Diabetes", "FBS x 2, Glyco-Hb x 2"],
      ["Heart", "Lipid Profiles x 2, Homocysteine x 2, hs-CRP x 2, CPK x 2, LDH x 2"],
      ["Liver", "Bilirubin x 2, SGPT x 2, SGOT x 2, GGT x 2, Total Proteins x 2, Albumin x 2"],
      ["Kidneys", "BUN x 2, Urea x 2, Creatinine x 2, eGFR x 2, Electrolytes x 2, Urine Routine x 2"],
      ["Bone & Joints", "Uric Acid x 2, Calcium x 2, Phosphorus x 2"],
      ["Thyroid", "FT3 x 2, FT4 x 2, TSH x 2"],
      ["Vitamins", "Vit B12 x 2, Vit D x 2"],
      ["Hormones", "Estradiol x 2, Testosterone for him"],
    ],
  },
];

const RADIOLOGY = [
  { name: "Sonography", desc: "All types", icon: "sono" },
  { name: "2D ECHO", desc: "Heart imaging", icon: "echo" },
  { name: "X-Rays", desc: "Digital imaging", icon: "xray" },
  { name: "ECG", desc: "Heart monitoring", icon: "ecg" },
  { name: "BMD", desc: "Bone mineral density", icon: "bmd" },
  { name: "Mammography", desc: "Breast screening", icon: "mammo" },
];

const LOCATIONS = [
  "Andheri East (J B Nagar)",
  "Andheri West (Lokhandwala)",
  "Juhu",
  "Kalina",
  "Malad West",
  "Kandivali East (Thakur Complex)",
  "Kemps Corner (South Bombay)",
  "Thane (GB Road)",
];

const TRUST = [
  {
    title: "Trustworthy care",
    desc: "Expert guidance and precise diagnostics you can rely on.",
    icon: "shield",
  },
  {
    title: "Safe & confidential",
    desc: "Your health and privacy are always protected.",
    icon: "lock",
  },
  {
    title: "Accessible & affordable",
    desc: "Quality care made fair, transparent and within reach.",
    icon: "hand",
  },
];

const VMM = [
  {
    key: "Vision",
    body:
      "To make quality healthcare accessible, compassionate and trustworthy — bringing reliable care within everyone's reach, because every life deserves health without compromise.",
  },
  {
    key: "Mission",
    body:
      "We are here to care, guide and support you at every step of your health journey. With empathy, trust and innovation, we deliver accurate diagnostics and timely care that feels simple, personal and reassuring. By blending advanced technology with a human touch, we make healthcare reliable, affordable and truly patient-centered.",
  },
  {
    key: "Motto",
    body:
      "Care without compromise. Delivering precision diagnostics with a commitment to care, accuracy and reliability. At S I Healthcare Lab, we ensure every test result supports your journey toward better health with confidence and trust.",
  },
];

const WHY = [
  {
    title: "Cutting-edge technology",
    desc: "State-of-the-art analysers and imaging equipment across every partner lab.",
    icon: "chip",
  },
  {
    title: "Expert healthcare professionals",
    desc: "Highly skilled technicians with extensive experience and specialised training.",
    icon: "badge",
  },
  {
    title: "Comprehensive services",
    desc: "A full spectrum of diagnostic and interventional procedures under one roof.",
    icon: "grid",
  },
  {
    title: "Patient-centric approach",
    desc: "Comfort, clarity and individualised care through every step of the process.",
    icon: "heart",
  },
  {
    title: "Advanced interventions",
    desc: "Minimally invasive procedures performed with precision imaging support.",
    icon: "pulse",
  },
  {
    title: "Rapid reporting",
    desc: "Fast, accurate results that help your doctor decide sooner.",
    icon: "clock",
  },
];

const FAQS = [
  {
    q: "What services do you provide?",
    a: "A wide range of diagnostic tests, preventive health check-ups, radiology services and personalised healthcare support — all delivered with care and accuracy.",
  },
  {
    q: "How do I book a test?",
    a: "Book online through this website, message us on WhatsApp, or call our support team to schedule an appointment.",
  },
  {
    q: "Do you offer home sample collection?",
    a: "Yes. Safe, hygienic home sample collection is available at your convenience, with single-use sterile kits.",
  },
  {
    q: "How soon will I get my reports?",
    a: "Most routine reports are ready within 6 hours and specialised reports within 24–48 hours. You receive them securely on email or WhatsApp.",
  },
  {
    q: "Are my health records secure?",
    a: "Your data is encrypted and stored securely. Privacy and confidentiality come first, always.",
  },
  {
    q: "What are the payment options?",
    a: "UPI, debit and credit cards, net banking, and cash at the time of service.",
  },
  {
    q: "Do you offer affordable packages?",
    a: "Yes. Transparent pricing and cost-effective health packages designed for different healthcare needs.",
  },
  {
    q: "Are your labs certified?",
    a: "All partner labs are NABL/ISO certified to ensure accuracy and quality in every test.",
  },
  {
    q: "How do I contact you for support?",
    a: `Call or WhatsApp us on ${BRAND.phoneDisplay}, or email ${BRAND.email} for any queries.`,
  },
];

const TESTIMONIALS = [
  {
    name: "Ritika Sharma",
    place: "Andheri West",
    text: "Collection person arrived in 40 minutes, very professional. CBC and thyroid reports were on WhatsApp before lunch.",
  },
  {
    name: "Imran Qureshi",
    place: "Kurla",
    text: "Booked the Silver package for my parents. Rates were nearly half of what the local centre quoted, same NABL lab.",
  },
  {
    name: "Meera Nair",
    place: "Thane",
    text: "My father is bedridden, so home collection mattered. The staff were patient and careful with him.",
  },
  {
    name: "Aakash Patil",
    place: "Malad",
    text: "Needed an urgent dengue panel at 9pm. They arranged collection the same night and I had results by morning.",
  },
];

/* ============================================================================
   4. UTILITIES & HOOKS
   ========================================================================== */

const rupee = (n) => "₹" + Number(n).toLocaleString("en-IN");

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
};

/* Scroll reveal */
function useReveal(options = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, y = 22, x = 0, scale = 1, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown
          ? "none"
          : `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .62s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* Animated counter */
function Counter({ to, suffix = "", text, duration = 1800 }) {
  const [ref, shown] = useReveal();
  const [val, setVal] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!shown || text) return;
    if (reduced) return setVal(to);
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration, text, reduced]);
  return (
    <span ref={ref} className="tabular-nums">
      {text ? text : val.toLocaleString("en-IN")}
      {!text && suffix}
    </span>
  );
}

/* Lightweight tilt: cached geometry + one rAF per frame. */
function useTilt(max = 8) {
  const ref = useRef(null);
  const frame = useRef(0);
  const rect = useRef(null);
  const reduced = usePrefersReducedMotion();

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el || reduced || window.innerWidth < 1024) return;
    if (!rect.current) rect.current = el.getBoundingClientRect();
    const r = rect.current;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--tilt", `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(-5px)`);
      el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
      frame.current = 0;
    });
  }, [max, reduced]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    rect.current = null;
    if (frame.current) cancelAnimationFrame(frame.current);
    if (el) el.style.removeProperty("--tilt");
  }, []);

  useEffect(() => () => frame.current && cancelAnimationFrame(frame.current), []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/* rAF-throttled scroll position — one listener, no layout thrash */
function useRafScroll(cb) {
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      cb(window.scrollY || window.pageYOffset);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [cb]);
}

/* Lock body scroll for modals */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/* ============================================================================
   5. GLOBAL STYLES (injected — no tailwind.config edits required)
   ========================================================================== */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Outfit:wght@300;400;500;600;700&display=swap');

    :root{
      --ink:#052e2b;
      --brand:#0e8f7e;
      --brand-deep:#065f53;
      --aqua:#2dd4bf;
      --gold:#d99a4e;
      --mist:#f2f8f6;
      --ring:rgba(14,143,126,.35);
    }

    *{-webkit-tap-highlight-color:transparent}
    html{
      scroll-behavior:smooth;
      scroll-padding-top:84px;
      -webkit-text-size-adjust:100%;
      text-rendering:optimizeSpeed;
    }
    html.lenis-lite{scroll-behavior:smooth!important}
    body{
      font-family:'Outfit',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
      background:var(--mist);
      color:var(--ink);
      overflow-x:hidden;
      overscroll-behavior-y:none;
    }
    /* paint only what is near the viewport -> much lighter scrolling */
    main > section{content-visibility:auto;contain-intrinsic-size:1px 760px}
    img,video{display:block;max-width:100%;height:auto}
    img{content-visibility:auto}
    video{background:#031e1c}
    .font-display{font-family:'Fraunces',Georgia,'Times New Roman',serif;font-optical-sizing:auto}

    ::selection{background:var(--aqua);color:#04312c}

    /* scrollbar */
    ::-webkit-scrollbar{width:10px;height:10px}
    ::-webkit-scrollbar-track{background:#e4efec}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,var(--brand),var(--brand-deep));border-radius:99px;border:2px solid #e4efec}
    ::-webkit-scrollbar-thumb:hover{background:var(--brand-deep)}

    /* focus */
    :where(a,button,input,select,textarea,[tabindex]):focus-visible{
      outline:3px solid var(--aqua);outline-offset:3px;border-radius:10px;
    }

    /* ---------- keyframes ---------- */
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
    @keyframes floatX{0%,100%{transform:translateX(0)}50%{transform:translateX(16px)}}
    @keyframes blob{0%,100%{border-radius:60% 40% 55% 45%/50% 55% 45% 50%;transform:translate(0,0) rotate(0)}
      33%{border-radius:45% 55% 40% 60%/60% 40% 60% 40%;transform:translate(24px,-18px) rotate(8deg)}
      66%{border-radius:55% 45% 60% 40%/40% 60% 40% 60%;transform:translate(-18px,14px) rotate(-6deg)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes kenburns{0%{transform:scale(1.02)}100%{transform:scale(1.10)}}
    @keyframes pulseRing{0%{transform:scale(.85);opacity:.75}70%{transform:scale(1.7);opacity:0}100%{opacity:0}}
    @keyframes ecg{0%{stroke-dashoffset:1200}100%{stroke-dashoffset:0}}
    @keyframes riseIn{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
    @keyframes popIn{from{opacity:0;transform:translateY(22px) scale(.96)}to{opacity:1;transform:none}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes sheen{0%{transform:translateX(-120%) skewX(-18deg)}60%,100%{transform:translateX(220%) skewX(-18deg)}}
    @keyframes spinSlow{to{transform:rotate(360deg)}}
    @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

    .a-float{animation:floatY 7s ease-in-out infinite}
    .a-float-slow{animation:floatY 11s ease-in-out infinite}
    .a-floatx{animation:floatX 9s ease-in-out infinite}
    .a-blob{animation:blob 18s ease-in-out infinite}
    .a-spin-slow{animation:spinSlow 26s linear infinite}
    .a-bob{animation:bob 2.6s ease-in-out infinite}
    .a-rise{animation:riseIn .8s cubic-bezier(.16,1,.3,1) both}
    .a-pop{animation:popIn .7s cubic-bezier(.16,1,.3,1) both}
    .a-fade{animation:fadeIn .6s ease both}
    .a-kenburns{animation:kenburns 14s ease-out forwards}

    .marquee-track{display:flex;width:max-content;animation:marquee 32s linear infinite}
    .marquee-wrap:hover .marquee-track{animation-play-state:paused}

    /* glass + surfaces */
    .glass{
      background:rgba(255,255,255,.88);
      backdrop-filter:blur(10px);
      -webkit-backdrop-filter:blur(10px);
    }
    .glass-dark{
      background:rgba(5,46,43,.72);
      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);
    }

    .card-soft{
      background:#fff;
      border:1px solid rgba(6,95,83,.09);
      box-shadow:0 1px 2px rgba(5,46,43,.04),0 10px 30px -18px rgba(5,46,43,.30);
      transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s cubic-bezier(.16,1,.3,1),border-color .22s;
    }
    .card-soft:hover{
      border-color:rgba(14,143,126,.35);
      transform:translateY(-4px);
      box-shadow:0 18px 44px -26px rgba(5,46,43,.40),0 2px 0 rgba(45,212,191,.22);
    }

    /* glow that follows cursor on tilt cards */
    .glow-follow{position:relative;overflow:hidden;transform:var(--tilt,translateZ(0));will-change:transform}
    .glow-follow::before{
      content:"";position:absolute;inset:0;opacity:0;pointer-events:none;
      background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(45,212,191,.18),transparent 62%);
      transition:opacity .45s;
    }
    .glow-follow:hover::before{opacity:1}

    /* sheen sweep on buttons */
    .sheen{position:relative;overflow:hidden;isolation:isolate}
    .sheen::after{
      content:"";position:absolute;top:0;left:0;width:45%;height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);
      transform:translateX(-120%) skewX(-18deg);
    }
    .sheen:hover::after{animation:sheen 1.05s ease}

    /* underline link */
    .link-underline{position:relative}
    .link-underline::after{
      content:"";position:absolute;left:0;bottom:-5px;height:2px;width:100%;
      background:linear-gradient(90deg,var(--brand),var(--aqua));
      transform:scaleX(0);transform-origin:right;transition:transform .45s cubic-bezier(.16,1,.3,1);
      border-radius:2px;
    }
    .link-underline:hover::after,.link-underline[data-active="true"]::after{transform:scaleX(1);transform-origin:left}

    .text-gradient{
      background:linear-gradient(105deg,#065f53 0%,#0e8f7e 42%,#2dd4bf 100%);
      -webkit-background-clip:text;background-clip:text;color:transparent;
    }

    .shimmer-price{
      background:linear-gradient(90deg,#065f53,#0e8f7e,#2dd4bf,#0e8f7e,#065f53);
      background-size:200% 100%;
      -webkit-background-clip:text;background-clip:text;color:transparent;
      animation:shimmer 4.5s linear infinite;
    }

    .grid-lines{
      background-image:linear-gradient(rgba(6,95,83,.055) 1px,transparent 1px),
                       linear-gradient(90deg,rgba(6,95,83,.055) 1px,transparent 1px);
      background-size:54px 54px;
    }

    .no-scrollbar::-webkit-scrollbar{display:none}
    .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}

    .ecg-path{stroke-dasharray:1200;animation:ecg 6s linear infinite}

    input,select,textarea{font-family:inherit}
    @media (max-width:1023px){
      .a-float,.a-float-slow,.a-floatx,.a-blob,.a-spin-slow,.a-bob{animation:none!important}
      .a-kenburns{animation:none!important;transform:none!important}
      .marquee-track{animation-duration:44s}
    }
    @media (prefers-reduced-motion:no-preference){
      .tilt-surface{transform:var(--tilt,translateZ(0));will-change:transform}
    }

    @media (prefers-reduced-motion:reduce){
      *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
    }

    /* =====================================================================
       PREMIUM RESPONSIVE OVERRIDES — mobile first / tablet / desktop
       ===================================================================== */
    html,body,#root{width:100%;max-width:100%;overflow-x:hidden}
    body{min-width:320px}
    button,a,input,select,textarea{-webkit-tap-highlight-color:transparent}
    button,a{touch-action:manipulation}
    section[id]{scroll-margin-top:88px}

    @media (max-width:639px){
      html{scroll-padding-top:72px}
      section[id]{scroll-margin-top:72px}

      /* Navbar */
      header nav{padding-left:max(14px,env(safe-area-inset-left));padding-right:max(14px,env(safe-area-inset-right))}
      header .group span.leading-none{min-width:0}
      header .group span.leading-none>span:first-child{font-size:14px;white-space:nowrap}
      header .group span.leading-none>span:last-child{font-size:9px;white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis}
      header .group>span:first-child{width:40px;height:40px;border-radius:12px}

      /* Hero */
      #home{min-height:100svh;min-height:100dvh;padding-bottom:0}
      #home>div.relative.mx-auto{padding-left:16px;padding-right:16px;padding-top:106px;padding-bottom:188px}
      #home .max-w-\[720px\]{max-width:100%}
      #home h1{font-size:clamp(2.05rem,10.2vw,3rem);line-height:1.04;letter-spacing:-.035em;margin-top:18px;max-width:100%}
      #home h1 br{display:none}
      #home p{font-size:15px;line-height:1.65;max-width:100%;margin-top:16px}
      #home .a-rise.mt-9{margin-top:24px;display:grid;grid-template-columns:1fr;gap:10px}
      #home .a-rise.mt-9>a,#home .a-rise.mt-9>button{width:100%;min-height:52px}
      #home .a-rise.mt-8{margin-top:22px;gap:10px 18px;font-size:12.5px}
      #home .mt-14{margin-top:28px}
      #home .mt-14>div:first-child button{width:42px;height:42px}
      #home .mt-14 .ml-auto{display:none}
      #home .glass-dark{border-radius:20px 20px 0 0}
      #home .glass-dark>div{padding:14px 8px}
      #home .glass-dark p:first-child{font-size:20px}
      #home .glass-dark p:last-child{font-size:10.5px;line-height:1.3}
      #home .absolute.inset-0>img,#home .absolute.inset-0>video{object-position:center center}
      #home .absolute.inset-0 video{min-height:100%;object-fit:cover}

      /* Generic section rhythm */
      main>section{padding-top:64px!important;padding-bottom:64px!important}
      main>section:first-child{padding-top:0!important}
      .mx-auto.max-w-\[1240px\]{width:100%;max-width:1240px;padding-left:16px;padding-right:16px}
      .font-display{overflow-wrap:anywhere}

      /* Headings */
      .max-w-2xl.mb-12,.max-w-2xl.mb-16{margin-bottom:32px}
      .max-w-2xl h2{font-size:clamp(1.75rem,8vw,2.35rem);line-height:1.08}
      .max-w-2xl p{font-size:14px;line-height:1.65}

      /* Partner marquee */
      .marquee-wrap{margin-top:28px}
      .marquee-track{gap:10px}
      .marquee-track>div{padding:13px 16px;border-radius:16px}
      .marquee-track>div>span:first-child{width:32px;height:32px}
      .marquee-track>div>span:last-child{font-size:13px}
      .marquee-wrap+div{margin-top:28px}

      /* Cards */
      .card-soft:hover{transform:none;box-shadow:0 10px 30px -18px rgba(5,46,43,.30)}
      .grid{min-width:0}
      #tests .grid.sm\:grid-cols-2,#packages .grid.md\:grid-cols-2,#radiology .grid.sm\:grid-cols-2{grid-template-columns:1fr}
      #tests .grid.lg\:grid-cols-3,#packages .grid.lg\:grid-cols-3,#radiology .grid.lg\:grid-cols-3{grid-template-columns:1fr}

      /* Search */
      #tests input{font-size:14px;padding-top:14px;padding-bottom:14px;padding-left:48px}
      #tests .no-scrollbar{margin-left:-16px;margin-right:-16px;padding-left:16px;padding-right:16px}

      /* Test cards */
      #tests article{padding:20px;border-radius:20px}
      #tests article h3{font-size:15.5px;padding-right:56px}
      #tests article .shimmer-price{font-size:23px}
      #tests article .mt-5.flex{align-items:center}
      #tests article .mt-5.flex.gap-2.pt-1{display:grid;grid-template-columns:minmax(0,1fr) 42px}
      #tests article .mt-5.flex.gap-2.pt-1>a{width:42px;height:42px}

      /* Home visit */
      #home-visit .grid.lg\:grid-cols-2{grid-template-columns:1fr}
      #home-visit .mt-9.grid{grid-template-columns:1fr}
      #home-visit .glow-follow{margin-top:4px;padding:5px;border-radius:24px}
      #home-visit .glow-follow img{height:300px;border-radius:19px}
      #home-visit .glow-follow .absolute.bottom-7{left:18px;right:18px;bottom:18px}
      #home-visit .glow-follow .absolute.bottom-7 p:first-child{font-size:18px}
      #home-visit .glow-follow .absolute.bottom-7 span{width:46px;height:46px}
      #home-visit .mt-9.flex{display:grid;grid-template-columns:1fr}
      #home-visit .mt-9.flex>a,#home-visit .mt-9.flex>button{width:100%}

      /* Packages */
      #packages article{padding:21px;border-radius:22px}
      #packages article .mt-5.flex{flex-wrap:wrap}
      #packages article .mt-5.flex>span:first-child{font-size:31px}
      #packages article .mt-6.flex{align-items:stretch}
      #packages article .mt-6.flex>button:first-child{min-height:46px}
      #packages article .mt-6.flex>button:last-child{white-space:nowrap}

      /* Radiology */
      #radiology button{padding:18px;border-radius:19px;gap:14px}
      #radiology button>span:first-of-type{width:48px;height:48px}
      #radiology button>span:last-of-type{min-width:0}
      #radiology button>span:last-of-type>span{overflow-wrap:anywhere}
      #radiology .mt-14>div{padding:22px}
      #radiology .mt-14 .grid.sm\:grid-cols-2{grid-template-columns:1fr}

      /* Gallery */
      .aspect-\[4\/3\]{aspect-ratio:4/3}
      .marquee-wrap:hover .marquee-track{animation-play-state:running}
      section.bg-\[\#031e1c\] .group.relative.overflow-hidden.rounded-\[28px\] video{height:260px;min-height:260px;object-fit:cover}
      section.bg-\[\#031e1c\] .flex.snap-x figure{width:82%;min-width:82%;}

      /* Trust / VMM */
      section.relative.-mt-14{margin-top:0;padding-top:24px!important}
      section.relative.-mt-14 .grid.md\:grid-cols-3{grid-template-columns:1fr}
      section.relative.-mt-14 .card-soft{padding:20px}
      section.bg-\[\#f2f8f6\] .mx-auto.max-w-3xl .flex.w-fit{width:100%;overflow-x:auto;justify-content:flex-start;padding:4px}
      section.bg-\[\#f2f8f6\] .mx-auto.max-w-3xl .flex.w-fit button{flex:1 0 auto;padding-left:17px;padding-right:17px}
      section.bg-\[\#f2f8f6\] .mx-auto.max-w-3xl .rounded-\[26px\]{padding:24px 20px}

      /* About */
      .rounded-\[28px\]{max-width:100%}
      section.bg-white .grid.lg\:grid-cols-2{grid-template-columns:1fr}
      section.bg-white .relative img{height:290px}
      section.bg-white .relative .absolute.-bottom-6{right:10px;bottom:-14px;width:175px;padding:14px}
      section.bg-white .relative .absolute.-bottom-6 p.font-display{font-size:20px}
      section.bg-white .relative .absolute.-left-3{display:none}
      section.bg-white .grid.grid-cols-3{gap:8px}
      section.bg-white .grid.grid-cols-3>div{padding:14px 8px}
      section.bg-white .grid.grid-cols-3>div p:last-child{font-size:10.5px;line-height:1.25}

      /* Testimonials */
      section.bg-white .max-w-3xl.rounded-\[28px\]{padding:28px 20px}
      section.bg-white .max-w-3xl.rounded-\[28px\] p.font-display{font-size:17px;line-height:1.55}

      /* FAQ */
      section.bg-\[\#f2f8f6\] .space-y-3 button{padding:17px 16px}
      section.bg-\[\#f2f8f6\] .space-y-3 button>span:first-child{font-size:14.5px}
      section.bg-\[\#f2f8f6\] .space-y-3 p{padding-left:16px;padding-right:16px;font-size:13.5px}

      /* Contact */
      #contact .grid.lg\:grid-cols-\[minmax\(0\,1\.05fr\)_minmax\(0\,\.95fr\)\]{grid-template-columns:1fr}
      #contact .mt-9.flex{display:grid;grid-template-columns:1fr}
      #contact .mt-9.flex button{width:100%}
      #contact .group.flex{padding:17px 16px;gap:13px}
      #contact .group.flex>span:nth-child(2){min-width:0}
      #contact .group.flex>span:nth-child(2)>span:last-child{font-size:14px;overflow-wrap:anywhere}
      #contact .group.flex>svg{display:none}

      /* Footer */
      footer{padding-top:52px}
      footer .grid.md\:grid-cols-2{grid-template-columns:1fr 1fr;gap:30px 18px}
      footer .lg\:col-span-1{grid-column:1/-1}
      footer .flex.flex-col.items-center.justify-between{padding-bottom:max(24px,env(safe-area-inset-bottom))}
      footer .font-display.translate-y-\[22\%\]{font-size:22vw}

      /* Floating actions */
      .fixed.bottom-5.right-5{right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));gap:8px}
      .fixed.bottom-5.right-5 button.h-12{width:44px;height:44px}
      .fixed.bottom-5.right-5 a.h-14{width:50px;height:50px}
      .fixed.bottom-5.right-5 a span.absolute{display:none}

      /* Modal */
      .fixed.inset-0.z-\[120\]{padding:0}
      .fixed.inset-0.z-\[120\]>div.relative{max-height:calc(100svh - 8px);max-height:calc(100dvh - 8px);border-radius:24px 24px 0 0}
      .fixed.inset-0.z-\[120\] form{padding:22px 18px max(24px,env(safe-area-inset-bottom))}
      .fixed.inset-0.z-\[120\] .grid.sm\:grid-cols-2{grid-template-columns:1fr}
      .fixed.inset-0.z-\[120\] .flex.flex-col-reverse{display:grid}
      .fixed.inset-0.z-\[120\] .flex.flex-col-reverse button{width:100%}
    }

    @media (min-width:640px) and (max-width:1023px){
      .mx-auto.max-w-\[1240px\]{padding-left:28px;padding-right:28px}
      main>section{padding-top:82px!important;padding-bottom:82px!important}
      #home>div.relative.mx-auto{padding-top:128px;padding-bottom:180px}
      #home h1{font-size:clamp(3rem,7vw,4.1rem);max-width:760px}
      #home .a-rise.mt-9{gap:12px}
      #home .glass-dark>div{padding:20px 16px}
      #home-visit .glow-follow img{height:410px}
      #packages article{padding:24px}
      #radiology .mt-14>div{padding:30px}
      footer .grid.md\:grid-cols-2{grid-template-columns:1fr 1fr}
    }

    @media (min-width:1024px){
      #home .absolute.inset-0>img,#home .absolute.inset-0>video{object-position:center center}
    }

    @media (hover:none), (pointer:coarse){
      .card-soft:hover,.group:hover{transform:none}
      .glow-follow::before{display:none}
      .sheen:hover::after{animation:none}
      .link-underline:hover::after{transform:scaleX(0)}
    }

    @media (max-width:380px){
      #home h1{font-size:2rem}
      #home .a-rise.mt-8{font-size:11.5px}
      #home .glass-dark p:first-child{font-size:18px}
      .fixed.bottom-5.right-5 a.h-14{width:48px;height:48px}
      footer .grid.md\:grid-cols-2{grid-template-columns:1fr}
    }

    @supports (padding:max(0px)){
      header{padding-top:max(0px,env(safe-area-inset-top))}
    }

  `}</style>
);

/* ============================================================================
   6. ICONS (inline SVG set)
   ========================================================================== */

const Icon = ({ name, className = "w-6 h-6", stroke = 1.6 }) => {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const paths = {
    allergy: (
      <>
        <path d="M12 3c2.5 3 4 5.4 4 7.6A4 4 0 0 1 8 10.6C8 8.4 9.5 6 12 3Z" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M9 17h6" />
      </>
    ),
    cancer: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      </>
    ),
    diabetes: (
      <>
        <path d="M12 3s5 5.6 5 9a5 5 0 0 1-10 0c0-3.4 5-9 5-9Z" />
        <path d="M10 13h4M12 11v4" />
      </>
    ),
    fever: (
      <>
        <path d="M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0Z" />
        <path d="M12 16.5v.01" />
      </>
    ),
    body: (
      <>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v7M8 10l4-1 4 1M9 21l3-7 3 7" />
      </>
    ),
    skin: (
      <>
        <path d="M12 3a6 6 0 0 0-6 6c0 4 3 5 3 8a3 3 0 0 0 6 0c0-3 3-4 3-8a6 6 0 0 0-6-6Z" />
        <path d="M9.5 10h.01M14.5 10h.01M12 13h.01" />
      </>
    ),
    heart: (
      <path d="M20.3 5.9a5 5 0 0 0-7.1 0L12 7.1l-1.2-1.2a5 5 0 1 0-7.1 7.1l8.3 8.3 8.3-8.3a5 5 0 0 0 0-7.1Z" />
    ),
    thyroid: (
      <>
        <path d="M6 5c0 5 1 9 6 9s6-4 6-9" />
        <path d="M12 14v5M9 19h6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.4 3 8.2 7 9 4-.8 7-4.6 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2.5" />
        <path d="M8 10V8a4 4 0 0 1 8 0v2M12 14v2.5" />
      </>
    ),
    hand: (
      <>
        <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" />
        <path d="M11 11.5V4.8a1.5 1.5 0 0 1 3 0V12" />
        <path d="M14 11.5v-5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.5a6 6 0 0 1-5.2-3L4 15.4a1.6 1.6 0 0 1 2.6-1.8L8 15" />
      </>
    ),
    chip: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" />
      </>
    ),
    badge: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="m8.5 13.5-1 7.5 4.5-2.5 4.5 2.5-1-7.5" />
      </>
    ),
    grid: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
      </>
    ),
    pulse: <path d="M2 12h4l2.5-7 4 14L15 12h7" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
    sono: (
      <>
        <path d="M4 15a9 9 0 0 1 16 0" />
        <path d="M8 15a5 5 0 0 1 8 0" />
        <circle cx="12" cy="15" r="1.2" />
      </>
    ),
    echo: (
      <>
        <path d="M3 12h3l2-4 3 8 2.5-6 1.5 3h6" />
        <path d="M18 6.5v.01" />
      </>
    ),
    xray: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2.5" />
        <path d="M12 3v18M8 8h8M8 13h8M8 17.5h8" />
      </>
    ),
    ecg: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
        <path d="M5.5 12H8l1.5-3 2 6 1.5-3h5.5" />
      </>
    ),
    bmd: (
      <>
        <path d="M6 4c1.6 0 2.6 1 2.6 2.2S8 8 8 9.4c0 1.8 1.6 2.4 1.6 4.2S8 16 8 17.6 6.9 20 5.4 20" />
        <path d="M18 4c-1.6 0-2.6 1-2.6 2.2S16 8 16 9.4c0 1.8-1.6 2.4-1.6 4.2S16 16 16 17.6 17.1 20 18.6 20" />
        <path d="M9.6 12h4.8" />
      </>
    ),
    mammo: (
      <>
        <path d="M4 17c0-5.5 3.6-10 8-10s8 4.5 8 10" />
        <circle cx="12" cy="14" r="2" />
      </>
    ),
    phone: (
      <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2C11.4 19.1 4.9 12.6 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    close: <path d="M6 6l12 12M18 6 6 18" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    arrowR: <path d="M5 12h13M13 6l6 6-6 6" />,
    arrowL: <path d="M19 12H6M11 18l-6-6 6-6" />,
    check: <path d="m5 12.5 4.5 4.5L19 7" />,
    up: <path d="m6 15 6-6 6 6" />,
    play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
    star: (
      <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z" />
    ),
    home: (
      <>
        <path d="m4 10.5 8-6.5 8 6.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8.5Z" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),
    drop: <path d="M12 3s5.5 6.1 5.5 9.6a5.5 5.5 0 0 1-11 0C6.5 9.1 12 3 12 3Z" />,
    wa: (
      <path d="M20 11.7a8 8 0 0 1-11.9 7L4 20l1.4-4a8 8 0 1 1 14.6-4.3ZM9.3 8.4c-.2-.5-.4-.5-.6-.5h-.5a1 1 0 0 0-.8.4 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 3.9c2.2.9 2.2.6 2.6.5a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c-.1-.1-.3-.2-.6-.3l-2-1a.7.7 0 0 0-.8.1l-.8 1a.6.6 0 0 1-.7.1 8.3 8.3 0 0 1-2.5-1.5 9.2 9.2 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6a2.2 2.2 0 0 0 .3-.5.6.6 0 0 0 0-.6l-.9-2Z" />
    ),
    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
        <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
      </>
    ),
    sparkle: (
      <path d="M12 3.5 13.6 9l5.4 1.6L13.6 12 12 17.5 10.4 12 5 10.6 10.4 9 12 3.5Z" />
    ),
    doc: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </>
    ),
    truck: (
      <>
        <path d="M3 7h10v9H3zM13 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </>
    ),
  };
  return <svg {...p}>{paths[name] || paths.sparkle}</svg>;
};

/* ============================================================================
   7. UI PRIMITIVES
   ========================================================================== */

const Btn = ({
  as = "button",
  variant = "solid",
  size = "md",
  className = "",
  children,
  icon,
  ...rest
}) => {
  const Tag = as;
  const sizes = {
    sm: "px-4 py-2 text-[13px] gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-[15px] gap-2.5",
  };
  const variants = {
    solid:
      "text-white bg-[linear-gradient(120deg,#065f53,#0e8f7e_55%,#14b8a6)] shadow-[0_14px_34px_-14px_rgba(6,95,83,.75)] hover:shadow-[0_22px_48px_-16px_rgba(6,95,83,.85)] hover:-translate-y-0.5",
    gold:
      "text-[#3a2506] bg-[linear-gradient(120deg,#f3c07b,#d99a4e_60%,#f0b76a)] shadow-[0_14px_34px_-14px_rgba(217,154,78,.8)] hover:-translate-y-0.5",
    ghost:
      "text-[#065f53] bg-white/80 border border-[#0e8f7e]/25 hover:border-[#0e8f7e]/60 hover:bg-white hover:-translate-y-0.5",
    outline:
      "text-white border border-white/45 bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 backdrop-blur-sm",
    wa: "text-white bg-[linear-gradient(120deg,#128c7e,#25d366)] shadow-[0_14px_34px_-14px_rgba(18,140,126,.8)] hover:-translate-y-0.5",
  };
  return (
    <Tag
      className={`sheen inline-flex items-center justify-center rounded-full font-semibold tracking-tight
        transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] active:scale-[.97] ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {icon && <Icon name={icon} className="w-4 h-4" />}
    </Tag>
  );
};

const Eyebrow = ({ children, light }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] font-medium tracking-tight ${light
      ? "bg-white/12 text-white/90 border border-white/25"
      : "bg-[#0e8f7e]/10 text-[#065f53] border border-[#0e8f7e]/20"
      }`}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0e8f7e]" />
    </span>
    {children}
  </span>
);

const SectionHead = ({ eyebrow, title, sub, light, align = "center" }) => (
  <div
    className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""
      } mb-12 sm:mb-16`}
  >
    {eyebrow && (
      <Reveal>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </Reveal>
    )}
    <Reveal delay={90}>
      <h2
        className={`font-display mt-5 text-[clamp(1.9rem,4.4vw,3.05rem)] leading-[1.08] font-semibold tracking-[-.02em] ${light ? "text-white" : "text-[#052e2b]"
          }`}
      >
        {title}
      </h2>
    </Reveal>
    {sub && (
      <Reveal delay={170}>
        <p
          className={`mt-4 text-[15.5px] leading-relaxed ${light ? "text-white/70" : "text-[#052e2b]/62"
            }`}
        >
          {sub}
        </p>
      </Reveal>
    )}
  </div>
);

/* ============================================================================
   8. BOOKING CONTEXT + MODALS
   ========================================================================== */

const BookingCtx = createContext(null);
const useBooking = () => useContext(BookingCtx);

function Modal({ open, onClose, children, size = "lg", label }) {
  useScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className="absolute inset-0 bg-[#031e1c]/70 backdrop-blur-md a-fade"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${widths[size]} max-h-[92vh] overflow-y-auto no-scrollbar
          rounded-t-[28px] sm:rounded-[28px] bg-white shadow-[0_40px_120px_-30px_rgba(3,30,28,.7)] a-pop`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full
            bg-[#052e2b]/6 text-[#052e2b] transition hover:rotate-90 hover:bg-[#052e2b]/12 duration-500"
        >
          <Icon name="close" className="w-[18px] h-[18px]" />
        </button>
        {children}
      </div>
    </div>
  );
}

const Field = ({ label, children, required }) => (
  <label className="block">
    <span className="mb-1.5 block text-[12.5px] font-medium text-[#052e2b]/70">
      {label} {required && <span className="text-[#c2410c]">*</span>}
    </span>
    {children}
  </label>
);

const inputCls =
  "w-full rounded-xl border border-[#065f53]/16 bg-[#f7fbfa] px-4 py-3 text-[14.5px] text-[#052e2b] " +
  "placeholder:text-[#052e2b]/35 transition-all duration-300 " +
  "focus:border-[#0e8f7e] focus:bg-white focus:shadow-[0_0_0_4px_rgba(45,212,191,.16)] focus:outline-none";

/* -------- Appointment / package / radiology booking -------- */
function BookingModal() {
  const { booking, closeBooking, showThanks } = useBooking();
  const open = !!booking;
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) setForm({});
  }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    const lines = [
      `*New booking — ${BRAND.name}*`,
      `Service: ${booking.title}`,
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.dob && `DOB: ${form.dob}`,
      form.gender && `Gender: ${form.gender}`,
      form.date && `Preferred date: ${form.date}`,
      form.time && `Preferred time: ${form.time}`,
      form.location && `Location: ${form.location}`,
      form.history && `Medical history: ${form.history}`,
      form.referred && `Referred by: ${form.referred}`,
    ].filter(Boolean);

    window.open(waLink(lines.join("\n")), "_blank");
    setTimeout(() => {
      setSending(false);
      closeBooking();
      showThanks();
    }, 550);
  };

  if (!open) return null;
  const isRadiology = booking.kind === "radiology";

  return (
    <Modal open={open} onClose={closeBooking} label="Book appointment">
      <div className="relative overflow-hidden rounded-t-[28px] bg-[linear-gradient(120deg,#052e2b,#065f53_52%,#0e8f7e)] px-6 py-8 sm:px-9">
        <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#2dd4bf]/22 blur-2xl a-float" />
        <div className="absolute -left-10 bottom-[-60px] h-40 w-40 rounded-full bg-white/10 blur-2xl a-float-slow" />
        <p className="relative text-[12.5px] font-medium tracking-tight text-white/65">
          {isRadiology ? "Radiology appointment" : "Book your slot"}
        </p>
        <h3 className="font-display relative mt-1.5 text-[26px] font-semibold leading-tight text-white">
          {booking.title}
        </h3>
        {booking.price && (
          <p className="relative mt-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 text-sm text-white">
            <s className="text-white/45">{rupee(booking.mrp)}</s>
            <span className="font-semibold">{rupee(booking.price)}</span>
          </p>
        )}
      </div>

      <form onSubmit={submit} className="space-y-6 px-6 py-7 sm:px-9">
        <div>
          <p className="font-display mb-4 text-[17px] font-semibold">
            Personal information
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" required>
              <input required className={inputCls} value={form.name || ""} onChange={set("name")} placeholder="Your full name" />
            </Field>
            <Field label="Phone number" required>
              <input required type="tel" pattern="[0-9+ ]{10,15}" className={inputCls} value={form.phone || ""} onChange={set("phone")} placeholder="10-digit mobile number" />
            </Field>
            <Field label="Date of birth" required>
              <input required type="date" className={inputCls} value={form.dob || ""} onChange={set("dob")} />
            </Field>
            <Field label="Gender" required>
              <select required className={inputCls} value={form.gender || ""} onChange={set("gender")}>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </Field>
          </div>
        </div>

        <div>
          <p className="font-display mb-4 text-[17px] font-semibold">
            Appointment details
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Preferred date" required>
              <input required type="date" className={inputCls} value={form.date || ""} onChange={set("date")} />
            </Field>
            {isRadiology ? (
              <Field label="Location" required>
                <select required className={inputCls} value={form.location || ""} onChange={set("location")}>
                  <option value="">Select location</option>
                  {LOCATIONS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </Field>
            ) : (
              <Field label="Preferred time" required>
                <input required type="time" className={inputCls} value={form.time || ""} onChange={set("time")} />
              </Field>
            )}
          </div>
        </div>

        <div>
          <p className="font-display mb-4 text-[17px] font-semibold">
            Additional information
          </p>
          <div className="grid gap-4">
            <Field label="Medical history">
              <textarea rows={3} className={inputCls} value={form.history || ""} onChange={set("history")} placeholder="Any existing conditions, medication or symptoms" />
            </Field>
            <Field label="Referred doctor name">
              <input className={inputCls} value={form.referred || ""} onChange={set("referred")} placeholder="Optional" />
            </Field>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-[#052e2b]/50">
            Our team confirms every booking on call within 15 minutes.
          </p>
          <Btn type="submit" size="lg" disabled={sending} icon="arrowR" className="w-full sm:w-auto">
            {sending ? "Sending…" : "Book appointment"}
          </Btn>
        </div>
      </form>
    </Modal>
  );
}

/* -------- Callback modal -------- */
function CallbackModal() {
  const { callback, closeCallback, showThanks } = useBooking();
  const [form, setForm] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const msg = [
      `*Callback request — ${BRAND.name}*`,
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.service && `Service: ${form.service}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank");
    closeCallback();
    showThanks();
  };

  return (
    <Modal open={callback} onClose={closeCallback} size="md" label="Request a callback">
      <div className="relative overflow-hidden rounded-t-[28px] bg-[linear-gradient(120deg,#065f53,#0e8f7e)] px-6 py-8 sm:px-8">
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#2dd4bf]/25 blur-2xl a-float" />
        <h3 className="font-display relative text-[26px] font-semibold text-white">
          Get a callback from us
        </h3>
        <p className="relative mt-2 text-sm text-white/72">
          Leave your number — we call back within 15 minutes, 24×7.
        </p>
      </div>
      <form onSubmit={submit} className="space-y-4 px-6 py-7 sm:px-8">
        <Field label="Full name" required>
          <input required className={inputCls} value={form.name || ""} onChange={set("name")} placeholder="Your full name" />
        </Field>
        <Field label="Phone number" required>
          <input required type="tel" className={inputCls} value={form.phone || ""} onChange={set("phone")} placeholder="10-digit mobile number" />
        </Field>
        <Field label="Email">
          <input type="email" className={inputCls} value={form.email || ""} onChange={set("email")} placeholder="you@example.com" />
        </Field>
        <Field label="Service you need">
          <select className={inputCls} value={form.service || ""} onChange={set("service")}>
            <option value="">Select a service</option>
            <option>Blood tests</option>
            <option>Health packages</option>
            <option>Home collection</option>
            <option>Radiology</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Message">
          <textarea rows={3} className={inputCls} value={form.message || ""} onChange={set("message")} placeholder="Optional" />
        </Field>
        <div className="flex gap-3 pt-2">
          <Btn type="submit" size="lg" icon="arrowR" className="flex-1">
            Request callback
          </Btn>
          <Btn type="button" variant="ghost" size="lg" onClick={closeCallback}>
            Close
          </Btn>
        </div>
      </form>
    </Modal>
  );
}

/* -------- Thank you modal -------- */
function ThanksModal() {
  const { thanks, closeThanks } = useBooking();
  return (
    <Modal open={thanks} onClose={closeThanks} size="sm" label="Thank you">
      <div className="px-8 py-12 text-center">
        <div className="relative mx-auto grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 rounded-full bg-[#2dd4bf]/35" style={{ animation: "pulseRing 2s ease-out infinite" }} />
          <span className="absolute inset-0 rounded-full bg-[#2dd4bf]/25" style={{ animation: "pulseRing 2s ease-out .6s infinite" }} />
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-[linear-gradient(135deg,#065f53,#14b8a6)] text-white">
            <Icon name="check" className="w-9 h-9" stroke={2.4} />
          </span>
        </div>
        <h3 className="font-display mt-7 text-[27px] font-semibold">Thank you</h3>
        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-[#052e2b]/62">
          Your request has reached us. Our team will contact you shortly on the
          number you shared.
        </p>
        <Btn size="lg" className="mt-7 w-full" onClick={closeThanks}>
          Done
        </Btn>
      </div>
    </Modal>
  );
}

/* ============================================================================
   9. CHROME — progress bar, navbar, floating actions
   ========================================================================== */

function ScrollProgress() {
  const [p, setP] = useState(0);
  useRafScroll(
    useCallback((y) => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (y / max) * 100 : 0);
    }, [])
  );
  return (
    <div className="fixed inset-x-0 top-0 z-[130] h-[3px] bg-transparent">
      <div
        className="h-full bg-[linear-gradient(90deg,#065f53,#0e8f7e,#2dd4bf)] shadow-[0_0_14px_rgba(45,212,191,.7)]"
        style={{ width: `${p}%`, transition: "width .12s linear" }}
      />
    </div>
  );
}

const Logo = ({ light }) => (
  <a href="#home" className="group flex items-center gap-3">
    <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-white shadow-[0_10px_26px_-10px_rgba(6,95,83,.8)]">
      
      <img
        src={siLogo}
        alt="S I Healthcare Lab"
        className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
        loading="eager"
        decoding="async"
      />

    </span>

    <span className="leading-none">
      <span
        className={`font-display block text-[16.5px] font-semibold tracking-[-.01em] ${
          light ? "text-white" : "text-[#052e2b]"
        }`}
      >
        {BRAND.name}
      </span>

      <span
        className={`mt-1 block text-[11px] tracking-tight ${
          light ? "text-white/60" : "text-[#052e2b]/50"
        }`}
      >
        {BRAND.tagline}
      </span>
    </span>
  </a>
);


function Navbar() {
  const { openCallback } = useBooking();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  useScrollLock(open);

  useRafScroll(useCallback((y) => setSolid(y > 24), []));

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[110] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${solid
          ? "glass border-b border-[#065f53]/10 py-2.5 shadow-[0_18px_40px_-30px_rgba(5,46,43,.6)]"
          : "border-b border-transparent bg-[linear-gradient(180deg,rgba(3,30,28,.55),transparent)] py-5"
          }`}
      >
        <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo light={!solid} />

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  data-active={active === n.href}
                  className={`link-underline text-[14.5px] font-medium transition-colors duration-300 ${solid
                    ? "text-[#052e2b]/72 hover:text-[#065f53] data-[active=true]:text-[#065f53]"
                    : "text-white/80 hover:text-white data-[active=true]:text-white"
                    }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:+91${BRAND.phone}`}
              className={`hidden items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-[400ms] hover:-translate-y-0.5 md:inline-flex ${solid
                ? "border-[#0e8f7e]/22 bg-white/70 text-[#065f53] hover:border-[#0e8f7e]/60"
                : "border-white/30 bg-white/10 text-white hover:border-white/70 hover:bg-white/20"
                }`}
            >
              <Icon name="phone" className="w-4 h-4" />
              {BRAND.phoneDisplay}
            </a>
            <Btn
              as="a"
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              variant="wa"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Icon name="wa" className="w-4 h-4" />
              WhatsApp
            </Btn>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${solid
                ? "border-[#065f53]/15 bg-white/80 text-[#052e2b] hover:bg-white"
                : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              <Icon name="menu" className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[125] lg:hidden ${open ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#031e1c]/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"
            }`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[linear-gradient(170deg,#052e2b,#064a43_60%,#065f53)] px-7 py-8 transition-transform duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)] ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-start justify-between">
            <Logo light />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:rotate-90 duration-500"
            >
              <Icon name="close" className="w-[18px] h-[18px]" />
            </button>
          </div>

          <ul className="mt-10 space-y-1">
            {NAV.map((n, i) => (
              <li
                key={n.href}
                style={{
                  animation: open
                    ? `riseIn .6s cubic-bezier(.16,1,.3,1) ${120 + i * 55}ms both`
                    : "none",
                }}
              >
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 text-[17px] font-medium text-white/85 transition-all duration-[400ms] hover:bg-white/8 hover:pl-6 hover:text-white"
                >
                  {n.label}
                  <Icon
                    name="arrowR"
                    className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-[400ms] group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3 pt-8">
            <Btn as="a" href={waLink()} target="_blank" rel="noreferrer" variant="wa" size="lg" className="w-full">
              <Icon name="wa" className="w-[18px] h-[18px]" /> WhatsApp enquiry
            </Btn>
            <Btn
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                setOpen(false);
                openCallback();
              }}
            >
              Request a callback
            </Btn>
            <a
              href={`tel:+91${BRAND.phone}`}
              className="flex items-center justify-center gap-2 pt-2 text-[15px] font-semibold text-white/80"
            >
              <Icon name="phone" className="w-4 h-4" /> {BRAND.phoneDisplay}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}

function FloatingActions() {
  const { openCallback } = useBooking();
  const [up, setUp] = useState(false);
  useRafScroll(useCallback((y) => setUp(y > 700), []));

  return (
    <div className="fixed bottom-5 right-5 z-[115] flex flex-col items-end gap-3">
      <button
        onClick={() => {
          const start = window.scrollY;
          const t0 = performance.now();
          const dur = Math.min(620, Math.max(300, start * 0.28));
          const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
          const step = (now) => {
            const t = Math.min((now - t0) / dur, 1);
            window.scrollTo(0, start * (1 - ease(t)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }}
        aria-label="Back to top"
        className={`grid h-11 w-11 place-items-center rounded-full border border-[#065f53]/15 bg-white text-[#065f53] shadow-[0_14px_34px_-16px_rgba(5,46,43,.6)] transition-all duration-500 hover:-translate-y-1 ${up ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
      >
        <Icon name="up" className="w-5 h-5" />
      </button>

      <button
        onClick={openCallback}
        aria-label="Request a callback"
        className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#065f53] shadow-[0_16px_38px_-16px_rgba(5,46,43,.65)] transition-all duration-500 hover:-translate-y-1 hover:text-[#0e8f7e]"
      >
        <Icon name="phone" className="w-5 h-5" />
      </button>

      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#128c7e,#25d366)] text-white shadow-[0_18px_44px_-14px_rgba(18,140,126,.9)] transition-transform duration-500 hover:scale-110"
      >
        <span className="absolute inset-0 rounded-full bg-[#25d366]/55" style={{ animation: "pulseRing 2.4s ease-out infinite" }} />
        <Icon name="wa" className="relative w-7 h-7" stroke={1.4} />
        <span className="pointer-events-none absolute right-[110%] whitespace-nowrap rounded-full bg-[#052e2b] px-3.5 py-2 text-[12.5px] font-medium text-white opacity-0 shadow-lg transition-all duration-[400ms] group-hover:opacity-100 group-hover:-translate-x-1">
          Chat with us
        </span>
      </a>
    </div>
  );
}

/* ============================================================================
   10. HERO — image + video slider
   ========================================================================== */

function Hero() {
  const { openBooking } = useBooking();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const n = HERO_SLIDES.length;
  const timer = useRef(null);
  const heroRef = useRef(null);

  const go = useCallback((idx) => setI((idx + n) % n), [n]);

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setTimeout(() => go(i + 1), HERO_SLIDES[i].type === "video" ? 9500 : 6500);
    return () => clearTimeout(timer.current);
  }, [i, paused, go, reduced]);

  // subtle parallax on the hero content (rAF-throttled, writes CSS vars only)
  useRafScroll(
    useCallback(
      (sy) => {
        const el = heroRef.current;
        if (!el || reduced) return;
        const y = Math.min(sy, 700);
        el.style.setProperty("--py", `${y * 0.16}px`);
        el.style.setProperty("--pop", `${Math.max(0, 1 - y / 900)}`);
      },
      [reduced]
    )
  );

  const s = HERO_SLIDES[i];

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#031e1c]"
    >
      {/* slides */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((sl, idx) =>
          idx === i ? (
            <div
              key={idx}
              aria-hidden={false}
              className="absolute inset-0 a-fade"
            >
              {sl.type === "video" ? (
                <video
                  className="h-full w-full object-cover"
                  src={sl.src}
                  poster={sl.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              ) : (
                <img
                  src={sl.src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  className={`h-full w-full object-cover ${!reduced ? "a-kenburns" : ""}`}
                />
              )}
            </div>
          ) : null
        )}
      </div>

      {/* overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,30,28,.94)_0%,rgba(5,46,43,.82)_42%,rgba(6,95,83,.35)_75%,rgba(3,30,28,.55)_100%)]" />
      <div className="absolute inset-0 grid-lines opacity-[.35] mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full bg-[#2dd4bf]/16 blur-[90px] a-blob" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[#0e8f7e]/22 blur-[100px] a-float-slow" />

      {/* ECG line */}
      <svg
        className="pointer-events-none absolute bottom-[18%] left-0 hidden w-full opacity-[.28] md:block"
        height="90"
        viewBox="0 0 1200 90"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="ecg-path"
          d="M0 45h140l22-30 20 60 24-44 18 14h120l22-30 20 60 24-44 18 14h140l22-30 20 60 24-44 18 14h140l22-30 20 60 24-44 18 14h180"
          stroke="#2dd4bf"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* content */}
      <div
        className="relative mx-auto w-full max-w-[1240px] px-5 pb-32 pt-36 sm:px-8 sm:pb-36"
        style={{ transform: "translateY(var(--py,0))", opacity: "var(--pop,1)" }}
      >
        <div className="max-w-[720px]">
          <div key={`k-${i}`} className="a-rise">
            <Eyebrow light>{s.kicker}</Eyebrow>
          </div>

          <h1
            key={`t-${i}`}
            className="font-display a-rise mt-6 text-[clamp(2.3rem,6.2vw,4.3rem)] font-semibold leading-[1.02] tracking-[-.025em] text-white"
            style={{ animationDelay: "90ms" }}
          >
            {s.title}
          </h1>

          <p
            key={`s-${i}`}
            className="a-rise mt-5 max-w-[540px] text-[clamp(1rem,1.5vw,1.16rem)] leading-relaxed text-white/72"
            style={{ animationDelay: "180ms" }}
          >
            {s.sub}
          </p>

          <div className="a-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "260ms" }}>
            <Btn
              size="lg"
              icon="arrowR"
              onClick={() => openBooking({ title: "Home sample collection", kind: "appointment" })}
            >
              Book an appointment
            </Btn>
            <Btn as="a" href={waLink()} target="_blank" rel="noreferrer" variant="outline" size="lg">
              <Icon name="wa" className="w-[18px] h-[18px]" />
              WhatsApp enquiry
            </Btn>
          </div>

          <div className="a-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] text-white/60" style={{ animationDelay: "340ms" }}>
            {["Free home collection", "NABL certified labs", "Reports in 6 hours"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#2dd4bf]" stroke={2.4} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* slider controls */}
        <div className="mt-14 flex items-center gap-5">
          <div className="flex gap-2">
            <button
              onClick={() => go(i - 1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-all duration-[400ms] hover:-translate-x-0.5 hover:bg-white/15"
            >
              <Icon name="arrowL" className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={() => go(i + 1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-all duration-[400ms] hover:translate-x-0.5 hover:bg-white/15"
            >
              <Icon name="arrowR" className="w-[18px] h-[18px]" />
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500"
                style={{ width: idx === i ? 56 : 18 }}
              >
                {idx === i && (
                  <span
                    key={`p-${i}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-[#2dd4bf]"
                    style={{
                      animation: reduced
                        ? "none"
                        : `grow ${HERO_SLIDES[i].type === "video" ? 9.5 : 6.5}s linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                      width: reduced ? "100%" : undefined,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <span className="ml-auto hidden text-[13px] tabular-nums text-white/45 sm:block">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>
      </div>

      <style>{`@keyframes grow{from{width:0}to{width:100%}}`}</style>

      {/* stats strip */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="glass-dark grid grid-cols-2 gap-px overflow-hidden rounded-t-[26px] border border-b-0 border-white/12 md:grid-cols-4">
            {STATS.map((st, idx) => (
              <div
                key={st.label}
                className="group relative px-5 py-6 text-center transition-colors duration-500 hover:bg-white/8 sm:px-6"
                style={{ animation: `riseIn .8s cubic-bezier(.16,1,.3,1) ${400 + idx * 110}ms both` }}
              >
                <p className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold leading-none text-white">
                  <Counter to={st.value} suffix={st.suffix} text={st.text} />
                </p>
                <p className="mt-2 text-[12.5px] text-white/58">{st.label}</p>
                <span className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-[linear-gradient(90deg,transparent,#2dd4bf,transparent)] transition-transform duration-[600ms] group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   11. LAB PARTNERS marquee
   ========================================================================== */

function LabPartners() {
  const row = [...LAB_PARTNERS, ...LAB_PARTNERS];
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow>Partner network</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display mt-5 text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-tight tracking-[-.02em]">
            Blood tests processed at premium labs
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-[#052e2b]/60">
            Same accredited laboratories, at highly discounted and affordable rates.
          </p>
        </Reveal>
      </div>

      <div className="marquee-wrap relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(90deg,#fff,transparent)] sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(270deg,#fff,transparent)] sm:w-40" />
        <div className="marquee-track gap-4 px-2">
          {row.map((name, idx) => (
            <div
              key={idx}
              className="group flex shrink-0 items-center gap-3 rounded-2xl border border-[#065f53]/10 bg-[#f7fbfa] px-7 py-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0e8f7e]/40 hover:bg-white hover:shadow-[0_22px_50px_-28px_rgba(5,46,43,.6)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#065f53,#14b8a6)] text-white transition-transform duration-500 group-hover:rotate-6">
                <Icon name="drop" className="w-[18px] h-[18px]" />
              </span>
              <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-[#052e2b]/80">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-[24px] border border-[#0e8f7e]/18 bg-[linear-gradient(120deg,#f2f8f6,#e6f5f1)] px-7 py-6 sm:flex-row">
            <p className="text-center text-[16px] font-medium text-[#052e2b] sm:text-left">
              Can't find the test you are looking for?
            </p>
            <Btn
              as="a"
              href={waLink("Hi, I am looking for a test that is not listed on your website.")}
              target="_blank"
              rel="noreferrer"
              variant="wa"
            >
              <Icon name="wa" className="w-4 h-4" /> Get help on WhatsApp
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================================
   12. HOME VISIT band
   ========================================================================== */

function HomeVisit() {
  const { openBooking } = useBooking();
  const tilt = useTilt(6);
  return (
    <section id="home-visit" className="relative overflow-hidden bg-[#052e2b] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-[#0e8f7e]/25 blur-[110px] a-blob" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#2dd4bf]/14 blur-[100px] a-float-slow" />
      <div className="absolute inset-0 grid-lines opacity-[.5] mix-blend-overlay" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow light>Home sample collection</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-6 text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[1.06] tracking-[-.02em] text-white">
              Book a home visit for your blood test
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/68">
              A trained phlebotomist reaches you with sterile, single-use kits.
              No travel, no waiting room, no collection charges.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {[
              { icon: "truck", t: "Slot within 60 minutes" },
              { icon: "shield", t: "Sterile single-use kits" },
              { icon: "doc", t: "Digitally signed reports" },
              { icon: "clock", t: "6 AM – 10 PM, all week" },
            ].map((f, idx) => (
              <Reveal key={f.t} delay={200 + idx * 70}>
                <div className="group flex items-center gap-3 rounded-2xl border border-white/12 bg-white/6 px-4 py-3.5 transition-all duration-500 hover:-translate-y-1 hover:border-[#2dd4bf]/45 hover:bg-white/10">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#2dd4bf]/16 text-[#2dd4bf] transition-transform duration-500 group-hover:scale-110">
                    <Icon name={f.icon} className="w-[18px] h-[18px]" />
                  </span>
                  <span className="text-[14px] text-white/82">{f.t}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={480}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn
                as="a"
                href={waLink("Hi, I want to book a home visit for a blood test.")}
                target="_blank"
                rel="noreferrer"
                variant="wa"
                size="lg"
              >
                <Icon name="wa" className="w-[18px] h-[18px]" /> Book on WhatsApp
              </Btn>
              <Btn
                variant="outline"
                size="lg"
                icon="arrowR"
                onClick={() => openBooking({ title: "Home visit — blood test", kind: "appointment" })}
              >
                Fill booking form
              </Btn>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} y={40}>
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="glow-follow relative rounded-[30px] border border-white/12 p-2 transition-transform duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={IMG.homeVisit}
              alt="Phlebotomist collecting a blood sample at a patient's home"
              loading="lazy"
              decoding="async"
              className="h-[340px] w-full rounded-[24px] object-cover sm:h-[440px]"
            />
            <div className="absolute inset-2 rounded-[24px] bg-[linear-gradient(180deg,transparent_45%,rgba(3,30,28,.85))]" />

            <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-[22px] font-semibold text-white">
                  Collection at ₹0
                </p>
                <p className="mt-1 text-[13px] text-white/62">
                  Across {LOCATIONS.length}+ areas in {BRAND.city}
                </p>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/92 text-[#065f53] a-bob">
                <Icon name="home" className="w-6 h-6" />
              </span>
            </div>

            <div className="absolute -left-4 top-8 hidden rounded-2xl bg-white px-4 py-3 shadow-[0_20px_50px_-20px_rgba(3,30,28,.7)] sm:block a-float">
              <p className="text-[11.5px] text-[#052e2b]/55">Average arrival</p>
              <p className="font-display text-[19px] font-semibold text-[#065f53]">
                42 min
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================================
   13. CATEGORIES
   ========================================================================== */

function Categories({ onPick }) {
  return (
    <section className="relative bg-[#f2f8f6] py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Popular concerns"
          title="Start with what's worrying you"
          sub="Pick a concern and we'll show the relevant tests, prices and preparation."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CATEGORIES.map((c, idx) => (
            <Reveal key={c.name} delay={idx * 60}>
              <button
                onClick={() => onPick(c.q)}
                className="card-soft group relative h-full w-full overflow-hidden rounded-[22px] p-5 text-left sm:p-6"
              >
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#2dd4bf]/10 transition-all duration-700 group-hover:scale-[2.6] group-hover:bg-[#2dd4bf]/14" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#065f53,#14b8a6)] text-white shadow-[0_12px_28px_-12px_rgba(6,95,83,.8)] transition-transform duration-[600ms] group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={c.icon} className="w-6 h-6" />
                </span>
                <h3 className="font-display relative mt-5 text-[16.5px] font-semibold leading-snug tracking-tight">
                  {c.name}
                </h3>
                <p className="relative mt-1.5 text-[13px] leading-relaxed text-[#052e2b]/55">
                  {c.desc}
                </p>
                <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0e8f7e] opacity-0 transition-all duration-500 group-hover:opacity-100">
                  View tests <Icon name="arrowR" className="w-3.5 h-3.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   14. BLOOD TESTS
   ========================================================================== */

function TestCard({ t, onBook, delay }) {
  const tilt = useTilt(5);
  const off = Math.round(((t.mrp - t.price) / t.mrp) * 100);
  return (
    <Reveal delay={delay}>
      <article
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="card-soft glow-follow group relative flex h-full flex-col rounded-[22px] p-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        {off > 0 && (
          <span className="absolute right-5 top-5 rounded-full bg-[#d99a4e]/14 px-2.5 py-1 text-[11px] font-semibold text-[#8a5a15]">
            {off}% off
          </span>
        )}

        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0e8f7e]/10 text-[#065f53] transition-all duration-500 group-hover:bg-[#0e8f7e] group-hover:text-white">
          <Icon name="drop" className="w-5 h-5" />
        </span>

        <h3 className="font-display mt-4 pr-14 text-[16px] font-semibold leading-snug tracking-tight">
          {t.name}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[#052e2b]/52">
          Helps screen and monitor health related to {t.key}.
        </p>

        <div className="mt-5 flex items-end gap-2.5">
          <span className="shimmer-price font-display text-[26px] font-semibold leading-none">
            {rupee(t.price)}
          </span>
          <s className="pb-0.5 text-[14px] text-[#052e2b]/35">{rupee(t.mrp)}</s>
        </div>

        <p className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#0e8f7e]">
          <Icon name="clock" className="w-3.5 h-3.5" /> Report within 6 hours
        </p>

        <div className="mt-5 flex gap-2 pt-1">
          <Btn size="sm" className="flex-1" onClick={() => onBook(t)}>
            Book test
          </Btn>
          <a
            href={waLink(`Hi, I want to book: ${t.name} (${rupee(t.price)})`)}
            target="_blank"
            rel="noreferrer"
            aria-label="Enquire on WhatsApp"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#25d366]/35 text-[#128c7e] transition-all duration-[400ms] hover:-translate-y-0.5 hover:bg-[#25d366] hover:text-white"
          >
            <Icon name="wa" className="w-[18px] h-[18px]" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function BloodTests({ query, setQuery }) {
  const { openBooking } = useBooking();
  const [group, setGroup] = useState("All");
  const [limit, setLimit] = useState(12);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TESTS.filter(
      (t) =>
        (group === "All" || t.group === group) &&
        (!q || t.name.toLowerCase().includes(q) || t.group.toLowerCase().includes(q))
    );
  }, [query, group]);

  useEffect(() => setLimit(12), [query, group]);

  return (
    <section id="tests" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-[#2dd4bf]/8 blur-[110px] a-blob" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Transparent pricing"
          title="Blood tests, collected from your home"
          sub="Every test below includes free home collection and a digitally signed report."
        />

        {/* search */}
        <Reveal>
          <div className="mx-auto mb-7 max-w-2xl">
            <div className="group relative">
              <Icon
                name="search"
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#052e2b]/35 transition-colors group-focus-within:text-[#0e8f7e]"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a test — CBC, thyroid, vitamin D, dengue…"
                className="w-full rounded-full border border-[#065f53]/14 bg-[#f7fbfa] py-4 pl-14 pr-14 text-[15px] transition-all duration-[400ms] placeholder:text-[#052e2b]/35 focus:border-[#0e8f7e] focus:bg-white focus:shadow-[0_0_0_5px_rgba(45,212,191,.15)] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-[#052e2b]/6 text-[#052e2b]/60 transition hover:bg-[#052e2b]/12"
                >
                  <Icon name="close" className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* group chips */}
        <Reveal delay={80}>
          <div className="no-scrollbar -mx-5 mb-9 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {TEST_GROUPS.map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-all duration-[400ms] ${group === g
                  ? "border-transparent bg-[linear-gradient(120deg,#065f53,#0e8f7e)] text-white shadow-[0_12px_28px_-14px_rgba(6,95,83,.9)]"
                  : "border-[#065f53]/14 bg-[#f7fbfa] text-[#052e2b]/65 hover:-translate-y-0.5 hover:border-[#0e8f7e]/45 hover:text-[#065f53]"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Reveal>

        {list.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#065f53]/22 px-6 py-16 text-center">
            <p className="font-display text-[19px] font-semibold">
              No test matches "{query}"
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-[#052e2b]/55">
              We run many tests that aren't listed here. Send us the name on
              WhatsApp and we'll share the price right away.
            </p>
            <Btn
              as="a"
              href={waLink(`Hi, do you offer this test: ${query}?`)}
              target="_blank"
              rel="noreferrer"
              variant="wa"
              className="mt-6"
            >
              <Icon name="wa" className="w-4 h-4" /> Ask on WhatsApp
            </Btn>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.slice(0, limit).map((t, idx) => (
                <TestCard
                  key={t.id}
                  t={t}
                  delay={(idx % 3) * 80}
                  onBook={(test) =>
                    openBooking({
                      title: test.name,
                      kind: "test",
                      price: test.price,
                      mrp: test.mrp,
                    })
                  }
                />
              ))}
            </div>

            {limit < list.length && (
              <div className="mt-11 text-center">
                <Btn variant="ghost" size="lg" onClick={() => setLimit((l) => l + 12)}>
                  Show more tests
                  <span className="ml-1 rounded-full bg-[#0e8f7e]/12 px-2 py-0.5 text-[12px]">
                    {list.length - limit}
                  </span>
                </Btn>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ============================================================================
   15. HEALTH PACKAGES
   ========================================================================== */

function PackageCard({ p, idx }) {
  const { openBooking } = useBooking();
  const [more, setMore] = useState(false);
  const tilt = useTilt(5);
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <Reveal delay={(idx % 3) * 90} y={34}>
      <article
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`glow-follow relative flex h-full flex-col overflow-hidden rounded-[26px] p-7 transition-all duration-350 ease-[cubic-bezier(.16,1,.3,1)] ${p.popular
          ? "border border-[#0e8f7e]/45 bg-[linear-gradient(170deg,#052e2b,#064a43_62%,#065f53)] text-white shadow-[0_34px_80px_-34px_rgba(5,46,43,.85)]"
          : "card-soft"
          }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {p.popular && (
          <>
            <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#2dd4bf]/18 blur-2xl a-float" />
            <span className="absolute right-6 top-6 rounded-full bg-[#2dd4bf] px-3 py-1 text-[11px] font-bold tracking-tight text-[#04312c]">
              Most popular
            </span>
          </>
        )}

        <p className={`text-[12.5px] font-medium ${p.popular ? "text-white/55" : "text-[#052e2b]/45"}`}>
          {p.params} test parameters
        </p>
        <h3 className="font-display mt-1.5 text-[21px] font-semibold leading-snug tracking-tight">
          {p.name}
        </h3>

        <div className="mt-5 flex items-end gap-3">
          <span
            className={`font-display text-[36px] font-semibold leading-none ${p.popular ? "text-[#2dd4bf]" : "shimmer-price"
              }`}
          >
            {rupee(p.price)}
          </span>
          <s className={`pb-1.5 text-[15px] ${p.popular ? "text-white/38" : "text-[#052e2b]/35"}`}>
            {rupee(p.mrp)}
          </s>
          <span
            className={`mb-1 rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${p.popular ? "bg-white/12 text-white/85" : "bg-[#d99a4e]/14 text-[#8a5a15]"
              }`}
          >
            {off}% off
          </span>
        </div>

        <p className={`mt-2.5 text-[12.5px] ${p.popular ? "text-[#2dd4bf]/85" : "text-[#0e8f7e]"}`}>
          Extra 10% off with code SI10
        </p>

        <p className={`mt-4 text-[14px] leading-relaxed ${p.popular ? "text-white/68" : "text-[#052e2b]/58"}`}>
          {p.blurb}
        </p>

        <ul className="mt-5 space-y-2.5">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-[14px]">
              <Icon
                name="check"
                className={`mt-0.5 h-4 w-4 shrink-0 ${p.popular ? "text-[#2dd4bf]" : "text-[#0e8f7e]"}`}
                stroke={2.4}
              />
              <span className={p.popular ? "text-white/82" : "text-[#052e2b]/72"}>{h}</span>
            </li>
          ))}
        </ul>

        {/* expandable detail */}
        <div
          className="overflow-hidden transition-[max-height,opacity] duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ maxHeight: more ? 900 : 0, opacity: more ? 1 : 0 }}
        >
          <div
            className={`mt-5 space-y-2.5 rounded-2xl p-4 text-[13px] ${p.popular ? "bg-white/6" : "bg-[#f2f8f6]"
              }`}
          >
            {p.detail.map(([k, v]) => (
              <p key={k} className="leading-relaxed">
                <span className={`font-semibold ${p.popular ? "text-[#2dd4bf]" : "text-[#065f53]"}`}>
                  {k}:
                </span>{" "}
                <span className={p.popular ? "text-white/70" : "text-[#052e2b]/62"}>{v}</span>
              </p>
            ))}
            <p className={`pt-1 text-[12px] italic ${p.popular ? "text-white/45" : "text-[#052e2b]/45"}`}>
              10–12 hours of fasting required.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 pt-1">
          <Btn
            variant={p.popular ? "gold" : "solid"}
            className="flex-1"
            onClick={() =>
              openBooking({ title: p.name, kind: "package", price: p.price, mrp: p.mrp })
            }
          >
            Book now
          </Btn>
          <button
            onClick={() => setMore((m) => !m)}
            className={`inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors ${p.popular ? "text-white/70 hover:text-white" : "text-[#065f53] hover:text-[#0e8f7e]"
              }`}
          >
            {more ? "Less" : "Read more"}
            <Icon
              name="chevron"
              className={`h-4 w-4 transition-transform duration-500 ${more ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-[#f2f8f6] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[#0e8f7e]/10 blur-[110px] a-blob" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Starts from ₹999"
          title="Choose your health package"
          sub="Comprehensive health checkups tailored to your age, gender and history."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p, idx) => (
            <PackageCard key={p.name} p={p} idx={idx} />
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <Btn
              as="a"
              href={waLink("Hi, please share your full list of health packages.")}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              size="lg"
              icon="arrowR"
            >
              Explore more packages
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================================
   16. RADIOLOGY
   ========================================================================== */

function Radiology() {
  const { openBooking } = useBooking();
  return (
    <section id="radiology" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          eyebrow="At our partner centres"
          title="Radiology and imaging services"
          sub="Advanced imaging with same-day slots across eight locations in Mumbai."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RADIOLOGY.map((r, idx) => (
            <Reveal key={r.name} delay={(idx % 3) * 80}>
              <button
                onClick={() => openBooking({ title: r.name, kind: "radiology" })}
                className="card-soft group relative flex w-full items-center gap-5 overflow-hidden rounded-[22px] p-6 text-left"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-full w-full bg-[linear-gradient(90deg,transparent,rgba(45,212,191,.12),transparent)] transition-all duration-[900ms] group-hover:left-full" />
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#065f53,#14b8a6)] text-white shadow-[0_14px_30px_-14px_rgba(6,95,83,.85)] transition-transform duration-[600ms] group-hover:scale-110 group-hover:-rotate-6">
                  <Icon name={r.icon} className="w-7 h-7" />
                </span>
                <span className="relative">
                  <span className="font-display block text-[17.5px] font-semibold tracking-tight">
                    {r.name}
                  </span>
                  <span className="mt-1 block text-[13px] text-[#052e2b]/52">{r.desc}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0e8f7e] opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Book slot <Icon name="arrowR" className="w-3.5 h-3.5" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* locations */}
        <Reveal delay={120}>
          <div className="mt-14 overflow-hidden rounded-[28px] border border-[#065f53]/10 bg-[linear-gradient(130deg,#052e2b,#064a43)] p-8 sm:p-10">
            <div className="grid gap-9 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.2fr)] lg:items-center">
              <div>
                <Eyebrow light>Walk in near you</Eyebrow>
                <h3 className="font-display mt-5 text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight text-white">
                  Available radiology locations
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/62">
                  Call us and we'll book the centre closest to you, with the
                  earliest available slot.
                </p>
                <Btn
                  as="a"
                  href={`tel:+91${BRAND.phone}`}
                  variant="outline"
                  className="mt-6"
                >
                  <Icon name="phone" className="w-4 h-4" /> {BRAND.phoneDisplay}
                </Btn>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {LOCATIONS.map((l, idx) => (
                  <div
                    key={l}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 transition-all duration-500 hover:-translate-y-1 hover:border-[#2dd4bf]/40 hover:bg-white/10"
                    style={{ animation: `riseIn .7s cubic-bezier(.16,1,.3,1) ${idx * 60}ms both` }}
                  >
                    <Icon
                      name="pin"
                      className="h-[18px] w-[18px] shrink-0 text-[#2dd4bf] transition-transform duration-500 group-hover:scale-125"
                    />
                    <span className="text-[14px] text-white/80">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================================
   17. MEDIA GALLERY — video + image slider
   ========================================================================== */

const GALLERY = [
  { src: IMG.g1, cap: "Sample accessioning" },
  { src: IMG.g6, cap: "Automated analysers" },
  { src: IMG.g3, cap: "Microbiology bench" },
  { src: IMG.g4, cap: "Molecular diagnostics" },
  { src: IMG.g5, cap: "Report verification" },
  { src: IMG.g6, cap: "Cold-chain transport" },
];

function Gallery() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef(null);
  const n = GALLERY.length;

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 4200);
    return () => clearTimeout(t);
  }, [i, paused, n, reduced]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i];
    if (card)
      el.scrollTo({
        left: card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2,
        behavior: "smooth",
      });
  }, [i]);

  return (
    <section className="relative overflow-hidden bg-[#031e1c] py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-28 top-10 h-[420px] w-[420px] rounded-full bg-[#0e8f7e]/18 blur-[110px] a-blob" />
      <div className="absolute inset-0 grid-lines opacity-[.4] mix-blend-overlay" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          light
          eyebrow="Inside the lab"
          title="See exactly where your sample goes"
          sub="From collection to report — a fully tracked, temperature-controlled chain."
        />

        {/* feature video */}
        <Reveal y={36}>
          <div className="group relative overflow-hidden rounded-[28px] border border-white/12">
            <video
              className="h-[260px] w-full object-cover sm:h-[460px]"
              src={VIDEO.story}
              poster={VIDEO.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,30,28,.25),rgba(3,30,28,.85))]" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 sm:bottom-9 sm:left-9 sm:right-9">
              <div>
                <p className="font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-semibold text-white">
                  Every sample, barcoded within 60 seconds
                </p>
                <p className="mt-2 max-w-md text-[14px] text-white/60">
                  Chain-of-custody tracking from your door to the analyser.
                </p>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/92 text-[#065f53] transition-transform duration-500 group-hover:scale-110">
                <Icon name="play" className="w-6 h-6" stroke={1} />
              </span>
            </div>
          </div>
        </Reveal>

        {/* image slider */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-8"
        >
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          >
            {GALLERY.map((g, idx) => (
              <figure
                key={g.cap}
                onClick={() => setI(idx)}
                className={`group relative aspect-[4/3] w-[76%] shrink-0 cursor-pointer snap-center overflow-hidden rounded-[22px] border transition-all duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)] sm:w-[42%] lg:w-[31%] ${idx === i
                  ? "border-[#2dd4bf]/55 shadow-[0_30px_70px_-30px_rgba(45,212,191,.6)]"
                  : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={g.src}
                  alt={g.cap}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(3,30,28,.9))]" />
                <figcaption className="absolute bottom-4 left-5 right-5 text-[14px] font-medium text-white">
                  {g.cap}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2.5">
            {GALLERY.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-9 bg-[#2dd4bf]" : "w-2 bg-white/25 hover:bg-white/45"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   18. TRUST + VISION/MISSION/MOTTO + ABOUT
   ========================================================================== */

function Trust() {
  return (
    <section className="relative -mt-14 bg-transparent">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {TRUST.map((t, idx) => (
            <Reveal key={t.title} delay={idx * 90} y={36}>
              <div className="card-soft group h-full rounded-[24px] bg-white p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0e8f7e]/10 text-[#065f53] transition-all duration-500 group-hover:bg-[linear-gradient(135deg,#065f53,#14b8a6)] group-hover:text-white group-hover:rotate-6">
                  <Icon name={t.icon} className="w-6 h-6" />
                </span>
                <h3 className="font-display mt-5 text-[18px] font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#052e2b]/58">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionMission() {
  const [tab, setTab] = useState(0);
  return (
    <section className="bg-[#f2f8f6] pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          eyebrow="What drives us"
          title="Our vision, mission and motto"
        />

        <Reveal y={30}>
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto mb-8 flex w-fit gap-1 rounded-full border border-[#065f53]/12 bg-white p-1.5">
              {VMM.map((v, idx) => (
                <button
                  key={v.key}
                  onClick={() => setTab(idx)}
                  className={`relative rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all duration-500 ${tab === idx
                    ? "bg-[linear-gradient(120deg,#065f53,#0e8f7e)] text-white shadow-[0_12px_28px_-14px_rgba(6,95,83,.9)]"
                    : "text-[#052e2b]/58 hover:text-[#065f53]"
                    }`}
                >
                  {v.key}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-[#065f53]/10 bg-white p-8 sm:p-11">
              <span className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#2dd4bf]/10 blur-2xl a-float" />
              <Icon
                name="sparkle"
                className="relative mb-5 h-8 w-8 text-[#0e8f7e]"
                stroke={1.4}
              />
              <p
                key={tab}
                className="font-display a-fade relative text-[clamp(1.05rem,2vw,1.4rem)] leading-[1.6] tracking-[-.01em] text-[#052e2b]/82"
              >
                {VMM[tab].body}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal x={-30} y={0}>
          <div className="relative">
            <img
              src={IMG.about}
              alt="Laboratory technicians reviewing test results"
              loading="lazy"
              decoding="async"
              className="h-[340px] w-full rounded-[28px] object-cover sm:h-[460px]"
            />
            <div className="absolute -bottom-6 -right-2 w-[210px] rounded-[22px] border border-[#065f53]/10 bg-white p-5 shadow-[0_26px_60px_-28px_rgba(5,46,43,.6)] sm:right-6 a-float-slow">
              <div className="flex items-center gap-1 text-[#d99a4e]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" className="h-4 w-4 fill-current" stroke={0} />
                ))}
              </div>
              <p className="font-display mt-2 text-[24px] font-semibold leading-none">4.9/5</p>
              <p className="mt-1.5 text-[12.5px] text-[#052e2b]/55">
                Average patient rating
              </p>
            </div>
            <div className="absolute -left-3 top-8 hidden rounded-[20px] bg-[linear-gradient(135deg,#065f53,#14b8a6)] px-5 py-4 text-white shadow-[0_22px_50px_-22px_rgba(6,95,83,.9)] sm:block a-float">
              <p className="font-display text-[22px] font-semibold leading-none">10k+</p>
              <p className="mt-1 text-[12px] text-white/72">samples collected</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>About us</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-6 text-[clamp(1.9rem,4.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-.02em]">
              Advanced diagnostics, without leaving your home
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 text-[16px] leading-[1.75] text-[#052e2b]/64">
              Welcome to {BRAND.name}. We bring cutting-edge laboratory
              solutions right to your doorstep, ensuring accuracy, speed and
              comfort. Backed by trusted certifications and the confidence of
              healthcare experts, we are your reliable partner in wellness.
            </p>
          </Reveal>
          <Reveal delay={210}>
            <p className="mt-4 text-[16px] leading-[1.75] text-[#052e2b]/64">
              Experience care that puts you first — because nothing matters more
              than your well-being.
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-3 gap-4">
            {[
              { v: 10000, s: "+", l: "Patients served" },
              { v: 120, s: "+", l: "Tests available" },
              { v: 6, s: " hr", l: "Report turnaround" },
            ].map((s, idx) => (
              <Reveal key={s.l} delay={260 + idx * 80}>
                <div className="rounded-[20px] border border-[#065f53]/10 bg-[#f7fbfa] px-4 py-5 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0e8f7e]/40 hover:bg-white">
                  <p className="font-display text-[clamp(1.3rem,2.4vw,1.8rem)] font-semibold leading-none text-[#065f53]">
                    <Counter to={s.v} suffix={s.s} />
                  </p>
                  <p className="mt-2 text-[12px] text-[#052e2b]/55">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   19. WHY CHOOSE US
   ========================================================================== */

function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#f2f8f6] py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-36 bottom-0 h-[420px] w-[420px] rounded-full bg-[#2dd4bf]/10 blur-[110px] a-blob" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Why choose us"
          title="Built around accuracy and the person waiting for the result"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, idx) => (
            <Reveal key={w.title} delay={(idx % 3) * 80}>
              <div className="card-soft glow-follow group relative h-full overflow-hidden rounded-[24px] p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#065f53,#14b8a6)] text-white shadow-[0_14px_30px_-14px_rgba(6,95,83,.8)] transition-all duration-[600ms] group-hover:scale-110 group-hover:-rotate-6">
                  <Icon name={w.icon} className="w-6 h-6" />
                </span>
                <h3 className="font-display mt-5 text-[17.5px] font-semibold leading-snug tracking-tight">
                  {w.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[#052e2b]/58">{w.desc}</p>
                <span className="mt-5 block h-px w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#0e8f7e,transparent)] transition-transform duration-[700ms] group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   20. TESTIMONIALS
   ========================================================================== */

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const n = TESTIMONIALS.length;

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 5200);
    return () => clearTimeout(t);
  }, [i, paused, n, reduced]);

  return (
    <section
      className="bg-white py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead eyebrow="Patient stories" title="What people tell us afterwards" />

        <Reveal y={30}>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-[#065f53]/10 bg-[#f7fbfa] px-7 py-10 sm:px-12 sm:py-14">
            <span className="font-display pointer-events-none absolute -top-6 left-6 select-none text-[130px] leading-none text-[#0e8f7e]/8">
              &ldquo;
            </span>

            <div key={i} className="a-fade relative">
              <div className="flex items-center gap-1 text-[#d99a4e]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" className="h-4 w-4 fill-current" stroke={0} />
                ))}
              </div>
              <p className="font-display mt-5 text-[clamp(1.05rem,2.1vw,1.42rem)] leading-[1.6] tracking-[-.01em] text-[#052e2b]/85">
                {TESTIMONIALS[i].text}
              </p>
              <div className="mt-7 flex items-center gap-3.5">
                <span className="font-display grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#065f53,#14b8a6)] text-[15px] font-semibold text-white">
                  {TESTIMONIALS[i].name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{TESTIMONIALS[i].name}</span>
                  <span className="block text-[13px] text-[#052e2b]/52">
                    {TESTIMONIALS[i].place}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-9 bg-[#0e8f7e]" : "w-2 bg-[#052e2b]/15 hover:bg-[#052e2b]/30"
                    }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================================
   21. FAQ
   ========================================================================== */

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#f2f8f6] py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Questions"
          title="Frequently asked questions"
          sub="Anything else — message us on WhatsApp and a real person replies."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal key={f.q} delay={idx * 45}>
                <div
                  className={`overflow-hidden rounded-[20px] border bg-white transition-all duration-500 ${isOpen
                    ? "border-[#0e8f7e]/40 shadow-[0_22px_50px_-30px_rgba(5,46,43,.55)]"
                    : "border-[#065f53]/10 hover:border-[#0e8f7e]/28"
                    }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span
                      className={`font-display text-[16px] font-semibold leading-snug tracking-tight transition-colors duration-[400ms] ${isOpen ? "text-[#065f53]" : "text-[#052e2b]"
                        }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-500 ${isOpen
                        ? "rotate-180 bg-[linear-gradient(120deg,#065f53,#0e8f7e)] text-white"
                        : "bg-[#0e8f7e]/10 text-[#065f53]"
                        }`}
                    >
                      <Icon name="chevron" className="w-4 h-4" />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[14.5px] leading-[1.7] text-[#052e2b]/62">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   22. CONTACT + FOOTER
   ========================================================================== */

function Contact() {
  const { openCallback, openBooking } = useBooking();
  return (
    <section id="contact" className="relative overflow-hidden bg-[#031e1c] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-28 top-0 h-[420px] w-[420px] rounded-full bg-[#0e8f7e]/22 blur-[110px] a-blob" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#2dd4bf]/12 blur-[100px] a-float-slow" />
      <div className="absolute inset-0 grid-lines opacity-[.4] mix-blend-overlay" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow light>Talk to us</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.6vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.025em] text-white">
                Book a test today, get your report by evening
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/64">
                Call, WhatsApp, or leave your number — our team confirms every
                booking within 15 minutes, any time of day.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Btn size="lg" icon="arrowR" onClick={() => openBooking({ title: "Home sample collection", kind: "appointment" })}>
                  Book an appointment
                </Btn>
                <Btn variant="outline" size="lg" onClick={openCallback}>
                  Request a callback
                </Btn>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: "phone",
                label: "Call us",
                value: BRAND.phoneDisplay,
                href: `tel:+91${BRAND.phone}`,
              },
              {
                icon: "wa",
                label: "WhatsApp support",
                value: BRAND.phoneDisplay,
                href: waLink(),
              },
              { icon: "mail", label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
              {
                icon: "clock",
                label: "Collection hours",
                value: "6:00 AM – 10:00 PM, all days",
              },
            ].map((c, idx) => (
              <Reveal key={c.label} delay={idx * 80} x={20} y={12}>
                <a
                  href={c.href}
                  target={c.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-5 rounded-[22px] border border-white/10 bg-white/5 px-6 py-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2dd4bf]/45 hover:bg-white/10"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2dd4bf]/14 text-[#2dd4bf] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon name={c.icon} className="w-[22px] h-[22px]" />
                  </span>
                  <span>
                    <span className="block text-[12.5px] text-white/50">{c.label}</span>
                    <span className="mt-0.5 block text-[16px] font-semibold text-white">
                      {c.value}
                    </span>
                  </span>
                  {c.href && (
                    <Icon
                      name="arrowR"
                      className="ml-auto h-[18px] w-[18px] -translate-x-2 text-[#2dd4bf] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  )}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { openCallback } = useBooking();
  return (
    <footer className="relative overflow-hidden bg-[#052e2b] pt-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/58">
              Your trusted healthcare partner, providing comprehensive
              diagnostic services at your doorstep.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-[400ms] hover:-translate-y-1 hover:border-[#25d366] hover:bg-[#25d366] hover:text-white"
              >
                <Icon name="wa" className="w-[18px] h-[18px]" />
              </a>
              <a
                href={`tel:+91${BRAND.phone}`}
                aria-label="Call"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-[400ms] hover:-translate-y-1 hover:border-[#2dd4bf] hover:bg-[#2dd4bf] hover:text-[#04312c]"
              >
                <Icon name="phone" className="w-[18px] h-[18px]" />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-[400ms] hover:-translate-y-1 hover:border-[#2dd4bf] hover:bg-[#2dd4bf] hover:text-[#04312c]"
              >
                <Icon name="mail" className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-[15.5px] font-semibold text-white">Services</p>
            <ul className="mt-5 space-y-3">
              {[
                ["Blood tests", "#tests"],
                ["Health packages", "#packages"],
                ["Home collection", "#home-visit"],
                ["Radiology", "#radiology"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    className="group inline-flex items-center gap-2 text-[14px] text-white/58 transition-colors duration-[400ms] hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#2dd4bf] transition-all duration-[400ms] group-hover:w-4" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[15.5px] font-semibold text-white">Quick links</p>
            <ul className="mt-5 space-y-3">
              {[
                ["Home", "#home"],
                ["About us", "#home-visit"],
                ["Contact", "#contact"],
                ["Privacy policy", "#contact"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    className="group inline-flex items-center gap-2 text-[14px] text-white/58 transition-colors duration-[400ms] hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#2dd4bf] transition-all duration-[400ms] group-hover:w-4" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[15.5px] font-semibold text-white">Contact us</p>
            <ul className="mt-5 space-y-3.5 text-[14px] text-white/58">
              <li>
                <a href={`tel:+91${BRAND.phone}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-white">
                  <Icon name="phone" className="h-4 w-4 text-[#2dd4bf]" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-white">
                  <Icon name="mail" className="h-4 w-4 text-[#2dd4bf]" />
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 transition-colors hover:text-white">
                  <Icon name="wa" className="h-4 w-4 text-[#2dd4bf]" />
                  WhatsApp support
                </a>
              </li>
            </ul>
            <Btn variant="outline" size="sm" className="mt-6" onClick={openCallback}>
              Request a callback
            </Btn>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-7 sm:flex-row">
          <p className="text-[13px] text-white/45">
            © {BRAND.year} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-[13px] text-white/35">
            NABL / ISO certified partner laboratories
          </p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="font-display translate-y-[22%] text-center text-[clamp(3rem,15vw,11rem)] font-semibold leading-none tracking-[-.04em] text-white/[.045]">
          {BRAND.short}
        </p>
      </div>
    </footer>
  );
}


/* ============================================================================
   22b. FAST SMOOTH SCROLL
   Native wheel/touch scrolling stays untouched for maximum responsiveness.
   Only anchor navigation gets a short, controlled ease.
   ========================================================================== */

function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;

      e.preventDefault();

      const start = window.scrollY || window.pageYOffset;
      const end = Math.max(
        0,
        el.getBoundingClientRect().top + start -
        (window.innerWidth < 1024 ? 70 : 84)
      );

      if (reduced || Math.abs(end - start) < 2) {
        window.scrollTo(0, end);
        return;
      }

      const distance = end - start;
      const duration = Math.min(620, Math.max(300, Math.abs(distance) * 0.28));
      const t0 = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 4);

      let raf = 0;
      const step = (now) => {
        const t = Math.min((now - t0) / duration, 1);
        window.scrollTo(0, start + distance * ease(t));
        if (t < 1) raf = requestAnimationFrame(step);
      };

      raf = requestAnimationFrame(step);
    };

    document.addEventListener("click", onClick, { passive: false });
    return () => document.removeEventListener("click", onClick);
  }, [reduced]);

  return null;
}

/* ============================================================================
   23. ROOT
   ========================================================================== */

export default function App() {
  const [booking, setBooking] = useState(null);
  const [callback, setCallback] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [query, setQuery] = useState("");

  const ctx = useMemo(
    () => ({
      booking,
      openBooking: (b) => setBooking(b),
      closeBooking: () => setBooking(null),
      callback,
      openCallback: () => setCallback(true),
      closeCallback: () => setCallback(false),
      thanks,
      showThanks: () => setThanks(true),
      closeThanks: () => setThanks(false),
    }),
    [booking, callback, thanks]
  );

  const pickCategory = (q) => {
    setQuery(q);
    const el = document.getElementById("tests");
    if (!el) return;
    const start = window.scrollY;
    const end = el.getBoundingClientRect().top + start - 84;
    const t0 = performance.now();
    const dur = Math.min(620, Math.max(300, Math.abs(end - start) * 0.28));
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const step = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      window.scrollTo(0, start + (end - start) * ease(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <BookingCtx.Provider value={ctx}>
      <GlobalStyles />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <LabPartners />
        <Categories onPick={pickCategory} />
        <BloodTests query={query} setQuery={setQuery} />
        <HomeVisit />
        <Packages />
        <Radiology />
        <Gallery />
        <Trust />
        <VisionMission />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />

      <BookingModal />
      <CallbackModal />
      <ThanksModal />
    </BookingCtx.Provider>
  );
}