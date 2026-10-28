import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Shield, AlertTriangle, BookOpen, Activity, CheckCircle2, 
  HelpCircle, Sparkles, Stethoscope, ChevronRight, Scale, Clock, 
  Thermometer, Eye, Wind, Brain, Plus, Calendar, FileText
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { 
  PREMATURE_PRIMARY_SOURCE, 
  PREMATURE_CATEGORIES, 
  BIRTH_WEIGHT_CATEGORIES, 
  PREMATURE_CAUSES, 
  PRETERM_BODY_SYSTEMS, 
  NEONATAL_TREATMENTS,
  NEONATAL_PARENT_QUESTIONS 
} from '../data/prematureBabyData';
import MedicalDisclaimer from '../components/MedicalDisclaimer';

export default function PrematureBabyGuide() {
  const { nicuMilestones, addCustomNicuMilestone, updateNicuMilestone } = usePregnancy();

  const [activeSection, setActiveSection] = useState('overview'); // 'overview' | 'categories' | 'causes' | 'body_systems' | 'treatments' | 'parent_guide'
  const [selectedSystem, setSelectedSystem] = useState(PRETERM_BODY_SYSTEMS[0]);
  const [consultNotes, setConsultNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('momcare_nicu_consult_notes') || '[]');
    } catch {
      return [];
    }
  });

  const handleSaveConsultNote = (e) => {
    e.preventDefault();
    if (!consultNotes.trim()) return;
    const newNote = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      text: consultNotes.trim()
    };
    const updated = [newNote, ...savedNotes];
    setSavedNotes(updated);
    localStorage.setItem('momcare_nicu_consult_notes', JSON.stringify(updated));
    setConsultNotes('');
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      
      {/* 1. HERO SECTION */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5FF 50%, #F5F0FF 100%)',
          borderColor: '#D8D2FF',
          marginBottom: 24,
          padding: '30px 24px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <div style={{ flex: '1 1 360px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#7B2CBF', fontWeight: 700, fontSize: '0.82rem', marginBottom: 6 }}>
              <Heart size={16} fill="#BDB2FF" color="#7B2CBF" />
              <span>DEDICATED EDUCATIONAL MODULE · {PREMATURE_PRIMARY_SOURCE.document}</span>
            </div>
            <h1 style={{ fontSize: '2.1rem', color: '#2B2D42', fontWeight: 800, marginBottom: 8, lineHeight: 1.25 }}>
              PREMATURE BABY CARE — Understanding Early Birth 💗
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: 16 }}>
              A compassionate, medically verified guide to understanding preterm gestational categories, 
              causes, developing body systems, neonatal treatments, and supportive parenting in the NICU.
            </p>

            {/* Reassuring Source Quote */}
            <div style={{ background: '#FFFFFF', border: '1.5px solid #E9D5FF', borderRadius: 14, padding: 14, color: '#6D28D9', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{PREMATURE_PRIMARY_SOURCE.supportMessage}"
            </div>
          </div>

          <div style={{ flex: '1 1 300px', maxWidth: 440 }}>
            <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid #D8D2FF' }}>
              <img 
                src="/assets/premature_hero.jpg" 
                alt="Gentle illustration of premature baby care in neonatal incubator" 
                style={{ width: '100%', height: 230, objectFit: 'cover' }}
              />
              <div style={{ background: '#FFFFFF', padding: '8px 12px', fontSize: '0.74rem', color: '#6B7280', textAlign: 'center' }}>
                Supportive Neonatal Care: Incubator warming, continuous monitoring & parent touch
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUBSECTION TABS NAVIGATION */}
      <div 
        style={{ 
          display: 'flex', 
          gap: 8, 
          overflowX: 'auto', 
          paddingBottom: 8, 
          marginBottom: 24,
          scrollbarWidth: 'none'
        }}
      >
        {[
          { id: 'overview', label: 'Definition & Term Comparison' },
          { id: 'categories', label: 'Gestational & Weight Categories' },
          { id: 'causes', label: 'Why Premature Birth Happens' },
          { id: 'body_systems', label: 'Development & Body Systems' },
          { id: 'treatments', label: 'Neonatal Care & Treatments' },
          { id: 'parent_guide', label: 'NICU Parent Guide & Notes' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '10px 16px',
              borderRadius: 20,
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: activeSection === tab.id ? 'var(--lavender-deep)' : '#FFFFFF',
              color: activeSection === tab.id ? '#FFFFFF' : '#4B5563',
              border: activeSection === tab.id ? 'none' : '1px solid #E5E7EB',
              boxShadow: activeSection === tab.id ? '0 4px 12px rgba(123, 44, 191, 0.25)' : 'none',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================
          A. WHAT IS A PREMATURE BABY? (OVERVIEW TAB)
          ======================================================== */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <section className="card">
            <h2 style={{ fontSize: '1.4rem', color: '#2B2D42', marginBottom: 12 }}>
              What Is a Premature (Preterm) Baby?
            </h2>
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 14, padding: 18, marginBottom: 20 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#7B2CBF', marginBottom: 6 }}>
                Primary Source Definition:
              </div>
              <p style={{ margin: 0, fontSize: '0.98rem', color: '#2B2D42', lineHeight: 1.6 }}>
                <strong>A premature (preterm) baby is one born before 37 completed weeks of pregnancy. Full term is 37–42 weeks.</strong>
              </p>
            </div>

            {/* Visual Gestational Comparison Timeline Bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2B2D42', marginBottom: 10 }}>
                Visual Gestational Comparison (Preterm vs. Full Term):
              </div>
              
              <div style={{ display: 'flex', height: 44, borderRadius: 12, overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)', marginBottom: 8 }}>
                <div style={{ flex: '28', background: '#FF8FA3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.74rem', fontWeight: 700, padding: '0 4px', textAlign: 'center' }}>
                  Extremely Preterm (&lt;28w)
                </div>
                <div style={{ flex: '4', background: '#BDB2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2B2D42', fontSize: '0.72rem', fontWeight: 700, padding: '0 4px', textAlign: 'center' }}>
                  Very (28–32w)
                </div>
                <div style={{ flex: '5', background: '#A0C4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E3A8A', fontSize: '0.72rem', fontWeight: 700, padding: '0 4px', textAlign: 'center' }}>
                  Moderate–Late (32–37w)
                </div>
                <div style={{ flex: '5', background: '#84A98C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.78rem', fontWeight: 700, padding: '0 4px', textAlign: 'center' }}>
                  Full Term (37–42w)
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6B7280' }}>
                <span>0 Weeks</span>
                <span>Week 28</span>
                <span>Week 32</span>
                <strong style={{ color: '#D81B60' }}>Week 37 (Preterm Cutoff)</strong>
                <strong style={{ color: '#2D6A4F' }}>40–42 Weeks (Term)</strong>
              </div>
            </div>

            <div className="grid-2">
              <div style={{ background: '#FFF5F7', border: '1px solid #FFE5EC', borderRadius: 14, padding: 18 }}>
                <div style={{ fontWeight: 700, color: '#D81B60', marginBottom: 4 }}>Preterm Birth (&lt; 37 Weeks)</div>
                <p style={{ fontSize: '0.86rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  Organs such as the lungs, digestive tract, and brain may need medical support while they complete functional maturation.
                </p>
              </div>

              <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: 14, padding: 18 }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: 4 }}>Full Term Period (37–42 Weeks)</div>
                <p style={{ fontSize: '0.86rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  The typical gestational window when infant organs are mature, lungs produce abundant surfactant, and fat reserves maintain body temperature.
                </p>
              </div>
            </div>
          </section>

          {/* Potential Viability & Outcomes Card (from Section G) */}
          <section className="card" style={{ borderLeft: '6px solid #7B2CBF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="badge badge-purple">Source Section: Outcomes</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 8 }}>
              Potential Viability and Clinical Outcomes
            </h3>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 14 }}>
              The PDF highlights: <strong>"Survival and outcomes improve sharply with each week of gestation. Viability starts around 22–24 weeks with intensive care."</strong>
            </p>
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 12, padding: 14, fontSize: '0.85rem', color: '#4C1D95', lineHeight: 1.5 }}>
              <strong>Important Clinical Perspective:</strong> Potential viability around 22–24 weeks requires advanced Level III/IV neonatal intensive care. 
              Outcomes depend on multiple individualized factors including gestational age, birth weight, health at delivery, specialized neonatal facilities, and clinical management. 
              Always discuss your baby's specific prognosis directly with your treating neonatologist.
            </div>
          </section>
        </div>
      )}

      {/* ========================================================
          B & C. CATEGORIES & BIRTH WEIGHT (CATEGORIES TAB)
          ======================================================== */}
      {activeSection === 'categories' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Gestational Age Categories */}
          <section className="card">
            <h2 style={{ fontSize: '1.4rem', color: '#2B2D42', marginBottom: 6 }}>
              Categories by Gestational Age
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: 20 }}>
              The primary PDF defines three distinct categories based on completed weeks of gestation.
            </p>

            <div className="grid-3">
              {PREMATURE_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id}
                  style={{
                    background: cat.bgColor,
                    border: `1.5px solid ${cat.accentBorder}`,
                    borderRadius: 16,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span className="badge" style={{ background: cat.color, color: 'white', marginBottom: 10 }}>
                      {cat.gestationalAge}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', color: '#2B2D42', marginBottom: 6 }}>
                      {cat.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, marginBottom: 12 }}>
                      {cat.description}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.5 }}>
                      {cat.clinicalOverview}
                    </p>
                  </div>
                  <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.06)', fontSize: '0.74rem', color: '#6B7280', fontStyle: 'italic' }}>
                    *Individual outcomes vary based on overall health.
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Birth Weight Categories */}
          <section className="card">
            <h2 style={{ fontSize: '1.4rem', color: '#2B2D42', marginBottom: 6 }}>
              Birth Weight Classifications
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: 20 }}>
              Categorized in the source PDF according to infant birth weight in grams.
            </p>

            <div className="grid-3">
              {BIRTH_WEIGHT_CATEGORIES.map((bw, i) => (
                <div 
                  key={i} 
                  style={{ 
                    background: '#FFFFFF', 
                    border: '1.5px solid #E5E7EB', 
                    borderRadius: 16, 
                    padding: 20,
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Scale size={20} color="#7B2CBF" />
                    <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#2B2D42' }}>{bw.category}</h3>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D81B60', marginBottom: 8 }}>
                    {bw.threshold}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                    {bw.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: 12, padding: 14, marginTop: 20, fontSize: '0.84rem', color: '#4B5563' }}>
              <strong>Clinical Clarity:</strong> Birth weight classifications (LBW, VLBW, ELBW) are distinct from gestational age categories. 
              A baby born at 38 weeks can have low birth weight due to growth restriction, and an infant born at 33 weeks can have appropriate weight for their gestational age.
            </div>
          </section>
        </div>
      )}

      {/* ========================================================
          D. WHY PREMATURE BIRTH CAN HAPPEN (CAUSES TAB)
          ======================================================== */}
      {activeSection === 'causes' && (
        <section className="card">
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7B2CBF', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <Shield size={16} />
              <span>PRIMARY SOURCE: 5 IDENTIFIED FACTOR GROUPS</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#2B2D42', marginBottom: 6 }}>
              Why Can Premature Birth Happen?
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6 }}>
              In many instances, the precise reason for early birth is never clearly known, and it is <strong>never the mother’s fault</strong>. 
              The source PDF groups observed medical factors into five main categories:
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PREMATURE_CAUSES.map((causeGroup, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(220, 210, 230, 0.7)',
                  borderRadius: 16,
                  padding: 18,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#F0EDFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7B2CBF' }}>
                      <Activity size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#2B2D42', margin: 0 }}>
                      {causeGroup.group}
                    </h3>
                  </div>
                  <span className="badge badge-purple">{causeGroup.badge}</span>
                </div>

                {/* Source Document Examples */}
                <div style={{ background: '#FAF5FF', padding: '10px 14px', borderRadius: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: '0.74rem', color: '#7B2CBF', fontWeight: 700, marginBottom: 4 }}>
                    EXAMPLES CITED IN SOURCE PDF:
                  </div>
                  <ul style={{ paddingLeft: 18, fontSize: '0.88rem', color: '#2B2D42', margin: 0 }}>
                    {causeGroup.sourceExamples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>

                <p style={{ fontSize: '0.84rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                  {causeGroup.gentleContext}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 14, padding: 16, fontSize: '0.85rem', color: '#9F1239', lineHeight: 1.5 }}>
            <strong>Reassuring Parent Guidance:</strong> These are statistical and biological factors documented in medical literature, 
            not a checklist to assign blame. A mother who maintains perfect prenatal health can still experience spontaneous premature birth. 
            Maternal support teams exist to provide care, never judgment.
          </div>
        </section>
      )}

      {/* ========================================================
          E. DEVELOPMENT OF PREMATURE BABIES (BODY SYSTEMS EXPLORER)
          ======================================================== */}
      {activeSection === 'body_systems' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <section className="card">
            <h2 style={{ fontSize: '1.5rem', color: '#2B2D42', marginBottom: 6 }}>
              Development of Premature Babies: Body System Explorer
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 20 }}>
              The source PDF states: <em>"Preterm babies are born with organs that have not finished maturing."</em> 
              Select a body system below to understand how it develops, why prematurity affects it, and how the neonatal team provides support.
            </p>

            {/* System Selector Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {PRETERM_BODY_SYSTEMS.map((sys) => (
                <button
                  key={sys.system}
                  onClick={() => setSelectedSystem(sys)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 14,
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    background: selectedSystem.system === sys.system ? 'var(--primary-pink)' : '#FFFFFF',
                    color: selectedSystem.system === sys.system ? 'white' : '#4B5563',
                    border: selectedSystem.system === sys.system ? 'none' : '1px solid #E5E7EB',
                    boxShadow: selectedSystem.system === sys.system ? 'var(--shadow-sm)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {sys.system}
                </button>
              ))}
            </div>

            {/* Selected System In-Depth View */}
            <div style={{ background: '#FFFFFF', border: '1.5px solid rgba(255, 182, 193, 0.4)', borderRadius: 20, padding: 24, boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
                <h3 style={{ fontSize: '1.4rem', color: '#D81B60', margin: 0 }}>
                  {selectedSystem.system}
                </h3>
                <span className="badge badge-pink">{selectedSystem.badge}</span>
              </div>

              {/* Exact Source Text Problem */}
              <div style={{ background: '#FFF5F7', border: '1px solid #FFE5EC', borderRadius: 12, padding: 14, marginBottom: 18 }}>
                <div style={{ fontSize: '0.74rem', color: '#D81B60', fontWeight: 700, marginBottom: 4 }}>
                  SOURCE DOCUMENT OBSERVATION:
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2B2D42' }}>
                  "{selectedSystem.sourceProblem}"
                </div>
              </div>

              <div className="grid-2" style={{ marginBottom: 18 }}>
                <div style={{ background: '#F8F9FA', borderRadius: 14, padding: 16 }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2B2D42', marginBottom: 6 }}>
                    Normal Fetal Development:
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                    {selectedSystem.normalDevelopment}
                  </p>
                </div>

                <div style={{ background: '#F8F9FA', borderRadius: 14, padding: 16 }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2B2D42', marginBottom: 6 }}>
                    Why Prematurity Affects It:
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                    {selectedSystem.whyAffected}
                  </p>
                </div>
              </div>

              {/* Parent-Friendly Definitions */}
              <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 14, padding: 16, marginBottom: 18 }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#7B2CBF', marginBottom: 8 }}>
                  Parent-Friendly Medical Definitions:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Object.entries(selectedSystem.parentFriendlyTerms).map(([term, def]) => (
                    <div key={term} style={{ fontSize: '0.85rem' }}>
                      <strong style={{ color: '#2B2D42' }}>{term}: </strong>
                      <span style={{ color: '#4B5563' }}>{def}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neonatal Monitoring */}
              <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: 14, padding: 16 }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#166534', marginBottom: 4 }}>
                  Why the Neonatal Care Team Monitors It:
                </div>
                <p style={{ fontSize: '0.86rem', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                  {selectedSystem.neonatalMonitoring}
                </p>
              </div>

              <div style={{ marginTop: 14, fontSize: '0.78rem', color: '#6B7280', fontStyle: 'italic', textAlign: 'center' }}>
                Note: Not every premature baby experiences every complication. Every baby's journey is distinct.
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================
          F. NEONATAL CARE AND TREATMENTS (TREATMENTS TAB)
          ======================================================== */}
      {activeSection === 'treatments' && (
        <section className="card">
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7B2CBF', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <Stethoscope size={16} />
              <span>PRIMARY SOURCE: OUTCOME & KEY TREATMENTS</span>
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#2B2D42', marginBottom: 6 }}>
              Neonatal Care & Medical Treatments
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6 }}>
              The source document outlines four primary medical treatments frequently employed to support premature babies:
            </p>
          </div>

          <div className="grid-2">
            {NEONATAL_TREATMENTS.map((treatment) => (
              <div 
                key={treatment.id}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #E9D5FF',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span className="badge badge-purple" style={{ marginBottom: 10 }}>
                    PDF Citation
                  </span>
                  <h3 style={{ fontSize: '1.2rem', color: '#2B2D42', marginBottom: 6 }}>
                    {treatment.name}
                  </h3>
                  <div style={{ background: '#FAF5FF', padding: '8px 12px', borderRadius: 10, fontSize: '0.84rem', color: '#6D28D9', fontWeight: 600, marginBottom: 10 }}>
                    "{treatment.sourceReference}"
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#2B2D42', marginBottom: 6 }}>
                    <strong>Clinical Role:</strong> {treatment.role}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#4B5563', lineHeight: 1.5, marginBottom: 12 }}>
                    <strong>How It Works:</strong> {treatment.howItWorks}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 10, fontSize: '0.78rem', color: '#6B7280', fontStyle: 'italic' }}>
                  {treatment.medicalBoundary}
                </div>
              </div>
            ))}
          </div>

          {/* Strict Medical Boundaries Alert */}
          <div style={{ marginTop: 24, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 14, padding: 18, fontSize: '0.85rem', color: '#92400E', lineHeight: 1.5 }}>
            <strong>Important Medical Boundaries:</strong> MOMCARE does not prescribe medications, calculate dosages, 
            recommend starting or stopping therapies, or make individualized clinical determinations. 
            All treatment choices are made exclusively by your treating neonatologist, pediatrician, and NICU team.
          </div>
        </section>
      )}

      {/* ========================================================
          H & I. PARENT GUIDE, CONSULTATION NOTES & MILESTONES
          ======================================================== */}
      {activeSection === 'parent_guide' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Questions to Ask Neonatologist */}
          <section className="card">
            <h2 style={{ fontSize: '1.4rem', color: '#2B2D42', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <HelpCircle size={22} color="#7B2CBF" />
              <span>Questions Parents Can Ask the Neonatologist</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: 18 }}>
              A supportive checklist you can use during daily rounds or bedside discussions with the medical team.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NEONATAL_PARENT_QUESTIONS.map((q, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 12,
                    background: '#F8F9FA',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <CheckCircle2 size={18} color="#84A98C" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#2B2D42', fontWeight: 500 }}>{q}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Neonatal Consultation Notes Logger */}
          <section className="card">
            <h2 style={{ fontSize: '1.4rem', color: '#2B2D42', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={22} color="#D81B60" />
              <span>Record Neonatal Consultation Notes</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.88rem', marginBottom: 16 }}>
              Write down notes, measurements, or answers provided by your baby's doctor during bedside rounds.
            </p>

            <form onSubmit={handleSaveConsultNote} style={{ marginBottom: 20 }}>
              <div className="form-group">
                <textarea 
                  rows={3}
                  value={consultNotes}
                  onChange={(e) => setConsultNotes(e.target.value)}
                  placeholder="e.g. Dr. Vance mentioned today's weight is 1,620g (+30g). Oxygen decreased to 21% room air. Kangaroo care scheduled for 3 PM!"
                  style={{ resize: 'vertical' }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Save Consultation Note</span>
              </button>
            </form>

            {savedNotes.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6B7280' }}>Past Saved Notes:</div>
                {savedNotes.map((note) => (
                  <div key={note.id} style={{ background: '#FFF5F7', border: '1px solid #FFE5EC', borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: '0.75rem', color: '#D81B60', fontWeight: 700, marginBottom: 4 }}>{note.date}</div>
                    <div style={{ fontSize: '0.88rem', color: '#2B2D42', whiteSpace: 'pre-wrap' }}>{note.text}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Link to Premature Care Milestones */}
          <div style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF', borderRadius: 18, padding: 22, textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#7B2CBF', marginBottom: 6 }}>
              Personal NICU & Premature Care Milestones
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#4B5563', maxWidth: 600, margin: '0 auto 16px' }}>
              Track personal bonding milestones like first Kangaroo care, first breastmilk swab, 
              moving to an open crib, and preparing for discharge day.
            </p>
            <Link to="/baby/timeline" className="btn btn-primary btn-sm">
              <span>Open Personal Premature Timeline</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* Persistent Medical Disclaimer */}
      <div style={{ marginTop: 32 }}>
        <MedicalDisclaimer />
      </div>

    </div>
  );
}
