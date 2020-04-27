import React from 'react';
import LoginButton from './layouts/LoginButton';

export default function Main() {
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
