import React, { useEffect } from 'react';
import electron from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import { execSync } from 'child_process';

import LoginButton from './layouts/LoginButton';

const store = new Store();
const { app } = electron.remote;

export default function Main() {
  useEffect(() => {
    if (!fs.existsSync(app.getPath('documents') + '/.ds')) {
      execSync('mkdir .ds', { cwd: app.getPath('documents') });
      store.set('default-path', app.getPath('documents') + '/.ds');
    }
  }, []);

  return (
    <div className="main-container">
      <div className="login-container">
        <LoginButton />
      </div>
      <div className="intro-container">
        <h2>this is introduction</h2>
      </div>
    </div>
  );
}
