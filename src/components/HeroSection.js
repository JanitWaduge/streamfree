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
    <div
      className="relative text-white fade-in"
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '60vh',
        height: 'auto',
        overflow: 'hidden',
        fontFamily: 'Montserrat, Arial, sans-serif',
        marginBottom: 0,
        backgroundColor: '#000',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div className="absolute inset-0 bg-black w-full h-full" />
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
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'rgba(0,0,0,0.55)',
                zIndex: 2
              }}
            />
            <img
              src={blockbuster.image}
              alt={blockbuster.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 1,
                opacity: 0.5,
                pointerEvents: 'none',
                userSelect: 'none',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                imageRendering: 'crisp-edges'
              }}
              draggable={false}
            />
            <div className="relative z-10 text-center py-10 px-3 sm:py-14 sm:px-6 md:px-16">
              <span className="hero-badge text-xs sm:text-sm md:text-base mb-2">🔥 Trending Now</span>
              <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 leading-tight">{heading}</h1>
              <div className="hero-subtitle text-base sm:text-lg md:text-xl mb-4 sm:mb-6">Unlimited HD Streaming. No Sign Up. No Limits.</div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 glow-text">{blockbuster.title}</h2>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6" style={{ textShadow: '0 0 8px #000', color: '#ffe66d' }}>{blockbuster.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-xl mx-auto">
                <a
                  href="https://www.profitableratecpm.com/y6n4w2y31?key=33ad407aa06609b96bbb176f958e14ad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 glow-btn hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded w-full sm:w-auto text-base sm:text-lg font-semibold transform transition duration-300 hover:scale-105 active:scale-95"
                >
                  {cta1}
                </a>
                <button
                  onClick={openModal}
                  className="bg-dark-blue glow-btn hover:bg-blue-800 border border-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded w-full sm:w-auto text-base sm:text-lg font-semibold transform transition duration-300 hover:scale-105 active:scale-95"
                >
                  {cta2}
                </button>
              </div>
              <div 
                className="scroll-indicator mt-4 sm:mt-8"
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-2">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-xs sm:max-w-md border border-red-600">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 text-red-600">{currentBlockbuster.title}</h2>
            <p className="text-xs sm:text-base"><strong>Release Year:</strong> {currentBlockbuster.releaseYear}</p>
            <p className="text-xs sm:text-base"><strong>Cast:</strong> {currentBlockbuster.cast}</p>
            <p className="text-xs sm:text-base"><strong>Synopsis:</strong> {currentBlockbuster.synopsis}</p>
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