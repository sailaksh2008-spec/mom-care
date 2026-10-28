import React, { useState } from 'react';
import { 
  BookOpen, Search, CheckSquare, Square, Plus, Shield, 
  ExternalLink, ChevronRight, FileText, CheckCircle2, Heart, Sparkles 
} from 'lucide-react';
import { usePregnancy } from '../context/PregnancyContext';
import { EDUCATIONAL_CATEGORIES, EDUCATIONAL_ARTICLES, MEDICAL_DISCLAIMER_TEXT } from '../data/educationalData';
import MedicalDisclaimer from '../components/MedicalDisclaimer';
import Modal from '../components/Modal';

export default function EducationalLibrary() {
  const { hospitalBag, toggleHospitalBagItem, addHospitalBagItem } = usePregnancy();

  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'hospital_bag'
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  // Hospital bag custom item modal
  const [isBagModalOpen, setIsBagModalOpen] = useState(false);
  const [bagItemText, setBagItemText] = useState('');
  const [bagCategory, setBagCategory] = useState('For Mom');

  // Filter articles
  const filteredArticles = EDUCATIONAL_ARTICLES.filter((art) => {
    const matchCat = selectedCategory === 'All Articles' || art.category === selectedCategory;
    const matchSearch = 
      !searchQuery || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddBagItem = (e) => {
    e.preventDefault();
    if (!bagItemText.trim()) return;
    addHospitalBagItem({
      category: bagCategory,
      item: bagItemText.trim()
    });
    setBagItemText('');
    setIsBagModalOpen(false);
  };

  const bagGroups = ['For Mom', 'For Baby', 'For Partner'];

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      
      {/* Header */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(135deg, #FFFFFF, #FAF5FF)', 
          borderColor: '#E9D5FF',
          marginBottom: 24,
          padding: '28px 24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7B2CBF', fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>
          <BookOpen size={16} />
          <span>EVIDENCE-BASED PRENATAL & NEONATAL LIBRARY</span>
        </div>
        <h1 style={{ fontSize: '2.1rem', color: '#2B2D42', fontWeight: 800, marginBottom: 6 }}>
          Educational Library & Guides 📚
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: 0, maxWidth: 640 }}>
          Learn about prenatal stages, premature baby care, nutrition, birth preparation, 
          and pack your hospital bag. Sourced from clinical references and guidelines.
        </p>
      </div>

      {/* Mode Navigation */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('articles')}
          className={`btn btn-sm ${activeTab === 'articles' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 20, padding: '8px 20px' }}
        >
          <BookOpen size={16} />
          <span>Educational Articles ({EDUCATIONAL_ARTICLES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hospital_bag')}
          className={`btn btn-sm ${activeTab === 'hospital_bag' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 20, padding: '8px 20px' }}
        >
          <CheckSquare size={16} />
          <span>Hospital Bag Checklist</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: EDUCATIONAL ARTICLES
          ======================================================== */}
      {activeTab === 'articles' && (
        <div>
          {/* Search and Category Filter */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: 12, color: '#9CA3AF' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, keywords, or source..."
                style={{ paddingLeft: 42, background: '#FFFFFF' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
              {EDUCATIONAL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    background: selectedCategory === cat ? 'var(--lavender-deep)' : '#FFFFFF',
                    color: selectedCategory === cat ? 'white' : '#4B5563',
                    border: selectedCategory === cat ? 'none' : '1px solid #E5E7EB',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18, marginBottom: 30 }}>
            {filteredArticles.map((art) => (
              <div 
                key={art.id}
                className="card"
                style={{
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 18,
                  cursor: 'pointer',
                  border: art.isPdfSource ? '1.5px solid #D8D2FF' : '1px solid rgba(255, 182, 193, 0.3)'
                }}
                onClick={() => setActiveArticle(art)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    {art.isPdfSource ? (
                      <span className="badge badge-source">Primary PDF Source</span>
                    ) : (
                      <span className="badge badge-pink">{art.category}</span>
                    )}
                    <span style={{ fontSize: '0.74rem', color: '#6B7280' }}>{art.readTime}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#2B2D42', marginBottom: 8, fontWeight: 700, lineHeight: 1.3 }}>
                    {art.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                    {art.summary}
                  </p>
                </div>

                <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.76rem', color: '#9CA3AF' }}>{art.sourceDoc}</span>
                  <span style={{ fontSize: '0.82rem', color: '#7B2CBF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>Read Article</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: HOSPITAL BAG CHECKLIST
          ======================================================== */}
      {activeTab === 'hospital_bag' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', color: '#2B2D42', margin: 0 }}>
                  Hospital Bag Essentials 🎒
                </h2>
                <p style={{ color: '#6B7280', fontSize: '0.86rem', margin: '4px 0 0' }}>
                  Recommended checklist for mom, baby, and birth partner. Have this packed by week 36.
                </p>
              </div>

              <button 
                onClick={() => setIsBagModalOpen(true)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>+ Add Custom Item</span>
              </button>
            </div>

            {/* Checklist Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {bagGroups.map((group) => {
                const itemsInGroup = hospitalBag.filter((item) => item.category === group);
                const doneCount = itemsInGroup.filter((i) => i.checked).length;
                return (
                  <div key={group} style={{ background: '#F9FAFB', borderRadius: 16, padding: 18, border: '1px solid #E5E7EB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <h3 style={{ fontSize: '1.1rem', color: '#2B2D42', margin: 0, fontWeight: 700 }}>
                        {group} ({doneCount} / {itemsInGroup.length} Packed)
                      </h3>
                      <span className="badge badge-sage">
                        {doneCount === itemsInGroup.length ? 'Ready! ✨' : 'Packing'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {itemsInGroup.map((item) => (
                        <label 
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '10px 12px',
                            borderRadius: 10,
                            background: item.checked ? '#F0FDF4' : '#FFFFFF',
                            border: item.checked ? '1px solid #BBF7D0' : '1px solid #E5E7EB',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input 
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleHospitalBagItem(item.id)}
                            style={{ width: 18, height: 18, accentColor: '#16A34A' }}
                          />
                          <span style={{ 
                            fontSize: '0.88rem', 
                            color: item.checked ? '#4B5563' : '#2B2D42',
                            textDecoration: item.checked ? 'line-through' : 'none',
                            fontWeight: item.checked ? 400 : 500
                          }}>
                            {item.item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      <Modal isOpen={!!activeArticle} onClose={() => setActiveArticle(null)} title={activeArticle?.title || 'Article'} maxWidth={680}>
        {activeArticle && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {activeArticle.isPdfSource ? (
                <span className="badge badge-source">Direct Source: {activeArticle.sourceDoc}</span>
              ) : (
                <span className="badge badge-pink">{activeArticle.category}</span>
              )}
              <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{activeArticle.readTime}</span>
            </div>

            <div 
              style={{ 
                fontSize: '0.94rem', 
                color: '#2B2D42', 
                lineHeight: 1.7, 
                whiteSpace: 'pre-line',
                background: '#FFF9FA',
                padding: '18px 22px',
                borderRadius: 16,
                border: '1px solid #FFE5EC'
              }}
            >
              {activeArticle.content}
            </div>

            <div style={{ marginTop: 20 }}>
              <MedicalDisclaimer compact={true} />
            </div>
          </div>
        )}
      </Modal>

      {/* ADD HOSPITAL BAG ITEM MODAL */}
      <Modal isOpen={isBagModalOpen} onClose={() => setIsBagModalOpen(false)} title="+ Add Item to Hospital Bag" maxWidth={440}>
        <form onSubmit={handleAddBagItem}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select value={bagCategory} onChange={(e) => setBagCategory(e.target.value)}>
              <option value="For Mom">For Mom</option>
              <option value="For Baby">For Baby</option>
              <option value="For Partner">For Partner</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Item Description</label>
            <input 
              type="text" 
              value={bagItemText} 
              onChange={(e) => setBagItemText(e.target.value)}
              placeholder="e.g. Nursing pillow or Lip balm"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button type="button" onClick={() => setIsBagModalOpen(false)} className="btn btn-outline" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              Add to Checklist
            </button>
          </div>
        </form>
      </Modal>

      {/* Persistent Disclaimer */}
      <div style={{ marginTop: 28 }}>
        <MedicalDisclaimer />
      </div>

    </div>
  );
}
