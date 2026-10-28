import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 560 }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-content" 
        style={{ maxWidth }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{title}</h3>
          <button 
            onClick={onClose} 
            style={{ 
              background: '#F3F4F6', 
              borderRadius: '50%', 
              width: 34, 
              height: 34, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#6B7280',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
