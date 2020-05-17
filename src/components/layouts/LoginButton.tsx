import React from 'react';
import axios from 'axios';
import Store from 'electron-store';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import firebase from "firebase/app";

import useLogin from '../../hooks/useLogin';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIERBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GithubAuthProvider();
const store = new Store();

function LoginButton() {
  const { onLogin } = useLogin();

  async function handleLogin(): Promise<void> {
    const access_token = (
      await firebase
        .auth()
        .signInWithPopup(provider)
    ).credential.accessToken;

    const { jwttoken } = (await axios({
        method: 'post',
        url: `${process.env.REACT_APP_FETCH_URL}/auth/login`,
        data: { access_token }
    })).headers;

    store.set('accessToken', access_token);
    store.set('jwtToken', jwttoken);

    onLogin(true, access_token);
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