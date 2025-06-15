import React from 'react';

function Privacy() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>We respect your privacy. This site:</p>
      <ul className="list-disc ml-5 mt-2">
        <li>Does not collect personal data.</li>
        <li>Uses cookies for basic functionality only.</li>
        <li>Does not share user information with third parties.</li>
      </ul>
    </div>
  );
}

export default Privacy;