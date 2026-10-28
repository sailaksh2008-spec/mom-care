/**
 * Premature Baby Care & Development Data
 * 
 * PRIMARY SOURCE:
 * "Premature (Preterm) Baby: Definition, causes and stage of development" (premature_baby.pdf)
 * 
 * Strict compliance with all medical boundaries:
 * - Educational information only. Does not diagnose or prescribe.
 * - Sensitive, non-blaming terminology.
 * - Distinguishes source content from supplementary parent guidance.
 */

export const PREMATURE_PRIMARY_SOURCE = {
  document: 'premature_baby.pdf',
  title: 'Premature (Preterm) Baby: Definition, causes and stage of development',
  coreDefinition: 'A premature (preterm) baby is one born before 37 completed weeks of pregnancy. Full term is 37–42 weeks.',
  supportMessage: 'Every baby is different. The level of care a premature baby needs depends on gestational age, birth weight, health, and individual circumstances.'
};

/**
 * Categories of Prematurity (from PDF)
 */
export const PREMATURE_CATEGORIES = [
  {
    id: 'extremely_preterm',
    name: 'Extremely Preterm',
    gestationalAge: 'Before 28 completed weeks',
    minWeeks: 0,
    maxWeeks: 27,
    color: '#E07A5F',
    bgColor: '#FFF5F2',
    accentBorder: '#F4A261',
    description: 'Babies born before 28 completed weeks of pregnancy.',
    clinicalOverview: 'These tiny infants require specialized Level III or IV Neonatal Intensive Care Unit (NICU) support, including respiratory assistance, temperature regulation, and intravenous nutrition while their fragile organ systems continue maturing.',
    sourceVerified: true
  },
  {
    id: 'very_preterm',
    name: 'Very Preterm',
    gestationalAge: '28 to under 32 completed weeks',
    minWeeks: 28,
    maxWeeks: 31,
    color: '#8338EC',
    bgColor: '#F8F5FF',
    accentBorder: '#BDB2FF',
    description: 'Babies born between 28 weeks and 31 weeks + 6 days.',
    clinicalOverview: 'Babies in this window have developed significantly compared to earlier weeks, but still need focused neonatal care for lung maturation, feeding development, and temperature stability.',
    sourceVerified: true
  },
  {
    id: 'moderate_late_preterm',
    name: 'Moderate to Late Preterm',
    gestationalAge: '32 to under 37 completed weeks',
    minWeeks: 32,
    maxWeeks: 36,
    color: '#3A86FF',
    bgColor: '#F0F7FF',
    accentBorder: '#A0C4FF',
    description: 'Babies born between 32 weeks and 36 weeks + 6 days.',
    clinicalOverview: 'Representing the majority of preterm births, late preterm babies often look like small full-term infants but benefit from close monitoring for feeding coordination, jaundice, and thermal regulation.',
    sourceVerified: true
  }
];

/**
 * Birth Weight Classifications (from PDF)
 */
export const BIRTH_WEIGHT_CATEGORIES = [
  {
    category: 'Low Birth Weight (LBW)',
    threshold: 'Under 2,500 g (< 5.5 lbs)',
    explanation: 'Infants weighing less than 2,500 grams at birth regardless of gestational age.',
    sourceVerified: true
  },
  {
    category: 'Very Low Birth Weight (VLBW)',
    threshold: 'Under 1,500 g (< 3.3 lbs)',
    explanation: 'Infants weighing less than 1,500 grams at birth, commonly requiring specialized incubator and respiratory care.',
    sourceVerified: true
  },
  {
    category: 'Extremely Low Birth Weight (ELBW)',
    threshold: 'Under 1,000 g (< 2.2 lbs)',
    explanation: 'Infants weighing less than 1,000 grams at birth, needing high-level intensive neonatal multidisciplinary support.',
    sourceVerified: true
  }
];

/**
 * Causes and Associated Factors (from PDF)
 * Categorized into the 5 exact groups described in the PDF
 */
