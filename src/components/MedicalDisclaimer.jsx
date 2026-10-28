import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { MEDICAL_DISCLAIMER_TEXT } from '../data/educationalData';

export default function MedicalDisclaimer({ compact = false }) {
  if (compact) {
    return (
      <div className="medical-disclaimer-box" style={{ fontSize: '0.8rem', padding: '10px 14px', margin: '10px 0' }}>
        <AlertCircle size={16} />
        <div>
          <strong>Medical Notice:</strong> {MEDICAL_DISCLAIMER_TEXT}
        </div>
      </div>
    );
  }

  return (
    <div className="medical-disclaimer-box">
      <AlertCircle size={20} />
      <div>
        <div style={{ fontWeight: 700, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Medical Notice & Guidance</span>
          <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 8px', borderRadius: 12 }}>
            Educational Companion
          </span>
        </div>
        <p style={{ margin: 0 }}>{MEDICAL_DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}
