import React from 'react';

import Navigation from './layouts/Navigation';
import ModuleUsage from './ProjectDashboardContents/ModuleUsage';
import DependencyTree from './ProjectDashboardContents/DependencyTree';
import TechStack from './ProjectDashboardContents/TechStack';
import UserSettings from './DashboardContents/UserSettings';
import useRenderMode from '../hooks/useRenderMode';

export default function ProjectDashboard() {
  const { renderMode, onClickRenderMode } = useRenderMode();

  function handleClick(mode: 'moduleUsage' | 'dependencyTree' | 'techStack' | 'userSettings') {
    onClickRenderMode(mode);
  }

  return (
    <div className="dashboard-container">
      <Navigation title="Project">
        <button className="navigation-button" type="button" onClick={() => handleClick('moduleUsage')}>module usage coverage</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('dependencyTree')}>dependency tree</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('techStack')}>tech stack summary</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('userSettings')}>settings</button>
      </Navigation>
      <div className="dashboard-contents-container">
        {renderMode === 'moduleUsage' && <ModuleUsage />}
        {renderMode === 'dependencyTree' && <DependencyTree />}
        {renderMode === 'techStack' && <TechStack />}
        {renderMode === 'userSettings' && <UserSettings />}
      </div>
    </div>
  );
}