export const PREMATURE_CAUSES = [
  {
    group: 'Maternal conditions',
    badge: 'Maternal Health',
    icon: 'Activity',
    sourceExamples: [
      'Infections (UTI, bacterial vaginosis, chorioamnionitis)',
      'Pre-eclampsia',
      'Hypertension',
      'Diabetes',
      'Anaemia or malnutrition'
    ],
    gentleContext: 'Maternal health conditions may trigger early labor or require clinicians to deliver early for safety. Infections can cause local inflammation that triggers uterine contractions.'
  },
  {
    group: 'Uterine and placental',
    badge: 'Anatomical Factors',
    icon: 'Shield',
    sourceExamples: [
      'Cervical insufficiency',
      'Uterine abnormalities',
      'Placental abruption',
      'Placenta previa',
      'Premature rupture of membranes'
    ],
    gentleContext: 'The placenta and cervix provide vital structural support. Complications such as early water breaking (PPROM) or placental separation can necessitate prompt delivery.'
  },
  {
    group: 'Pregnancy factors',
    badge: 'Pregnancy Specifics',
    icon: 'Users',
    sourceExamples: [
      'Twins or multiples',
      'IVF',
      'Previous preterm birth',
      'Short gaps between pregnancies'
    ],
    gentleContext: 'Multiple gestations (twins/triplets) naturally place extra volume stretch on the uterus, which often initiates labor earlier than single pregnancies.'
  },
  {
    group: 'Lifestyle and other risks',
    badge: 'Associated Factors',
    icon: 'HeartHandshake',
    sourceExamples: [
      'Smoking',
      'Alcohol use',
      'Drug use',
      'Severe stress',
      'Maternal age under 17 or over 35'
    ],
    gentleContext: 'Maternal and environmental stressors can affect vascular blood flow. Healthcare providers offer non-judgmental support and resources to optimize health.'
  },
  {
    group: 'Medical reasons',
    badge: 'Clinical Decisions',
    icon: 'Stethoscope',
    sourceExamples: [
      'Labour sometimes induced early to protect mother or baby',
      'In many cases no clear cause is found'
    ],
    gentleContext: 'Often, an early delivery is a carefully timed medical intervention by doctors to protect the safety of the mother or child. In a significant number of cases, preterm birth occurs spontaneously with no identifiable cause.'
  }
];

/**
 * Stage of Development and Risks (Preterm Body Systems from PDF)
 */
export const PRETERM_BODY_SYSTEMS = [
  {
    system: 'Lungs & Respiration',
    sourceProblem: 'Surfactant production starts around weeks 24–28, so respiratory distress syndrome is common',
    normalDevelopment: 'Lungs mature from tubular structures into billions of tiny alveoli air sacs that secrete surfactant to stay expanded.',
    whyAffected: 'Preterm babies often have insufficient surfactant, causing the microscopic air sacs to collapse upon expiration.',
    parentFriendlyTerms: {
      'Surfactant': 'A gentle, soapy-like natural substance that lines the lungs and prevents air sacs from collapsing during breathing.',
      'Respiratory Distress Syndrome (RDS)': 'A condition where a newborn baby must work harder to breathe due to lower amounts of natural surfactant.'
    },
    neonatalMonitoring: 'Monitored via oxygen saturation sensors, gentle continuous positive airway pressure (CPAP), or targeted surfactant replacement.',
    badge: 'Critical System'
  },
  {
    system: 'Brain & Nervous System',
    sourceProblem: 'Immature breathing control causes apnoea; fragile vessels risk intraventricular haemorrhage',
    normalDevelopment: 'The central respiratory drive in the brainstem coordinates breathing cadence, and fragile cerebral germinal matrix blood vessels consolidate.',
    whyAffected: 'The brainstem breathing pacemaker is still developing, leading to pauses in breathing (apnoea). Blood vessels in the brain are delicate.',
    parentFriendlyTerms: {
      'Apnoea of Prematurity': 'Temporary pauses in breathing lasting 15–20 seconds, often accompanied by a temporary dip in heart rate.',
      'Intraventricular Haemorrhage (IVH)': 'Bleeding inside or around the fluid-filled spaces (ventricles) of an infant\'s immature brain.'
    },
    neonatalMonitoring: 'Cardiorespiratory monitors alert nurses instantly; routine bedside cranial ultrasounds screen brain health gently.',
    badge: 'Neurological'
  },
  {
    system: 'Heart & Cardiovascular',
    sourceProblem: 'Patent ductus arteriosus may fail to close',
    normalDevelopment: 'During womb life, a temporary shunt vessel (the ductus arteriosus) diverts blood away from fetal lungs directly to the aorta, closing naturally soon after birth.',
    whyAffected: 'In preterm infants, the biochemical signals prompting the vessel to constrict and close can be delayed.',
    parentFriendlyTerms: {
      'Patent Ductus Arteriosus (PDA)': 'A small fetal blood connection between the pulmonary artery and aorta that remains open (patent) longer than usual.'
    },
    neonatalMonitoring: 'Echocardiograms (heart ultrasounds) assess blood flow, managed gently with fluid balance or targeted medication when needed.',
    badge: 'Cardiovascular'
  },
  {
    system: 'Gut & Digestive Tract',
    sourceProblem: 'Feeding is difficult; risk of necrotising enterocolitis',
    normalDevelopment: 'Intestinal motility, digestive enzymes, and the coordinated suck-swallow-breathe reflex mature towards the end of pregnancy.',
    whyAffected: 'Immature gastrointestinal motility and delicate mucosal barriers make processing formula or large feeds challenging.',
    parentFriendlyTerms: {
      'Necrotising Enterocolitis (NEC)': 'An inflammatory condition affecting the intestinal lining of premature babies that clinicians monitor closely.'
    },
    neonatalMonitoring: 'Gradual introduction of mother\'s breast milk (or donor human milk) provides protective bioactive antibodies, often given via a tiny soft feeding tube.',
    badge: 'Gastrointestinal'
  },
  {
    system: 'Eyes & Vision',
    sourceProblem: 'Retinopathy of prematurity can develop',
    normalDevelopment: 'Retinal blood vessels branch outward from the optic nerve and complete development during the final 12 weeks of term gestation.',
    whyAffected: 'Early birth and fluctuating oxygen concentrations can disrupt normal vascular growth in the back of the eye.',
    parentFriendlyTerms: {
      'Retinopathy of Prematurity (ROP)': 'Abnormal growth of retinal blood vessels in preterm babies, typically detected through routine screening.'
    },
    neonatalMonitoring: 'Specialist pediatric ophthalmologists conduct gentle eye screenings at scheduled gestational weeks.',
    badge: 'Sensory'
  },
  {
    system: 'Temperature & Skin Barrier',
    sourceProblem: 'Little body fat, so hypothermia is common',
    normalDevelopment: 'Subcutaneous adipose fat and protective brown fat deposit mainly during the third trimester to insulate against heat loss.',
    whyAffected: 'Very thin skin, a high body-surface-area-to-weight ratio, and scarce fat reserves make premature infants lose heat quickly.',
    parentFriendlyTerms: {
      'Hypothermia': 'A drop in body temperature below the ideal range, which can cause baby to expend vital energy shivering or breathing.'
    },
    neonatalMonitoring: 'Double-walled thermo-regulated incubators, heated mattresses, and skin-to-skin Kangaroo care keep the baby at ideal warmth.',
    badge: 'Thermal Regulation'
  },
  {
    system: 'Other Systems (Liver & Immune)',
    sourceProblem: 'Jaundice is more frequent; weak immune system makes infections more likely',
    normalDevelopment: 'Immature liver enzymes (bilirubin conjugation) and transplacental transfer of maternal IgG antibodies take place during the final weeks.',
    whyAffected: 'The baby\'s liver processes bilirubin more slowly, and white blood cell reserves are still growing.',
    parentFriendlyTerms: {
      'Jaundice': 'Yellowing of skin and eyes caused by bilirubin build-up, comfortably treated under gentle blue phototherapy lights.',
      'Immune Vulnerability': 'The natural immaturity of newborn infection-fighting cells, managed by strict hygiene and protective care.'
    },
    neonatalMonitoring: 'Transcutaneous bilirubin checks, phototherapy blankets, and strict sterile hand-hygiene protocols.',
    badge: 'Systemic'
  }
];

