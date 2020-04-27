import React from 'react';
import './App.css';
import Header from './components/layouts/Header';
import Main from './components/Main'
import Dashboard from './components/Dashboard';
import useLogin from './hooks/useLogin';

function App() {
  const { loggedIn } = useLogin();

  return (
    <div className="App">
      <Header />
      {loggedIn.status ?
      <Dashboard />
      :<Main />
      }
    </div>
  );
}

export default App;
