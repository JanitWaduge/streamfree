import React from 'react';

const aboutUsStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460); color: #ffffff; line-height: 1.6; min-height: 100vh; }
  .container { max-width: 900px; margin: 0 auto; padding: 20px; }
  .header { text-align: center; padding: 50px 0 30px 0; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1); background-size: 300% 300%; animation: gradientShift 8s ease infinite; margin-bottom: 40px; border-radius: 20px; }
  @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  .header h1 { font-size: 2.8rem; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
  .header p { font-size: 1.1rem; opacity: 0.9; }
  .content-section { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(8px); border-radius: 16px; padding: 32px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.13); transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .content-section:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18); }
  .content-section h2 { font-size: 1.6rem; margin-bottom: 16px; color: #4ecdc4; display: flex; align-items: center; gap: 12px; }
  .icon { width: 32px; height: 32px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
  .content-section p { font-size: 1rem; margin-bottom: 12px; color: #e0e0e0; }
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin: 24px 0; }
  .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; text-align: center; transition: transform 0.3s ease; }
  .stat-card:hover { transform: scale(1.04); }
  .stat-number { font-size: 1.7rem; font-weight: bold; margin-bottom: 6px; }
  .stat-label { font-size: 0.95rem; opacity: 0.9; }
  .values-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 14px; }
  .value-item { background: rgba(255, 255, 255, 0.07); padding: 14px; border-radius: 8px; border-left: 4px solid #4ecdc4; }
  .value-item h4 { color: #4ecdc4; margin-bottom: 7px; font-size: 1.08rem; }
  @media (max-width: 768px) {
    .header h1 { font-size: 2rem; }
    .content-section { padding: 16px; }
    .content-section h2 { font-size: 1.2rem; }
  }
`;

function AboutUs() {
  // Only use B features
  const features = [
    { title: 'Your VIP Pass to Unlimited Movies & Series', desc: 'No sign-up, no subscription, no hidden costs. Just click and watch!' },
    { title: 'Handpicked for You: Discover Hidden Gems', desc: 'Enjoy movies and series in English, Hindi, Tamil, Telugu, Korean, Japanese, and many more languages.' },
    { title: 'Seamless Transitions, Lightning-Fast Loads', desc: 'Browse by language, genre, or search for your favorite title with ease.' },
    { title: 'Grab & Go: Instant Downloads, No Waiting', desc: 'Stream instantly or download to watch offline, with just one click.' }
  ];

  return (
    <div className="aboutus-root">
      <style>{aboutUsStyles}</style>
      <div className="container">
        <div className="header">
          <h1>🎬 STREAMFREE</h1>
          <p>Your Free Gateway to Movies & TV Series</p>
        </div>
        <div className="content-section">
          <h2><span className="icon">🌐</span>About STREAMFREE</h2>
          <p>
            Welcome to <b>STREAMFREE</b> – your one-stop destination for discovering and enjoying movies and TV series from around the world, absolutely free. Our mission is to make entertainment accessible to everyone, everywhere, without the hassle of subscriptions or hidden fees.
          </p>
          <p>
            We curate a vast collection of movies and TV shows in multiple languages and genres, so you can always find something to watch, no matter your taste or mood.
          </p>
        </div>
        <div className="content-section">
          <h2><span className="icon">🎯</span>Our Mission</h2>
          <p>
            To provide a seamless, ad-supported streaming experience for movie lovers globally. We believe in open access to entertainment and strive to keep our platform simple, fast, and user-friendly.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Movies & Series</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">20+</div>
              <div className="stat-label">Languages</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Genres</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Free</div>
              <div className="stat-label">No Subscription</div>
            </div>
          </div>
        </div>
        <div className="content-section">
          <h2><span className="icon">⭐</span>Why Choose Us?</h2>
          <div className="values-list">
            {features.map((f, i) => (
              <div className="value-item" key={i}>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="content-section">
          <h2><span className="icon">🔒</span>Our Commitment</h2>
          <p>
            We are committed to providing a safe and enjoyable streaming experience. All content is curated from publicly available sources and we respect copyright owners. If you are a copyright holder and wish to remove content, please contact us.
          </p>
          <p>
            Thank you for choosing <b>STREAMFREE</b>. Enjoy unlimited entertainment, anytime, anywhere!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;