/**
 * Outcome and Key Treatments (from PDF)
 */
export const NEONATAL_TREATMENTS = [
  {
    id: 'corticosteroids',
    name: 'Antenatal Corticosteroids (Betamethasone)',
    sourceReference: 'Antenatal corticosteroids (betamethasone) given to the mother',
    role: 'Given to the pregnant mother when early delivery is anticipated.',
    howItWorks: 'Crosses the placenta to stimulate rapid maturation of fetal lung alveolar cells and accelerate endogenous surfactant synthesis.',
    medicalBoundary: 'Prescribed exclusively by treating obstetricians based on specific clinical guidelines.'
  },
  {
    id: 'surfactant_therapy',
    name: 'Surfactant Therapy',
    sourceReference: 'Surfactant therapy',
    role: 'Administered directly into the baby\'s airways in the NICU.',
    howItWorks: 'Supplies the natural surface-active lipoprotein that keeps the infant\'s microscopic air sacs from collapsing during exhalation.',
    medicalBoundary: 'Given by neonatal specialists during breathing support.'
  },
  {
    id: 'caffeine_citrate',
    name: 'Caffeine Citrate for Apnoea',
    sourceReference: 'Caffeine citrate for apnoea',
    role: 'A safe, gentle respiratory stimulant used commonly in neonatal units.',
    howItWorks: 'Stimulates the immature respiratory pacemaker in the baby\'s brainstem, reducing the frequency of apnoeic pauses.',
    medicalBoundary: 'Carefully measured by the NICU clinical team until the baby outgrows apnoea of prematurity.'
  },
  {
    id: 'incubator_care',
    name: 'Incubator Care',
    sourceReference: 'Incubator care',
    role: 'A warm, humidified, protective microenvironment.',
    howItWorks: 'Maintains ideal thermal stability, minimizes evaporative water loss through delicate skin, and protects against outside noise and drafts.',
    medicalBoundary: 'Essential supportive care providing a womb-like sanctuary while baby grows.'
  }
];

/**
 * Questions Parents Can Ask the Neonatologist
 */
export const NEONATAL_PARENT_QUESTIONS = [
  'What level of respiratory support is my baby currently receiving?',
  'How is my baby tolerating nutrition (mother\'s milk, donor milk, or TPN)?',
  'When is it safe for us to start Kangaroo Care (skin-to-skin holding)?',
  'What are today\'s weight and head circumference measurements?',
  'Are there any scheduled screenings coming up (cranial ultrasound, eye exams, jaundice checks)?',
  'What signs of progress or fatigue should I look for when visiting?',
  'What can I do today to help comfort and bond with my baby?'
];
