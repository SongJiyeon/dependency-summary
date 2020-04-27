import React from 'react';
import path from 'path';
import electron from 'electron';

const { dialog } = electron.remote;

export default function LocalPath() {
  
  async function handleClick() {
    const stdout = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    console.log(stdout);
  }

  return (
    <div className="local-path-container">
      <div className="dashboard-contents-title">
        LocalPath
      </div>
      <div>
        <input type="file" className="url-input" />
        <button onClick={handleClick}>LOAD</button>
      </div>
    </div>
  );
}
