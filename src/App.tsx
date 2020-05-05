import React from 'react';
import './App.css';
import Header from './components/layouts/Header';
import Main from './components/Main'
import Dashboard from './components/Dashboard';
import ProjectDashboard from './components/ProjectDashboard';
import useLogin from './hooks/useLogin';
import useTargetPath from './hooks/useTargetPath';

function App() {
  const { loggedIn } = useLogin();
  const { targetPath } = useTargetPath();

  return (
    <div className="App">
      <Header />
      {loggedIn.status ?
      targetPath ? <ProjectDashboard /> : <Dashboard />
      :<Main />
      }
      {/* {targetPath ? <ProjectDashboard /> : <Dashboard />} */}
    </div>
  );
}

export default App;
