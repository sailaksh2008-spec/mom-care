import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PregnancyProvider, usePregnancy } from './context/PregnancyContext';

// Components
import Header from './components/Header';
import Navbar from './components/Navbar';

// Pages
import WelcomePage from './pages/WelcomePage';
import HomeDashboard from './pages/HomeDashboard';
import FoetalGrowthTracker from './pages/FoetalGrowthTracker';
import PrematureBabyGuide from './pages/PrematureBabyGuide';
import BabyHub from './pages/BabyHub';
import BabyMemoriesGallery from './pages/BabyMemoriesGallery';
import BabyProfile from './pages/BabyProfile';
import PrematureTimeline from './pages/PrematureTimeline';
import MovementTracker from './pages/MovementTracker';
import PregnancyJournal from './pages/PregnancyJournal';
import AppointmentTracker from './pages/AppointmentTracker';
import MedicineReminders from './pages/MedicineReminders';
import WellnessTracker from './pages/WellnessTracker';
import EducationalLibrary from './pages/EducationalLibrary';
import EmergencyHelp from './pages/EmergencyHelp';
import ProfileSettings from './pages/ProfileSettings';

// Inner layout to manage onboarding redirect & common shell
function AppRoutes() {
  const { profile } = usePregnancy();

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={!profile.isOnboarded ? <Navigate to="/welcome" replace /> : <HomeDashboard />} 
          />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/growth" element={<FoetalGrowthTracker />} />
          <Route path="/premature-care" element={<PrematureBabyGuide />} />
          
          {/* Baby & Memories Hub and Sub-routes */}
          <Route path="/baby" element={<BabyHub />} />
          <Route path="/baby/scans" element={<BabyMemoriesGallery />} />
          <Route path="/baby/profile" element={<BabyProfile />} />
          <Route path="/baby/timeline" element={<PrematureTimeline />} />
          <Route path="/baby/kicks" element={<MovementTracker />} />
          <Route path="/baby/journal" element={<PregnancyJournal />} />

          {/* Daily Life & Healthcare */}
          <Route path="/appointments" element={<AppointmentTracker />} />
          <Route path="/reminders" element={<MedicineReminders />} />
          <Route path="/wellness" element={<WellnessTracker />} />

          {/* Library & Emergency */}
          <Route path="/learn" element={<EducationalLibrary />} />
          <Route path="/emergency" element={<EmergencyHelp />} />
          <Route path="/profile" element={<ProfileSettings />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Bottom Navigation for Mobile */}
      <Navbar />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PregnancyProvider>
        <AppRoutes />
      </PregnancyProvider>
    </BrowserRouter>
  );
}
