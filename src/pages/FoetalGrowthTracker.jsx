import React, { useState } from 'react';
import { 
  Sparkles, Activity, Calendar, ChevronLeft, ChevronRight, 
  Info, ShieldCheck, Heart, Layers, Eye, BookOpen, AlertCircle
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { 
  SOURCE_DOCUMENT_INFO, 
  DEVELOPMENTAL_STAGES, 
  TRIMESTERS, 
  FOETAL_STAGE_CARDS, 
  getWeekDetails 
} from '../data/foetalStagesData';
import MedicalDisclaimer from '../components/MedicalDisclaimer';

export default function FoetalGrowthTracker() {
  const { gestationalAge, baby } = usePregnancy();
  
  // Active selected week state (defaults to user's current gestational week, clamped 1-40)
  const currentMotherWeek = gestationalAge.weeks || 20;
  const [selectedWeek, setSelectedWeek] = useState(currentMotherWeek);
  const [selectedTrimester, setSelectedTrimester] = useState(null); // null means all
  const [activeTab, setActiveTab] = useState('stages'); // 'stages' | 'week_navigator' | 'trimesters'

  const weekInfo = getWeekDetails(selectedWeek);

  const handlePrevWeek = () => {
    setSelectedWeek((w) => Math.max(1, w - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((w) => Math.min(40, w + 1));
  };

  const handleReturnToCurrent = () => {
    setSelectedWeek(currentMotherWeek);
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* 1. Header & Source Reference Banner */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#D81B60', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
          <Activity size={16} />
          <span>PRIMARY CLINICAL SOURCE: {SOURCE_DOCUMENT_INFO.reference}</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#2B2D42', fontWeight: 800, marginBottom: 8 }}>
          Stages of Foetal Growth During Gestation
        </h1>
        <p style={{ color: '#6B7280', fontSize: '0.98rem', maxWidth: 720, margin: '0 auto 16px' }}>
          Prenatal development spans about <strong>38 weeks from fertilization</strong> (corresponding to <strong>40 weeks from LMP</strong>). 
          Explore the three distinct stages of growth described in the source medical text.
        </p>

        {/* Current Gestational Week Quick Indicator */}
        {!baby.isBorn && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#FFF0F3', border: '1px solid #FFCCD5', padding: '6px 18px', borderRadius: 20 }}>
            <span style={{ fontSize: '0.85rem', color: '#4B5563' }}>Your Current Pregnancy Week:</span>
            <strong style={{ color: '#D81B60', fontSize: '0.92rem' }}>Week {gestationalAge.weeks} ({gestationalAge.days} days)</strong>
            {selectedWeek !== currentMotherWeek && (
              <button 
                onClick={handleReturnToCurrent}
                style={{ fontSize: '0.78rem', color: '#7B2CBF', textDecoration: 'underline', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Jump to My Week
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. Mode Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('stages')}
          className={`btn btn-sm ${activeTab === 'stages' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 20 }}
        >
          <Layers size={16} />
          <span>The 3 Developmental Stages</span>
        </button>

        <button
          onClick={() => setActiveTab('week_navigator')}
          className={`btn btn-sm ${activeTab === 'week_navigator' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 20 }}
        >
          <Calendar size={16} />
          <span>Week-by-Week Navigator (1–40)</span>
        </button>

        <button
          onClick={() => setActiveTab('trimesters')}
          className={`btn btn-sm ${activeTab === 'trimesters' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 20 }}
        >
          <Sparkles size={16} />
          <span>Trimester Breakdown</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: THE 3 DEVELOPMENTAL STAGES (DIRECT FROM PDF)
          ======================================================== */}
      {activeTab === 'stages' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* STAGE 1: GERMINAL STAGE */}
          <section className="card" style={{ borderLeft: '6px solid #FF758F' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 340px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className="badge badge-pink">Weeks 1–2</span>
                  <span className="badge badge-source">PDF Section 1</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#2B2D42', marginBottom: 10 }}>
                  1. Germinal Stage (Weeks 1–2)
                </h2>
                <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 16 }}>
                  The foundational beginning of human development, starting at conception when the ovum is fertilized.
                </p>

                {/* Exact Key Points from PDF */}
                <div style={{ background: '#FFF5F7', border: '1px solid #FFE5EC', borderRadius: 14, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#D81B60', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Info size={16} />
                    <span>Key Developments (Source Text):</span>
                  </div>
                  <ul style={{ paddingLeft: 20, color: '#2B2D42', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    <li>The zygote forms at fertilization, then divides into a morula and a blastocyst.</li>
                    <li>The blastocyst implants in the uterine wall around day 6–10.</li>
                  </ul>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#6B7280', lineHeight: 1.5 }}>
                  <strong>Educational Note:</strong> During these first two weeks, rapid mitotic cell division occurs 
                  as the blastocyst travels along the fallopian tube to embed safely into the nutrient-rich uterine endometrium.
                </p>
              </div>

              {/* Diagram Illustration */}
              <div style={{ flex: '1 1 300px', maxWidth: 440 }}>
                <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid #FFE5EC' }}>
                  <img 
                    src="/assets/germinal_stage.jpg" 
                    alt="Germinal Stage diagram: fertilization, morula, blastocyst, and implantation" 
                    style={{ width: '100%', height: 260, objectFit: 'cover' }}
                  />
                  <div style={{ background: '#FFFFFF', padding: '10px 14px', fontSize: '0.78rem', color: '#6B7280', fontStyle: 'italic', borderTop: '1px solid #FFE5EC' }}>
                    Illustrated Timeline: Fertilization → Morula → Blastocyst → Implantation (Days 6–10)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STAGE 2: EMBRYONIC STAGE */}
          <section className="card" style={{ borderLeft: '6px solid #BDB2FF' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 340px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span className="badge badge-purple">Weeks 3–8</span>
                  <span className="badge badge-source">PDF Section 2</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#2B2D42', marginBottom: 10 }}>
                  2. Embryonic Stage (Weeks 3–8)
                </h2>
                <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 16 }}>
                  The intense period of organogenesis where the basic structural architecture of every major organ system is created.
                </p>

                {/* Exact Key Points from PDF */}
                <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 14, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#7B2CBF', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Info size={16} />
                    <span>Key Developments (Source Text):</span>
                  </div>
                  <ul style={{ paddingLeft: 20, color: '#2B2D42', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    <li>The three germ layers form: <strong>ectoderm, mesoderm and endoderm</strong>.</li>
                    <li>Organogenesis occurs: <strong>the neural tube, heart (beating by about week 5), limb buds, eyes and ears develop</strong>.</li>
                    <li>This is the most vulnerable period for teratogens (e.g., thalidomide).</li>
                  </ul>
                </div>

                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 12, fontSize: '0.84rem', color: '#92400E', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700 }}>Gentle Clinical Explanation: </span>
                  Teratogens are external agents (certain medications, high fevers, or environmental chemicals) that can interfere with normal organ formation. 
                  This is general medical science; every pregnancy has unique circumstances, and healthy development is supported through standard prenatal care.
                </div>
              </div>

              {/* Diagram Illustration */}
              <div style={{ flex: '1 1 300px', maxWidth: 440 }}>
                <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid #E9D5FF' }}>
                  <img 
                    src="/assets/embryonic_stage.jpg" 
                    alt="Embryonic Stage diagram: organogenesis, neural tube, week 5 beating heart, limb buds" 
                    style={{ width: '100%', height: 260, objectFit: 'cover' }}
                  />
                  <div style={{ background: '#FFFFFF', padding: '10px 14px', fontSize: '0.78rem', color: '#6B7280', fontStyle: 'italic', borderTop: '1px solid #E9D5FF' }}>
                    Embryonic Organogenesis: Neural tube closure, beating heart at ~week 5, and limb buds
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STAGE 3: FOETAL STAGE */}
          <section className="card" style={{ borderLeft: '6px solid #84A98C' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span className="badge badge-sage">Week 9 to Birth</span>
                <span className="badge badge-source">PDF Section 3</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', color: '#2B2D42', marginBottom: 10 }}>
                3. Foetal Stage (Week 9 to Birth)
              </h2>
              <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6 }}>
                From the ninth week onward, the developing human is termed a foetus. Structures established during organogenesis grow, 
                differentiate, and mature to sustain life outside the womb.
              </p>
            </div>

            {/* Source-Derived Foetal Stage Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 16 }}>
              {FOETAL_STAGE_CARDS.map((stageCard, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(255, 182, 193, 0.3)',
                    borderRadius: 16,
                    padding: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span className="badge badge-pink" style={{ fontSize: '0.85rem' }}>
                        {stageCard.range}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
                        {stageCard.trimester}
                      </span>
                    </div>

                    <div style={{ background: '#FFF5F7', padding: '10px 12px', borderRadius: 10, marginBottom: 12, borderLeft: '3px solid #FF758F' }}>
                      <div style={{ fontSize: '0.74rem', color: '#D81B60', fontWeight: 700, marginBottom: 2 }}>
                        SOURCE DOCUMENT TEXT:
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2B2D42' }}>
                        {stageCard.sourceText}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.84rem', color: '#4B5563', lineHeight: 1.5, marginBottom: 10 }}>
                      {stageCard.explanation}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#6B7280' }}>
                    <span>Size analogy:</span>
                    <strong style={{ color: '#2B2D42' }}>{stageCard.sizeAnalogy}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* ========================================================
          TAB 2: INTERACTIVE WEEK-BY-WEEK NAVIGATOR (1 TO 40)
          ======================================================== */}
      {activeTab === 'week_navigator' && (
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.6rem', color: '#2B2D42', marginBottom: 6 }}>
              Interactive Week-by-Week Explorer
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
              Select any pregnancy week from Week 1 to Week 40 to examine specific milestones.
            </p>
          </div>

          {/* Stepper Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8F9FA', borderRadius: 20, padding: '12px 20px', marginBottom: 20 }}>
            <button 
              onClick={handlePrevWeek} 
              disabled={selectedWeek <= 1}
              className="btn btn-outline btn-sm"
              style={{ opacity: selectedWeek <= 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} />
              <span>Previous Week</span>
            </button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
                SELECTED TIMELINE
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D81B60' }}>
                Week {selectedWeek}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#7B2CBF', fontWeight: 600 }}>
                {weekInfo.stageName} · Trimester {weekInfo.trimester}
              </div>
            </div>

            <button 
              onClick={handleNextWeek} 
              disabled={selectedWeek >= 40}
              className="btn btn-outline btn-sm"
              style={{ opacity: selectedWeek >= 40 ? 0.4 : 1 }}
            >
              <span>Next Week</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Week Range Slider */}
          <div style={{ marginBottom: 28 }}>
            <input 
              type="range" 
              min="1" 
              max="40" 
              value={selectedWeek} 
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary-pink)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9CA3AF', marginTop: 4 }}>
              <span>Wk 1 (Conception)</span>
              <span>Wk 12 (Trimester 1)</span>
              <span>Wk 24 (Viability)</span>
              <span>Wk 40 (Full Term)</span>
            </div>
          </div>

          {/* Detailed Week Card Content */}
          <div style={{ background: '#FFF5F7', border: '1px solid #FFE5EC', borderRadius: 20, padding: 24 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 16 }}>
              <div>
                <span className="badge badge-source" style={{ marginRight: 8 }}>
                  PDF Source Aligned
                </span>
                {weekInfo.isViableStage && (
                  <span className="badge badge-sage" style={{ marginRight: 8 }}>
                    Potential Viability Range
                  </span>
                )}
                {weekInfo.isFullTerm && (
                  <span className="badge badge-pink">
                    Full Term (37–42w)
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                Fruit/Size Comparison: <strong>{weekInfo.analogy}</strong>
              </span>
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2B2D42', marginBottom: 12 }}>
              Clinical Milestone Summary:
            </div>
            <p style={{ fontSize: '0.98rem', color: '#4B5563', lineHeight: 1.6, marginBottom: 16 }}>
              {weekInfo.pdfHighlight}
            </p>

            <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 14, border: '1px solid rgba(255, 182, 193, 0.4)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D81B60', marginBottom: 4 }}>
                What typically happens in Week {selectedWeek}:
              </div>
              <p style={{ fontSize: '0.88rem', color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                {selectedWeek <= 2 && "The zygote divides into a morula and blastocyst, preparing for uterine implantation."}
                {selectedWeek >= 3 && selectedWeek <= 8 && "Active organogenesis takes place across all three germ layers (ectoderm, mesoderm, endoderm). Heart begins beating by ~week 5."}
                {selectedWeek >= 9 && selectedWeek <= 12 && "Genitalia differentiate clearly and the foetus begins active involuntary reflex movements."}
                {selectedWeek >= 13 && selectedWeek <= 16 && "The skeleton actively ossifies. Foetus reaches ~10-12 cm in crown-to-rump length."}
                {selectedWeek >= 17 && selectedWeek <= 20 && "Mothers often perceive quickening (fluttery movements). Lanugo and vernix protect the skin."}
                {selectedWeek >= 21 && selectedWeek <= 24 && "Alveolar type II cells begin producing surfactant in lungs; clinical viability milestone begins around week 24."}
                {selectedWeek >= 25 && selectedWeek <= 28 && "Eyelids open, eyes blink, and rapid neurological connections form in the brain."}
                {selectedWeek >= 29 && selectedWeek <= 36 && "Rapid weekly weight gain through subcutaneous fat deposition while lungs continue maturing."}
                {selectedWeek >= 37 && "Baby has reached full term (37–40 weeks); fetal head engages into the pelvis in preparation for birth."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: TRIMESTER BREAKDOWN (DIRECT FROM PDF)
          ======================================================== */}
      {activeTab === 'trimesters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <h2 style={{ fontSize: '1.6rem', color: '#2B2D42', marginBottom: 6 }}>
              By Trimester (Source Summary)
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
              The PDF organizes gestation into three core physiological focuses.
            </p>
          </div>

          <div className="grid-3">
            {TRIMESTERS.map((t) => (
              <div 
                key={t.trimester} 
                className="card" 
                style={{ 
                  borderTop: `6px solid ${t.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="badge" style={{ background: `${t.color}20`, color: t.color }}>
                      {t.weeksRange}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>
                      {t.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: 6, color: '#2B2D42' }}>
                    {t.name}
                  </h3>

                  <div style={{ background: '#F8F9FA', padding: '8px 12px', borderRadius: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600, display: 'block' }}>PRIMARY FOCUS (PDF):</span>
                    <strong style={{ fontSize: '0.95rem', color: t.color }}>{t.focus}</strong>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.5, marginBottom: 16 }}>
                    {t.description}
                  </p>

                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2B2D42', marginBottom: 8 }}>
                    Key Developments:
                  </div>
                  <ul style={{ paddingLeft: 18, fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.5 }}>
                    {t.keyMilestones.map((km, i) => (
                      <li key={i} style={{ marginBottom: 4 }}>{km}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 20, borderTop: '1px solid #F3F4F6', paddingTop: 12 }}>
                  <button
                    onClick={() => {
                      setSelectedWeek(t.weeksStart);
                      setActiveTab('week_navigator');
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', borderColor: t.color, color: t.color }}
                  >
                    <span>Explore Weeks {t.weeksRange}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Sensitive Medical Guidance & Disclaimer */}
      <div style={{ marginTop: 32 }}>
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
