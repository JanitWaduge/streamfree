import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import blockbusters from '../data/blockbusters.json';

function HeroSection() {
  const [currentBlockbuster, setCurrentBlockbuster] = useState(blockbusters[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentBlockbuster(blockbusters[0]);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (index) => setCurrentBlockbuster(blockbusters[index])
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Hero section main heading and CTAs
  const heading = 'Dive Into Cinematic Worlds: Adaptive Bitrate, Zero Waiting';
  const cta1 = 'Stream the Action Now';
  const cta2 = 'Get Exclusive Insights';

  // Inline SVG for chevron down
  const ChevronDownIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  return (
    // Hero Section: Adjust minHeight and height below to control the hero area size
    <div
      className="relative text-white fade-in"
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '60vh', // Reduced from 90vh to 60vh
        height: 'auto',    // Let content determine height
        overflow: 'hidden',
        fontFamily: 'Montserrat, Arial, sans-serif',
        marginBottom: 0,
        backgroundColor: '#000', // Add black background to prevent any transparency
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="absolute inset-0 bg-black w-full h-full" /> {/* Extra black layer to prevent bleed-through */}
      <Slider {...settings}>
        {blockbusters.map((blockbuster) => (
          <div key={blockbuster.id} className="relative" style={{ overflow: 'hidden' }}>
            {/* Background overlay */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 animate-pulse"
              style={{
                backgroundImage: `url(${blockbuster.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                filter: 'blur(2px) brightness(0.7)'
              }}
            />
            {/* Black overlay for eye-catching banner text */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'rgba(0,0,0,0.55)', // 55% black overlay
                zIndex: 2
              }}
            />
            {/* Main sharp image */}
            <img
              src={blockbuster.image}
              alt={blockbuster.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 1,
                opacity: 0.5, // Reduced from 0.85 to 0.5 for lower opacity
                pointerEvents: 'none',
                userSelect: 'none',
                width: '100%',
                height: '100%',
                objectFit: 'cover', // 'cover' fills the container
                objectPosition: 'center', // Change to 'top', 'bottom', etc. to focus on a different part
                imageRendering: 'crisp-edges' // Try 'auto', 'crisp-edges', or 'pixelated'
              }}
              draggable={false}
            />
            {/* Hero content */}
            <div className="relative z-10 text-center py-16 px-6 md:px-16">
              <span className="hero-badge">🔥 Trending Now</span>
              <h1 className="hero-heading text-4xl md:text-5xl mb-2">{heading}</h1>
              <div className="hero-subtitle text-xl mb-6">Unlimited HD Streaming. No Sign Up. No Limits.</div>
              <h2 className="text-2xl font-semibold mb-2 glow-text">{blockbuster.title}</h2>
              <p className="text-lg mb-6" style={{ textShadow: '0 0 8px #000', color: '#ffe66d' }}>{blockbuster.description}</p>
              <div className="space-x-4 flex justify-center">
                <a
                  href="https://www.profitableratecpm.com/y6n4w2y31?key=33ad407aa06609b96bbb176f958e14ad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 glow-btn hover:bg-red-700 text-white p-3 rounded transform transition duration-300 hover:scale-105 active:scale-95"
                >
                  {cta1}
                </a>
                <button
                  onClick={openModal}
                  className="bg-dark-blue glow-btn hover:bg-blue-800 border border-red-600 text-white p-3 rounded transform transition duration-300 hover:scale-105 active:scale-95"
                >
                  {cta2}
                </button>
              </div>
              <div 
                className="scroll-indicator"
                onClick={scrollToContent}
                role="button"
                aria-label="Scroll to content"
              >
                <ChevronDownIcon />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md border border-red-600">
            <h2 className="text-2xl font-bold mb-4 text-red-600">{currentBlockbuster.title}</h2>
            <p><strong>Release Year:</strong> {currentBlockbuster.releaseYear}</p>
            <p><strong>Cast:</strong> {currentBlockbuster.cast}</p>
            <p><strong>Synopsis:</strong> {currentBlockbuster.synopsis}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-dark-blue hover:bg-blue-800 text-white p-2 rounded w-full transform transition duration-300 hover:scale-105 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroSection;