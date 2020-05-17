import React, { useEffect } from 'react';

import Navigation from './layouts/Navigation';
import ModuleUsage from './ProjectDashboardContents/ModuleUsage';
import DependencyTree from './ProjectDashboardContents/DependencyTree';
import TechStack from './ProjectDashboardContents/TechStack';
import useRenderMode from '../hooks/useRenderMode';

export default function ProjectDashboard() {
  const { renderMode, onChangeRenderMode } = useRenderMode();

  useEffect(() => {
    onChangeRenderMode('moduleUsage');
  }, []);

  function handleClick(mode: 'moduleUsage' | 'dependencyTree' | 'techStack' | 'userSettings') {
    onChangeRenderMode(mode);
  }

  return (
    <div className="dashboard-container">
      <Navigation title="Project">
        <button className="navigation-button" type="button" onClick={() => handleClick('moduleUsage')}>module usage coverage</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('dependencyTree')}>dependency graph</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('techStack')}>tech stack summary</button>
      </Navigation>
      <div className="dashboard-contents-container">
        {renderMode === 'moduleUsage' && <ModuleUsage />}
        {renderMode === 'dependencyTree' && <DependencyTree />}
        {renderMode === 'techStack' && <TechStack />}
      </div>
    </div>
  );
}
