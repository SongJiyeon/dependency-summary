import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'

import LogoutButton from '../layouts/LogoutButton';
import useLogin from '../../hooks/useLogin';
import useRenderMode from '../../hooks/useRenderMode';

export default function Header() {
  const { loggedIn } = useLogin();
  const { onClickRenderMode } = useRenderMode();

  return (
    <div className="header-container">
      <div className="header-title">dependency-summary</div>
      <div className="header-padding"></div>
      {loggedIn.status && (
      <>
        <button className="logout-button" onClick={() => onClickRenderMode('userSettings')}>
          <FontAwesomeIcon icon={faCog} size="lg" /> SETTINGS
        </button>
        <LogoutButton />
      </>
      )}
    </div>
  );
}
