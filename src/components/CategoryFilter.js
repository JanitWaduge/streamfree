import React, { useState, useRef } from 'react';
import movies from '../data/movies.json';

const languages = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi',
  'Bhojpuri', 'Assamese', 'Odia', 'Urdu', 'Mandarin', 'Japanese', 'French', 'Spanish', 'Korean', 'German', 'Cantonese', 'Italian'
];
const genres = [
  'Adventure', 'Action', 'Drama', 'Comedy', 'Thriller/Suspense', 'Horror', 'Romantic Comedy', 'Musical', 'Black Comedy', 'Documentary'
];

function CategoryFilter() {
  const [step, setStep] = useState(0); // 0: type, 1: language, 2: genre, 3: results
  const [selectedType, setSelectedType] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const resultsRef = useRef(null);

  // Filter movies/series based on selection
  const filtered = movies.filter(item => {
    if (selectedType && item.type !== selectedType) return false;
    if (selectedLanguage && item.language && item.language.toLowerCase() !== selectedLanguage.toLowerCase()) return false;
    if (selectedGenre && item.genre && item.genre.toLowerCase() !== selectedGenre.toLowerCase()) return false;
    return true;
  });

  // Animation CSS
  const fadeSpread = {
    animation: 'fadeSpread 0.6s cubic-bezier(.4,2,.6,1)',
    willChange: 'opacity, transform'
  };

  // Handlers
  const handleTypeClick = (type) => {
    setSelectedType(type);
    setSelectedLanguage('');
    setSelectedGenre('');
    setStep(1);
  };
  const handleLanguageClick = (lang) => {
    setSelectedLanguage(lang);
    setSelectedGenre('');
    setStep(2);
  };
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setStep(3);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };
  const handleBack = (toStep) => {
    if (toStep === 0) {
      setSelectedType('');
      setSelectedLanguage('');
      setSelectedGenre('');
    } else if (toStep === 1) {
      setSelectedLanguage('');
      setSelectedGenre('');
    } else if (toStep === 2) {
      setSelectedGenre('');
    }
    setStep(toStep);
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: 0 }}>
      <style>{`
        @keyframes fadeSpread {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ color: '#b71c1c', fontWeight: 900, fontSize: '2.5rem', textAlign: 'center', marginBottom: 32 }}>Explore Categories</h1>
        {/* Step 0: Type Selector */}
        {step === 0 && (
          <div style={{ ...fadeSpread, display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32 }}>
            <button onClick={() => handleTypeClick('movie')} style={{ background: '#b71c1c', color: '#fff', border: 'none', borderRadius: 8, padding: '18px 48px', fontWeight: 700, fontSize: '1.3rem', cursor: 'pointer', boxShadow: '0 0 12px #b71c1c', transition: 'all 0.2s' }}>Movie</button>
            <button onClick={() => handleTypeClick('tv')} style={{ background: '#b71c1c', color: '#fff', border: 'none', borderRadius: 8, padding: '18px 48px', fontWeight: 700, fontSize: '1.3rem', cursor: 'pointer', boxShadow: '0 0 12px #b71c1c', transition: 'all 0.2s' }}>TV Series</button>
          </div>
        )}
        {/* Step 1: Language */}
        {step === 1 && (
          <div style={{ ...fadeSpread }}>
            <button onClick={() => handleBack(0)} style={{ marginBottom: 18, background: 'none', color: '#4ecdc4', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>← Back</button>
            <h2 style={{ color: '#b71c1c', fontWeight: 700, fontSize: '1.4rem', marginBottom: 16, textAlign: 'center' }}>Choose Language</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
              {languages.map(lang => (
                <button key={lang} onClick={() => handleLanguageClick(lang)} style={{ background: '#111', color: '#fff', border: '1.5px solid #4ecdc4', borderRadius: 12, padding: '18px 0', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s' }}>{lang}</button>
              ))}
            </div>
          </div>
        )}
        {/* Step 2: Genre */}
        {step === 2 && (
          <div style={{ ...fadeSpread }}>
            <button onClick={() => handleBack(1)} style={{ marginBottom: 18, background: 'none', color: '#4ecdc4', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>← Back</button>
            <h2 style={{ color: '#b71c1c', fontWeight: 700, fontSize: '1.4rem', marginBottom: 16, textAlign: 'center' }}>Choose Genre</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
              {genres.map(genre => (
                <button key={genre} onClick={() => handleGenreClick(genre)} style={{ background: '#111', color: '#fff', border: '1.5px solid #4ecdc4', borderRadius: 12, padding: '18px 0', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s' }}>{genre}</button>
              ))}
            </div>
          </div>
        )}
        {/* Step 3: Results */}
        {step === 3 && (
          <div ref={resultsRef} style={{ ...fadeSpread, marginTop: 32 }}>
            <button onClick={() => handleBack(2)} style={{ marginBottom: 18, background: 'none', color: '#4ecdc4', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>← Back</button>
            <h3 style={{ color: '#4ecdc4', fontWeight: 700, fontSize: '1.2rem', marginBottom: 16, textAlign: 'center' }}>
              Showing {selectedType === 'movie' ? 'Movies' : 'TV Series'} in {selectedLanguage} of {selectedGenre}
            </h3>
            {filtered.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
                {filtered.map(item => (
                  <div key={item.id} style={{ background: '#181818', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px #0008', color: '#fff', marginBottom: 12 }}>
                    <img src={item.image?.startsWith('http') ? item.image : (item.image ? process.env.PUBLIC_URL + '/' + item.image : '')} alt={item.title} style={{ width: '100%', height: 220, objectFit: 'cover', borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
                    <div style={{ padding: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{item.title}</div>
                      <div style={{ color: '#4ecdc4', fontSize: '0.95rem', opacity: 0.85 }}>{item.genre} {item.year ? `• ${item.year}` : ''}</div>
                      <div style={{ marginTop: 10 }}>
                        <a href={item.Watch || '#'} target="_blank" rel="noopener noreferrer" style={{ background: '#b71c1c', color: '#fff', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, marginRight: 8 }}>Watch</a>
                        <a href={item.downloadLink || '#'} target="_blank" rel="noopener noreferrer" style={{ background: '#4ecdc4', color: '#111', padding: '8px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Download</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#aaa', textAlign: 'center', marginTop: 32 }}>No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryFilter;