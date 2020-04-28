import React from 'react';
import LogoutButton from '../layouts/LogoutButton';
import useLogin from '../../hooks/useLogin';

export default function Header() {
  const { loggedIn } = useLogin();

  return (
    <div className="header-container">
      <div className="header-title">dependency-summary</div>
      <div className="header-padding"></div>
      {loggedIn.status && <LogoutButton />}
    </div>
  );
}
