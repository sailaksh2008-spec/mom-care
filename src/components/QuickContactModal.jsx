import React from 'react';
import { Phone, ShieldAlert, User, Hospital, Heart, AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import { usePregnancy } from '../context/PregnancyContext';

export default function QuickContactModal({ isOpen, onClose }) {
  const { emergency } = usePregnancy();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Emergency & Clinical Contacts" maxWidth={500}>
      <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 14, padding: 14, marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#E11D48', fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>
          <AlertTriangle size={18} />
          <span>Immediate Danger Warning</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.82rem', color: '#9F1239', lineHeight: 1.4 }}>
          If you believe you or your baby may be in immediate danger, seek emergency medical care immediately.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* National Emergency */}
        <a 
          href={`tel:${emergency.emergencyNumber || '911'}`}
          className="btn"
          style={{
            background: 'linear-gradient(135deg, #E63946, #D90429)',
            color: 'white',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderRadius: 14,
            fontWeight: 700
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldAlert size={22} />
            <div style={{ textAlign: 'left' }}>
              <div>Emergency Services</div>
              <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>Immediate ambulance & paramedic dispatch</div>
            </div>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 10px', borderRadius: 20 }}>
            {emergency.emergencyNumber || '911'}
          </span>
        </a>

        {/* Maternity Triage / Hospital */}
        <a 
          href={`tel:${emergency.maternityWard || ''}`}
          className="btn"
          style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            color: '#166534',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: 14
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Hospital size={20} color="#16A34A" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Maternity Ward / Triage</div>
              <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>{emergency.hospitalName || 'Local Maternity Hospital'}</div>
            </div>
          </div>
          <Phone size={18} />
        </a>

        {/* OB/GYN Doctor */}
        <a 
          href={`tel:${emergency.doctorPhone || ''}`}
          className="btn"
          style={{
            background: '#FAF5FF',
            border: '1.5px solid #E9D5FF',
            color: '#6B21A8',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: 14
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Heart size={20} color="#9333EA" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Primary Doctor (OB/GYN)</div>
              <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>{emergency.doctorName || 'Attending Obstetrician'}</div>
            </div>
          </div>
          <Phone size={18} />
        </a>

        {/* NICU Team */}
        {emergency.nicuWard && (
          <a 
            href={`tel:${emergency.nicuWard}`}
            className="btn"
            style={{
              background: '#FFF7ED',
              border: '1.5px solid #FED7AA',
              color: '#C2410C',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 14
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Heart size={20} color="#EA580C" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700 }}>Neonatal Care (NICU)</div>
                <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>Premature infant care team</div>
              </div>
            </div>
            <Phone size={18} />
          </a>
        )}

        {/* Partner / Support Contact */}
        <a 
          href={`tel:${emergency.partnerPhone || ''}`}
          className="btn"
          style={{
            background: '#F9FAFB',
            border: '1.5px solid #E5E7EB',
            color: '#1F2937',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderRadius: 14
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={20} color="#4B5563" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>Support Partner</div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{emergency.partnerName || 'Family Contact'}</div>
            </div>
          </div>
          <Phone size={18} />
        </a>
      </div>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button 
          onClick={onClose} 
          className="btn btn-outline btn-sm"
          style={{ width: '100%' }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
