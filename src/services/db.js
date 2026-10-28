/**
 * IndexedDB Service for Local Blob Storage
 * 
 * Safely persists ultrasound scan images and journal photo attachments
 * as genuine binary Blobs without Base64 overhead or LocalStorage size limits.
 */

const DB_NAME = 'MomCareDB';
const DB_VERSION = 1;
const SCAN_STORE = 'scan_photos';
const JOURNAL_STORE = 'journal_photos';

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(SCAN_STORE)) {
        const scanStore = db.createObjectStore(SCAN_STORE, { keyPath: 'id' });
        scanStore.createIndex('createdAt', 'createdAt', { unique: false });
        scanStore.createIndex('week', 'week', { unique: false });
      }
      if (!db.objectStoreNames.contains(JOURNAL_STORE)) {
        const journalStore = db.createObjectStore(JOURNAL_STORE, { keyPath: 'id' });
        journalStore.createIndex('entryId', 'entryId', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
  });

  return dbPromise;
}

/**
 * Scan Photos Store API
 */
export async function saveScanPhoto(photo) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SCAN_STORE, 'readwrite');
    const store = tx.objectStore(SCAN_STORE);
    const item = {
      id: photo.id || 'scan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      date: photo.date || new Date().toISOString().split('T')[0],
      week: Number(photo.week) || 0,
      title: photo.title || 'Baby Scan',
      note: photo.note || '',
      blob: photo.blob, // Binary Blob
      mimeType: photo.mimeType || (photo.blob ? photo.blob.type : 'image/jpeg'),
      createdAt: photo.createdAt || Date.now()
    };
    const req = store.put(item);
    req.onsuccess = () => resolve(item);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllScanPhotos() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SCAN_STORE, 'readonly');
    const store = tx.objectStore(SCAN_STORE);
    const req = store.getAll();
    req.onsuccess = () => {
      // Sort chronologically (oldest to newest or by week)
      const sorted = (req.result || []).sort((a, b) => {
        if (a.week !== b.week) return a.week - b.week;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      resolve(sorted);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getScanPhoto(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SCAN_STORE, 'readonly');
    const store = tx.objectStore(SCAN_STORE);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function updateScanPhoto(id, updates) {
  const existing = await getScanPhoto(id);
  if (!existing) throw new Error('Scan photo not found');
  const updated = { ...existing, ...updates };
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SCAN_STORE, 'readwrite');
    const store = tx.objectStore(SCAN_STORE);
    const req = store.put(updated);
    req.onsuccess = () => resolve(updated);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteScanPhoto(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SCAN_STORE, 'readwrite');
    const store = tx.objectStore(SCAN_STORE);
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Journal Photos Store API
 */
export async function saveJournalPhoto(photo) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(JOURNAL_STORE, 'readwrite');
    const store = tx.objectStore(JOURNAL_STORE);
    const item = {
      id: photo.id || 'jphoto_' + Date.now(),
      entryId: photo.entryId,
      blob: photo.blob,
      mimeType: photo.mimeType || (photo.blob ? photo.blob.type : 'image/jpeg'),
      createdAt: Date.now()
    };
    const req = store.put(item);
    req.onsuccess = () => resolve(item);
    req.onerror = () => reject(req.error);
  });
}

export async function getJournalPhoto(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(JOURNAL_STORE, 'readonly');
    const store = tx.objectStore(JOURNAL_STORE);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteJournalPhoto(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(JOURNAL_STORE, 'readwrite');
    const store = tx.objectStore(JOURNAL_STORE);
    const req = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Clear all binary records
 */
export async function clearAllIndexedDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([SCAN_STORE, JOURNAL_STORE], 'readwrite');
    tx.objectStore(SCAN_STORE).clear();
    tx.objectStore(JOURNAL_STORE).clear();
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Helper to create an object URL for a stored photo blob
 */
export function createBlobUrl(blob) {
  if (!blob) return null;
  return URL.createObjectURL(blob);
}

/**
 * Helper to seed initial sample ultrasound scan into IndexedDB if empty
 */
export async function seedSampleScanIfEmpty() {
  try {
    const scans = await getAllScanPhotos();
    if (scans.length === 0) {
      // Fetch sample_ultrasound.jpg from public assets as a real Blob
      const response = await fetch('/assets/sample_ultrasound.jpg');
      if (response.ok) {
        const blob = await response.blob();
        await saveScanPhoto({
          id: 'demo_anatomy_scan_20w',
          date: '2026-10-15',
          week: 20,
          title: 'Mid-Pregnancy Anatomy Scan 💕',
          note: 'Our baby is measuring beautifully at 20 weeks. We saw the tiny heart beating, little fingers and toes!',
          blob: blob,
          mimeType: 'image/jpeg'
        });
      }
    }
  } catch (err) {
    console.warn('Could not seed initial sample scan:', err);
  }
}
