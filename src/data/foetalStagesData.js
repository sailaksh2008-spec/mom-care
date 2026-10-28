/**
 * Foetal Growth & Development Data
 * 
 * PRIMARY SOURCE:
 * "Stages of Foetal Growth During Gestation" (stages_of_foetal_growth.pdf)
 * Prenatal development: about 38 weeks from fertilization (40 weeks from LMP).
 * 
 * All milestones below strictly conform to the primary source document.
 * Distinctions between source text and supplementary educational context are clearly noted.
 */

export const SOURCE_DOCUMENT_INFO = {
  title: 'Stages of Foetal Growth During Gestation',
  reference: 'stages_of_foetal_growth.pdf',
  fertilizationWeeks: 38,
  lmpWeeks: 40,
  disclaimer: 'Developmental milestones represent typical timelines. Every pregnancy and baby develops uniquely.'
};

export const DEVELOPMENTAL_STAGES = [
  {
    id: 'germinal',
    name: '1. Germinal Stage',
    weeksRange: 'Weeks 1–2',
    weeks: [1, 2],
    title: 'Fertilization to Implantation',
    image: '/assets/germinal_stage.jpg',
    summary: 'The initial stage beginning at conception where the single-cell zygote divides and travels toward implantation.',
    sourceKeyPoints: [
      'The zygote forms at fertilization, then divides into a morula and a blastocyst.',
      'The blastocyst implants in the uterine wall around day 6–10.'
    ],
    detailedDescription: 'During the first two weeks following fertilization, the fertilized ovum (zygote) begins rapid mitotic division. As it traverses the fallopian tube toward the uterus, it transforms into a solid ball of cells called a morula, and subsequently hollows into a blastocyst containing an inner cell mass. By days 6–10, the blastocyst gently embeds into the nutrient-rich uterine endometrium.',
    clinicalFocus: 'Cell division, blastocyst formation, and endometrial implantation.'
  },
  {
    id: 'embryonic',
    name: '2. Embryonic Stage',
    weeksRange: 'Weeks 3–8',
    weeks: [3, 4, 5, 6, 7, 8],
    title: 'Organogenesis & Germ Layer Differentiation',
    image: '/assets/embryonic_stage.jpg',
    summary: 'The critical formative window when all essential tissues and primary bodily systems take structural shape.',
    sourceKeyPoints: [
      'The three germ layers form: ectoderm, mesoderm, and endoderm.',
      'Organogenesis occurs: the neural tube, heart (beating by about week 5), limb buds, eyes, and ears develop.',
      'This is the most vulnerable period for teratogens (e.g., thalidomide).'
    ],
    detailedDescription: 'The embryonic stage marks the transformation of the inner cell mass into three distinct germ layers: the ectoderm (nervous system, skin, sensory organs), mesoderm (cardiovascular system, muscles, skeleton, kidneys), and endoderm (digestive tract, respiratory organs). By approximately week 5, the primitive heart tube begins rhythmic pulsations. Tiny limb buds, optic vesicles, and auditory placodes form.',
    clinicalFocus: 'Vulnerable developmental window requiring protection from external teratogens, medications, and harmful exposures.'
  },
  {
    id: 'foetal',
    name: '3. Foetal Stage',
    weeksRange: 'Week 9 to Birth',
    weeks: Array.from({ length: 32 }, (_, i) => i + 9),
    title: 'Growth, Functional Specialization & Maturation',
    image: '/assets/hero_banner.jpg',
    summary: 'From week 9 until full-term delivery, body organs grow, mature, and prepare for extrauterine life.',
    sourceKeyPoints: [
      'Weeks 9–12: External genitalia differentiate, and the fetus begins to move.',
      'Weeks 13–16: Skeleton ossifies, and the fetus is about 10–12 cm long.',
      'Weeks 17–20: Quickening (the mother feels movement); lanugo and vernix appear.',
      'Weeks 21–24: Lungs begin producing surfactant; viability begins around week 24.',
      'Weeks 25–28: Eyes open, and the nervous system matures rapidly.',
      'Weeks 29–36: Rapid weight gain through fat deposition; lung maturation continues.',
      'Weeks 37–40: Full term; the head usually engages in the pelvis.'
    ],
    detailedDescription: 'During the foetal stage, the embryo is formally referred to as a foetus. Structures established during organogenesis expand, ossify, and practice physiological functions such as swallowing, respiratory movements, and active kick cycles.',
    clinicalFocus: 'Fetal growth monitoring, surfactant production, neurological maturation, and pelvic engagement.'
  }
];

