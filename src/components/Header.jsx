import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldAlert, Baby, Calendar, BookOpen, User, Activity } from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import QuickContactModal from './QuickContactModal';

export default function Header() {
  const { gestationalAge, baby } = usePregnancy();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="brand-link">
            <div className="brand-logo-icon">
              <Heart size={20} fill="white" />
            </div>
            <div>
              <span className="brand-title">MOMCARE 💗</span>
              <span className="brand-tagline">Your Pregnancy, Your Journey</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <NavLink to="/" end className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
              <Sparkles size={16} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/growth" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
              <Activity size={16} />
              <span>Foetal Growth</span>
            </NavLink>
            <NavLink to="/baby" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
              <Baby size={16} />
              <span>Baby & Memories</span>
            </NavLink>
            <NavLink to="/learn" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
              <BookOpen size={16} />
              <span>Library</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}>
              <User size={16} />
              <span>Profile</span>
            </NavLink>
          </nav>

          {/* Header Right Actions */}
          <div className="header-right">
            {/* Gestational Badge */}
            {baby.isBorn ? (
              <Link to="/baby" className="week-badge" style={{ background: '#E0F2FE', borderColor: '#BAE6FD', color: '#0369A1' }}>
                <Baby size={14} />
                <span>{baby.babyName || 'Baby'} Born</span>
              </Link>
            ) : (
              <Link to="/growth" className="week-badge" title="Click to view foetal development tracker">
                <Sparkles size={14} />
                <span>{gestationalAge.shortFormatted}</span>
              </Link>
            )}

            {/* Quick Emergency / Triage Button */}
            <button 
              onClick={() => setShowEmergencyModal(true)} 
              className="emergency-btn-pill"
              title="Quick Emergency & Maternity Contacts"
              aria-label="Open emergency contacts"
            >
              <ShieldAlert size={15} />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Quick Emergency Dialogue */}
      <QuickContactModal 
        isOpen={showEmergencyModal} 
        onClose={() => setShowEmergencyModal(false)} 
      />
    </>
  );
}
