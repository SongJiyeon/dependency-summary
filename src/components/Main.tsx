import React, { useEffect } from 'react';
import electron from 'electron';
import Store from 'electron-store';
import { execSync } from 'child_process';

import LoginButton from './layouts/LoginButton';

const store = new Store();
const { app } = electron.remote;

export default function Main() {
  useEffect(() => {
    if (!store.get('default-path')) {
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
