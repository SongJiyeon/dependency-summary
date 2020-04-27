import React from 'react';
import * as firebase from "firebase/app";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import "firebase/auth";
import "firebase/firestore";
import useLogin from '../../hooks/useLogin';

const firebaseConfig = {
  apiKey: "AIzaSyA9K_Wyzl8oy5_NUgcNbttDn5kZOCIlwhI",
  authDomain: "dependency-summary.firebaseapp.com",
  databaseURL: "https://dependency-summary.firebaseio.com",
  projectId: "dependency-summary",
  storageBucket: "dependency-summary.appspot.com",
  messagingSenderId: "967090880797",
  appId: "1:967090880797:web:6f559fcf8595106df6a1f4",
  measurementId: "G-HTS2D5PRDV"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GithubAuthProvider();

// const Store = window.require('electron-store');

// const store = new Store();

function LoginButton() {
  const { onLogin } = useLogin();

  function handleLogin(): void {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      onLogin(true, token);
    }).catch(function(error) {
      console.log(error);
    });
  };

  return (
    <div className="login-button-container">
      <div className="login-title">Login</div>
      <button className="login-button" onClick={handleLogin}>
        <FontAwesomeIcon icon={faGithub} size="lg" /> LOGIN WITH GITHUB
      </button>
    </div>
  );
}

export default LoginButton;
