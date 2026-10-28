import React, { useState } from 'react';
import { 
  Droplets, Moon, Smile, Meh, Frown, Utensils, 
  Activity, CheckCircle2, Plus, Minus, Calendar, Heart, Sparkles 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';

const MOODS = [
  { id: 'Happy', label: 'Happy', emoji: '🥰', color: '#FF758F' },
  { id: 'Good', label: 'Good', emoji: '😊', color: '#84A98C' },
  { id: 'Okay', label: 'Okay', emoji: '😌', color: '#3A86FF' },
  { id: 'Tired', label: 'Tired', emoji: '😴', color: '#BDB2FF' },
  { id: 'Sad', label: 'Sad / Low', emoji: '🥺', color: '#F4A261' }
];

const COMMON_SYMPTOMS = [
  'Mild Fatigue',
  'Morning Nausea',
  'Backache',
  'Heartburn',
  'Leg Swelling',
  'Mild Cramping',
  'Headache',
  'Mood Swings',
  'Shortness of Breath',
  'Trouble Sleeping'
];

export default function WellnessTracker() {
  const { wellness, logWellnessForDate } = usePregnancy();

  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const currentLog = wellness[selectedDate] || {
    waterGlasses: 6,
    waterGoal: 8,
    sleepHours: 7.5,
    sleepQuality: 'Good',
    mood: 'Good',
    meals: '',
    activity: '',
    symptoms: []
  };

  const [waterGlasses, setWaterGlasses] = useState(currentLog.waterGlasses || 0);
  const [sleepHours, setSleepHours] = useState(currentLog.sleepHours || 7);
  const [mood, setMood] = useState(currentLog.mood || 'Good');
  const [meals, setMeals] = useState(currentLog.meals || '');
  const [activity, setActivity] = useState(currentLog.activity || '');
  const [symptoms, setSymptoms] = useState(currentLog.symptoms || []);
  const [saveAlert, setSaveAlert] = useState(false);

  // Sync state if selectedDate changes
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    const log = wellness[newDate] || {
      waterGlasses: 0,
      sleepHours: 7,
      mood: 'Good',
      meals: '',
      activity: '',
      symptoms: []
    };
    setWaterGlasses(log.waterGlasses || 0);
    setSleepHours(log.sleepHours || 7);
    setMood(log.mood || 'Good');
    setMeals(log.meals || '');
    setActivity(log.activity || '');
    setSymptoms(log.symptoms || []);
  };

  const handleToggleSymptom = (sym) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter((s) => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    logWellnessForDate(selectedDate, {
      waterGlasses,
      waterGoal: 8,
      sleepHours: Number(sleepHours),
      mood,
      meals: meals.trim(),
      activity: activity.trim(),
      symptoms
    });
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      
      {/* Header */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF, #E0F2FE)', 
          borderColor: '#BAE6FD',
          marginBottom: 24,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0284C7', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <Droplets size={16} />
              <span>DAILY PERSONAL CARE & SYMPTOM LOG</span>
            </div>
            <h1 style={{ fontSize: '2rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
              Daily Wellness Tracker 💧
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 580 }}>
              Privately log your hydration, sleep, mood, meals, and symptoms. 
              Review your notes during doctor checkups without medical scoring or diagnostic conclusions.
            </p>
          </div>

          <div>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              style={{ background: 'white', fontWeight: 600, border: '1.5px solid #BAE6FD' }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        
        {/* 1. Water Intake Counter */}
        <section className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 className="card-title" style={{ fontSize: '1.2rem', margin: 0 }}>
              <Droplets size={22} color="#0284C7" />
              <span>Water Intake & Hydration</span>
            </h2>
            <span style={{ fontSize: '0.84rem', color: '#0284C7', fontWeight: 700 }}>
              {waterGlasses} / 8 Glasses ({(waterGlasses * 250)} ml)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '10px 0' }}>
            <button 
              type="button"
              onClick={() => setWaterGlasses((w) => Math.max(0, w - 1))}
              className="btn btn-outline"
              style={{ width: 44, height: 44, borderRadius: '50%', padding: 0 }}
            >
              <Minus size={20} />
            </button>

            {/* Glasses Visual */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 360 }}>
              {Array.from({ length: 8 }).map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => setWaterGlasses(idx + 1)}
                  style={{
                    width: 32,
                    height: 44,
                    borderRadius: '4px 4px 8px 8px',
                    border: '2px solid #0284C7',
                    background: idx < waterGlasses ? 'linear-gradient(180deg, #38BDF8, #0284C7)' : '#F0F9FF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  title={`Glass ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              type="button"
              onClick={() => setWaterGlasses((w) => w + 1)}
              className="btn btn-primary"
              style={{ width: 44, height: 44, borderRadius: '50%', padding: 0 }}
            >
              <Plus size={20} />
            </button>
          </div>
        </section>

        {/* 2. Sleep & Mood Grid */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          
          {/* Sleep Log */}
          <div className="card">
            <h2 className="card-title" style={{ fontSize: '1.2rem', marginBottom: 12 }}>
              <Moon size={20} color="#7B2CBF" />
              <span>Hours of Sleep</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7B2CBF' }}>
                {sleepHours} Hours
              </span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="12" 
              step="0.5" 
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              style={{ accentColor: '#7B2CBF', width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#9CA3AF', marginTop: 4 }}>
              <span>3h</span>
              <span>7.5h (Recommended)</span>
              <span>12h</span>
            </div>
          </div>

          {/* Mood Selector */}
          <div className="card">
            <h2 className="card-title" style={{ fontSize: '1.2rem', marginBottom: 12 }}>
              <Smile size={20} color="#FF758F" />
              <span>Today's Mood</span>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: 12,
                    textAlign: 'center',
                    background: mood === m.id ? '#FFF0F3' : '#F9FAFB',
                    border: mood === m.id ? '2px solid #FF758F' : '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: 2 }}>{m.emoji}</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: mood === m.id ? '#D81B60' : '#6B7280' }}>
                    {m.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Meals & Activity */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          <div className="card">
            <h2 className="card-title" style={{ fontSize: '1.15rem', marginBottom: 8 }}>
              <Utensils size={18} color="#D97706" />
              <span>Meals & Nutrition Notes</span>
            </h2>
            <textarea 
              rows={3}
              value={meals}
              onChange={(e) => setMeals(e.target.value)}
              placeholder="e.g. Greek yogurt with chia seeds, grilled chicken salad, warm herbal tea"
            />
          </div>

          <div className="card">
            <h2 className="card-title" style={{ fontSize: '1.15rem', marginBottom: 8 }}>
              <Activity size={18} color="#10B981" />
              <span>Physical Activity</span>
            </h2>
            <textarea 
              rows={3}
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="e.g. 25-minute gentle morning walk, prenatal yoga stretching, resting"
            />
          </div>
        </div>

        {/* 4. Symptoms Checklist for Discussion with Clinician */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h2 className="card-title" style={{ fontSize: '1.2rem', marginBottom: 6 }}>
            <span>Symptoms Tracker</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.84rem', marginBottom: 14 }}>
            Record any symptoms privately so you can reference them during your next prenatal checkup.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {COMMON_SYMPTOMS.map((sym) => {
              const isSelected = symptoms.includes(sym);
              return (
                <button
                  key={sym}
                  type="button"
                  onClick={() => handleToggleSymptom(sym)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 20,
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    background: isSelected ? '#FFE5EC' : '#FFFFFF',
                    color: isSelected ? '#D81B60' : '#4B5563',
                    border: isSelected ? '1.5px solid #FF758F' : '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isSelected && '✓ '}
                  {sym}
                </button>
              );
            })}
          </div>
        </div>

        {saveAlert && (
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 12, color: '#166534', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <CheckCircle2 size={18} />
            <span>Wellness log saved for {selectedDate}!</span>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          Save Today's Wellness Log
        </button>

      </form>

    </div>
  );
}
