import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, Baby, Image as ImageIcon, BookOpen, Activity, 
  Calendar, Clock, ShieldCheck, ChevronRight, Sparkles 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';

export default function BabyHub() {
  const navigate = useNavigate();
  const { baby, scans, journal, kicks } = usePregnancy();

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF, #FAF5FF)', 
          borderColor: '#E9D5FF',
          marginBottom: 24,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7B2CBF', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
          <Baby size={16} />
          <span>BABY & MEMORIES CENTRAL HUB</span>
        </div>
        <h1 style={{ fontSize: '2.1rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
          Baby Moments & Keepsakes 💗
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', margin: 0, maxWidth: 640 }}>
          Everything dedicated to your little one: ultrasound scans, journal entries, 
          baby movement kicks, premature care guides, and your personal baby profile.
        </p>

        {baby.isBorn && (
          <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E0F2FE', border: '1px solid #BAE6FD', padding: '6px 14px', borderRadius: 20, color: '#0369A1', fontSize: '0.84rem', fontWeight: 600 }}>
            <Baby size={16} />
            <span>Post-Birth Mode Active: {baby.babyName || 'Baby'}</span>
          </div>
        )}
      </div>

      {/* 6 Sub-module Cards Grid */}
      <div className="grid-2" style={{ gap: 20 }}>

        {/* 1. Baby Scan Memories */}
        <div className="card quick-card" onClick={() => navigate('/baby/scans')}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="quick-card-icon" style={{ background: '#FFE5EC', color: '#FF758F' }}>
              <ImageIcon size={24} />
            </div>
            <span className="badge badge-pink">{scans.length} Saved Scans</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
            Baby Scan Memories
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
            Store your ultrasound sonograms securely in local IndexedDB. Add gestational weeks, dates, and personal notes.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: '#D81B60', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Open Photo Album</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* 2. Premature Baby Care (Dedicated Guide) */}
        <div className="card quick-card" onClick={() => navigate('/premature-care')} style={{ borderColor: '#D8D2FF' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="quick-card-icon" style={{ background: '#F0EDFF', color: '#7B2CBF' }}>
              <Heart size={24} />
            </div>
            <span className="badge badge-purple">PDF Clinical Module</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
            Premature Baby Care
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
            Comprehensive guide covering preterm categories, causes, underdeveloped body systems, and NICU treatments.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: '#7B2CBF', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Explore Preterm Guide</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* 3. Baby Movement Tracker (Kicks) */}
        <div className="card quick-card" onClick={() => navigate('/baby/kicks')}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="quick-card-icon" style={{ background: '#EBF2EE', color: '#2D6A4F' }}>
              <Activity size={24} />
            </div>
            <span className="badge badge-sage">{kicks.length} Sessions Logged</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
            Baby Movement Tracker
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
            Time and count fetal kicks during quiet rest periods. Includes vital clinical safety advice on movement patterns.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: '#2D6A4F', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Start Counting Session</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* 4. Pregnancy Journal */}
        <div className="card quick-card" onClick={() => navigate('/baby/journal')}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="quick-card-icon" style={{ background: '#FFF1F2', color: '#E11D48' }}>
              <BookOpen size={24} />
            </div>
            <span className="badge badge-pink">{journal.length} Entries</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
            Pregnancy Journal
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
            Write daily thoughts, letters to baby, doctor visit takeaways, and milestones. Search and export your diary.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: '#E11D48', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Write in Journal</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* 5. Baby Profile & Post-Birth Mode */}
        <div className="card quick-card" onClick={() => navigate('/baby/profile')}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="quick-card-icon" style={{ background: '#E0F2FE', color: '#0284C7' }}>
              <Baby size={24} />
            </div>
            <span className="badge badge-blue">{baby.isBorn ? 'Baby Born' : 'In Utero'}</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
            Baby Profile & Post-Birth Mode
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
            Manage baby details, birth date, gestational age at birth, birth weight, and switch to newborn care.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: '#0284C7', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>Manage Baby Profile</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* 6. Personal Timeline & Milestones */}
        <div className="card quick-card" onClick={() => navigate('/baby/timeline')}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div className="quick-card-icon" style={{ background: '#FFF4E6', color: '#D97706' }}>
              <Calendar size={24} />
            </div>
            <span className="badge badge-amber">Milestone Tracker</span>
          </div>
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
            Personal Timeline & NICU Milestones
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
            Record special milestones such as first time seeing baby, Kangaroo skin-to-skin care, first feed, and discharge.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: '#D97706', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>View Timeline</span>
            <ChevronRight size={16} />
          </div>
        </div>

      </div>
    </div>
  );
}
