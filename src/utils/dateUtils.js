/**
 * Pregnancy Date Calculation Utilities
 * 
 * Clinical Conventions:
 * - Gestational Age (GA) is conventionally measured from the first day of the Last Menstrual Period (LMP).
 * - Human gestation averages 280 days (40 completed weeks) from LMP.
 * - Age since fertilization (embryonic/foetal age) is approximately 2 weeks less than gestational age (~38 weeks).
 * - All calculations are strictly medical estimates and can vary per pregnancy.
 */

export const MS_PER_DAY = 1000 * 60 * 60 * 24;
export const FULL_TERM_DAYS = 280; // 40 weeks

/**
 * Format a Date object or ISO string to a gentle display format (e.g. "15 October 2026")
 */
export function formatDate(dateInput) {
  if (!dateInput) return 'Not set';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return 'Invalid date';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Format a Date to YYYY-MM-DD for HTML input[type="date"]
 */
export function toInputDateFormat(dateInput) {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
}

/**
 * Calculate Estimated Due Date (EDD) from LMP (LMP + 280 days / 40 weeks)
 */
export function calculateEDDFromLMP(lmpDate) {
  if (!lmpDate) return null;
  const lmp = new Date(lmpDate);
  if (isNaN(lmp.getTime())) return null;
  const edd = new Date(lmp.getTime() + FULL_TERM_DAYS * MS_PER_DAY);
  return edd.toISOString().split('T')[0];
}

/**
 * Calculate LMP backwards if clinician EDD is provided (EDD - 280 days)
 */
export function calculateLMPFromEDD(eddDate) {
  if (!eddDate) return null;
  const edd = new Date(eddDate);
  if (isNaN(edd.getTime())) return null;
  const lmp = new Date(edd.getTime() - FULL_TERM_DAYS * MS_PER_DAY);
  return lmp.toISOString().split('T')[0];
}

/**
 * Calculate Gestational Age in weeks and days from either LMP or Clinician EDD
 * Returns { weeks, days, totalDays, isValid, formatted, progressPercent, daysRemaining, trimester, stage }
 */
export function calculateGestationalAge(lmpDate, clinicianEdd = null, useClinician = false) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let effectiveLMP = null;
  let effectiveEDD = null;

  if (useClinician && clinicianEdd) {
    effectiveEDD = new Date(clinicianEdd);
    effectiveLMP = new Date(effectiveEDD.getTime() - FULL_TERM_DAYS * MS_PER_DAY);
  } else if (lmpDate) {
    effectiveLMP = new Date(lmpDate);
    effectiveEDD = new Date(effectiveLMP.getTime() + FULL_TERM_DAYS * MS_PER_DAY);
  } else if (clinicianEdd) {
    effectiveEDD = new Date(clinicianEdd);
    effectiveLMP = new Date(effectiveEDD.getTime() - FULL_TERM_DAYS * MS_PER_DAY);
  }

  if (!effectiveLMP || isNaN(effectiveLMP.getTime())) {
    // Default fallback to 20 weeks demo if nothing set
    return {
      weeks: 20,
      days: 0,
      totalDays: 140,
      isValid: false,
      formatted: 'Week 20',
      progressPercent: 50,
      daysRemaining: 140,
      trimester: 2,
      trimesterName: 'Second Trimester',
      stage: 'Foetal Stage',
      fertilizationAgeWeeks: 18,
      eddDate: null
    };
  }

  effectiveLMP.setHours(0, 0, 0, 0);
  effectiveEDD.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - effectiveLMP.getTime();
  const totalDays = Math.max(0, Math.floor(diffTime / MS_PER_DAY));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  // Days remaining until EDD
  const remainingTime = effectiveEDD.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(remainingTime / MS_PER_DAY));

  // Clamped progress percentage (0 to 100%)
  const progressPercent = Math.min(100, Math.max(0, Math.round((totalDays / FULL_TERM_DAYS) * 100)));

  // Trimester according to PDF & Prompt:
  // 1st: Weeks 1–12 (Organ formation)
  // 2nd: Weeks 13–27 (Growth and movement)
  // 3rd: Weeks 28–40 (Maturation and weight gain)
  let trimester = 1;
  let trimesterName = 'First Trimester';
  if (weeks >= 28) {
    trimester = 3;
    trimesterName = 'Third Trimester';
  } else if (weeks >= 13) {
    trimester = 2;
    trimesterName = 'Second Trimester';
  }

  // Development Stage according to PDF:
  // 1. Germinal Stage: Weeks 1-2
  // 2. Embryonic Stage: Weeks 3-8
  // 3. Foetal Stage: Weeks 9 to Birth
  let stage = 'Germinal Stage';
  if (weeks >= 9) {
    stage = 'Foetal Stage';
  } else if (weeks >= 3) {
    stage = 'Embryonic Stage';
  }

  // Fertilization age is ~2 weeks less than LMP gestational age
  const fertilizationAgeWeeks = Math.max(0, weeks - 2);

  return {
    weeks,
    days,
    totalDays,
    isValid: true,
    formatted: `${weeks} Weeks + ${days} Days`,
    shortFormatted: `${weeks}w ${days}d`,
    progressPercent,
    daysRemaining,
    trimester,
    trimesterName,
    stage,
    fertilizationAgeWeeks,
    eddDate: effectiveEDD.toISOString().split('T')[0],
    lmpDate: effectiveLMP.toISOString().split('T')[0]
  };
}
