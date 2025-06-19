import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import MovieCard from './components/MovieCard';
import movies from './data/movies.json';
import collections from './data/collections.json';
import tvSeries from './data/tv_series.json';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Categories from './components/Categories';
import CategoryFilter from './components/CategoryFilter';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';

// Utility function to get random items from an array
function getRandomItems(array, count) {
  return [...array]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, array.length));
}

// Ensure this is outside the App function (only once in the file)
function PopunderAdScript() {
  useEffect(() => {
    // The code below is correct for injecting the script in React:
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl26878341.profitableratecpm.com/b5/dd/ca/b5ddca4d221b451171c5701ef2fd6187.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
}

const categories = {
  languages: [
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Malayalam',
    'Kannada',
    'Bengali',
    'Marathi',
    'Gujarati',
    'Punjabi',
    'Bhojpuri',
    'Assamese',
    'Odia',
    'Urdu',
    'Mandarin',
    'Japanese',
    'French',
    'Spanish',
    'Korean',
    'German',
    'Cantonese',
    'Italian'
  ],
  genres: [
    'Adventure',
    'Action',
    'Drama',
    'Comedy',
    'Thriller/Suspense',
    'Horror',
    'Romantic Comedy',
    'Musical',
    'Black Comedy',
    'Documentary'
  ]
};

function getNavLabels() {
  return [
    { key: 'home', label: 'Home' },
    { key: 'movies', label: 'All Movies' },
    { key: 'tv', label: 'TV Series' },
    { key: 'collections', label: 'Epic Marathons' },
    { key: 'categories', label: 'Categories' },
    { key: 'about-us', label: 'Meet the Team' }
  ];
}

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showCollectionPopup, setShowCollectionPopup] = useState(false);
  const [popupMovies, setPopupMovies] = useState([]);
  const [popupTitle, setPopupTitle] = useState('');
  const [collectionVisited, setCollectionVisited] = useState({});
  const [activeTab, setActiveTab] = useState('home');
  const [tabTransition, setTabTransition] = useState('');
  const [randomMovies, setRandomMovies] = useState([]);
  const [randomSeries, setRandomSeries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('languages');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    movie.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    movie.language.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(debouncedQuery.toLowerCase())
  );
  const allMovies = filteredMovies.filter((item) => item.type === 'movie');

  const filteredByCategory = React.useMemo(() => {
    if (!selectedCategoryValue) return allMovies;
    if (selectedCategory === 'languages') {
      return allMovies.filter(movie =>
        movie.language &&
        movie.language.toLowerCase() === selectedCategoryValue.toLowerCase()
      );
    }
    if (selectedCategory === 'genres') {
      return allMovies.filter(movie =>
        movie.genre &&
        movie.genre.toLowerCase().includes(selectedCategoryValue.toLowerCase())
      );
    }
    return allMovies;
  }, [allMovies, selectedCategory, selectedCategoryValue]);

  useEffect(() => {
    if (randomMovies.length === 0 && randomSeries.length === 0) {
      const storedMovies = sessionStorage.getItem('randomMovies');
      const storedSeries = sessionStorage.getItem('randomSeries');

      if (storedMovies) {
        setRandomMovies(JSON.parse(storedMovies));
      } else {
        const newRandomMovies = getRandomItems(movies.filter(m => m.type === 'movie'), 20);
        setRandomMovies(newRandomMovies);
        sessionStorage.setItem('randomMovies', JSON.stringify(newRandomMovies));
      }

      if (storedSeries) {
        setRandomSeries(JSON.parse(storedSeries));
      } else {
        const newRandomSeries = getRandomItems(tvSeries, 20);
        setRandomSeries(newRandomSeries);
        sessionStorage.setItem('randomSeries', JSON.stringify(newRandomSeries));
      }
    }
  }, []);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setMobileNavOpen(false);
    const transitionTabs = async () => {
      setTabTransition('opacity-0 transform scale-95');
      await new Promise(resolve => setTimeout(resolve, 150));
      setActiveTab(tab);
      setTabTransition('opacity-0 transform scale-105');
      await new Promise(resolve => setTimeout(resolve, 50));
      setTabTransition('opacity-100 transform scale-100');
      if (tab === 'about-us') {
        navigate('/about-us');
      } else if (tab === 'home') {
        navigate('/');
      } else if (tab === 'movies') {
        navigate('/');
      } else if (tab === 'tv') {
        navigate('/');
      } else if (tab === 'collections') {
        navigate('/');
      } else if (tab === 'categories') {
        navigate('/categories');
      }
    };
    transitionTabs();
  };

  useEffect(() => {
    if (location.pathname === '/about-us') {
      setActiveTab('about-us');
    } else if (location.pathname === '/categories') {
      setActiveTab('categories');
    } else if (location.pathname === '/') {
      setActiveTab('home');
    }
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setDebouncedQuery(searchQuery);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'pass') {
      setIsLoggedIn(true);
      setIsModalOpen(false);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleModalToggle = (open) => {
    setIsModalOpen(open);
  };

  const externalSeriesLink = "https://www.profitableratecpm.com/y6n4w2y31?key=33ad407aa06609b96bbb176f958e14ad";

  const globalStyles = `
    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes sweep {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    .glass-bg {
      background: rgba(17,17,34,0.85);
      backdrop-filter: blur(12px);
      border-radius: 18px;
      border: 1.5px solid rgba(255,255,255,0.13);
      box-shadow: 0 4px 24px 0 rgba(78,205,196,0.08);
    }
    .gradient-text {
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientBG 8s ease infinite;
    }
    .sweep-anim {
      content: "";
      position: absolute;
      top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(78,205,196,0.13), transparent);
      z-index: 0;
      animation: sweep 2.5s linear infinite;
    }
    .glow-anim {
      content: "";
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      border-radius: 18px;
      box-shadow: 0 0 32px 0 #4ecdc4, 0 2px 8px 0 #ff6b6b;
      opacity: 0.08;
      pointer-events: none;
    }
    .tab-glow {
      box-shadow: 0 0 16px 4px #4ecdc4, 0 2px 8px 0 #ff6b6b;
      transition: box-shadow 0.3s, background 0.3s;
      background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 100%);
      color: #fff !important;
    }
    .tab-glow:hover, .tab-glow:focus {
      box-shadow: 0 0 32px 8px #4ecdc4, 0 2px 16px 0 #ff6b6b;
      background: linear-gradient(90deg, #4ecdc4 0%, #ff6b6b 100%);
      color: #fff !important;
    }
    .tab-hover-glow:hover, .tab-hover-glow:focus {
      box-shadow: 0 0 16px 4px #ff6b6b, 0 2px 8px 0 #4ecdc4;
      background: linear-gradient(90deg, #4ecdc4 0%, #ff6b6b 100%);
      color: #fff !important;
      transition: box-shadow 0.3s, background 0.3s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    .glow-text {
      text-shadow: 0 0 8px rgba(78,205,196,0.7), 0 0 16px rgba(78,205,196,0.5);
      transition: text-shadow 0.3s;
    }
    .glow-text:hover {
      text-shadow: 0 0 12px rgba(78,205,196,0.9), 0 0 24px rgba(78,205,196,0.7);
    }
    .glow-btn {
      position: relative;
      overflow: hidden;
      transition: color 0.3s;
    }
    .glow-btn:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300%;
      height: 300%;
      background: rgba(78,205,196,0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.6s, opacity 0.6s;
      opacity: 0.7;
      z-index: 0;
    }
    .glow-btn:hover:before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
    .glow-btn:hover {
      color: #fff;
    }
  `;

  const [hoveredTab, setHoveredTab] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const lower = searchQuery.toLowerCase();
      const movieSuggestions = movies.filter(m => m.title.toLowerCase().includes(lower)).map(m => m.title);
      const collectionSuggestions = collections.filter(c => c.title.toLowerCase().includes(lower)).map(c => c.title);
      setSuggestions([...movieSuggestions, ...collectionSuggestions].slice(0, 7));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  function insertAdInGrid(items, adElement, columns = 5) {
    const mid = Math.floor(items.length / 2);
    const result = [...items];
    result.splice(mid, 0, adElement);
    return result;
  }

  return (
    <React.Fragment>
      <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        animation: 'gradientBG 8s ease infinite',
        backgroundSize: '200% 200%'
      }}>
      <style>{globalStyles}</style>
      <PopunderAdScript />
      <header className="glass-bg p-4 flex flex-wrap items-center justify-between gap-4 border-b border-red-600 fixed top-0 left-0 w-full z-50"
        style={{
          borderRadius: '0 0 22px 22px',
          marginBottom: 8,
          border: '1.5px solid rgba(255,255,255,0.13)',
          zIndex: 2147483647,
          background: 'rgba(17,17,34,0.97)',
          boxShadow: '0 8px 32px 0 rgba(78,205,196,0.13)'
        }}>
        <div className="gradient-text text-2xl font-bold">STREAMFREE</div>
        <button
          className="sm:hidden flex items-center px-3 py-2 border rounded text-white border-gray-400 focus:outline-none"
          onClick={() => setMobileNavOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {mobileNavOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40 sm:hidden" onClick={() => setMobileNavOpen(false)}></div>
        )}
        <nav
          className={
            `sm:flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto
            bg-black sm:bg-transparent fixed sm:static top-20 left-0 right-0 z-50 sm:z-auto p-4 sm:p-0 border-b border-gray-700 sm:border-0 transition-all duration-200
            ${mobileNavOpen ? 'flex' : 'hidden'} sm:flex`
          }
          style={{
            ...(mobileNavOpen ? { boxShadow: '0 8px 32px 0 rgba(78,205,196,0.13)' } : {}),
            borderRadius: mobileNavOpen ? '0 0 18px 18px' : undefined
          }}
        >
          {getNavLabels().map(tab => (
            <button
              key={tab.key}
              onClick={() => { handleTabChange(tab.key); setMobileNavOpen(false); }}
              onMouseEnter={() => setHoveredTab(tab.key)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-4 py-2 font-medium rounded transition-all duration-200
                ${
                  activeTab === tab.key
                    ? 'tab-glow'
                    : hoveredTab === tab.key
                      ? 'tab-hover-glow'
                      : 'text-white hover:text-red-400'
                }
                bg-transparent
                `}
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                position: 'relative',
                transform: hoveredTab === tab.key
                  ? 'scale(1.08)'
                  : activeTab === tab.key
                    ? 'scale(1.04)'
                    : 'scale(1)',
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.3s, background 0.3s'
              }}
            >
              <span
                className={
                  activeTab === tab.key
                    ? 'gradient-text'
                    : hoveredTab === tab.key
                      ? 'gradient-text'
                      : ''
                }
                style={{
                  ...(tab.key === 'home'
                    ? {
                        background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b)',
                        backgroundSize: '200% 200%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradientBG 8s ease infinite',
                        color: 'unset'
                      }
                    : {})
                }}
              >
                {tab.label}
              </span>
              {hoveredTab === tab.key && activeTab !== tab.key && (
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    boxShadow: '0 0 16px 2px #4ecdc4, 0 2px 8px 0 #ff6b6b',
                    opacity: 0.18,
                    transition: 'opacity 0.2s'
                  }}
                />
              )}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-4" style={{ position: 'relative', zIndex: 99999 }}>
          <div className="flex items-center w-full" style={{ position: 'relative', zIndex: 99999 }}>
            <input
              type="text"
              placeholder="Search movies, TV series, genres..."
              className="p-3 bg-gray-800 rounded-l-lg text-white border-l border-y border-dark-blue focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 md:w-80 transition-all duration-200 shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearchClick(); }}
              aria-label="Search movies, TV series, genres"
              autoComplete="off"
            />
            <button
              onClick={handleSearchClick}
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-blue-600 hover:to-red-600 text-white p-3 rounded-r-lg border-r border-y border-red-700 font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
              <span className="hidden md:inline">Search</span>
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-gray-900 border border-gray-700 rounded-b max-h-56 overflow-y-auto shadow-2xl"
                  style={{ zIndex: 2147483647 }}>
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-red-600 cursor-pointer text-white"
                    onMouseDown={() => {
                      setSearchQuery(s);
                      setShowSuggestions(false);
                      setDebouncedQuery(s);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-dark-blue hover:bg-blue-800 text-white p-2 rounded">
              Logout
            </button>
          ) : (
            <button onClick={() => handleModalToggle(true)} className="bg-dark-blue hover:bg-blue-800 text-white p-2 rounded">
              Sign In
            </button>
          )}
        </div>
      </header>
      <div style={{ height: 110 }} />
      <main className="relative">
        <Routes>
          <Route path="/" element={
            <div>
              {activeTab === 'home' && (
                <HeroSection />
              )}
              <div className="p-4">
                {activeTab === 'home' && (
                  <div
                    className="glass-bg text-center mb-6 border border-red-600"
                    style={{
                      minHeight: '250px',
                      margin: '0 auto',
                      position: 'relative',
                      zIndex: 1,
                      borderRadius: 18
                    }}
                  >
                    <div id="container-5eb29bb96ecbe0057ffb3107b892cd13"></div>
                  </div>
                )}
                <div 
                  className={`transition-all duration-300 ease-in-out ${tabTransition}`}
                  style={{ minHeight: '200px' }}
                >
                  {activeTab === 'home' && (
                    <>
                      <h2
                        className="mb-4 mt-8 fade-in text-center text-2xl md:text-3xl lg:text-4xl"
                        style={{
                          color: '#ff6b6b',
                          fontFamily: 'Montserrat, Arial, sans-serif',
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                          textShadow: '0 0 18px #4ecdc4, 0 2px 12px #ff6b6b',
                        }}
                      >
                        Movies
                      </h2>
                      <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[420px]"
                      >
                        {randomMovies.map((movie) => (
                          <MovieCard
                            key={movie.id}
                            title={movie.title}
                            description={movie.description}
                            watchLink={movie.Watch}
                            downloadLink={movie.downloadLink}
                            image={movie.image}
                            onWatch={() => window.location.href = movie.Watch || '#'}
                            onDownload={() => {
                              const zedgeKey = `zedge_redirect_${movie.id}`;
                              if (!sessionStorage.getItem(zedgeKey)) {
                                sessionStorage.setItem(zedgeKey, '1');
                                window.location.href = "https://zedge.me/arthouse";
                              } else {
                                window.location.href = movie.downloadLink;
                              }
                            }}
                            style={{ aspectRatio: '9/16' }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-center mt-6 mb-6">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 glow-btn"
                          onClick={() => {
                            window.open("https://www.profitableratecpm.com/jpev5gs7r?key=e4baaef49685d7babd7516da920c16d9", "_blank", "noopener,noreferrer");
                            setTimeout(() => handleTabChange('movies'), 500);
                          }}
                        >
                          See more
                        </button>
                      </div>
                      <h2
                        className="mb-4 mt-12 fade-in"
                        style={{
                          textAlign: 'center',
                          fontSize: '2.2rem',
                          color: '#ffe66d',
                          fontFamily: 'Montserrat, Arial, sans-serif',
                          fontWeight: 900,
                          letterSpacing: '-0.01em',
                          textShadow: '0 0 18px #4ecdc4, 0 2px 12px #ff6b6b',
                        }}
                      >
                        Wallpapers (9:16)
                      </h2>
                      <div className="w-full flex justify-center">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-[900px]">
                          {[
                            '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg',
                            '6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'
                          ].map((img, idx) => (
                            <div
                              key={img}
                              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform aspect-[9/16] w-full relative shadow-lg"
                              onClick={() => window.open('https://www.zedge.net/profile/c5b21860-e8c6-47e8-a422-f8be27530383', '_blank', 'noopener,noreferrer')}
                            >
                              <img
                                src={process.env.PUBLIC_URL + '/assets/Movies/' + img}
                                alt={`Wallpaper ${idx+1}`}
                                className="w-full h-full object-cover aspect-[9/16] block"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <h1
                        className="mb-4 mt-8 fade-in text-center text-2xl md:text-3xl lg:text-4xl"
                        style={{
                          color: '#4ecdc4',
                          fontFamily: 'Montserrat, Arial, sans-serif',
                          fontWeight: 800,
                          letterSpacing: '-0.01em',
                          textShadow: '0 0 12px #ff6b6b, 0 2px 8px #4ecdc4',
                        }}
                      >
                        TV Series
                      </h1>
                      <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[420px]"
                      >
                        {randomSeries.map((series) => (
                          <div
                            key={series.id}
                            className="bg-gray-900 p-2 rounded-lg m-2 w-full transform transition duration-300 hover:scale-105 glow-card fade-in"
                          >
                            <img src={process.env.PUBLIC_URL + series.image} alt={series.title} className="w-full h-48 object-cover rounded" />
                            <h3 className="text-lg font-bold mt-2 text-red-600 glow-text">{series.title}</h3>
                            <p className="text-sm text-gray-400 mt-2">{series.description}</p>
                            <div className="mt-4 space-x-2">
                              <button
                                onClick={() => {
                                  setPopupTitle(series.title + " - Seasons");
                                  setPopupMovies(series.seasons || []);
                                  setShowCollectionPopup(true);
                                }}
                                className="bg-red-600 glow-btn hover:bg-red-700 text-white p-2 rounded inline-block transition duration-300 active:scale-95"
                              >
                                View Episodes
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-6 mb-6">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 glow-btn"
                          onClick={() => {
                            window.open("https://www.profitableratecpm.com/jpev5gs7r?key=e4baaef49685d7babd7516da920c16d9", "_blank", "noopener,noreferrer");
                            setTimeout(() => handleTabChange('tv'), 500);
                          }}
                        >
                          See more
                        </button>
                      </div>
                    </>
                  )}
                  {activeTab === 'movies' && (
                    <>
                      <h2 className="text-2xl font-bold mb-4 mt-8 text-red-600">Popular Movies</h2>
                      <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[420px]"
                      >
                        {insertAdInGrid(
                          allMovies.map((movie) => (
                            <MovieCard
                              key={movie.id}
                              title={movie.title}
                              description={movie.description}
                              watchLink={movie.Watch}
                              downloadLink={movie.downloadLink}
                              image={movie.image}
                              onWatch={() => window.location.href = movie.Watch || '#'}
                              onDownload={() => {
                                const zedgeKey = `zedge_redirect_${movie.id}`;
                                if (!sessionStorage.getItem(zedgeKey)) {
                                  sessionStorage.setItem(zedgeKey, '1');
                                  window.location.href = "https://zedge.me/arthouse";
                                } else {
                                  window.location.href = movie.downloadLink;
                                }
                              }}
                              style={{ aspectRatio: '9/16' }}
                            />
                          )),
                          <div key="ad-movies" className="glass-bg text-center flex items-center justify-center min-h-[250px] col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 border-[1.5px] border-[#ff6b6b] rounded-[18px]">
                            <div id="container-5eb29bb96ecbe0057ffb3107b892cd13"></div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {activeTab === 'tv' && (
                    <>
                      <h2 className="text-2xl font-bold mb-4 mt-8 text-red-600">TV Series</h2>
                      <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[420px]"
                      >
                        {insertAdInGrid(
                          tvSeries.map((series) => (
                            <div
                              key={series.id}
                              className="bg-gray-900 p-2 rounded-lg m-2 w-full transform transition duration-300 hover:scale-105"
                            >
                              <img src={process.env.PUBLIC_URL + series.image} alt={series.title} className="w-full h-48 object-cover rounded" />
                              <h3 className="text-lg font-bold mt-2 text-red-600">{series.title}</h3>
                              <p className="text-sm text-gray-400 mt-2">{series.description}</p>
                              <div className="mt-4 space-x-2">
                                <button
                                  onClick={() => {
                                    setPopupTitle(series.title + " - Seasons");
                                    setPopupMovies(series.seasons || []);
                                    setShowCollectionPopup(true);
                                  }}
                                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded inline-block transition duration-300 active:scale-95"
                                >
                                  View Episodes
                                </button>
                              </div>
                            </div>
                          )),
                          <div key="ad-tv" className="glass-bg text-center flex items-center justify-center min-h-[250px] col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 border-[1.5px] border-[#ff6b6b] rounded-[18px]">
                            <div id="container-5eb29bb96ecbe0057ffb3107b892cd13"></div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {activeTab === 'collections' && (
                    <>
                      <h2 className="text-2xl font-bold mb-4 mt-8 text-red-600">Popular Movie Collections</h2>
                      <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[420px]"
                      >
                        {insertAdInGrid(
                          collections.map((collection) => (
                            <div
                              key={collection.id}
                              className="bg-gray-900 p-2 rounded-lg m-2 w-full transform transition duration-300 hover:scale-105"
                            >
                              <img src={process.env.PUBLIC_URL + collection.image} alt={collection.title} className="w-full h-48 object-cover rounded" />
                              <h3 className="text-lg font-bold mt-2 text-red-600">{collection.title}</h3>
                              <p className="text-sm text-gray-400 mt-2">{collection.description}</p>
                              <div className="mt-4 space-x-2">
                                <button
                                  onClick={() => {
                                    if (!collectionVisited[collection.id]) {
                                      window.open(externalSeriesLink, "_blank");
                                      setCollectionVisited(prev => ({
                                        ...prev,
                                        [collection.id]: true
                                      }));
                                    } else {
                                      setPopupTitle(collection.title);
                                      setPopupMovies(collection.movies || []);
                                      setShowCollectionPopup(true);
                                    }
                                  }}
                                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded inline-block transition duration-300 active:scale-95"
                                >
                                  Watch Series
                                </button>
                              </div>
                            </div>
                          )),
                          <div key="ad-collections" className="glass-bg text-center flex items-center justify-center min-h-[250px] col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 border-[1.5px] border-[#ff6b6b] rounded-[18px]">
                            <div id="container-5eb29bb96ecbe0057ffb3107b892cd13"></div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {showCollectionPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" style={{alignItems: 'flex-start'}}>
                      <div
                        className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl w-full max-w-5xl relative overflow-y-auto p-0 mt-24"
                        style={{ maxHeight: '80vh' }}
                      >
                        {/* Close Button */}
                        <button
                          onClick={() => setShowCollectionPopup(false)}
                          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 text-3xl font-bold transition-colors z-10"
                          aria-label="Close"
                          style={{ lineHeight: 1 }}
                        >
                          ×
                        </button>
                        {/* TV Series Name */}
                        <div className="px-4 sm:px-8 pt-8 pb-2 text-center">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg mb-2" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
                            {popupTitle.replace(/ - Seasons$/, '')}
                          </h2>
                          <div className="h-1 w-16 mx-auto bg-gradient-to-r from-red-500 via-yellow-400 to-blue-400 rounded-full mb-4" />
                        </div>
                        {/* Responsive Seasons Grid */}
                        <div
                          className="grid gap-0 border-t border-white/30"
                          style={{
                            minHeight: 320,
                            gridTemplateColumns: `repeat(${Math.max(1, Math.min(popupMovies.length, 4))}, minmax(0, 1fr))`
                          }}
                        >
                          {popupMovies.map((season, colIdx) => (
                            <div
                              key={colIdx}
                              className="flex flex-col border-r border-white/20 last:border-r-0 bg-white/10 hover:bg-white/20 transition-colors min-w-0"
                              style={{ width: '100%' }}
                            >
                              <div className="border-b border-white/20 text-center py-4 font-semibold text-base sm:text-lg text-blue-200 tracking-wider bg-gradient-to-r from-blue-900/60 to-blue-700/40 rounded-t-2xl" style={{fontFamily: 'Montserrat, Arial, sans-serif'}}>
                                SEASON {season.season}
                              </div>
                              <div className="flex-1 px-2 sm:px-3 py-4 overflow-y-auto">
                                {season && season.episodes && season.episodes.length > 0 ? (
                                  <ul className="space-y-2">
                                    {season.episodes.map((ep, eidx) => (
                                      <li key={eidx}>
                                        <a
                                          href={ep.downloadLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="block px-2 sm:px-3 py-2 rounded-lg bg-white/20 hover:bg-gradient-to-r hover:from-red-400/80 hover:to-blue-400/80 text-white font-medium shadow-sm transition-all duration-200 text-xs sm:text-sm md:text-base"
                                          style={{textShadow: '0 1px 8px #0008'}}
                                        >
                                          <span className="font-bold text-yellow-300">Ep {ep.episode}:</span> {ep.title}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className="text-gray-300 text-xs text-center mt-4">No episodes</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Responsive padding for mobile */}
                        <div className="pb-8" />
                        <style>{`
                          @media (max-width: 640px) {
                            .popup-seasons-grid {
                              display: flex !important;
                              flex-direction: column !important;
                              gap: 0 !important;
                            }
                            .popup-seasons-grid > div {
                              border-right: none !important;
                              border-bottom: 1px solid rgba(255,255,255,0.2) !important;
                              border-radius: 0 !important;
                            }
                            .popup-seasons-grid > div:last-child {
                              border-bottom: none !important;
                            }
                          }
                        `}</style>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          } />
          <Route path="/about-us" element={
            <div className="glass-bg" style={{ borderRadius: 22, margin: 16 }}>
              <AboutUs />
            </div>
          } />
          <Route path="/terms" element={
            <div className="glass-bg" style={{ borderRadius: 22, margin: 16 }}>
              <Terms />
            </div>
          } />
          <Route path="/privacy" element={
            <div className="glass-bg" style={{ borderRadius: 22, margin: 16 }}>
              <Privacy />
            </div>
          } />
          <Route path="/categories" element={
            <div className="glass-bg" style={{ borderRadius: 22, margin: 16 }}>
              <Categories />
            </div>
          } />
        </Routes>
      </main>
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg max-w-md border border-red-600">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded text-white border border-dark-blue"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded text-white border border-dark-blue"
                required
              />
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded w-full transform transition duration-300 hover:scale-105 active:scale-95"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => handleModalToggle(false)}
              className="mt-2 bg-dark-blue hover:bg-blue-800 text-white p-2 rounded w-full transform transition duration-300 hover:scale-105 active:scale-95"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )}
      </div>
    </React.Fragment>
  );
}

function App() {
  return (
    <Router basename="/streamfree">
      <AppContent />
    </Router>
  );
}

export default App;