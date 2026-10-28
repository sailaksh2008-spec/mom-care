import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Baby, Calendar, Scale, Heart, Sparkles, Check, ChevronRight, AlertCircle, Trash2, ArrowLeft } from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';

export default function BabyProfile() {
  const { baby, updateBaby, scans } = usePregnancy();

  const [isBorn, setIsBorn] = useState(baby.isBorn || false);
  const [babyName, setBabyName] = useState(baby.babyName || '');
  const [birthDate, setBirthDate] = useState(baby.birthDate || '');
  const [birthGA, setBirthGA] = useState(baby.birthGestationalAge || '');
  const [birthWeight, setBirthWeight] = useState(baby.birthWeight || '');
  const [isPreterm, setIsPreterm] = useState(baby.isPreterm || false);
  const [nicuStay, setNicuStay] = useState(baby.nicuStay || false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateBaby({
      isBorn,
      babyName: babyName.trim(),
      birthDate,
      birthGestationalAge: birthGA.trim(),
      birthWeight: birthWeight.trim(),
      isPreterm,
      nicuStay
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetBaby = () => {
    if (window.confirm("Switch back to active pregnancy tracking mode? This will unpause the gestational countdown.")) {
      updateBaby({
        isBorn: false,
        babyName: '',
        birthDate: '',
        birthGestationalAge: '',
        birthWeight: '',
        isPreterm: false,
        nicuStay: false
      });
      setIsBorn(false);
      setBabyName('');
      setBirthDate('');
      setBirthGA('');
      setBirthWeight('');
      setIsPreterm(false);
      setNicuStay(false);
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      
      {/* Back to Baby Hub */}
      <div style={{ marginBottom: 16 }}>
        <Link to="/baby" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>
          <ArrowLeft size={16} />
          <span>Back to Baby Central</span>
        </Link>
      </div>

      <div className="card" style={{ marginBottom: 24, padding: '28px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0284C7', fontWeight: 700, fontSize: '0.85rem', marginBottom: 4 }}>
          <Baby size={18} />
          <span>POST-BIRTH PROFILE & TRANSITION</span>
        </div>
        <h1 style={{ fontSize: '1.9rem', color: '#2B2D42', fontWeight: 800, marginBottom: 8 }}>
          Baby Profile & Care Mode 💕
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.5, marginBottom: 20 }}>
          If your baby has arrived, activate <strong>Post-Birth Mode</strong> to transition your dashboard 
          from active pregnancy counting into newborn memories, milestones, and care tracking.
        </p>

        {/* Toggle Mode Switch */}
        <div style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', borderRadius: 16, padding: '16px 20px', marginBottom: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0369A1', marginBottom: 2 }}>
                Baby Has Arrived (Post-Birth Mode)
              </div>
              <div style={{ fontSize: '0.82rem', color: '#0C4A6E' }}>
                Hides active pregnancy countdown and focuses dashboard on your newborn.
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={isBorn} 
              onChange={(e) => setIsBorn(e.target.checked)}
              style={{ width: 24, height: 24, accentColor: '#0284C7', cursor: 'pointer' }}
            />
          </label>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Baby's Name (Optional)</label>
            <input 
              type="text" 
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              placeholder="e.g. Leo / Lily / Little Bean"
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Birth Date</label>
              <input 
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gestational Age at Birth (if known)</label>
              <input 
                type="text" 
                value={birthGA}
                onChange={(e) => setBirthGA(e.target.value)}
                placeholder="e.g. 38 weeks + 2 days or 31w 4d"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Birth Weight (Optional)</label>
            <input 
              type="text" 
              value={birthWeight}
              onChange={(e) => setBirthWeight(e.target.value)}
              placeholder="e.g. 3,250 g or 7 lbs 2 oz or 1,450 g"
            />
            <div className="form-help">
              For your personal records only. MOMCARE does not classify infant health or predict outcomes from birth weight.
            </div>
          </div>

          {/* Preterm Checkbox */}
          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 8 }}>
              <input 
                type="checkbox" 
                checked={isPreterm} 
                onChange={(e) => setIsPreterm(e.target.checked)}
                style={{ width: 20, height: 20, accentColor: 'var(--lavender-deep)' }}
              />
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#6B21A8' }}>
                  Was baby born preterm (before 37 completed weeks)?
                </span>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#7E22CE' }}>
                  If checked, we will highlight the Premature Baby Care module and NICU milestone features.
                </p>
              </div>
            </label>

            {isPreterm && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #E9D5FF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.84rem', color: '#6B21A8' }}>Need premature infant guidance?</span>
                <Link to="/premature-care" className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                  Open Premature Care Guide
                </Link>
              </div>
            )}
          </div>

          {saveSuccess && (
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 12, color: '#166534', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Check size={18} />
              <span>Baby profile updated successfully!</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              Save Baby Profile
            </button>
            {baby.isBorn && (
              <button 
                type="button" 
                onClick={handleResetBaby} 
                className="btn btn-outline"
                style={{ flex: 1, borderColor: '#D1D5DB', color: '#6B7280' }}
              >
                Reset to Pregnancy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Quick Summary of Saved Scan Photos */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: '1.15rem', color: '#2B2D42', margin: 0 }}>
            Saved Ultrasound Scans ({scans.length})
          </h2>
          <Link to="/baby/scans" style={{ fontSize: '0.82rem', color: '#D81B60', fontWeight: 600 }}>
            View All Scans
          </Link>
        </div>
        <p style={{ fontSize: '0.84rem', color: '#6B7280', margin: 0 }}>
          Your baby's scans remain safely preserved in local IndexedDB. You can view, add, or download memories anytime.
        </p>
      </div>

    </div>
  );
}
