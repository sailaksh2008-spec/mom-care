import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Calendar, Clock, Bell, CheckCircle2, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { calculateEDDFromLMP, calculateGestationalAge, toInputDateFormat } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = usePregnancy();

  const [step, setStep] = useState(1);
  const [motherName, setMotherName] = useState(profile.motherName || '');
  const [datingMode, setDatingMode] = useState(profile.useClinician ? 'clinician' : 'lmp');
  const [lmpDate, setLmpDate] = useState(profile.lmpDate || '');
  const [clinicianEdd, setClinicianEdd] = useState(profile.clinicianEdd || '');
  const [reminders, setReminders] = useState({
    appointments: true,
    medications: true,
    hydration: true,
    movement: false
  });

  // Dynamically calculate estimated preview
  const previewLmp = datingMode === 'lmp' ? lmpDate : null;
  const previewEdd = datingMode === 'clinician' ? clinicianEdd : calculateEDDFromLMP(lmpDate);
  const previewGA = calculateGestationalAge(previewLmp, previewEdd, datingMode === 'clinician');

  const handleLmpChange = (val) => {
    setLmpDate(val);
    if (val && datingMode === 'lmp') {
      const calcEdd = calculateEDDFromLMP(val);
      setClinicianEdd(calcEdd || '');
    }
  };

  const handleFinish = () => {
    // Save profile
    updateProfile({
      motherName: motherName.trim() || 'Mom',
      lmpDate: lmpDate,
      clinicianEdd: clinicianEdd,
      useClinician: datingMode === 'clinician',
      reminderPreferences: reminders,
      isOnboarded: true
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF758F', '#BDB2FF', '#84A98C', '#FFD166']
      });
    } catch (e) {
      // safe fallback
    }

    navigate('/');
  };

  const handleSkip = () => {
    updateProfile({
      isOnboarded: true
    });
    navigate('/');
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 10px' }}>
      <div 
        className="card" 
        style={{ 
          maxWidth: 620, 
          width: '100%', 
          padding: '36px 30px', 
          boxShadow: 'var(--shadow-lg)',
          background: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              style={{ 
                width: step === s ? 32 : 10, 
                height: 10, 
                borderRadius: 20, 
                background: step === s ? 'var(--primary-pink)' : step > s ? 'var(--lavender)' : '#E5E7EB',
                transition: 'all 0.3s ease'
              }} 
            />
          ))}
        </div>

        {/* STEP 1: WELCOME INTRO */}
        {step === 1 && (
          <div style={{ textAlign: 'center' }}>
            <div 
              style={{ 
                width: 76, 
                height: 76, 
                borderRadius: 24, 
                background: 'linear-gradient(135deg, #FFE5EC, #FFF0F3)', 
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255, 117, 143, 0.25)'
              }}
            >
              <Heart size={40} color="#FF758F" fill="#FF758F" />
            </div>

            <h1 style={{ fontSize: '2.1rem', marginBottom: 8, color: '#D81B60' }}>
              MOMCARE 💗
            </h1>
            <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#6B7280', marginBottom: 18 }}>
              Your Pregnancy, Your Journey
            </p>

            <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24, boxShadow: 'var(--shadow-md)' }}>
              <img 
                src="/assets/hero_banner.jpg" 
                alt="Expectant mother pregnancy journey" 
                style={{ width: '100%', height: 210, objectFit: 'cover' }}
              />
            </div>

            <p style={{ color: '#4B5563', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: 28, textAlign: 'left' }}>
              Welcome to your supportive pregnancy sanctuary. Follow your baby’s weekly foetal growth, 
              learn about premature baby care and developmental stages, manage healthcare appointments, 
              and preserve your baby’s ultrasound scans and memories in one place.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button 
                onClick={() => setStep(2)} 
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={handleSkip} 
                className="btn btn-outline btn-sm"
                style={{ alignSelf: 'center', color: '#6B7280', borderColor: 'transparent' }}
              >
                Skip setup for now
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: MOTHER & PREGNANCY DATING */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.6rem', color: '#D81B60', marginBottom: 6 }}>
                About You & Your Baby 💕
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                All dates are medical estimates used to calculate gestational age.
              </p>
            </div>

            {/* Mother's Name */}
            <div className="form-group">
              <label className="form-label">What is your name? (Optional)</label>
              <input 
                type="text" 
                value={motherName} 
                onChange={(e) => setMotherName(e.target.value)}
                placeholder="e.g. Sarah"
              />
              <div className="form-help">We'll personalize your daily greetings.</div>
            </div>

            {/* Dating Selection Tabs */}
            <div className="form-group">
              <label className="form-label">How would you like to date your pregnancy?</label>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button
                  type="button"
                  onClick={() => setDatingMode('lmp')}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: 12,
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    background: datingMode === 'lmp' ? '#FFE5EC' : '#F9FAFB',
                    color: datingMode === 'lmp' ? '#D81B60' : '#4B5563',
                    border: datingMode === 'lmp' ? '1.5px solid #FF758F' : '1px solid #E5E7EB'
                  }}
                >
                  Last Period (LMP)
                </button>
                <button
                  type="button"
                  onClick={() => setDatingMode('clinician')}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: 12,
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    background: datingMode === 'clinician' ? '#FFE5EC' : '#F9FAFB',
                    color: datingMode === 'clinician' ? '#D81B60' : '#4B5563',
                    border: datingMode === 'clinician' ? '1.5px solid #FF758F' : '1px solid #E5E7EB'
                  }}
                >
                  Doctor-Confirmed EDD
                </button>
              </div>
            </div>

            {/* LMP Input */}
            {datingMode === 'lmp' ? (
              <div className="form-group">
                <label className="form-label">First day of your Last Menstrual Period (LMP)</label>
                <input 
                  type="date" 
                  value={lmpDate}
                  onChange={(e) => handleLmpChange(e.target.value)}
                />
                <div className="form-help">
                  Standard obstetrical rule: Estimated Due Date is calculated as 280 days (40 weeks) from your LMP.
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Clinician-Provided Due Date (EDD)</label>
                <input 
                  type="date" 
                  value={clinicianEdd}
                  onChange={(e) => setClinicianEdd(e.target.value)}
                />
                <div className="form-help">
                  As determined by your ultrasound or healthcare provider.
                </div>
              </div>
            )}

            {/* Live Estimation Preview Card */}
            {(lmpDate || clinicianEdd) && (
              <div style={{ background: '#F8F5FF', border: '1px solid #E0D7FF', borderRadius: 14, padding: 14, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '0.88rem', color: '#6D28D9', marginBottom: 6 }}>
                  <Sparkles size={16} />
                  <span>Calculated Estimation Preview:</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, fontSize: '0.84rem' }}>
                  <div>
                    <span style={{ color: '#6B7280' }}>Gestational Age:</span>
                    <strong style={{ display: 'block', color: '#2B2D42' }}>{previewGA.formatted}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#6B7280' }}>Trimester:</span>
                    <strong style={{ display: 'block', color: '#2B2D42' }}>{previewGA.trimesterName}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#6B7280' }}>Estimated Due Date:</span>
                    <strong style={{ display: 'block', color: '#2B2D42' }}>{previewEdd || 'Calculating...'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#6B7280' }}>Development Stage:</span>
                    <strong style={{ display: 'block', color: '#2B2D42' }}>{previewGA.stage}</strong>
                  </div>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#7C3AED', marginTop: 8, fontStyle: 'italic' }}>
                  *All dates are clinical estimates. Gestational age is conventionally counted from LMP (~40 weeks), 
                  whereas fertilization age is approximately 2 weeks less (~38 weeks).
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={() => setStep(3)} 
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PREFERRED REMINDERS & CONFIRMATION */}
        {step === 3 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.6rem', color: '#D81B60', marginBottom: 6 }}>
                Reminder Preferences 🔔
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                Select the gentle reminders you'd like MOMCARE to organize for you.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { key: 'appointments', label: 'Doctor & Ultrasound Appointments', desc: 'Upcoming prenatal checkups and tests' },
                { key: 'medications', label: 'Prenatal Vitamins & Supplements', desc: 'Daily multivitamin, calcium and iron reminders' },
                { key: 'hydration', label: 'Daily Water & Hydration Goals', desc: 'Hydration prompts throughout the day' },
                { key: 'movement', label: 'Baby Movement Counting Sessions', desc: 'Third-trimester kick monitoring reminders' }
              ].map((item) => (
                <label 
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: reminders[item.key] ? '#FFF0F3' : '#F9FAFB',
                    border: reminders[item.key] ? '1.5px solid #FFB3C1' : '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input 
                    type="checkbox"
                    checked={reminders[item.key]}
                    onChange={(e) => setReminders({ ...reminders, [item.key]: e.target.checked })}
                    style={{ width: 20, height: 20, accentColor: 'var(--primary-pink)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{item.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 12, marginBottom: 20, fontSize: '0.8rem', color: '#92400E' }}>
              <Info size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              <span>
                Browser-based notifications depend on device permissions and may not alert when the browser is fully closed. 
                Always rely on clinician scheduling for critical medical timing.
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                type="button" 
                onClick={() => setStep(2)} 
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={handleFinish} 
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                <CheckCircle2 size={18} />
                <span>Enter MOMCARE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