export const TRIMESTERS = [
  {
    trimester: 1,
    name: 'First Trimester',
    weeksRange: 'Weeks 1–12',
    weeksStart: 1,
    weeksEnd: 12,
    focus: 'Organ formation',
    badge: 'Foundation',
    color: '#FF758F',
    description: 'The miraculous beginning where single cells transform into a tiny, fully formed human with beating heart, limbs, and differentiating organs.',
    keyMilestones: [
      'Fertilization, morula, and blastocyst uterine implantation (Days 6–10)',
      'Formation of the 3 primary germ layers: ectoderm, mesoderm, endoderm',
      'Neural tube closure and early beating heart by week 5',
      'External genitalia differentiation and first subtle reflex movements by weeks 9–12'
    ]
  },
  {
    trimester: 2,
    name: 'Second Trimester',
    weeksRange: 'Weeks 13–27',
    weeksStart: 13,
    weeksEnd: 27,
    focus: 'Growth and movement',
    badge: 'Blossoming',
    color: '#BDB2FF',
    description: 'Often termed the golden trimester, marked by rapid physical elongation, bone ossification, and the magical first flutter of maternal kicks.',
    keyMilestones: [
      'Skeleton begins active ossification; fetus reaches approximately 10–12 cm by week 16',
      'Mother perceives quickening (fluttering fetal movements) around weeks 17–20',
      'Protective lanugo (fine hair) and vernix caseosa coat the delicate skin',
      'Pulmonary surfactant production begins around weeks 21–24; viability milestone around week 24',
      'Eyes open and nervous system undergoes rapid dendritic maturation around weeks 25–27'
    ]
  },
  {
    trimester: 3,
    name: 'Third Trimester',
    weeksRange: 'Weeks 28–40',
    weeksStart: 28,
    weeksEnd: 40,
    focus: 'Maturation and weight gain',
    badge: 'Nesting & Term',
    color: '#84A98C',
    description: 'The home stretch where fat deposits smooth the baby\'s skin, vital organs achieve independence, and the head engages in the pelvis for birth.',
    keyMilestones: [
      'Intense neurological branching, brain wave differentiation, and sensory reactivity',
      'Subcutaneous adipose fat deposition leading to rapid weekly weight gain',
      'Pulmonary alveolar maturation and continuing surfactant secretion',
      'Attaining full term (weeks 37–40); fetal vertex engages safely in maternal pelvis'
    ]
  }
];

export const FOETAL_STAGE_CARDS = [
  {
    range: 'Weeks 9–12',
    weeksStart: 9,
    weeksEnd: 12,
    stage: 'Foetal Stage',
    trimester: '1st Trimester',
    sourceText: 'External genitalia differentiate, and the fetus begins to move.',
    explanation: 'Major organ systems are now formed and continuing to grow. The kidneys begin producing tiny amounts of urine, reflex movements start (though too gentle to be felt yet by the mother), and the facial profile becomes distinctly human.',
    sizeAnalogy: 'Lime to Plum (~5 to 6 cm)',
    sourceVerified: true
  },
  {
    range: 'Weeks 13–16',
    weeksStart: 13,
    weeksEnd: 16,
    stage: 'Foetal Stage',
    trimester: '2nd Trimester',
    sourceText: 'Skeleton ossifies, and the fetus is about 10–12 cm long.',
    explanation: 'Soft cartilage begins transforming into hard bone through ossification. Tiny fingernails appear, the vocal cords form, and the fetus practices swallowing amniotic fluid.',
    sizeAnalogy: 'Lemon to Avocado (10–12 cm)',
    sourceVerified: true
  },
  {
    range: 'Weeks 17–20',
    weeksStart: 17,
    weeksEnd: 20,
    stage: 'Foetal Stage',
    trimester: '2nd Trimester',
    sourceText: 'Quickening (the mother feels movement); lanugo and vernix appear.',
    explanation: 'Mothers often describe quickening as tiny bubbles, ripples, or butterfly flutters. A fine velvety coat of downy hair (lanugo) and a protective creamy moisture barrier (vernix caseosa) protect the delicate skin from amniotic fluid.',
    sizeAnalogy: 'Sweet Potato to Banana (~15–25 cm)',
    sourceVerified: true
  },
  {
    range: 'Weeks 21–24',
    weeksStart: 21,
    weeksEnd: 24,
    stage: 'Foetal Stage',
    trimester: '2nd Trimester',
    sourceText: 'Lungs begin producing surfactant; viability begins around week 24.',
    explanation: 'Specialized alveolar type II cells begin synthesizing surfactant, a lipoprotein essential for keeping air sacs open after birth. Clinicians identify approximately week 24 as the beginning of potential viability with modern intensive neonatal care.',
    sizeAnalogy: 'Ear of Corn to Papaya (~30 cm, ~600 g)',
    sourceVerified: true
  },
  {
    range: 'Weeks 25–28',
    weeksStart: 25,
    weeksEnd: 28,
    stage: 'Foetal Stage',
    trimester: '2nd / 3rd Trimester',
    sourceText: 'Eyes open, and the nervous system matures rapidly.',
    explanation: 'The eyelids, previously fused shut for retinal protection, open and blink. The cerebral cortex forms complex folds, sleep-wake cycles emerge, and the baby responds to sounds from the outside world.',
    sizeAnalogy: 'Eggplant to Cauliflower (~35 cm, ~1,000 g)',
    sourceVerified: true
  },
  {
    range: 'Weeks 29–36',
    weeksStart: 29,
    weeksEnd: 36,
    stage: 'Foetal Stage',
    trimester: '3rd Trimester',
    sourceText: 'Rapid weight gain through fat deposition; lung maturation continues.',
    explanation: 'The baby accumulates brown and white adipose fat, which aids in body temperature regulation after birth. The respiratory tree branches further, bones harden, and maternal antibodies cross the placenta for early immune defense.',
    sizeAnalogy: 'Butternut Squash to Pineapple (~42–47 cm, ~1.5–2.7 kg)',
    sourceVerified: true
  },
  {
    range: 'Weeks 37–40',
    weeksStart: 37,
    weeksEnd: 40,
    stage: 'Foetal Stage',
    trimester: '3rd Trimester',
    sourceText: 'Full term; the head usually engages in the pelvis.',
    explanation: 'Reaching 37 completed weeks is recognized clinically as full term. The baby is ready to meet the world; the head drops into the pelvic cradle (lightening), breathing becomes easier for mom, and nesting instincts peak.',
    sizeAnalogy: 'Honeydew to Watermelon (~50 cm, ~3.2–3.6 kg)',
    sourceVerified: true
  }
];

