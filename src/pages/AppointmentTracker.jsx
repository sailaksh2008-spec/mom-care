import React, { useState } from 'react';
import { 
  Calendar, Clock, Plus, Trash2, Edit3, CheckCircle2, 
  MapPin, User, FileText, ChevronRight, AlertCircle, HelpCircle, Heart 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { formatDate } from '../utils/dateUtils';
import Modal from '../components/Modal';

const APPOINTMENT_TYPES = [
  'Routine Checkup',
  'Ultrasound',
  'Glucose Screening',
  'Blood / Laboratory Test',
  'Genetic Screening',
  'Neonatal Follow-up',
  'Consultation',
  'Other'
];

export default function AppointmentTracker() {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = usePregnancy();

  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingApt, setEditingApt] = useState(null);

  // Form states
  const [doctorName, setDoctorName] = useState('');
  const [clinic, setClinic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [type, setType] = useState('Routine Checkup');
  const [notes, setNotes] = useState('');
  const [questions, setQuestions] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingList = appointments
    .filter((a) => !a.completed && new Date(a.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastList = appointments
    .filter((a) => a.completed || new Date(a.date) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!doctorName.trim() || !date) return;

    addAppointment({
      doctorName: doctorName.trim(),
      clinic: clinic.trim(),
      date,
      time,
      type,
      notes: notes.trim(),
      questions: questions.trim()
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleStartEdit = (apt) => {
    setEditingApt(apt);
    setDoctorName(apt.doctorName || '');
    setClinic(apt.clinic || '');
    setDate(apt.date || '');
    setTime(apt.time || '10:00');
    setType(apt.type || 'Routine Checkup');
    setNotes(apt.notes || '');
    setQuestions(apt.questions || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingApt) return;

    updateAppointment(editingApt.id, {
      doctorName: doctorName.trim(),
      clinic: clinic.trim(),
      date,
      time,
      type,
      notes: notes.trim(),
      questions: questions.trim()
    });

    setEditingApt(null);
    resetForm();
  };

  const resetForm = () => {
    setDoctorName('');
    setClinic('');
    setDate('');
    setTime('10:00');
    setType('Routine Checkup');
    setNotes('');
    setQuestions('');
  };

  const handleToggleComplete = (id, currentStatus) => {
    updateAppointment(id, { completed: !currentStatus });
  };

  const handleDelete = (id, doc) => {
    if (window.confirm(`Delete appointment with ${doc || 'this provider'}?`)) {
      deleteAppointment(id);
    }
  };

  const currentList = activeTab === 'upcoming' ? upcomingList : pastList;

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      
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
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#7B2CBF', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <Calendar size={16} />
              <span>PRENATAL & NEONATAL VISITS SCHEDULE</span>
            </div>
            <h1 style={{ fontSize: '2rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
              Doctor Appointments 🩺
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 580 }}>
              Keep all your obstetrician checkups, diagnostic ultrasound scans, and questions for your doctor organized in one place.
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
            <span>+ Add Appointment</span>
          </button>
        </div>
      </div>

      {/* Tabs: Upcoming vs Past */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`btn btn-sm ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 20, padding: '8px 20px' }}
        >
          <span>Upcoming ({upcomingList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`btn btn-sm ${activeTab === 'past' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 20, padding: '8px 20px' }}
        >
          <span>Past Visits ({pastList.length})</span>
        </button>
      </div>

      {/* Appointments List */}
      {currentList.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px', background: '#FFFFFF' }}>
          <Calendar size={40} color="#D1D5DB" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>
            {activeTab === 'upcoming' ? 'No Upcoming Appointments' : 'No Past Appointments'}
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.88rem', margin: '0 auto 16px', maxWidth: 400 }}>
            {activeTab === 'upcoming' 
              ? 'Schedule your next routine prenatal ultrasound, blood test, or consultation.' 
              : 'Past visits and consultation takeaways will appear here.'}
          </p>
          {activeTab === 'upcoming' && (
            <button 
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
            >
              <Plus size={16} />
              <span>Schedule an Appointment</span>
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentList.map((apt) => (
            <div 
              key={apt.id}
              className="card"
              style={{
                padding: '20px 24px',
                borderLeft: apt.completed ? '6px solid #84A98C' : '6px solid #BDB2FF',
                background: apt.completed ? '#F8FCF9' : '#FFFFFF',
                borderRadius: 20
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="badge badge-purple">{apt.type}</span>
                  <span style={{ fontSize: '0.84rem', color: '#6B7280', fontWeight: 600 }}>
                    {formatDate(apt.date)} at {apt.time}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => handleToggleComplete(apt.id, apt.completed)}
                    className="btn btn-sm"
                    style={{
                      background: apt.completed ? '#84A98C' : '#F3F4F6',
                      color: apt.completed ? 'white' : '#4B5563',
                      fontSize: '0.78rem',
                      padding: '4px 10px'
                    }}
                  >
                    <CheckCircle2 size={14} />
                    <span>{apt.completed ? 'Completed' : 'Mark Done'}</span>
                  </button>

                  <button 
                    onClick={() => handleStartEdit(apt)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 10px', fontSize: '0.78rem', borderColor: '#E5E7EB', color: '#4B5563' }}
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button 
                    onClick={() => handleDelete(apt.id, apt.doctorName)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 4, fontWeight: 700 }}>
                {apt.doctorName}
              </h2>

              {apt.clinic && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#6B7280', marginBottom: 12 }}>
                  <MapPin size={14} color="#7B2CBF" />
                  <span>{apt.clinic}</span>
                </div>
              )}

              {apt.notes && (
                <div style={{ background: '#F9FAFB', padding: '10px 14px', borderRadius: 12, marginBottom: 10, fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.5 }}>
                  <strong style={{ color: '#2B2D42' }}>Appointment Focus / Notes: </strong>
                  {apt.notes}
                </div>
              )}

              {apt.questions && (
                <div style={{ background: '#FFF5F7', border: '1px solid #FFE5EC', padding: '10px 14px', borderRadius: 12, fontSize: '0.86rem', color: '#D81B60', lineHeight: 1.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 2 }}>
                    <HelpCircle size={15} />
                    <span>Questions to Ask the Doctor:</span>
                  </div>
                  <div>{apt.questions}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD APPOINTMENT MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Schedule Healthcare Appointment" maxWidth={540}>
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Doctor / Healthcare Provider Name</label>
            <input 
              type="text" 
              value={doctorName} 
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="e.g. Dr. Emily Vance or Midwife Claire"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hospital / Clinic Location</label>
            <input 
              type="text" 
              value={clinic} 
              onChange={(e) => setClinic(e.target.value)}
              placeholder="e.g. St. Mary's Prenatal Pavilion - Suite 402"
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Appointment Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {APPOINTMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Visit Notes / Preparations</label>
            <input 
              type="text" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 24-week routine wellness check, bring insurance card"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Questions You Want to Ask Doctor</label>
            <textarea 
              rows={2}
              value={questions} 
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="e.g. Inquire about travel guidelines and pelvic stretching exercises"
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
              Save Appointment
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT APPOINTMENT MODAL */}
      <Modal isOpen={!!editingApt} onClose={() => setEditingApt(null)} title="Edit Appointment Details" maxWidth={540}>
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Doctor / Healthcare Provider Name</label>
            <input 
              type="text" 
              value={doctorName} 
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hospital / Clinic Location</label>
            <input 
              type="text" 
              value={clinic} 
              onChange={(e) => setClinic(e.target.value)}
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Appointment Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {APPOINTMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Visit Notes / Preparations</label>
            <input 
              type="text" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Questions You Want to Ask Doctor</label>
            <textarea 
              rows={2}
              value={questions} 
              onChange={(e) => setQuestions(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <button 
              type="button" 
              onClick={() => setEditingApt(null)} 
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
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
