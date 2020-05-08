import React, { useEffect } from 'react';
import electron from 'electron';
import Store from 'electron-store';

import Loading from './layouts/Loading';
import LoginButton from './layouts/LoginButton';

const store = new Store();
const { setDefaultPath } = electron.remote.require('./utils');

export default function Main() {
  useEffect(() => {
    setDefaultPath() && store.set('default-path', setDefaultPath());
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
