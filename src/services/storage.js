/**
 * LocalStorage Service for Structured Prototype Metadata & Preferences
 */

const STORAGE_KEYS = {
  PROFILE: 'momcare_profile',
  BABY: 'momcare_baby',
  EMERGENCY: 'momcare_emergency_contacts',
  APPOINTMENTS: 'momcare_appointments',
  REMINDERS: 'momcare_reminders',
  WELLNESS: 'momcare_wellness',
  KICKS: 'momcare_kicks',
  JOURNAL: 'momcare_journal',
  NICU_MILESTONES: 'momcare_nicu_milestones',
  HOSPITAL_BAG: 'momcare_hospital_bag'
};

// Safe JSON parser
function safeParse(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from LocalStorage:`, e);
    return fallback;
  }
}

// Safe JSON writer
function safeWrite(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(`Error saving ${key} to LocalStorage:`, e);
    return false;
  }
}

// Default initial user profile (Active pregnancy demo: ~23 weeks)
const DEFAULT_PROFILE = {
  motherName: 'Sarah',
  lmpDate: '2026-05-18', // ~23 weeks pregnant as of Oct 2026
  clinicianEdd: '2027-02-22',
  useClinician: false,
  reminderPreferences: {
    appointments: true,
    medications: true,
    hydration: true,
    movement: false
  },
  theme: 'soft-blush',
  isOnboarded: true
};

const DEFAULT_BABY = {
  isBorn: false,
  babyName: 'Little Bean',
  birthDate: '',
  birthGestationalAge: '',
  birthWeight: '',
  isPreterm: false,
  nicuStay: false
};

const DEFAULT_EMERGENCY = {
  emergencyNumber: '911',
  hospitalName: "St. Mary's Maternity & Children's Pavilion",
  maternityWard: '+1 (555) 234-5678',
  doctorName: 'Dr. Emily Vance (OB/GYN)',
  doctorPhone: '+1 (555) 345-6789',
  nicuWard: '+1 (555) 876-5432',
  partnerName: 'David (Partner)',
  partnerPhone: '+1 (555) 987-6543'
};

const DEFAULT_APPOINTMENTS = [
  {
    id: 'apt_1',
    doctorName: 'Dr. Emily Vance',
    clinic: "St. Mary's Prenatal Clinic - Suite 402",
    date: '2026-10-30',
    time: '10:30',
    type: 'Routine Checkup',
    notes: '24-week routine maternal wellness check, fundal height measurement & blood pressure screening.',
    questions: 'Ask about glucose screening test schedule and pelvic stretching exercises.',
    completed: false
  },
  {
    id: 'apt_2',
    doctorName: 'Dr. Arthur Mitchell',
    clinic: 'Diagnostic Ultrasound Suite',
    date: '2026-10-15',
    time: '14:00',
    type: 'Ultrasound',
    notes: '20-week anatomy scan. Baby is developing normally. Placenta posterior and healthy.',
    questions: 'Reviewed anatomy report. Everything looks right on track.',
    completed: true
  },
  {
    id: 'apt_3',
    doctorName: 'Midwife Claire Bennett',
    clinic: 'Community Birthing Centre',
    date: '2026-11-20',
    time: '11:15',
    type: 'Glucose Tolerance Test',
    notes: 'Gestational diabetes screening (1-hour glucose test) and hemoglobin recheck.',
    questions: 'Confirm fasting instructions before arriving.',
    completed: false
  }
];

const DEFAULT_REMINDERS = [
  {
    id: 'rem_1',
    name: 'Prenatal Multivitamin with DHA',
    dosage: '1 softgel daily',
    time: '08:30',
    frequency: 'Daily with breakfast',
    notes: 'Clinician recommended taking with food to reduce any mild nausea.',
    completedToday: true,
    lastCompletedDate: new Date().toISOString().split('T')[0]
  },
  {
    id: 'rem_2',
    name: 'Calcium & Vitamin D3',
    dosage: '500 mg chewable',
    time: '13:00',
    frequency: 'Daily with lunch',
    notes: 'Supports fetal bone development. Taken separately from iron for optimal absorption.',
    completedToday: false,
    lastCompletedDate: ''
  },
  {
    id: 'rem_3',
    name: 'Gentle Hydration Glass',
    dosage: '1 large glass water (250 ml)',
    time: '15:00',
    frequency: 'Daily afternoon',
    notes: 'Hydration supports amniotic fluid maintenance and healthy circulation.',
    completedToday: false,
    lastCompletedDate: ''
  }
];

const DEFAULT_JOURNAL = [
  {
    id: 'jrn_1',
    title: 'Feeling the first gentle flutters! 💕',
    date: '2026-10-18',
    category: 'Milestones',
    content: 'Around 21 weeks, I felt the sweetest little rhythmic taps while resting on the sofa after dinner. David put his hand on my belly and we both smiled with tears in our eyes. It feels like tiny bubbles popping or butterfly wings fluttering.',
    hasPhoto: false,
    createdAt: Date.now() - 8 * 86400000
  },
  {
    id: 'jrn_2',
    title: 'A letter to our baby',
    date: '2026-10-22',
    category: 'Letters to Baby',
    content: 'Dear little one, your nursery is slowly taking shape with warm sage and blush hues. Every week that passes brings you closer to us. Your dad sings to you each night and you always seem to dance in response. We love you so much already.',
    hasPhoto: false,
    createdAt: Date.now() - 4 * 86400000
  }
];

const DEFAULT_NICU_MILESTONES = [
  {
    id: 'nicu_1',
    title: 'First Kangaroo Care (Skin-to-Skin)',
    category: 'Bonding',
    date: '',
    gestationalAge: '',
    weight: '',
    notes: 'Warm chest-to-chest contact with parent; helps baby stabilize heart rate and temperature.',
    completed: false
  },
  {
    id: 'nicu_2',
    title: 'First Colostrum Drops / Oral Swab',
    category: 'Nutrition',
    date: '',
    gestationalAge: '',
    weight: '',
    notes: 'Providing first drops of mother\'s breast milk for immune protection.',
    completed: false
  },
  {
    id: 'nicu_3',
    title: 'Breathing Room Air / Weaning from CPAP',
    category: 'Respiratory',
    date: '',
    gestationalAge: '',
    weight: '',
    notes: 'A wonderful step forward in lung maturity and breathing independence.',
    completed: false
  },
  {
    id: 'nicu_4',
    title: 'Graduating from Incubator to Open Cot',
    category: 'Thermal Regulation',
    date: '',
    gestationalAge: '',
    weight: '',
    notes: 'Baby is able to maintain own body temperature steadily.',
    completed: false
  },
  {
    id: 'nicu_5',
    title: 'First Full Bottle or Breastfeed',
    category: 'Feeding',
    date: '',
    gestationalAge: '',
    weight: '',
    notes: 'Coordinating suck-swallow-breathe reflex successfully.',
    completed: false
  },
  {
    id: 'nicu_6',
    title: 'Discharge Day — Coming Home! 🏠💗',
    category: 'Milestone',
    date: '',
    gestationalAge: '',
    weight: '',
    notes: 'The day the neonatal team confirms baby is ready to go home.',
    completed: false
  }
];

export const StorageService = {
  // Profile
  getProfile: () => safeParse(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE),
  setProfile: (profile) => safeWrite(STORAGE_KEYS.PROFILE, profile),

  // Baby profile & Post-birth mode
  getBaby: () => safeParse(STORAGE_KEYS.BABY, DEFAULT_BABY),
  setBaby: (baby) => safeWrite(STORAGE_KEYS.BABY, baby),

  // Emergency contacts
  getEmergency: () => safeParse(STORAGE_KEYS.EMERGENCY, DEFAULT_EMERGENCY),
  setEmergency: (contacts) => safeWrite(STORAGE_KEYS.EMERGENCY, contacts),

  // Appointments
  getAppointments: () => safeParse(STORAGE_KEYS.APPOINTMENTS, DEFAULT_APPOINTMENTS),
  setAppointments: (apts) => safeWrite(STORAGE_KEYS.APPOINTMENTS, apts),

  // Reminders
  getReminders: () => safeParse(STORAGE_KEYS.REMINDERS, DEFAULT_REMINDERS),
  setReminders: (reminders) => safeWrite(STORAGE_KEYS.REMINDERS, reminders),

  // Wellness Logs
  getWellness: () => safeParse(STORAGE_KEYS.WELLNESS, {}),
  setWellness: (wellnessMap) => safeWrite(STORAGE_KEYS.WELLNESS, wellnessMap),

  // Baby Kicks
  getKicks: () => safeParse(STORAGE_KEYS.KICKS, []),
  setKicks: (kicks) => safeWrite(STORAGE_KEYS.KICKS, kicks),

  // Journal
  getJournal: () => safeParse(STORAGE_KEYS.JOURNAL, DEFAULT_JOURNAL),
  setJournal: (journal) => safeWrite(STORAGE_KEYS.JOURNAL, journal),

  // NICU & Premature Milestones
  getNicuMilestones: () => safeParse(STORAGE_KEYS.NICU_MILESTONES, DEFAULT_NICU_MILESTONES),
  setNicuMilestones: (milestones) => safeWrite(STORAGE_KEYS.NICU_MILESTONES, milestones),

  // Hospital Bag Checklist
  getHospitalBag: () => safeParse(STORAGE_KEYS.HOSPITAL_BAG, null),
  setHospitalBag: (bag) => safeWrite(STORAGE_KEYS.HOSPITAL_BAG, bag),

  // Export all user data as JSON
  exportAllData: () => {
    const exportObject = {
      exportVersion: '1.0',
      exportedAt: new Date().toISOString(),
      profile: safeParse(STORAGE_KEYS.PROFILE, null),
      baby: safeParse(STORAGE_KEYS.BABY, null),
      emergency: safeParse(STORAGE_KEYS.EMERGENCY, null),
      appointments: safeParse(STORAGE_KEYS.APPOINTMENTS, []),
      reminders: safeParse(STORAGE_KEYS.REMINDERS, []),
      wellness: safeParse(STORAGE_KEYS.WELLNESS, {}),
      kicks: safeParse(STORAGE_KEYS.KICKS, []),
      journal: safeParse(STORAGE_KEYS.JOURNAL, []),
      nicuMilestones: safeParse(STORAGE_KEYS.NICU_MILESTONES, [])
    };
    return JSON.stringify(exportObject, null, 2);
  },

  // Clear all LocalStorage data with reset to fresh state
  clearAllData: () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  }
};
