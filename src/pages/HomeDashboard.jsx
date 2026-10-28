import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, Sparkles, Calendar, Clock, Activity, Baby, Image as ImageIcon, 
  BookOpen, CheckCircle, ChevronRight, Plus, Droplets, ShieldAlert,
  ArrowUpRight, AlertCircle
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { formatDate } from '../utils/dateUtils';
import { getWeekDetails } from '../data/foetalStagesData';
import { createBlobUrl } from '../services/db';
import MedicalDisclaimer from '../components/MedicalDisclaimer';

export default function HomeDashboard() {
  const navigate = useNavigate();
  const { 
    profile, 
    gestationalAge, 
    baby, 
    appointments, 
    reminders, 
    toggleReminderToday,
    scans,
    scansLoading 
  } = usePregnancy();

  const [latestScanUrl, setLatestScanUrl] = useState(null);

  // If user somehow skipped onboarding or has no name/LMP, we still show a friendly experience
  const motherName = profile.motherName || 'Mom';
  const weekInfo = getWeekDetails(gestationalAge.weeks);

  // Latest Scan Preview from IndexedDB
  const latestScan = scans && scans.length > 0 ? scans[scans.length - 1] : null;

  useEffect(() => {
    let url = null;
    if (latestScan && latestScan.blob) {
      url = createBlobUrl(latestScan.blob);
      setLatestScanUrl(url);
    } else {
      setLatestScanUrl(null);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [latestScan]);

  // Next Upcoming Appointment
  const upcomingApt = appointments
    .filter((a) => !a.completed && new Date(a.date) >= new Date(new Date().setHours(0,0,0,0)))
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <div>
      {/* 1. GREETING & HERO DASHBOARD */}
      <section 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 243, 0.9))',
          borderColor: 'rgba(255, 182, 193, 0.4)',
          marginBottom: 24,
          padding: '30px 24px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#D81B60', fontWeight: 700, fontSize: '0.85rem', marginBottom: 4 }}>
                <Heart size={16} fill="#FF758F" color="#FF758F" />
                <span>MOMCARE COMPANION</span>
              </div>
              <h1 style={{ fontSize: '2.1rem', color: '#2B2D42', fontWeight: 800 }}>
                Hello, {motherName}! 💕
              </h1>
            </div>

            {baby.isBorn ? (
              <span className="badge badge-blue" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
                <Baby size={16} />
                <span>Post-Birth Baby Mode Active</span>
              </span>
            ) : (
              <span className="badge badge-pink" style={{ fontSize: '0.95rem', padding: '8px 16px' }}>
                <Sparkles size={16} />
                <span>{gestationalAge.formatted}</span>
              </span>
            )}
          </div>

          {/* If baby is already born: Post-birth mode banner */}
          {baby.isBorn ? (
            <div style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', borderRadius: 18, padding: 20 }}>
              <h2 style={{ fontSize: '1.35rem', color: '#0369A1', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Baby size={22} />
                <span>Welcome to the World, {baby.babyName || 'Little One'}! 👶✨</span>
              </h2>
              <p style={{ color: '#0C4A6E', fontSize: '0.92rem', marginBottom: 14 }}>
                You have transitioned into Post-Birth Baby Care mode. The active pregnancy countdown is paused, 
                and you can record newborn milestones, measurements, and feeding memories.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Link to="/baby/profile" className="btn btn-secondary btn-sm">
                  View Baby Profile
                </Link>
                {baby.isPreterm && (
                  <Link to="/premature-care" className="btn btn-primary btn-sm">
                    Open Premature Baby Care Module 💗
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Active Pregnancy Hero Tracker */
            <div>
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
                  gap: 12,
                  marginBottom: 18
                }}
              >
                <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(255, 182, 193, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 600 }}>CURRENT TRIMESTER</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#D81B60' }}>{gestationalAge.trimesterName}</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(255, 182, 193, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 600 }}>DEVELOPMENT STAGE</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#7B2CBF' }}>{gestationalAge.stage}</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(255, 182, 193, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 600 }}>ESTIMATED DUE DATE</div>
                  <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#2B2D42' }}>
                    {gestationalAge.eddDate ? formatDate(gestationalAge.eddDate) : 'Estimate Pending'}
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: 14, border: '1px solid rgba(255, 182, 193, 0.3)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 600 }}>APPROX. REMAINING</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10B981' }}>
                    {gestationalAge.daysRemaining} Days
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', marginBottom: 6 }}>
                  <span>Pregnancy Progress</span>
                  <span style={{ color: '#D81B60' }}>{gestationalAge.progressPercent}% of Full Term (40 Weeks)</span>
                </div>
                <div style={{ width: '100%', height: 12, background: '#FFE5EC', borderRadius: 10, overflow: 'hidden', padding: 2 }}>
                  <div 
                    style={{ 
                      width: `${gestationalAge.progressPercent}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #FF758F, #BDB2FF)', 
                      borderRadius: 8,
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} 
                  />
                </div>
              </div>

              {/* Weekly Baby Development Summary Highlight (Source-Derived) */}
              <div 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid #F3E8FF', 
                  borderRadius: 16, 
                  padding: '16px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12
                }}
              >
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#7B2CBF', fontWeight: 700, marginBottom: 4 }}>
                    <Sparkles size={14} />
                    <span>WEEK {gestationalAge.weeks} BABY DEVELOPMENT HIGHLIGHT</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#2B2D42', lineHeight: 1.5 }}>
                    {weekInfo.pdfHighlight}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: 4 }}>
                    Approximate size analogy: <strong>{weekInfo.analogy}</strong>
                  </div>
                </div>

                <Link 
                  to="/growth" 
                  className="btn btn-outline btn-sm"
                  style={{ alignSelf: 'center', gap: 6 }}
                >
                  <span>Explore Week by Week</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. DYNAMIC WIDGETS GRID: Latest Scan, Appointments, Reminders */}
      <div className="grid-3" style={{ marginBottom: 28 }}>
        
        {/* Latest Baby Scan Photo Widget (IndexedDB) */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', margin: 0 }}>
              <ImageIcon size={18} color="#FF758F" />
              <span>Latest Baby Scan</span>
            </h2>
            <Link to="/baby/scans" style={{ fontSize: '0.78rem', color: '#D81B60', fontWeight: 600 }}>
              View Gallery
            </Link>
          </div>

          {latestScan && latestScanUrl ? (
            <div>
              <div className="image-thumbnail-wrapper" style={{ marginBottom: 10, height: 160 }}>
                <img src={latestScanUrl} alt={latestScan.title || 'Baby Scan'} />
                <span 
                  style={{ 
                    position: 'absolute', 
                    bottom: 8, 
                    left: 8, 
                    background: 'rgba(0,0,0,0.65)', 
                    color: 'white', 
                    fontSize: '0.72rem', 
                    padding: '3px 8px', 
                    borderRadius: 6,
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  Week {latestScan.week} · {latestScan.date}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#2B2D42' }}>{latestScan.title}</div>
              <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '2px 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {latestScan.note || 'Cherished ultrasound memory.'}
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 10px', background: '#FFF9FA', borderRadius: 14, border: '1.5px dashed #FFCCD5' }}>
              <ImageIcon size={32} color="#FFA8B6" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>
                No Scan Uploaded Yet
              </div>
              <p style={{ fontSize: '0.76rem', color: '#9CA3AF', marginBottom: 12 }}>
                Save your ultrasound memories privately in IndexedDB.
              </p>
              <Link to="/baby/scans" className="btn btn-primary btn-sm">
                <Plus size={14} />
                <span>Add Scan Photo</span>
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Doctor Appointments Widget */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', margin: 0 }}>
              <Calendar size={18} color="#7B2CBF" />
              <span>Upcoming Visit</span>
            </h2>
            <Link to="/appointments" style={{ fontSize: '0.78rem', color: '#7B2CBF', fontWeight: 600 }}>
              All Visits
            </Link>
          </div>

          {upcomingApt ? (
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 14, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="badge badge-purple">{upcomingApt.type}</span>
                <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>
                  {formatDate(upcomingApt.date)} at {upcomingApt.time}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.94rem', color: '#2B2D42', marginBottom: 2 }}>
                {upcomingApt.doctorName}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', marginBottom: 8 }}>
                {upcomingApt.clinic}
              </div>
              {upcomingApt.questions && (
                <div style={{ fontSize: '0.76rem', background: 'rgba(255,255,255,0.7)', padding: '6px 8px', borderRadius: 8, color: '#4B5563' }}>
                  <strong>Q:</strong> {upcomingApt.questions}
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 10px', background: '#F8F9FA', borderRadius: 14, border: '1px dashed #E5E7EB' }}>
              <Calendar size={32} color="#D1D5DB" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>
                No Visits Scheduled
              </div>
              <p style={{ fontSize: '0.76rem', color: '#9CA3AF', marginBottom: 12 }}>
                Keep track of prenatal checkups & ultrasounds.
              </p>
              <Link to="/appointments" className="btn btn-secondary btn-sm">
                <Plus size={14} />
                <span>Add Appointment</span>
              </Link>
            </div>
          )}
        </div>

        {/* Today's Medicine / Supplement Reminders Widget */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 className="card-title" style={{ fontSize: '1.1rem', margin: 0 }}>
              <Clock size={18} color="#84A98C" />
              <span>Today's Reminders</span>
            </h2>
            <Link to="/reminders" style={{ fontSize: '0.78rem', color: '#2D6A4F', fontWeight: 600 }}>
              Manage
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {reminders.slice(0, 3).map((r) => (
              <div 
                key={r.id}
                onClick={() => toggleReminderToday(r.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 10,
                  background: r.completedToday ? '#EBF2EE' : '#FFFFFF',
                  border: r.completedToday ? '1px solid #CAD2C5' : '1px solid #E5E7EB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ flex: 1, marginRight: 8 }}>
                  <div style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: r.completedToday ? '#6B7280' : '#2B2D42',
                    textDecoration: r.completedToday ? 'line-through' : 'none'
                  }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>
                    {r.dosage} · {r.time}
                  </div>
                </div>
                <div 
                  style={{ 
                    width: 22, 
                    height: 22, 
                    borderRadius: '50%', 
                    border: r.completedToday ? 'none' : '1.5px solid #D1D5DB',
                    background: r.completedToday ? '#84A98C' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {r.completedToday && <CheckCircle size={14} />}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. QUICK-ACCESS CARDS SECTION */}
      <section style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#2B2D42' }}>
            Explore MOMCARE Modules 💕
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Everything for your journey</span>
        </div>

        <div className="grid-3">
          {/* 1. Foetal Growth Tracker */}
          <div className="quick-card" onClick={() => navigate('/growth')}>
            <div className="quick-card-icon" style={{ background: '#FFE5EC', color: '#FF758F' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>Foetal Growth Tracker</h3>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
              Follow Germinal, Embryonic, and Foetal stages derived directly from clinical source PDF.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#D81B60', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>View Stages</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* 2. Premature Baby Guide (MAJOR HIGHLIGHT) */}
          <div className="quick-card" onClick={() => navigate('/premature-care')} style={{ borderColor: '#BDB2FF', background: 'linear-gradient(135deg, #FFFFFF, #FAF7FF)' }}>
            <div className="quick-card-icon" style={{ background: '#F0EDFF', color: '#7B2CBF' }}>
              <Heart size={24} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Premature Baby Care</h3>
              <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>PDF Guide</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
              Educational module on preterm categories, development risks, and neonatal care.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#7B2CBF', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Open Preterm Guide</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* 3. Baby Scan Memories */}
          <div className="quick-card" onClick={() => navigate('/baby/scans')}>
            <div className="quick-card-icon" style={{ background: '#EBF2EE', color: '#2D6A4F' }}>
              <ImageIcon size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>Baby Scan Memories</h3>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
              Store ultrasound sonograms privately using IndexedDB binary blob technology.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#2D6A4F', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Open Gallery ({scans.length})</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* 4. Doctor Appointments */}
          <div className="quick-card" onClick={() => navigate('/appointments')}>
            <div className="quick-card-icon" style={{ background: '#FFF4E6', color: '#D97706' }}>
              <Calendar size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>Doctor Appointments</h3>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
              Organize upcoming tests, scan dates, clinic visits, and consultation questions.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#D97706', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Manage Visits</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* 5. Daily Wellness Tracker */}
          <div className="quick-card" onClick={() => navigate('/wellness')}>
            <div className="quick-card-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
              <Droplets size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>Wellness Tracker</h3>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
              Record daily hydration, sleep hours, mood, meals, and symptoms privately.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#0284C7', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Log Today</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* 6. Pregnancy Journal & Movement */}
          <div className="quick-card" onClick={() => navigate('/baby/journal')}>
            <div className="quick-card-icon" style={{ background: '#FFF1F2', color: '#E11D48' }}>
              <BookOpen size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 4 }}>Pregnancy Journal</h3>
            <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
              Record first movements, feelings, letters to baby, and exportable memories.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: '#E11D48', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Write Entry</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEDICAL DISCLAIMER & SAFETY NOTICE */}
      <MedicalDisclaimer />
    </div>
  );
}
