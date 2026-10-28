# MOMCARE — Your Pregnancy, Your Journey 💗

A complete, responsive, modern pregnancy care and baby memories application designed to provide expectant mothers with compassionate guidance, clinical educational insights, daily health organization, and a private sanctuary for baby memories.

---

## 🌟 Key Application Experiences

### 1. Track Pregnancy Week-by-Week & Foetal Growth
- **Clinical Source Aligned:** Primary source from **"Stages of Foetal Growth During Gestation" (`stages_of_foetal_growth.pdf`)**.
- **Three Developmental Stages:**
  - **1. Germinal Stage (Weeks 1–2):** Fertilization, zygote division into morula and blastocyst, and uterine wall implantation (days 6–10), illustrated with clear clinical diagrams.
  - **2. Embryonic Stage (Weeks 3–8):** Formation of ectoderm, mesoderm, and endoderm; organogenesis (neural tube closure, beating heart by ~week 5, limb buds, eyes, ears); sensitive explanation of teratogen vulnerability periods.
  - **3. Foetal Stage (Weeks 9 to Birth):** Interactive cards covering external genitalia differentiation (weeks 9–12), skeletal ossification & ~10–12 cm length (weeks 13–16), maternal quickening & vernix/lanugo (weeks 17–20), lung surfactant secretion & potential viability (weeks 21–24), eye opening & rapid brain maturation (weeks 25–28), adipose fat deposition & lung maturation (weeks 29–36), and full-term pelvic engagement (weeks 37–40).
- **Trimester Breakdown:**
  - **1st Trimester (Weeks 1–12):** Organ formation.
  - **2nd Trimester (Weeks 13–27):** Growth and movement.
  - **3rd Trimester (Weeks 28–40):** Maturation and weight gain.
- **Interactive Week Navigator (1–40):** Jump to any pregnancy week, view fruit/size comparisons, and return to current gestational week in one click.

### 2. Dedicated Premature Baby Module
- **Primary Source Aligned:** Directly derived from **"Premature (Preterm) Baby: Definition, causes and stage of development" (`premature_baby.pdf`)**.
- **Core Definition:** Born before 37 completed weeks of pregnancy (full term defined as 37–42 weeks).
- **Preterm Categories:**
  - Extremely Preterm (< 28 completed weeks)
  - Very Preterm (28 to < 32 completed weeks)
  - Moderate to Late Preterm (32 to < 37 completed weeks)
- **Birth Weight Classifications:** Low Birth Weight (< 2,500 g), Very Low (< 1,500 g), and Extremely Low (< 1,000 g), with clear explanations distinguishing birth weight from gestational age.
- **Causes (Why It Happens):** Sensitive, non-blaming presentation of the 5 factor groups: Maternal conditions, Uterine & placental factors, Pregnancy factors, Lifestyle & associated risks, and Medical reasons.
- **Body System Explorer:** Interactive examination of immature organ systems in preterm infants:
  - *Lungs:* Surfactant production (weeks 24–28) & respiratory distress syndrome (RDS).
  - *Brain:* Immature respiratory drive, apnoea of prematurity, and intraventricular haemorrhage (IVH).
  - *Heart:* Patent ductus arteriosus (PDA) failing to close.
  - *Gut:* Feeding difficulties and risk of necrotising enterocolitis (NEC).
  - *Eyes:* Retinopathy of prematurity (ROP) & specialist screening.
  - *Temperature & Skin:* Scant body fat and hypothermia vulnerabilities.
  - *Other:* Frequent jaundice and neonatal immune immaturity.
- **Neonatal Care & Treatments:** Educational overviews of antenatal corticosteroids (betamethasone), surfactant replacement therapy, caffeine citrate for apnoea, and incubator thermo-regulation.
- **NICU Parent Guide & Notes:** Questions to ask during bedside rounds, doctor consultation notes logger, and personal milestone timeline (Kangaroo care, first feed, discharge home).

### 3. Baby Scan Memories & Photo Gallery
- **IndexedDB Binary Storage:** Ultrasound scans are stored directly as genuine binary `Blob` objects in IndexedDB, completely eliminating Base64 string bloat and LocalStorage quotas.
- **Keepsake Features:** Upload JPG, JPEG, and PNG ultrasound images with validation, preview before upload, record scan date, gestational week, title, and personal notes.
- **Gallery & Lightbox:** Responsive grid, chronological sorting, full-screen lightbox preview, inline editing, and deletion with confirmation.

