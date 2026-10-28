import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Play, Square, Plus, Trash2, Clock, AlertTriangle, 
  ArrowLeft, CheckCircle, ShieldAlert, Sparkles 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';

export default function MovementTracker() {
  const { kicks, saveKickSession, deleteKickSession } = usePregnancy();

  // Active Counting Session State
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [movementCount, setMovementCount] = useState(0);
  const [sessionNotes, setSessionNotes] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartSession = () => {
    setIsActive(true);
    setSeconds(0);
    setMovementCount(0);
    setSessionNotes('');
  };

  const handleRecordMovement = () => {
    setMovementCount((c) => c + 1);
  };

  const handleFinishSession = () => {
    setIsActive(false);
    const session = {
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: seconds,
      kickCount: movementCount,
      notes: sessionNotes.trim()
    };
    saveKickSession(session);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleCancelSession = () => {
    setIsActive(false);
    setSeconds(0);
    setMovementCount(0);
  };

  // Format seconds to mm:ss
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      
      {/* Back to Hub */}
      <div style={{ marginBottom: 16 }}>
        <Link to="/baby" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>
          <ArrowLeft size={16} />
          <span>Back to Baby Central</span>
        </Link>
      </div>

      {/* Header */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF, #FFF5F7)', 
          borderColor: '#FFCCD5',
          marginBottom: 20,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#D81B60', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
          <Activity size={16} />
          <span>FETAL KICKS & ACTIVITY MONITOR</span>
        </div>
        <h1 style={{ fontSize: '2rem', color: '#2B2D42', fontWeight: 800, marginBottom: 8 }}>
          Baby Movement Tracker 💕
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 640, lineHeight: 1.5 }}>
          Fetal movement is an encouraging sign of baby's wellbeing. Relax on your side in a quiet room, 
          start a counting session, and tap whenever you feel a kick, flutter, roll, or swish.
        </p>
      </div>

      {/* PROMINENT SAFETY WARNING ALERT (MANDATORY REQUIREMENT) */}
      <div 
        style={{ 
          background: '#FFF1F2', 
          border: '2px solid #FDA4AF', 
          borderRadius: 16, 
          padding: '16px 20px', 
          marginBottom: 24,
          boxShadow: '0 4px 14px rgba(225, 29, 72, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#BE123C', fontWeight: 800, fontSize: '1rem', marginBottom: 6 }}>
          <ShieldAlert size={22} />
          <span>Critical Maternal Safety Advice</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#9F1239', lineHeight: 1.5 }}>
          Movement monitoring instructions vary according to individual circumstances and clinician guidance. 
          <strong> If movements are reduced, absent, or noticeably different from your baby's usual pattern, contact your maternity care team or hospital immediately. </strong> 
          Do not wait for the app to reach a particular count or wait until tomorrow morning before seeking prompt clinical assessment.
        </p>
      </div>

      {/* ACTIVE COUNTING INTERFACE */}
      <div 
        className="card" 
        style={{ 
          textAlign: 'center', 
          padding: '36px 24px', 
          background: '#FFFFFF',
          borderColor: isActive ? '#FF758F' : '#E5E7EB',
          boxShadow: isActive ? 'var(--shadow-glow)' : 'var(--shadow-md)',
          marginBottom: 28,
          transition: 'all 0.3s ease'
        }}
      >
        {!isActive ? (
          <div>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FFF0F3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Activity size={36} color="#FF758F" />
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#2B2D42', marginBottom: 6 }}>
              Ready for a Counting Session?
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', maxWidth: 440, margin: '0 auto 20px', lineHeight: 1.5 }}>
              Find a comfortable position lying on your left side. Tap "Start Session" when you are relaxed.
            </p>
            <button onClick={handleStartSession} className="btn btn-primary btn-lg" style={{ borderRadius: 20 }}>
              <Play size={18} fill="white" />
              <span>Start Movement Session</span>
            </button>
          </div>
        ) : (
          <div>
            {/* Live Timer & Count Display */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 24 }}>
              <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 16, padding: '14px 24px' }}>
                <span style={{ fontSize: '0.74rem', color: '#7B2CBF', fontWeight: 700, textTransform: 'uppercase' }}>ELAPSED TIME</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#7B2CBF' }}>
                  {formatTime(seconds)}
                </div>
              </div>

              <div style={{ background: '#FFF0F3', border: '1px solid #FFCCD5', borderRadius: 16, padding: '14px 24px' }}>
                <span style={{ fontSize: '0.74rem', color: '#D81B60', fontWeight: 700, textTransform: 'uppercase' }}>MOVEMENTS FELT</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#D81B60' }}>
                  {movementCount}
                </div>
              </div>
            </div>

            {/* Giant Tap Button */}
            <button 
              onClick={handleRecordMovement}
              style={{
                width: 170,
                height: 170,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF758F, #FF8FA3)',
                color: 'white',
                border: '6px solid #FFE5EC',
                boxShadow: '0 10px 28px rgba(255, 117, 143, 0.45)',
                margin: '0 auto 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.1s ease, box-shadow 0.2s ease'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.94)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Sparkles size={32} />
              <span style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: 4 }}>+ Movement</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>Tap to Count</span>
            </button>

            {/* Session Notes input */}
            <div style={{ maxWidth: 420, margin: '0 auto 20px' }}>
              <input 
                type="text" 
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="Optional notes (e.g. after lunch, active rolls)"
                style={{ textAlign: 'center' }}
              />
            </div>

            {/* Session Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
              <button onClick={handleFinishSession} className="btn btn-primary">
                <CheckCircle size={18} />
                <span>Finish & Save Session</span>
              </button>
              <button onClick={handleCancelSession} className="btn btn-outline" style={{ borderColor: '#E5E7EB', color: '#6B7280' }}>
                <Square size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {showSaveSuccess && (
        <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 12, color: '#166534', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <CheckCircle size={18} />
          <span>Movement session recorded successfully!</span>
        </div>
      )}

      {/* SESSION HISTORY TABLE */}
      <div className="card" style={{ padding: 22 }}>
        <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
          Previous Movement Sessions ({kicks.length})
        </h2>
        <p style={{ color: '#6B7280', fontSize: '0.84rem', marginBottom: 16 }}>
          Review your recorded movement patterns over time.
        </p>

        {kicks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: '#9CA3AF', fontSize: '0.88rem' }}>
            No movement sessions recorded yet. Start your first session above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {kicks.map((k) => (
              <div 
                key={k.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 12,
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#D81B60' }}>
                      {k.kickCount} Movements
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      in {formatTime(k.durationSeconds)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#9CA3AF' }}>
                    {k.date} at {k.time} {k.notes ? `· "${k.notes}"` : ''}
                  </div>
                </div>

                <button 
                  onClick={() => deleteKickSession(k.id)}
                  style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
                  title="Delete record"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
