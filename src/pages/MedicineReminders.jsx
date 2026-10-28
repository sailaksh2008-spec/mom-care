import React, { useState } from 'react';
import { 
  Clock, Plus, Trash2, Edit3, CheckCircle2, Circle, AlertCircle, 
  ShieldAlert, Sparkles, Bell, Info 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import Modal from '../components/Modal';

export default function MedicineReminders() {
  const { reminders, addReminder, updateReminder, deleteReminder, toggleReminderToday } = usePregnancy();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRem, setEditingRem] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('09:00');
  const [frequency, setFrequency] = useState('Daily in morning');
  const [notes, setNotes] = useState('');

  const completedCount = reminders.filter((r) => r.completedToday).length;

  // Next scheduled reminder
  const nextReminder = reminders
    .filter((r) => !r.completedToday)
    .sort((a, b) => a.time.localeCompare(b.time))[0];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addReminder({
      name: name.trim(),
      dosage: dosage.trim() || 'As directed by clinician',
      time,
      frequency,
      notes: notes.trim()
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleStartEdit = (rem) => {
    setEditingRem(rem);
    setName(rem.name || '');
    setDosage(rem.dosage || '');
    setTime(rem.time || '09:00');
    setFrequency(rem.frequency || 'Daily in morning');
    setNotes(rem.notes || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingRem) return;

    updateReminder(editingRem.id, {
      name: name.trim(),
      dosage: dosage.trim(),
      time,
      frequency,
      notes: notes.trim()
    });

    setEditingRem(null);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDosage('');
    setTime('09:00');
    setFrequency('Daily in morning');
    setNotes('');
  };

  const handleDelete = (id, rName) => {
    if (window.confirm(`Delete reminder for "${rName}"?`)) {
      deleteReminder(id);
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      
      {/* Header */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF, #EBF2EE)', 
          borderColor: '#CAD2C5',
          marginBottom: 20,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#2D6A4F', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <Clock size={16} />
              <span>SUPPLEMENT & CLINICIAN-RECOMMENDED MEDICATIONS</span>
            </div>
            <h1 style={{ fontSize: '2rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
              Medicine & Supplement Schedule 🌿
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 580 }}>
              Record prenatal vitamins, iron, and supplements prescribed by your obstetrician or midwife. 
              Track your daily progress with ease.
            </p>
          </div>

          <button 
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="btn btn-primary"
            style={{ borderRadius: 14 }}
          >
            <Plus size={18} />
            <span>+ Add Reminder</span>
          </button>
        </div>
      </div>

      {/* Mandatory Non-Prescription & Browser Alert Notice */}
      <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: 16, padding: '14px 18px', marginBottom: 24, fontSize: '0.83rem', color: '#92400E', lineHeight: 1.5 }}>
        <strong>Clinical & Device Notice:</strong> MOMCARE does not prescribe medications, recommend dosages, or modify treatments. 
        Only record items specifically directed by your healthcare professional. 
        Browser-based notifications may not alert when the app is completely closed; maintain an external alarm for critical medications.
      </div>

      {/* Next Reminder Highlight & Daily Streak Card */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card" style={{ padding: 20, background: '#FFFFFF' }}>
          <span style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase' }}>TODAY'S PROGRESS</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2D6A4F' }}>
              {completedCount} of {reminders.length} Taken
            </div>
            <span className="badge badge-sage">
              {reminders.length > 0 && completedCount === reminders.length ? 'All Done! ✨' : 'In Progress'}
            </span>
          </div>
        </div>

        <div className="card" style={{ padding: 20, background: '#FFFFFF' }}>
          <span style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase' }}>NEXT UPCOMING REMINDER</span>
          {nextReminder ? (
            <div style={{ marginTop: 6 }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2B2D42' }}>
                {nextReminder.name}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#D81B60', fontWeight: 600 }}>
                Scheduled for {nextReminder.time} · {nextReminder.dosage}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#84A98C', marginTop: 10 }}>
              All reminders completed for today! 💗
            </div>
          )}
        </div>
      </div>

      {/* Reminders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {reminders.map((rem) => (
          <div 
            key={rem.id}
            className="card"
            style={{
              padding: '16px 20px',
              borderLeft: rem.completedToday ? '6px solid #84A98C' : '6px solid #E5E7EB',
              background: rem.completedToday ? '#F8FCF9' : '#FFFFFF',
              borderRadius: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <button
                  onClick={() => toggleReminderToday(rem.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: rem.completedToday ? '#84A98C' : '#D1D5DB',
                    transition: 'transform 0.15s ease'
                  }}
                  title={rem.completedToday ? 'Mark as not taken' : 'Mark as taken today'}
                >
                  {rem.completedToday ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ 
                      fontSize: '1.05rem', 
                      color: rem.completedToday ? '#6B7280' : '#2B2D42', 
                      margin: 0,
                      fontWeight: 700,
                      textDecoration: rem.completedToday ? 'line-through' : 'none'
                    }}>
                      {rem.name}
                    </h3>
                    <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{rem.time}</span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#4B5563', marginTop: 2 }}>
                    <strong>Dosage:</strong> {rem.dosage} · <span style={{ color: '#6B7280' }}>{rem.frequency}</span>
                  </div>

                  {rem.notes && (
                    <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: 4, fontStyle: 'italic' }}>
                      "{rem.notes}"
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button 
                  onClick={() => handleStartEdit(rem)}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '4px 8px', borderColor: '#E5E7EB', color: '#6B7280' }}
                >
                  <Edit3 size={13} />
                </button>
                <button 
                  onClick={() => handleDelete(rem.id, rem.name)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: '4px 8px' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="+ Add Medicine / Supplement Reminder" maxWidth={500}>
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Supplement / Medicine Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Prenatal Multivitamin with DHA or Iron Supplement"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dosage (Exactly as prescribed)</label>
            <input 
              type="text" 
              value={dosage} 
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g. 1 softgel daily or 500 mg"
              required
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Preferred Time</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Frequency</label>
              <input 
                type="text" 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="e.g. Daily with breakfast"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Doctor's Instructions / Notes</label>
            <input 
              type="text" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Take with a glass of orange juice for better iron absorption"
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <button 
              type="button" 
              onClick={() => setIsAddModalOpen(false)} 
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ flex: 2 }}
            >
              Save Reminder
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal isOpen={!!editingRem} onClose={() => setEditingRem(null)} title="Edit Reminder Details" maxWidth={500}>
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Supplement / Medicine Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dosage</label>
            <input 
              type="text" 
              value={dosage} 
              onChange={(e) => setDosage(e.target.value)}
              required
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Preferred Time</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Frequency</label>
              <input 
                type="text" 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Doctor's Instructions / Notes</label>
            <input 
              type="text" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <button 
              type="button" 
              onClick={() => setEditingRem(null)} 
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ flex: 2 }}
            >
              Update Reminder
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