### 4. Baby Profile & Post-Birth Mode
- **Seamless Post-Birth Transition:** Switch the dashboard from pregnancy tracking to newborn care without an active countdown.
- **Baby Details:** Manage baby name, birth date, gestational age at birth, birth weight, and preterm status.
- **Preterm Integration:** If marked preterm, provides one-click access into the Premature Baby Care guide.

### 5. Daily Health & Organization
- **Doctor Appointments:** Schedule obstetrician visits, ultrasounds, glucose tests, and bloodwork with upcoming vs. past tabs and question prompts.
- **Medicine & Supplement Reminders:** Record clinician-prescribed vitamins (folic acid, iron, calcium, prenatal DHA) with daily check-off.
- **Daily Wellness Tracker:** Visual water intake glasses counter, sleep duration slider, mood selector, meals, physical activity notes, and private symptoms tracker.
- **Baby Movement Tracker (Kick Counter):** Timed movement counting session with a large tap counter and prominent clinical safety alerts.
- **Pregnancy Journal:** Personal diary categorized into daily thoughts, feelings, milestones, doctor notes, and letters to baby, with full JSON data export.
- **Hospital Bag Checklist:** Interactive packing checklist categorized for Mom, Baby, and Birth Partner.
- **Emergency Help:** Tap-to-call direct links for National Emergency, Maternity Triage, OB/GYN doctor, NICU, and partner, alongside critical red flag symptoms.

---

## 💻 Technology Stack

- **Frontend Framework:** React 19 + Vite 8
- **Navigation:** React Router DOM (v7)
- **Icons:** Lucide React
- **Celebrations:** Canvas Confetti
- **Styling:** Custom Vanilla CSS Design System with CSS variables (curated soft blush, lavender, sage green, and warm cream palette with glassmorphism)
- **Local Persistence:**
  - `LocalStorage`: Structured settings, preferences, appointments, reminders, wellness logs, and journal text metadata.
  - `IndexedDB`: Binary storage for high-resolution ultrasound image blobs and journal photo attachments.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm (version 9 or higher)

### Installation
```bash
# Clone or navigate to the repository directory
cd "Mom care"

# Install dependencies
npm install
```

### Running Locally (Development Mode)
```bash
npm run dev
```
Open your browser and navigate to:
`http://localhost:5173/`

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔒 Data Storage & Privacy Architecture

- **Client-Side Privacy:** In prototype mode, all data resides strictly inside the user's local web browser. No photos, notes, or health details are transmitted to external servers.
- **IndexedDB for Images:** Binary Blobs are saved directly into the `MomCareDB` database. Object URLs are dynamically allocated via `URL.createObjectURL` and revoked upon component unmount to prevent browser memory leaks.
- **Limitations of Browser Storage:**
  - Local browser storage is tied to the specific browser and profile.
  - Clearing browsing history, cache, or site data will erase locally stored records.
  - Local storage is not automated cloud backup.
  - Users can export a complete JSON backup at any time via **Profile & Settings -> Export All Data**.

---

## ☁️ Future Backend Integration (Firebase / Supabase)

To transition MOMCARE into a multi-device production app:
1. **Authentication:** Integrate Firebase Auth or Supabase Auth (Email/Password, Google Sign-In) to issue secure user tokens.
2. **Database:** Replace `LocalStorage` with Firestore or Supabase PostgreSQL tables (`users`, `appointments`, `reminders`, `wellness_logs`, `journal_entries`).
3. **Private File Storage:** Replace local `IndexedDB` with Firebase Cloud Storage or Supabase Storage with row-level security (RLS) policies ensuring users can only read/write their own ultrasound scans.
4. **Push Notifications:** Integrate Web Push API / Firebase Cloud Messaging (FCM) to trigger background medication and appointment alerts even when the browser tab is closed.

---

## 🩺 Medical Safety Disclaimer

> **Important Medical Notice:**
> MOMCARE provides general educational information and personal tracking tools. It does not provide medical diagnosis or treatment and does not replace advice from a qualified healthcare professional.
>
> If you believe you or your baby may be in immediate danger, or if you experience severe symptoms (vaginal bleeding, noticeably reduced fetal movements, fluid leakage, severe headache with vision changes, or intense abdominal pain), seek emergency medical care or contact your maternity triage unit immediately.

---

*MOMCARE — Your Pregnancy, Your Journey 💗*
