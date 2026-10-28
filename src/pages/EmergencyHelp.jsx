import React, { useState } from 'react';
import { 
  ShieldAlert, Phone, AlertTriangle, Hospital, Heart, 
  User, Edit3, Check, Stethoscope, Clock, ShieldCheck 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import Modal from '../components/Modal';

export default function EmergencyHelp() {
  const { emergency, updateEmergency } = usePregnancy();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...emergency });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEditSave = (e) => {
    e.preventDefault();
    updateEmergency(formData);
    setIsEditModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      
      {/* 1. URGENT DANGER WARNING BANNER */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #FFE5E5, #FFF1F2)', 
          border: '2px solid #E63946', 
          borderRadius: 20, 
          padding: '24px 22px', 
          marginBottom: 24,
          boxShadow: '0 8px 24px rgba(230, 57, 70, 0.12)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, color: '#D90429' }}>
          <ShieldAlert size={28} />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>
            Emergency Medical Guidance 🚨
          </h1>
        </div>
        <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#900C3F', margin: '0 0 10px', lineHeight: 1.5 }}>
          "If you believe you or your baby may be in immediate danger, seek emergency medical care immediately."
        </p>
        <p style={{ fontSize: '0.88rem', color: '#6A040F', margin: 0, lineHeight: 1.5 }}>
          MOMCARE does not evaluate or triage life-threatening conditions. 
          Use the direct tap-to-call links below to contact your local emergency services or maternity hospital immediately.
        </p>
      </div>

      {saveSuccess && (
        <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 12, color: '#166534', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Check size={18} />
          <span>Emergency contact numbers updated!</span>
        </div>
      )}

      {/* 2. DIRECT TAP-TO-CALL CONTACTS */}
      <div className="card" style={{ marginBottom: 28, padding: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', color: '#2B2D42', margin: 0 }}>
              Direct Tap-to-Call Emergency Lines
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.86rem', margin: '2px 0 0' }}>
              Tap any button below on your phone to initiate a direct call.
            </p>
          </div>

          <button 
            onClick={() => {
              setFormData({ ...emergency });
              setIsEditModalOpen(true);
            }}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 12 }}
          >
            <Edit3 size={15} />
            <span>Edit Phone Numbers</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* National Ambulance / Police */}
          <a 
            href={`tel:${emergency.emergencyNumber || '911'}`}
            className="btn"
            style={{
              background: 'linear-gradient(135deg, #E63946, #D90429)',
              color: 'white',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: 16,
              boxShadow: '0 4px 14px rgba(230, 57, 70, 0.3)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ShieldAlert size={26} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>National Emergency (Ambulance / Paramediс)</div>
                <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>Immediate dispatch for severe life-threatening emergencies</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'rgba(255,255,255,0.25)', padding: '6px 14px', borderRadius: 20, fontWeight: 800 }}>
                {emergency.emergencyNumber || '911'}
              </span>
              <Phone size={20} />
            </div>
          </a>

          {/* Maternity Ward / Triage */}
          <a 
            href={`tel:${emergency.maternityWard || ''}`}
            className="btn"
            style={{
              background: '#F0FDF4',
              border: '1.5px solid #86EFAC',
              color: '#166534',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Hospital size={24} color="#16A34A" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Maternity Ward / Labour Triage (24/7)</div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563' }}>{emergency.hospitalName || 'Local Maternity Hospital'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{emergency.maternityWard || 'Set Number'}</span>
              <Phone size={18} />
            </div>
          </a>

          {/* Primary Obstetrician */}
          <a 
            href={`tel:${emergency.doctorPhone || ''}`}
            className="btn"
            style={{
              background: '#FAF5FF',
              border: '1.5px solid #D8D2FF',
              color: '#6B21A8',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Heart size={24} color="#9333EA" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Maternity Doctor (OB/GYN / Midwife)</div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563' }}>{emergency.doctorName || 'Attending Physician'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{emergency.doctorPhone || 'Set Number'}</span>
              <Phone size={18} />
            </div>
          </a>

          {/* NICU Team */}
          {emergency.nicuWard && (
            <a 
              href={`tel:${emergency.nicuWard}`}
              className="btn"
              style={{
                background: '#FFF7ED',
                border: '1.5px solid #FED7AA',
                color: '#9A3412',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Stethoscope size={24} color="#EA580C" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Neonatal Intensive Care Unit (NICU)</div>
                  <div style={{ fontSize: '0.82rem', color: '#4B5563' }}>Premature infant care team</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{emergency.nicuWard}</span>
                <Phone size={18} />
              </div>
            </a>
          )}

          {/* Partner / Support Person */}
          <a 
            href={`tel:${emergency.partnerPhone || ''}`}
            className="btn"
            style={{
              background: '#F9FAFB',
              border: '1.5px solid #E5E7EB',
              color: '#1F2937',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <User size={24} color="#4B5563" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Primary Support Partner</div>
                <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>{emergency.partnerName || 'Family Contact'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{emergency.partnerPhone || 'Set Number'}</span>
              <Phone size={18} />
            </div>
          </a>
        </div>
      </div>

      {/* 3. CRITICAL RED FLAG SYMPTOMS CHECKLIST */}
      <div className="card" style={{ padding: 24, borderLeft: '6px solid #E63946' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#2B2D42', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={22} color="#E63946" />
          <span>When to Seek Immediate Hospital Evaluation</span>
        </h2>
        <p style={{ color: '#4B5563', fontSize: '0.88rem', marginBottom: 16 }}>
          Do not hesitate or feel embarrassed to call your maternity triage. If you experience any of the following, seek immediate assessment:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {[
            { title: 'Vaginal Bleeding', desc: 'Any bright red bleeding or discharge with clots.' },
            { title: 'Noticeably Reduced Movements', desc: 'Baby moving less than usual or not responding to rest/drinks.' },
            { title: 'Fluid Leaking (PPROM)', desc: 'Water breaking or persistent trickle of amniotic fluid before 37 weeks.' },
            { title: 'Severe Headaches or Vision Flashes', desc: 'Intense headache, flashing spots, or sudden facial swelling (pre-eclampsia signs).' },
            { title: 'Persistent Severe Abdominal Pain', desc: 'Constant sharp pain that does not ease, distinct from Braxton Hicks.' },
            { title: 'High Fever or Chills', desc: 'Maternal temperature above 38°C (100.4°F) suggesting potential infection.' }
          ].map((sym, i) => (
            <div key={i} style={{ background: '#FFF5F7', border: '1px solid #FFE5EC', borderRadius: 12, padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#D81B60', marginBottom: 2 }}>
                {sym.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#4B5563' }}>
                {sym.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Emergency Numbers" maxWidth={520}>
        <form onSubmit={handleEditSave}>
          <div className="form-group">
            <label className="form-label">National Emergency (Ambulance / 911 / 112)</label>
            <input 
              type="text" 
              value={formData.emergencyNumber} 
              onChange={(e) => setFormData({ ...formData, emergencyNumber: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hospital Name</label>
            <input 
              type="text" 
              value={formData.hospitalName} 
              onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Maternity Ward / Labour Triage Phone</label>
            <input 
              type="text" 
              value={formData.maternityWard} 
              onChange={(e) => setFormData({ ...formData, maternityWard: e.target.value })}
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Doctor Name</label>
              <input 
                type="text" 
                value={formData.doctorName} 
                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Doctor Phone</label>
              <input 
                type="text" 
                value={formData.doctorPhone} 
                onChange={(e) => setFormData({ ...formData, doctorPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">NICU Ward Phone (Optional)</label>
            <input 
              type="text" 
              value={formData.nicuWard} 
              onChange={(e) => setFormData({ ...formData, nicuWard: e.target.value })}
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Partner Name</label>
              <input 
                type="text" 
                value={formData.partnerName} 
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Partner Phone</label>
              <input 
                type="text" 
                value={formData.partnerPhone} 
                onChange={(e) => setFormData({ ...formData, partnerPhone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              Save Numbers
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
