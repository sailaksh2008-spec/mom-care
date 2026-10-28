import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Shield, Download, Trash2, Heart, Sparkles, 
  Settings, CheckCircle2, AlertTriangle, ArrowRight, Baby, Phone, Clock 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { calculateEDDFromLMP } from '../utils/dateUtils';
import Modal from '../components/Modal';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const { 
    profile, 
    updateProfile, 
    baby, 
    resetAllData, 
    exportData,
    gestationalAge 
  } = usePregnancy();

  const [motherName, setMotherName] = useState(profile.motherName || '');
  const [datingMode, setDatingMode] = useState(profile.useClinician ? 'clinician' : 'lmp');
  const [lmpDate, setLmpDate] = useState(profile.lmpDate || '');
  const [clinicianEdd, setClinicianEdd] = useState(profile.clinicianEdd || '');
  const [reminders, setReminders] = useState({ ...profile.reminderPreferences });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    const updated = {
      motherName: motherName.trim() || 'Mom',
      lmpDate: lmpDate,
      clinicianEdd: clinicianEdd,
      useClinician: datingMode === 'clinician',
      reminderPreferences: reminders
    };
    if (datingMode === 'lmp' && lmpDate) {
      updated.clinicianEdd = calculateEDDFromLMP(lmpDate);
    }
    updateProfile(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MOMCARE_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleConfirmReset = async () => {
    await resetAllData();
    setIsResetModalOpen(false);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      
      {/* Header */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF, #FFF5F7)', 
          borderColor: '#FFCCD5',
          marginBottom: 24,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#D81B60', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
          <Settings size={16} />
          <span>ACCOUNT PREFERENCES & PRIVACY</span>
        </div>
        <h1 style={{ fontSize: '2.1rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
          Profile & Settings ⚙️
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 620 }}>
          Manage your personal details, gestational dating calculations, reminders, 
          privacy settings, and data exports.
        </p>
      </div>

      {saveSuccess && (
        <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 12, color: '#166534', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <CheckCircle2 size={18} />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* 1. EDIT PROFILE FORM */}
      <div className="card" style={{ marginBottom: 24, padding: 24 }}>
        <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 16 }}>
          Mother's Information & Pregnancy Dating
        </h2>

        <form onSubmit={handleProfileSave}>
          <div className="form-group">
            <label className="form-label">Mother's Name</label>
            <input 
              type="text" 
              value={motherName} 
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="e.g. Sarah"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dating Method</label>
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
                Count from LMP (280 Days)
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
                Clinician-Confirmed EDD
              </button>
            </div>
          </div>

          {datingMode === 'lmp' ? (
            <div className="form-group">
              <label className="form-label">First Day of Last Menstrual Period (LMP)</label>
              <input 
                type="date" 
                value={lmpDate} 
                onChange={(e) => setLmpDate(e.target.value)}
              />
              <div className="form-help">
                Estimated Due Date is automatically calculated as 280 days from LMP.
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
                As determined by your ultrasound sonogram or doctor.
              </div>
            </div>
          )}

          {/* Current Gestational Calculation Feedback */}
          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 14, padding: 14, marginBottom: 20 }}>
            <span style={{ fontSize: '0.74rem', color: '#7B2CBF', fontWeight: 700, textTransform: 'uppercase' }}>CURRENT GESTATIONAL STATUS</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2B2D42', marginTop: 4 }}>
              {gestationalAge.formatted} · {gestationalAge.trimesterName}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: 2 }}>
              Stage: <strong>{gestationalAge.stage}</strong> · Estimated Due Date: <strong>{gestationalAge.eddDate || 'Pending'}</strong>
            </div>
          </div>

          {/* Reminder Preferences */}
          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Gentle Reminder Settings</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { key: 'appointments', label: 'Doctor & Ultrasound Checkup Reminders' },
                { key: 'medications', label: 'Prenatal Vitamins & Supplements' },
                { key: 'hydration', label: 'Daily Hydration Prompts' },
                { key: 'movement', label: 'Baby Movement Counting Sessions' }
              ].map((item) => (
                <label 
                  key={item.key} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12, 
                    padding: '8px 12px', 
                    background: '#F9FAFB', 
                    borderRadius: 10,
                    cursor: 'pointer' 
                  }}
                >
                  <input 
                    type="checkbox"
                    checked={reminders[item.key]}
                    onChange={(e) => setReminders({ ...reminders, [item.key]: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: 'var(--primary-pink)' }}
                  />
                  <span style={{ fontSize: '0.88rem', color: '#2B2D42', fontWeight: 500 }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Save Profile Settings
          </button>
        </form>
      </div>

      {/* 2. QUICK LINKS TO SUB-SETTINGS */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Baby size={20} color="#0284C7" />
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#2B2D42' }}>Baby Profile & Post-Birth</h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0 0 12px' }}>
            Switch to newborn mode when baby arrives and track birth measurements.
          </p>
          <Link to="/baby/profile" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            <span>Manage Baby Mode</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Phone size={20} color="#E63946" />
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#2B2D42' }}>Emergency Phone Numbers</h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0 0 12px' }}>
            Configure your obstetrician, triage ward, and support partner hotlines.
          </p>
          <Link to="/emergency" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            <span>View Emergency Hub</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 3. DATA STORAGE & PRIVACY DOCUMENTATION (REQUIRED) */}
      <div className="card" style={{ marginBottom: 24, padding: 22, borderLeft: '6px solid #84A98C' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#2D6A4F' }}>
          <Shield size={22} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Local Data Storage & Privacy Architecture
          </h2>
        </div>
        <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.6, marginBottom: 10 }}>
          <strong>Where your data lives:</strong> MOMCARE operates entirely in private local mode. 
          Preferences and metadata are stored in your browser's <code>LocalStorage</code>, while ultrasound sonograms 
          and photo attachments are saved as binary blobs in your browser's <code>IndexedDB</code> database without Base64 overhead.
        </p>
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 14, fontSize: '0.82rem', color: '#92400E', lineHeight: 1.5, marginBottom: 14 }}>
          <strong>⚠️ Security & Backup Limitations:</strong> Data stored locally is confined to this browser profile. 
          If you clear your browser cookies, browsing history, or website data, or if your device is reset, local records may be erased. 
          Local browser storage does not constitute secure automated cloud backup. 
          We recommend regularly using the <strong>Export All Data</strong> button below to save a personal copy.
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleExport} className="btn btn-outline" style={{ borderRadius: 12, borderColor: '#84A98C', color: '#2D6A4F' }}>
            <Download size={16} />
            <span>Export All Data (JSON Backup)</span>
          </button>
        </div>
      </div>

      {/* 4. DANGER ZONE: CLEAR ALL DATA */}
      <div className="card" style={{ padding: 22, border: '1px solid #FECDD3', background: '#FFF5F5' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#E63946', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={18} />
          <span>Reset & Clear Application Data</span>
        </h2>
        <p style={{ fontSize: '0.84rem', color: '#7F1D1D', marginBottom: 14 }}>
          Permanently delete all stored preferences, appointments, wellness logs, journal memories, and scan photos from this browser.
        </p>
        <button 
          onClick={() => setIsResetModalOpen(true)}
          className="btn btn-danger btn-sm"
        >
          <Trash2 size={16} />
          <span>Clear All Personal Data</span>
        </button>
      </div>

      {/* CONFIRM RESET MODAL */}
      <Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} title="Confirm Data Reset" maxWidth={440}>
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <AlertTriangle size={48} color="#E63946" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#2B2D42', marginBottom: 8 }}>Are you absolutely sure?</h3>
          <p style={{ fontSize: '0.86rem', color: '#6B7280', lineHeight: 1.5, marginBottom: 20 }}>
            This will permanently remove all your ultrasound scan photos from IndexedDB and clear your journal entries, 
            wellness logs, and appointment records. This cannot be undone.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setIsResetModalOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>
              Keep My Data
            </button>
            <button onClick={handleConfirmReset} className="btn btn-danger" style={{ flex: 1 }}>
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
