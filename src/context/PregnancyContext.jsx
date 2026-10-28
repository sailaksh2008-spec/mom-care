import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { StorageService } from '../services/storage';
import { 
  getAllScanPhotos, 
  saveScanPhoto as dbSaveScan, 
  updateScanPhoto as dbUpdateScan, 
  deleteScanPhoto as dbDeleteScan,
  seedSampleScanIfEmpty,
  clearAllIndexedDB
} from '../services/db';
import { calculateGestationalAge, calculateEDDFromLMP } from '../utils/dateUtils';
import { HOSPITAL_BAG_DEFAULTS } from '../data/educationalData';

const PregnancyContext = createContext(null);

export function PregnancyProvider({ children }) {
  // 1. Profile State
  const [profile, setProfileState] = useState(() => StorageService.getProfile());

  // 2. Baby Profile & Post-Birth Mode State
  const [baby, setBabyState] = useState(() => StorageService.getBaby());

  // 3. Emergency Contacts
  const [emergency, setEmergencyState] = useState(() => StorageService.getEmergency());

  // 4. Appointments
  const [appointments, setAppointmentsState] = useState(() => StorageService.getAppointments());

  // 5. Medicine Reminders
  const [reminders, setRemindersState] = useState(() => StorageService.getReminders());

  // 6. Wellness Logs (keyed by 'YYYY-MM-DD')
  const [wellness, setWellnessState] = useState(() => StorageService.getWellness());

  // 7. Movement / Kick Sessions
  const [kicks, setKicksState] = useState(() => StorageService.getKicks());

  // 8. Journal Entries
  const [journal, setJournalState] = useState(() => StorageService.getJournal());

  // 9. NICU Milestones
  const [nicuMilestones, setNicuMilestonesState] = useState(() => StorageService.getNicuMilestones());

  // 10. Hospital Bag
  const [hospitalBag, setHospitalBagState] = useState(() => {
    const saved = StorageService.getHospitalBag();
    return saved || HOSPITAL_BAG_DEFAULTS;
  });

  // 11. IndexedDB Scans
  const [scans, setScans] = useState([]);
  const [scansLoading, setScansLoading] = useState(true);

  // Load scans from IndexedDB on startup
  useEffect(() => {
    let isMounted = true;
    async function loadScans() {
      try {
        await seedSampleScanIfEmpty();
        const loaded = await getAllScanPhotos();
        if (isMounted) {
          setScans(loaded);
          setScansLoading(false);
        }
      } catch (err) {
        console.error('Failed to load scan photos:', err);
        if (isMounted) setScansLoading(false);
      }
    }
    loadScans();
    return () => { isMounted = false; };
  }, []);

  // Compute live gestational age based on LMP and Clinician EDD
  const gestationalAge = useMemo(() => {
    return calculateGestationalAge(profile.lmpDate, profile.clinicianEdd, profile.useClinician);
  }, [profile.lmpDate, profile.clinicianEdd, profile.useClinician]);

  // Actions
  const updateProfile = (newProfile) => {
    const updated = { ...profile, ...newProfile };
    // If LMP changed and no clinician EDD override, recalculate EDD
    if (newProfile.lmpDate && !newProfile.clinicianEdd) {
      updated.clinicianEdd = calculateEDDFromLMP(newProfile.lmpDate);
    }
    setProfileState(updated);
    StorageService.setProfile(updated);
  };

  const updateBaby = (newBaby) => {
    const updated = { ...baby, ...newBaby };
    setBabyState(updated);
    StorageService.setBaby(updated);
  };

  const updateEmergency = (newContacts) => {
    const updated = { ...emergency, ...newContacts };
    setEmergencyState(updated);
    StorageService.setEmergency(updated);
  };

  // Appointments Actions
  const addAppointment = (apt) => {
    const newApt = {
      id: 'apt_' + Date.now(),
      completed: false,
      ...apt
    };
    const updated = [newApt, ...appointments];
    setAppointmentsState(updated);
    StorageService.setAppointments(updated);
    return newApt;
  };

  const updateAppointment = (id, updates) => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAppointmentsState(updated);
    StorageService.setAppointments(updated);
  };

  const deleteAppointment = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointmentsState(updated);
    StorageService.setAppointments(updated);
  };

  // Reminders Actions
  const addReminder = (rem) => {
    const newRem = {
      id: 'rem_' + Date.now(),
      completedToday: false,
      lastCompletedDate: '',
      ...rem
    };
    const updated = [...reminders, newRem];
    setRemindersState(updated);
    StorageService.setReminders(updated);
    return newRem;
  };

  const toggleReminderToday = (id) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updated = reminders.map((r) => {
      if (r.id === id) {
        const isDone = !r.completedToday;
        return {
          ...r,
          completedToday: isDone,
          lastCompletedDate: isDone ? todayStr : ''
        };
      }
      return r;
    });
    setRemindersState(updated);
    StorageService.setReminders(updated);
  };

  const updateReminder = (id, updates) => {
    const updated = reminders.map((r) => (r.id === id ? { ...r, ...updates } : r));
    setRemindersState(updated);
    StorageService.setReminders(updated);
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    setRemindersState(updated);
    StorageService.setReminders(updated);
  };

  // Wellness Actions
  const logWellnessForDate = (dateStr, data) => {
    const current = wellness[dateStr] || {};
    const updated = {
      ...wellness,
      [dateStr]: { ...current, ...data, updatedAt: Date.now() }
    };
    setWellnessState(updated);
    StorageService.setWellness(updated);
  };

  // Kicks Actions
  const saveKickSession = (session) => {
    const newSession = {
      id: 'kick_' + Date.now(),
      createdAt: Date.now(),
      ...session
    };
    const updated = [newSession, ...kicks];
    setKicksState(updated);
    StorageService.setKicks(updated);
    return newSession;
  };

  const deleteKickSession = (id) => {
    const updated = kicks.filter((k) => k.id !== id);
    setKicksState(updated);
    StorageService.setKicks(updated);
  };

  // Journal Actions
  const addJournalEntry = (entry) => {
    const newEntry = {
      id: 'jrn_' + Date.now(),
      createdAt: Date.now(),
      ...entry
    };
    const updated = [newEntry, ...journal];
    setJournalState(updated);
    StorageService.setJournal(updated);
    return newEntry;
  };

  const updateJournalEntry = (id, updates) => {
    const updated = journal.map((j) => (j.id === id ? { ...j, ...updates } : j));
    setJournalState(updated);
    StorageService.setJournal(updated);
  };

  const deleteJournalEntry = (id) => {
    const updated = journal.filter((j) => j.id !== id);
    setJournalState(updated);
    StorageService.setJournal(updated);
  };

  // NICU Milestones Actions
  const updateNicuMilestone = (id, updates) => {
    const updated = nicuMilestones.map((m) => (m.id === id ? { ...m, ...updates } : m));
    setNicuMilestonesState(updated);
    StorageService.setNicuMilestones(updated);
  };

  const addCustomNicuMilestone = (milestone) => {
    const newM = {
      id: 'nicu_c_' + Date.now(),
      completed: true,
      ...milestone
    };
    const updated = [...nicuMilestones, newM];
    setNicuMilestonesState(updated);
    StorageService.setNicuMilestones(updated);
  };

  // Hospital Bag Actions
  const toggleHospitalBagItem = (id) => {
    const updated = hospitalBag.map((item) => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setHospitalBagState(updated);
    StorageService.setHospitalBag(updated);
  };

  const addHospitalBagItem = (item) => {
    const newItem = {
      id: 'hb_' + Date.now(),
      checked: false,
      ...item
    };
    const updated = [...hospitalBag, newItem];
    setHospitalBagState(updated);
    StorageService.setHospitalBag(updated);
  };

  // Scans Actions (IndexedDB)
  const addScanPhoto = async (photoData) => {
    const saved = await dbSaveScan(photoData);
    const refreshed = await getAllScanPhotos();
    setScans(refreshed);
    return saved;
  };

  const editScanPhoto = async (id, updates) => {
    await dbUpdateScan(id, updates);
    const refreshed = await getAllScanPhotos();
    setScans(refreshed);
  };

  const removeScanPhoto = async (id) => {
    await dbDeleteScan(id);
    const refreshed = await getAllScanPhotos();
    setScans(refreshed);
  };

  // Clear / Reset Everything
  const resetAllData = async () => {
    StorageService.clearAllData();
    await clearAllIndexedDB();
    setProfileState(StorageService.getProfile());
    setBabyState(StorageService.getBaby());
    setEmergencyState(StorageService.getEmergency());
    setAppointmentsState(StorageService.getAppointments());
    setRemindersState(StorageService.getReminders());
    setWellnessState({});
    setKicksState([]);
    setJournalState(StorageService.getJournal());
    setNicuMilestonesState(StorageService.getNicuMilestones());
    setHospitalBagState(HOSPITAL_BAG_DEFAULTS);
    setScans([]);
  };

  return (
    <PregnancyContext.Provider
      value={{
        profile,
        updateProfile,
        baby,
        updateBaby,
        gestationalAge,
        emergency,
        updateEmergency,
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        reminders,
        addReminder,
        toggleReminderToday,
        updateReminder,
        deleteReminder,
        wellness,
        logWellnessForDate,
        kicks,
        saveKickSession,
        deleteKickSession,
        journal,
        addJournalEntry,
        updateJournalEntry,
        deleteJournalEntry,
        nicuMilestones,
        updateNicuMilestone,
        addCustomNicuMilestone,
        hospitalBag,
        toggleHospitalBagItem,
        addHospitalBagItem,
        scans,
        scansLoading,
        addScanPhoto,
        editScanPhoto,
        removeScanPhoto,
        resetAllData,
        exportData: StorageService.exportAllData
      }}
    >
      {children}
    </PregnancyContext.Provider>
  );
}

export function usePregnancy() {
  const context = useContext(PregnancyContext);
  if (!context) {
    throw new Error('usePregnancy must be used within a PregnancyProvider');
  }
  return context;
}
