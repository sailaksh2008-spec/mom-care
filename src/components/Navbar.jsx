import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, Baby, BookOpen, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bottom-nav" aria-label="Mobile Navigation">
      <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={22} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/growth" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Activity size={22} />
        <span>Growth</span>
      </NavLink>

      <NavLink to="/baby" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Baby size={22} />
        <span>Baby</span>
      </NavLink>

      <NavLink to="/learn" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <BookOpen size={22} />
        <span>Learn</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
