import React from 'react';

function MovieCard({ title, description, watchLink, downloadLink, image, onWatch, onDownload }) {
  // Ensure image path is correct (handles both absolute and relative)
  const imgSrc = image?.startsWith('http') ? image : (image ? process.env.PUBLIC_URL + '/' + image : '');

  // Only use B copy
  const watch = 'Play Now (HD)';
  const download = 'Download Now';
  const tooltip = '🚀 Launching your movie…';

  return (
    <div className="bg-gray-900 p-4 rounded-xl w-80 h-[420px] flex flex-col justify-between transform transition duration-300 hover:scale-105 glow-card fade-in min-h-0 overflow-hidden group">
      {/* Show a fallback if image is missing */}
      <div className="relative w-full h-60">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-60 object-cover rounded" />
        ) : (
          <div className="w-full h-60 flex items-center justify-center bg-gray-800 rounded text-4xl text-gray-500">🎬</div>
        )}
        {/* Description overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center text-white text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
          <span className="text-base">{description}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mt-2 text-red-600 glow-text">{title}</h3>
      {/* Remove description from below image to avoid duplicate */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onWatch}
          className="bg-red-600 glow-btn hover:bg-red-700 text-white p-3 rounded inline-block transition duration-300 active:scale-95 group flex-1"
          title={tooltip}
          onMouseEnter={e => {
            e.currentTarget.classList.add('animate-pulse');
          }}
          onMouseLeave={e => {
            e.currentTarget.classList.remove('animate-pulse');
          }}
        >
          {watch}
        </button>
        <button
          onClick={onDownload}
          className="bg-dark-blue glow-btn hover:bg-blue-800 text-white p-3 rounded inline-block transition duration-300 active:scale-95 group flex-1"
          title={tooltip}
          onMouseEnter={e => {
            e.currentTarget.classList.add('animate-pulse');
          }}
          onMouseLeave={e => {
            e.currentTarget.classList.remove('animate-pulse');
          }}
        >
          {download}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;