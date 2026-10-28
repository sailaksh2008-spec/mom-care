import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Plus, Search, Trash2, Edit3, Calendar, 
  Tag, Download, ArrowLeft, Heart, Sparkles, X, Check 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import Modal from '../components/Modal';

const JOURNAL_CATEGORIES = [
  'All',
  'Daily Thoughts',
  'Feelings',
  'Milestones',
  'Letters to Baby',
  'Doctor Visit Notes',
  'Birth Memories',
  'NICU Care'
];

export default function PregnancyJournal() {
  const { journal, addJournalEntry, updateJournalEntry, deleteJournalEntry, exportData } = usePregnancy();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Daily Thoughts');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addJournalEntry({
      title: title.trim(),
      category,
      date,
      content: content.trim()
    });

    setIsAddModalOpen(false);
    setTitle('');
    setContent('');
  };

  const handleStartEdit = (entry) => {
    setEditingEntry(entry);
    setTitle(entry.title || '');
    setCategory(entry.category || 'Daily Thoughts');
    setDate(entry.date || '');
    setContent(entry.content || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingEntry) return;

    updateJournalEntry(editingEntry.id, {
      title: title.trim(),
      category,
      date,
      content: content.trim()
    });

    setEditingEntry(null);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id, entryTitle) => {
    if (window.confirm(`Delete journal entry "${entryTitle}"?`)) {
      deleteJournalEntry(id);
    }
  };

  const handleExportJournal = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(journal, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MomCare_Journal_Export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter & Search entries
  const filteredEntries = journal
    .filter((entry) => {
      const matchCat = activeCategory === 'All' || entry.category === activeCategory;
      const matchSearch = 
        !searchQuery || 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      
      {/* Back to Hub */}
      <div style={{ marginBottom: 16 }}>
        <Link to="/baby" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>
          <ArrowLeft size={16} />
          <span>Back to Baby Central</span>
        </Link>
      </div>

      {/* Header */}
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#E11D48', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
              <BookOpen size={16} />
              <span>PERSONAL PREGNANCY DIARY & REFLECTIONS</span>
            </div>
            <h1 style={{ fontSize: '2rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
              Pregnancy Journal 💕
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 580 }}>
              Capture the joy, wonder, and emotional milestones of pregnancy. 
              Write letters to your baby, reflect on changes, and keep your thoughts safe.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button 
              onClick={handleExportJournal}
              className="btn btn-outline"
              style={{ borderRadius: 14, borderColor: '#D1D5DB', color: '#4B5563' }}
              title="Download backup copy of your journal"
            >
              <Download size={16} />
              <span>Export</span>
            </button>

            <button 
              onClick={() => {
                setTitle('');
                setContent('');
                setDate(new Date().toISOString().split('T')[0]);
                setIsAddModalOpen(true);
              }}
              className="btn btn-primary"
              style={{ borderRadius: 14 }}
            >
              <Plus size={18} />
              <span>+ New Entry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ marginBottom: 20 }}>
        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: '#9CA3AF' }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries by title or keywords..."
            style={{ paddingLeft: 42, background: '#FFFFFF' }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
          {JOURNAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: activeCategory === cat ? 'var(--primary-pink)' : '#FFFFFF',
                color: activeCategory === cat ? 'white' : '#4B5563',
                border: activeCategory === cat ? 'none' : '1px solid #E5E7EB',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px', background: '#FFFFFF' }}>
          <BookOpen size={40} color="#FFA8B6" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 6 }}>No Entries Found</h2>
          <p style={{ color: '#6B7280', fontSize: '0.88rem', margin: '0 auto 16px', maxWidth: 400 }}>
            {searchQuery ? 'Try clearing your search terms to see all entries.' : 'Start capturing your precious thoughts and memories today!'}
          </p>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Write First Entry</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredEntries.map((entry) => (
            <div 
              key={entry.id}
              className="card"
              style={{ padding: '22px 24px', borderRadius: 20 }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="badge badge-pink">{entry.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={13} />
                    <span>{entry.date}</span>
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button 
                    onClick={() => handleStartEdit(entry)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 10px', fontSize: '0.78rem', borderColor: '#E5E7EB', color: '#4B5563' }}
                    title="Edit entry"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(entry.id, entry.title)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                    title="Delete entry"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', color: '#2B2D42', marginBottom: 10, fontWeight: 700 }}>
                {entry.title}
              </h2>

              <p style={{ fontSize: '0.94rem', color: '#4B5563', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ADD ENTRY MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Write in Pregnancy Journal" maxWidth={560}>
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Entry Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Nursery preparations or Feeling that gentle kick"
              required
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {JOURNAL_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Journal Content</label>
            <textarea 
              rows={6}
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your heartfelt thoughts, feelings, bodily changes, or words for your little one..."
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
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
            >
              Save Entry
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT ENTRY MODAL */}
      <Modal isOpen={!!editingEntry} onClose={() => setEditingEntry(null)} title="Edit Journal Entry" maxWidth={560}>
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Entry Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {JOURNAL_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Journal Content</label>
            <textarea 
              rows={6}
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <button 
              type="button" 
              onClick={() => setEditingEntry(null)} 
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
              Update Entry
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
