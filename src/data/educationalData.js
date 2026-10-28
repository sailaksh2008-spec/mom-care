/**
 * Educational Library Database
 * 
 * Organizes evidence-based articles into 15 structured categories.
 * Articles derived from the two source PDFs are explicitly labeled.
 */

export const MEDICAL_DISCLAIMER_TEXT = 
  "This application provides general educational information and personal tracking tools. It does not provide medical diagnosis or treatment and does not replace advice from a qualified healthcare professional.";

export const EDUCATIONAL_CATEGORIES = [
  'All Articles',
  'Foetal Growth (PDF)',
  'Premature Care (PDF)',
  'Trimester Guides',
  'Nutrition & Wellbeing',
  'Doctor Visits',
  'Birth & Hospital Bag',
  'Newborn & Postpartum'
];

export const EDUCATIONAL_ARTICLES = [
  {
    id: 'art_1',
    title: 'Stages of Foetal Growth During Gestation',
    category: 'Foetal Growth (PDF)',
    isPdfSource: true,
    sourceDoc: 'stages_of_foetal_growth.pdf',
    summary: 'A complete overview of prenatal development from fertilization through term birth, dividing development into the Germinal, Embryonic, and Foetal stages.',
    readTime: '4 min read',
    content: `
### Overview of Prenatal Development
Prenatal development spans approximately 38 weeks from fertilization, which corresponds to 40 weeks when measured from the first day of the Last Menstrual Period (LMP).

#### 1. Germinal Stage (Weeks 1–2)
- The zygote forms at fertilization when the sperm fuses with the ovum.
- The zygote divides into a morula and then hollows into a blastocyst.
- The blastocyst implants in the nutrient-rich uterine wall around day 6 to 10.

#### 2. Embryonic Stage (Weeks 3–8)
- The three primary germ layers form: **ectoderm** (skin, brain, nerves), **mesoderm** (heart, blood, bones, muscles), and **endoderm** (lungs, gut, liver).
- Organogenesis takes place: the neural tube closes, the heart begins rhythmic beating by approximately week 5, and tiny limb buds, eyes, and ears develop.
- **Important clinical note:** This is the most vulnerable period for teratogens (environmental or pharmacological factors such as thalidomide that can interfere with early development).

#### 3. Foetal Stage (Week 9 to Birth)
- **Weeks 9–12:** External genitalia differentiate, and the fetus begins reflex movements.
- **Weeks 13–16:** The skeleton ossifies, and the fetus reaches about 10–12 cm in crown-rump length.
- **Weeks 17–20:** The mother feels quickening (first fluttery movements); protective lanugo hair and vernix caseosa coat the skin.
- **Weeks 21–24:** The lungs begin producing surfactant; potential viability begins around week 24 with intensive medical care.
- **Weeks 25–28:** Eyelids open, and the nervous system matures rapidly.
- **Weeks 29–36:** Rapid weight gain occurs through subcutaneous fat deposition; pulmonary maturation continues.
- **Weeks 37–40:** Reaching full term; the head usually engages safely in the maternal pelvis.
    `
  },
  {
    id: 'art_2',
    title: 'Understanding Premature (Preterm) Birth',
    category: 'Premature Care (PDF)',
    isPdfSource: true,
    sourceDoc: 'premature_baby.pdf',
    summary: 'Definitions, gestational categories, birth weight classifications, and why early birth happens.',
    readTime: '5 min read',
    content: `
### What Is a Premature Baby?
A premature (preterm) baby is one born before 37 completed weeks of pregnancy. Full term is defined as 37 to 42 weeks.

> *"Every baby is different. The level of care a premature baby needs depends on gestational age, birth weight, health, and individual circumstances."*

### Categories by Gestational Age
- **Extremely preterm:** Born before 28 completed weeks.
- **Very preterm:** Born from 28 to under 32 completed weeks.
- **Moderate to late preterm:** Born from 32 to under 37 completed weeks.

### Birth Weight Classifications
- **Low birth weight (LBW):** Under 2,500 g.
- **Very low birth weight (VLBW):** Under 1,500 g.
- **Extremely low birth weight (ELBW):** Under 1,000 g.

*Note:* Birth weight classifications describe size at birth, whereas gestational age reflects developmental maturity.

### Why Can Premature Birth Happen?
Medical science categorizes associated factors into five primary groups:
1. **Maternal conditions:** Infections (urinary tract infection, bacterial vaginosis, chorioamnionitis), pre-eclampsia, hypertension, diabetes, anaemia or malnutrition.
2. **Uterine and placental factors:** Cervical insufficiency, uterine anomalies, placental abruption, placenta previa, premature rupture of membranes (PPROM).
3. **Pregnancy factors:** Twins or multiple pregnancies, assisted reproduction (IVF), history of previous preterm delivery, short inter-pregnancy intervals.
4. **Lifestyle and other risks:** Smoking, alcohol, drug use, severe physiological/psychological stress, maternal age under 17 or over 35.
5. **Medical reasons:** Labour is sometimes induced early to protect mother or baby from deteriorating complications; in many cases, no clear cause is identified.
    `
  },
  {
    id: 'art_3',
    title: 'Premature Baby Development & Neonatal Care',
    category: 'Premature Care (PDF)',
    isPdfSource: true,
    sourceDoc: 'premature_baby.pdf',
    summary: 'Immature body systems, why neonatal teams monitor them, and key medical treatments described in clinical sources.',
    readTime: '6 min read',
    content: `
### Organ Maturity in Preterm Babies
Preterm babies arrive before their organ systems have finished maturing in the womb:

- **Lungs:** Surfactant production begins around weeks 24–28. Because surfactant helps keep the tiny air sacs (alveoli) open, respiratory distress syndrome (RDS) is common.
- **Brain:** The immature respiratory control center in the brainstem can cause temporary breathing pauses called apnoea. Fragile blood vessels in the brain matrix carry a risk of intraventricular haemorrhage (IVH).
- **Heart:** A fetal blood vessel called the patent ductus arteriosus (PDA), which normally diverts blood away from fluid-filled fetal lungs, may fail to close promptly after birth.
- **Gut:** Digestive motility and feeding coordination are immature, posing a risk of necrotising enterocolitis (NEC).
- **Eyes:** Retinal vessels are still growing; abnormal vessel growth called retinopathy of prematurity (ROP) requires specialist screening.
- **Temperature & Skin:** Preterm infants have very little insulating body fat and thin skin, making hypothermia common without incubator warming.
- **Other:** Jaundice is more frequent due to immature liver processing, and an immature immune system makes infection prevention paramount.

### Key Neonatal Treatments
- **Antenatal Corticosteroids (Betamethasone):** Administered to the mother when early birth is anticipated to accelerate fetal lung maturation.
- **Surfactant Therapy:** Given directly into baby's airways to reduce surface tension in the alveoli.
- **Caffeine Citrate:** Used safely to stimulate breathing cadence and treat apnoea of prematurity.
- **Incubator Care:** Provides a humidified, thermo-regulated microenvironment supporting baby's growth.

*Outcome Note:* Survival and clinical outcomes improve sharply with each additional week of gestation. Viability starts around 22–24 weeks with intensive neonatal care.
    `
  },
  {
    id: 'art_4',
    title: 'The First Trimester (Weeks 1–12): Foundation & Organ Formation',
    category: 'Trimester Guides',
    isPdfSource: false,
    sourceDoc: 'Maternal Care Guidelines (ACOG/RCOG)',
    summary: 'Nourishing your body, managing morning sickness, and supporting early embryogenesis.',
    readTime: '4 min read',
    content: `
### What is Happening?
During weeks 1 through 12, your baby transitions from a microscopic blastocyst to a miniature fetus with hands, feet, heartbeat, and facial features.

### Tips for Mom:
- **Prenatal Folate:** Take 400–800 mcg of folic acid daily to support neural tube development.
- **Nausea Management:** Keep plain crackers near your bedside; eat small, frequent meals containing protein and complex carbohydrates.
- **Rest:** Progesterone levels surge in the first trimester, causing profound fatigue. Listen to your body and rest without guilt.
- **Hydration:** Sip room-temperature water, ginger tea, or electrolyte fluids throughout the day.
    `
  },
  {
    id: 'art_5',
    title: 'The Second Trimester (Weeks 13–27): Energy, Growth & Movement',
    category: 'Trimester Guides',
    isPdfSource: false,
    sourceDoc: 'Maternal Care Guidelines',
    summary: 'The golden weeks: feeling fetal movement, the 20-week anatomy scan, and physical changes.',
    readTime: '4 min read',
    content: `
### Welcome to Trimester Two
Many mothers experience renewed energy, diminished nausea, and the joy of feeling their baby's first fluttery movements (quickening).

### Highlights:
- **Anatomy Ultrasound (Weeks 18–22):** A comprehensive scan reviewing baby's spine, heart chambers, kidneys, brain ventricles, and placental position.
- **Hydration & Circulation:** Blood volume expands by up to 50%. Elevate your legs when sitting and drink plenty of fluids.
- **Back Comfort:** As your center of gravity shifts, practice gentle pelvic tilts and wear supportive footwear.
    `
  },
  {
    id: 'art_6',
    title: 'The Third Trimester (Weeks 28–40): Nesting & Preparing for Birth',
    category: 'Trimester Guides',
    isPdfSource: false,
    sourceDoc: 'Maternal Care Guidelines',
    summary: 'Final weight gain, baby positioning, preparing your birth preferences, and recognizing labor signs.',
    readTime: '4 min read',
    content: `
### The Home Stretch
Your baby is gaining weight rapidly, laying down protective fat layers, and practicing rhythmic breathing movements.

### Key Considerations:
- **Movement Awareness:** Learn your baby's unique daily movement rhythms. Promptly contact your maternity triage if you ever notice reduced or altered movements.
- **Sleeping Position:** Sleep on your side (especially the left side) with a pillow between your knees to optimize uterine blood flow.
- **Hospital Bag Preparation:** Have your essentials packed and ready around week 36.
    `
  },
  {
    id: 'art_7',
    title: 'Nourishing Mother & Baby: Gentle Nutritional Guidelines',
    category: 'Nutrition & Wellbeing',
    isPdfSource: false,
    sourceDoc: 'Clinical Nutrition in Pregnancy',
    summary: 'Balanced eating, key vitamins, safe foods, and debunking common pregnancy food myths.',
    readTime: '5 min read',
    content: `
### Balanced Daily Nutrition
Pregnancy does not require "eating for two" in volume, but rather eating with enhanced nutrient density.

- **Iron:** Vital for maternal hemoglobin expansion (lean meats, lentils, spinach, fortified oats).
- **Calcium & Vitamin D:** Crucial for fetal bone ossification (dairy, calcium-set tofu, dark leafy greens).
- **DHA / Omega-3:** Supports fetal brain and visual cortex development (low-mercury fish like salmon, chia seeds, walnuts).
- **Food Safety:** Ensure eggs, meats, and seafood are thoroughly cooked; wash all raw vegetables and fruits; choose pasteurized dairy products.
    `
  },
  {
    id: 'art_8',
    title: 'When to Contact Your Maternity Care Team Immediately',
    category: 'Doctor Visits',
    isPdfSource: false,
    sourceDoc: 'Obstetric Emergency Protocols',
    summary: 'Clear, non-alarmist guidance on red flag symptoms that warrant prompt evaluation.',
    readTime: '3 min read',
    content: `
### Trust Your Instincts
Never hesitate to call your maternity triage unit or doctor. Obstetric teams welcome calls from expectant mothers anytime day or night.

### Seek Immediate Care If You Experience:
1. **Any vaginal bleeding or fluid leaking:** Clear or blood-stained fluid before 37 weeks requires urgent evaluation.
2. **Noticeably reduced or changed baby movements:** Always have this checked immediately—do not wait until the next day.
3. **Severe headache with vision changes:** Flashing lights, blurring, or severe swelling of face/hands may indicate pre-eclampsia.
4. **Persistent severe abdominal pain or cramping.**
5. **High fever or chills.**
    `
  }
];

