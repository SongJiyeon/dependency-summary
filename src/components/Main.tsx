import React, { useEffect } from 'react';
import electron from 'electron';
import Store from 'electron-store';
import fs from 'fs';
import { execSync } from 'child_process';

import Loading from './layouts/Loading';
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
        <Loading />
      </div>
      <div className="intro-container">
        <div className="intro-box">
          <img src="intro.png" alt=""/>
        </div>
      </div>
    </div>
  );
}
