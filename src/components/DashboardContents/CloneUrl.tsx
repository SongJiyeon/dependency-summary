import React from 'react';

export default function CloneUrl() {
  return (
    <div className="clone-url-container">
      <div className="dashboard-contents-title">
        Clone Url
      </div>
      <div>
        <input type="text" className="url-input"/>
        <button>LOAD</button>
      </div>
    </div>
  );
}
