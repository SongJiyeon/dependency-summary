import React from 'react';
import Header from './layouts/Header';
import LoginButton from './layouts/LoginButton';

export default function Main() {
  return (
    <div>
      <Header />
      <div className="login-container">
        <LoginButton />
      </div>
      <div className="intro-container">
        <h2>this is introduction</h2>
      </div>
    </div>
  );
}
