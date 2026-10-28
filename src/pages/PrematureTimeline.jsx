import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Calendar, CheckCircle2, Circle, Plus, Trash2, Edit3, 
  ArrowLeft, Sparkles, Scale, Activity, ShieldCheck 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import Modal from '../components/Modal';

export default function PrematureTimeline() {
  const { nicuMilestones, updateNicuMilestone, addCustomNicuMilestone } = usePregnancy();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Bonding');
  const [newDate, setNewDate] = useState('');
  const [newGA, setNewGA] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const handleToggle = (id, currentStatus) => {
    updateNicuMilestone(id, { completed: !currentStatus });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCustomNicuMilestone({
      title: newTitle.trim(),
      category: newCategory,
      date: newDate,
      gestationalAge: newGA.trim(),
      weight: newWeight.trim(),
      notes: newNotes.trim()
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDate('');
    setNewGA('');
    setNewWeight('');
    setNewNotes('');
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
          background: 'linear-gradient(135deg, #FFFFFF, #FAF5FF)', 
          borderColor: '#E9D5FF',
          marginBottom: 24,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#7B2CBF', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <Heart size={16} fill="#BDB2FF" color="#7B2CBF" />
              <span>PERSONAL CARE TIMELINE & KEEPSAKE</span>
            </div>
            <h1 style={{ fontSize: '2rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
              Premature Care & NICU Milestones 💕
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 600 }}>
              Celebrate every small victory. These are optional memories, not clinical requirements. 
              Every baby advances at their own safe pace.
            </p>
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
            style={{ borderRadius: 14 }}
          >
            <Plus size={18} />
            <span>+ Add Custom Milestone</span>
          </button>
        </div>
      </div>

      {/* Reassurance Notice */}
      <div style={{ background: '#FFF9FA', border: '1px solid #FFE5EC', borderRadius: 14, padding: '12px 18px', marginBottom: 24, fontSize: '0.82rem', color: '#6B7280' }}>
        <strong>Parent Notice:</strong> Measurements recorded here are for your personal keepsake and memory book. 
        They do not replace official clinical monitoring by your healthcare team.
      </div>

      {/* Milestones Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {nicuMilestones.map((m, index) => (
          <div 
            key={m.id}
            className="card"
            style={{
              padding: '18px 20px',
              borderLeft: m.completed ? '6px solid #84A98C' : '6px solid #E5E7EB',
              background: m.completed ? '#F8FCF9' : '#FFFFFF',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <button 
                  onClick={() => handleToggle(m.id, m.completed)}
                  style={{
                    marginTop: 2,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: m.completed ? '#84A98C' : '#D1D5DB',
                    transition: 'transform 0.15s ease'
                  }}
                  title={m.completed ? 'Mark pending' : 'Mark achieved'}
                >
                  {m.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      color: '#2B2D42', 
                      margin: 0,
                      textDecoration: m.completed ? 'none' : 'none',
                      fontWeight: 700
                    }}>
                      {m.title}
                    </h3>
                    <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{m.category}</span>
                    {m.completed && <span className="badge badge-sage" style={{ fontSize: '0.72rem' }}>Achieved! ✨</span>}
                  </div>

                  <p style={{ fontSize: '0.86rem', color: '#4B5563', margin: '4px 0 8px', lineHeight: 1.4 }}>
                    {m.notes}
                  </p>

                  {/* Metadata Chips if set */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: '0.78rem', color: '#6B7280' }}>
                    {m.date && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={13} />
                        <span>Date: {m.date}</span>
                      </span>
                    )}
                    {m.gestationalAge && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Activity size={13} />
                        <span>GA: {m.gestationalAge}</span>
                      </span>
                    )}
                    {m.weight && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Scale size={13} />
                        <span>Weight: {m.weight}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Milestone Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="+ Add Custom NICU / Baby Milestone" maxWidth={500}>
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Milestone Title</label>
            <input 
              type="text" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. First time wearing tiny clothes or Opened eyes to mom's voice"
              required
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                <option value="Bonding">Bonding & Touch</option>
                <option value="Respiratory">Breathing & Oxygen</option>
                <option value="Nutrition">Feeding & Nutrition</option>
                <option value="Thermal Regulation">Temperature & Weight</option>
                <option value="Milestone">Homecoming & Milestone</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date Achieved</label>
              <input 
                type="date" 
                value={newDate} 
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Gestational Age at milestone</label>
              <input 
                type="text" 
                value={newGA} 
                onChange={(e) => setNewGA(e.target.value)}
                placeholder="e.g. 32w 1d"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Clinician-Reported Weight</label>
              <input 
                type="text" 
                value={newWeight} 
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="e.g. 1,680 g"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes & Feelings</label>
            <textarea 
              rows={3}
              value={newNotes} 
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="e.g. Baby held my finger today. The nurse said baby's color and oxygen saturation were excellent."
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
              Add Milestone
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
