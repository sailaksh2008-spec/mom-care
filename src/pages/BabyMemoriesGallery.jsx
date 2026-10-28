import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Image as ImageIcon, Plus, Trash2, Edit3, Calendar, 
  Clock, Sparkles, ZoomIn, AlertCircle, Shield, X, Check, Eye
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { createBlobUrl } from '../services/db';
import Modal from '../components/Modal';

export default function BabyMemoriesGallery() {
  const { scans, scansLoading, addScanPhoto, editScanPhoto, removeScanPhoto, gestationalAge } = usePregnancy();

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null); // for lightbox
  const [editingPhoto, setEditingPhoto] = useState(null); // for editing metadata

  // Form states for Add Modal
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [fileError, setFileError] = useState('');
  const [scanDate, setScanDate] = useState(new Date().toISOString().split('T')[0]);
  const [scanWeek, setScanWeek] = useState(gestationalAge.weeks || 20);
  const [scanTitle, setScanTitle] = useState('');
  const [scanNote, setScanNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editWeek, setEditWeek] = useState(20);

  // Object URLs cache for rendering blobs in the gallery
  const [urlsMap, setUrlsMap] = useState({});

  useEffect(() => {
    // Generate object URLs for all scans
    const newUrls = {};
    scans.forEach((scan) => {
      if (scan.blob) {
        newUrls[scan.id] = createBlobUrl(scan.blob);
      }
    });
    setUrlsMap(newUrls);

    // Cleanup URLs when unmounting or scans change
    return () => {
      Object.values(newUrls).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [scans]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError('');

    if (!file) {
      setSelectedFile(null);
      setFilePreviewUrl(null);
      return;
    }

    // Validate type (JPG, JPEG, PNG)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please select a valid image file (JPG, JPEG, or PNG).');
      setSelectedFile(null);
      setFilePreviewUrl(null);
      return;
    }

    // Validate size (max 12MB)
    const maxSize = 12 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError('Image file is too large. Please select a photo under 12 MB.');
      setSelectedFile(null);
      setFilePreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setFilePreviewUrl(preview);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError('Please select an ultrasound or baby scan photo to upload.');
      return;
    }

    try {
      setIsSubmitting(true);
      await addScanPhoto({
        title: scanTitle.trim() || `Ultrasound Scan — Week ${scanWeek}`,
        date: scanDate,
        week: Number(scanWeek) || 0,
        note: scanNote.trim(),
        blob: selectedFile,
        mimeType: selectedFile.type
      });

      // Reset and close
      setIsSubmitting(false);
      setIsAddModalOpen(false);
      setSelectedFile(null);
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
      setScanTitle('');
      setScanNote('');
    } catch (err) {
      console.error('Failed to save scan:', err);
      setFileError('Failed to save photo to IndexedDB. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (photo) => {
    setEditingPhoto(photo);
    setEditTitle(photo.title || '');
    setEditNote(photo.note || '');
    setEditDate(photo.date || '');
    setEditWeek(photo.week || 20);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingPhoto) return;
    try {
      await editScanPhoto(editingPhoto.id, {
        title: editTitle.trim(),
        note: editNote.trim(),
        date: editDate,
        week: Number(editWeek)
      });
      setEditingPhoto(null);
    } catch (err) {
      console.error('Failed to update scan:', err);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title || 'this scan'}"? This action cannot be undone.`)) {
      await removeScanPhoto(id);
      if (previewPhoto && previewPhoto.id === id) {
        setPreviewPhoto(null);
      }
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      
      {/* 1. Header Banner */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF, #FFF5F7)', 
          borderColor: '#FFCCD5',
          marginBottom: 24,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#D81B60', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <Heart size={16} fill="#FF758F" color="#FF758F" />
              <span>PRIVATE ULTRASOUND & PHOTO ALBUM</span>
            </div>
            <h1 style={{ fontSize: '2.1rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
              BABY MEMORIES — Every Little Moment Matters 💕
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', maxWidth: 650, margin: 0, lineHeight: 1.5 }}>
              Safely preserve your baby's ultrasound scans, sonogram photos, and notes. 
              Stored locally on your device in secure IndexedDB binary storage.
            </p>
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary btn-lg"
            style={{ borderRadius: 16 }}
          >
            <Plus size={20} />
            <span>+ Add Scan Photo</span>
          </button>
        </div>
      </div>

      {/* 2. Privacy & Clinical Disclaimer Notice */}
      <div style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: 14, padding: '12px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.82rem', color: '#6B7280' }}>
        <Shield size={20} color="#84A98C" style={{ flexShrink: 0 }} />
        <div>
          <strong>Privacy & Medical Integrity:</strong> Images are stored locally in your browser’s IndexedDB. 
          Ultrasound images are for personal keepsake memories only. This gallery does not diagnose medical conditions 
          or interpret ultrasound images for fetal health.
        </div>
      </div>

      {/* 3. Photo Gallery Grid */}
      {scansLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
          <Sparkles size={32} color="#FF758F" style={{ animation: 'spin 2s linear infinite', margin: '0 auto 12px' }} />
          <div>Loading your baby scan memories...</div>
        </div>
      ) : scans.length === 0 ? (
        /* Empty State */
        <div 
          className="card" 
          style={{ 
            textAlign: 'center', 
            padding: '60px 24px', 
            background: '#FFFFFF',
            border: '2px dashed #FFCCD5'
          }}
        >
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FFF0F3', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ImageIcon size={40} color="#FF758F" />
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#2B2D42', marginBottom: 8 }}>
            Your Memory Album is Ready
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.94rem', maxWidth: 480, margin: '0 auto 20px', lineHeight: 1.5 }}>
            Upload your first 2D ultrasound, nuchal translucency scan, or 20-week anatomy photo. 
            Add your thoughts and the week it was taken to create a cherished timeline.
          </p>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={18} />
            <span>Upload Your First Scan Photo</span>
          </button>
        </div>
      ) : (
        /* Grid of Scan Photos */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {scans.map((scan) => {
            const imgUrl = urlsMap[scan.id];
            return (
              <div 
                key={scan.id} 
                className="card" 
                style={{ 
                  padding: 14, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  borderRadius: 20
                }}
              >
                <div>
                  {/* Photo Preview Container */}
                  <div 
                    className="image-thumbnail-wrapper" 
                    style={{ cursor: 'pointer', height: 210, marginBottom: 12, borderRadius: 14 }}
                    onClick={() => setPreviewPhoto(scan)}
                    title="Click to view full size"
                  >
                    {imgUrl ? (
                      <img src={imgUrl} alt={scan.title || 'Baby Scan'} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F6', color: '#9CA3AF' }}>
                        <ImageIcon size={32} />
                      </div>
                    )}
                    
                    {/* Hover Zoom Overlay */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        background: 'rgba(0,0,0,0.25)', 
                        opacity: 0, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: 'white',
                        transition: 'opacity 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      <div style={{ background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                        <ZoomIn size={16} />
                        <span>View Full Screen</span>
                      </div>
                    </div>

                    {/* Week Badge */}
                    <span 
                      style={{ 
                        position: 'absolute', 
                        bottom: 8, 
                        left: 8, 
                        background: 'rgba(255, 117, 143, 0.9)', 
                        color: 'white', 
                        fontSize: '0.74rem', 
                        fontWeight: 700,
                        padding: '3px 10px', 
                        borderRadius: 20,
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      Week {scan.week}
                    </span>
                  </div>

                  {/* Title & Date */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: '1.05rem', color: '#2B2D42', margin: 0, fontWeight: 700 }}>
                      {scan.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', color: '#6B7280', marginBottom: 8 }}>
                    <Calendar size={13} />
                    <span>{scan.date}</span>
                    <span>•</span>
                    <Clock size={13} />
                    <span>{scan.week} Weeks Gestation</span>
                  </div>

                  {/* Personal Note */}
                  {scan.note && (
                    <p style={{ fontSize: '0.84rem', color: '#4B5563', margin: 0, lineHeight: 1.4, fontStyle: 'italic', background: '#FFF9FA', padding: '8px 10px', borderRadius: 10, border: '1px solid #FFE5EC' }}>
                      "{scan.note}"
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 14, paddingTop: 10, borderTop: '1px solid #F3F4F6' }}>
                  <button 
                    onClick={() => handleStartEdit(scan)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '6px 12px', fontSize: '0.78rem', borderColor: '#E5E7EB', color: '#4B5563' }}
                    title="Edit details"
                  >
                    <Edit3 size={14} />
                    <span>Edit</span>
                  </button>

                  <button 
                    onClick={() => handleDelete(scan.id, scan.title)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                    title="Delete scan photo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================
          MODAL: ADD NEW SCAN PHOTO
          ======================================================== */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="+ Add Ultrasound / Scan Photo" maxWidth={540}>
        <form onSubmit={handleAddSubmit}>
          {/* File Picker Container */}
          <div className="form-group">
            <label className="form-label">Select Photo File (JPG, JPEG, PNG)</label>
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            
            <div 
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              style={{
                border: '2px dashed #FFB3C1',
                borderRadius: 16,
                padding: '24px 16px',
                textAlign: 'center',
                background: '#FFF9FA',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {filePreviewUrl ? (
                <div>
                  <img 
                    src={filePreviewUrl} 
                    alt="Preview" 
                    style={{ maxHeight: 180, maxWidth: '100%', borderRadius: 10, marginBottom: 8, objectFit: 'contain' }} 
                  />
                  <div style={{ fontSize: '0.8rem', color: '#D81B60', fontWeight: 600 }}>Click to change photo</div>
                </div>
              ) : (
                <div>
                  <ImageIcon size={36} color="#FF758F" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#2B2D42' }}>
                    Click to browse your device
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#9CA3AF', marginTop: 4 }}>
                    Supports JPG, JPEG, and PNG files up to 12 MB
                  </div>
                </div>
              )}
            </div>

            {fileError && (
              <div style={{ color: '#E63946', fontSize: '0.8rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <AlertCircle size={14} />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Pregnancy Week</label>
              <input 
                type="number" 
                min="1" 
                max="42" 
                value={scanWeek} 
                onChange={(e) => setScanWeek(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Scan Date</label>
              <input 
                type="date" 
                value={scanDate} 
                onChange={(e) => setScanDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Photo Title (Optional)</label>
            <input 
              type="text" 
              value={scanTitle} 
              onChange={(e) => setScanTitle(e.target.value)}
              placeholder="e.g. My First Scan 💗 or 20w Anatomy Scan"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Personal Note / Doctor's Comments</label>
            <textarea 
              rows={3} 
              value={scanNote} 
              onChange={(e) => setScanNote(e.target.value)}
              placeholder="e.g. First glimpse of our little one! Saw the tiny heartbeat and waving fingers."
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving to IndexedDB...' : 'Save Scan Memory'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ========================================================
          MODAL: EDIT SCAN METADATA
          ======================================================== */}
      <Modal isOpen={!!editingPhoto} onClose={() => setEditingPhoto(null)} title="Edit Scan Details" maxWidth={480}>
        {editingPhoto && (
          <form onSubmit={handleSaveEdit}>
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Pregnancy Week</label>
                <input 
                  type="number" 
                  min="1" 
                  max="42" 
                  value={editWeek} 
                  onChange={(e) => setEditWeek(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Scan Date</label>
                <input 
                  type="date" 
                  value={editDate} 
                  onChange={(e) => setEditDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Photo Title</label>
              <input 
                type="text" 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Personal Note</label>
              <textarea 
                rows={3} 
                value={editNote} 
                onChange={(e) => setEditNote(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button 
                type="button" 
                onClick={() => setEditingPhoto(null)} 
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
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ========================================================
          LIGHTBOX MODAL: FULL SIZE IMAGE PREVIEW
          ======================================================== */}
      <Modal isOpen={!!previewPhoto} onClose={() => setPreviewPhoto(null)} title={previewPhoto?.title || 'Scan Preview'} maxWidth={720}>
        {previewPhoto && (
          <div>
            <div style={{ background: '#000000', borderRadius: 14, overflow: 'hidden', textAlign: 'center', marginBottom: 14 }}>
              <img 
                src={urlsMap[previewPhoto.id]} 
                alt={previewPhoto.title} 
                style={{ maxHeight: '65vh', maxWidth: '100%', objectFit: 'contain' }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span className="badge badge-pink">Week {previewPhoto.week}</span>
              <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>Recorded on {previewPhoto.date}</span>
            </div>
            {previewPhoto.note && (
              <p style={{ fontSize: '0.92rem', color: '#2B2D42', background: '#F8F9FA', padding: 12, borderRadius: 10, margin: 0, fontStyle: 'italic' }}>
                "{previewPhoto.note}"
              </p>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
}