/**
 * Detailed 40-week lookup table for the Week Navigator
 */
export function getWeekDetails(weekNumber) {
  const week = Math.max(1, Math.min(40, Number(weekNumber) || 20));
  
  let stageName = 'Foetal Stage';
  let stageId = 'foetal';
  if (week <= 2) {
    stageName = 'Germinal Stage';
    stageId = 'germinal';
  } else if (week <= 8) {
    stageName = 'Embryonic Stage';
    stageId = 'embryonic';
  }

  let trimester = 1;
  if (week >= 28) trimester = 3;
  else if (week >= 13) trimester = 2;

  // Fruit/Veggie analogy
  const analogies = [
    'Poppy seed (Pre-conception)', 'Fertilized ovum', 'Chia seed', 'Poppy seed',
    'Sesame seed', 'Sweet pea', 'Blueberry', 'Raspberry',
    'Green olive', 'Prune', 'Lime', 'Plum',
    'Peach', 'Lemon', 'Apple', 'Avocado',
    'Pomegranate', 'Artichoke', 'Mango', 'Banana',
    'Carrot', 'Papaya', 'Grapefruit', 'Ear of Corn',
    'Rutabaga', 'Scallion bunch', 'Cauliflower', 'Eggplant',
    'Acorn squash', 'Cabbage', 'Coconut', 'Jicama',
    'Pineapple', 'Cantaloupe', 'Honeydew melon', 'Romaine lettuce',
    'Swiss chard', 'Leek bunch', 'Mini watermelon', 'Small pumpkin'
  ];

  // Primary source highlight
  let pdfHighlight = null;
  if (week <= 2) {
    pdfHighlight = 'Germinal Stage: Zygote forms at fertilization, divides into morula and blastocyst; implants around day 6–10.';
  } else if (week <= 8) {
    pdfHighlight = `Embryonic Stage (Week ${week}): Three germ layers present; organogenesis underway. Heart beats by ~week 5. High vulnerability to teratogens.`;
  } else if (week >= 9 && week <= 12) {
    pdfHighlight = 'Foetal Stage (Weeks 9–12): External genitalia differentiate; fetus begins moving.';
  } else if (week >= 13 && week <= 16) {
    pdfHighlight = 'Foetal Stage (Weeks 13–16): Skeleton ossifies; fetus measures approximately 10–12 cm long.';
  } else if (week >= 17 && week <= 20) {
    pdfHighlight = 'Foetal Stage (Weeks 17–20): Quickening (mother feels movement); lanugo and vernix appear.';
  } else if (week >= 21 && week <= 24) {
    pdfHighlight = 'Foetal Stage (Weeks 21–24): Lungs begin producing surfactant; potential viability starts around week 24.';
  } else if (week >= 25 && week <= 28) {
    pdfHighlight = 'Foetal Stage (Weeks 25–28): Eyes open; nervous system matures rapidly.';
  } else if (week >= 29 && week <= 36) {
    pdfHighlight = 'Foetal Stage (Weeks 29–36): Rapid weight gain through fat deposition; lung maturation continues.';
  } else {
    pdfHighlight = 'Foetal Stage (Weeks 37–40): Full term; fetal head usually engages in the pelvis.';
  }

  return {
    week,
    stageName,
    stageId,
    trimester,
    analogy: analogies[week - 1] || 'Little Miracle',
    pdfHighlight,
    isViableStage: week >= 24,
    isFullTerm: week >= 37
  };
}
