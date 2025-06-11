import React from 'react';

function Terms() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
      <p>This website provides links to external movie content. By using this site, you agree to:</p>
      <ul className="list-disc ml-5 mt-2">
        <li>Only access legal and authorized content.</li>
        <li>Not hold us liable for third-party content.</li>
        <li>Comply with local laws and regulations.</li>
      </ul>
    </div>
  );
}

export default Terms;