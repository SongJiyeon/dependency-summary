import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import useLogin from '../../hooks/useLogin';

// TODO: Replace the following with your app's Firebase project configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GithubAuthProvider();

// const Store = window.require('electron-store');

// const store = new Store();

function LoginButton() {
  const { loggedIn, onLogin } = useLogin();

  function handleLogin(): void {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;

      onLogin(true, token);
    }).catch(function(error) {
      console.log(error);
    });
  };

  function handleLogout(): void {
    firebase.auth().signOut().then(function() {
      alert('logout');
      onLogin(false, '');
    }).catch(function(error) {
      console.log(error);
    });
  };

  return (
    <div className="login-button-container">
      {loggedIn.status ?
      <input type="button" value="logout" onClick={handleLogout} />
      :<input type="button" value="login with github" onClick={handleLogin} />
      }
    </div>
  );
}

export default LoginButton;
