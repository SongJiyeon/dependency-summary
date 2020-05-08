import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import * as firebase from "firebase/app";
import "firebase/auth";

import useLogin from '../../hooks/useLogin';

function LogoutButton() {
  const { onLogin } = useLogin();

  function handleLogout(): void {
    firebase.auth().signOut().then(function() {
      alert('logout');
      onLogin(false, '');
    }).catch(function(error) {
      console.log(error);
    });
  };

  return (
    <div className="logout-button-container">
      <button className="logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" /> LOGOUT
      </button>
    </div>
  );
}

export default LogoutButton;