export const HOSPITAL_BAG_DEFAULTS = [
  // For Mom
  { id: 'hb_1', category: 'For Mom', item: 'Photo ID, insurance card & maternity medical notes', checked: true },
  { id: 'hb_2', category: 'For Mom', item: 'Comfortable loose nightgowns or button-up shirts for skin-to-skin', checked: false },
  { id: 'hb_3', category: 'For Mom', item: 'Warm cozy non-slip socks and slippers', checked: false },
  { id: 'hb_4', category: 'For Mom', item: 'Nursing bras and comfortable high-waisted cotton underwear', checked: false },
  { id: 'hb_5', category: 'For Mom', item: 'Toiletries: toothbrush, lip balm, gentle lotion, hair ties', checked: false },
  { id: 'hb_6', category: 'For Mom', item: 'Extra long phone charging cable', checked: true },
  { id: 'hb_7', category: 'For Mom', item: 'Going-home comfortable outfit (loose joggers/dress)', checked: false },
  
  // For Baby
  { id: 'hb_8', category: 'For Baby', item: 'Approved infant car seat (installed in vehicle)', checked: true },
  { id: 'hb_9', category: 'For Baby', item: '2–3 newborn onesies and sleepsuits with fold-over mittens', checked: false },
  { id: 'hb_10', category: 'For Baby', item: 'Soft organic cotton baby hat and socks', checked: false },
  { id: 'hb_11', category: 'For Baby', item: 'Warm swaddle blanket for going home', checked: false },
  { id: 'hb_12', category: 'For Baby', item: 'Small pack of newborn-sensitive diapers & water wipes', checked: false },

  // For Partner / Support Person
  { id: 'hb_13', category: 'For Partner', item: 'Change of clothes and comfortable shoes', checked: false },
  { id: 'hb_14', category: 'For Partner', item: 'Water bottle, nutritious snacks, and mints', checked: false },
  { id: 'hb_15', category: 'For Partner', item: 'Phone charger, camera, and headphones', checked: false },
  { id: 'hb_16', category: 'For Partner', item: 'List of friends & family to notify after baby arrives', checked: false }
];
