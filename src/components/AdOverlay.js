import React, { useState, useEffect } from 'react';

function App() {
  const [showAd, setShowAd] = useState(true);

  const handleContinue = () => {
    setShowAd(false);
  };

  return (
    <div className="App">
      {showAd && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-4 rounded-lg border border-red-600 max-w-md">
            <p className="text-gray-400">Advertisement</p>
            <button
              onClick={handleContinue}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded w-full transform transition duration-300 hover:scale-105 active:scale-95"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="p-4">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p>Your main content goes here...</p>
        <h2 className="text-xl font-semibold mt-4">Wallpapers (9:16)</h2>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-5 gap-4">
            {/* ...map over images... */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;