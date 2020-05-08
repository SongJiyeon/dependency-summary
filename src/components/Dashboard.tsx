import React from 'react';
import axios from 'axios';
import Store from 'electron-store';

import Navigation from './layouts/Navigation';
import Loading from './layouts/Loading';
import DashboardStats from './DashboardContents/DashboardStats';
import UserRepos from './DashboardContents/UserRepos';
import CloneUrl from './DashboardContents/CloneUrl';
import LocalPath from './DashboardContents/LocalPath';
import UserSettings from './DashboardContents/UserSettings';
import useRenderMode from '../hooks/useRenderMode';
import useUserRepos from '../hooks/useUserRepos';

const store = new Store();

export default function Dashboard() {
  const { renderMode, onClickRenderMode } = useRenderMode();
  const { userRepos, onLoad } = useUserRepos();

  async function handleClick(mode: 'stats' | 'userRepos' | 'cloneUrl' | 'localPath' | 'loading') {
    if (mode === 'userRepos') {
      const repos = await axios({
        method: 'get',
        url: 'https://api.github.com/user/repos',
        headers: { 'Authorization': 'token ' + store.get('accessToken') }
      });
      onLoad(repos.data);
    }
    onClickRenderMode(mode);
  }

  return (
    <div className="dashboard-container">
      <Navigation title="Dashboard">
        <button className="navigation-button" type="button" onClick={() => handleClick('userRepos')}>github repos</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('cloneUrl')}>clone url</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('localPath')}>local path</button>
      </Navigation>
      <div className="dashboard-contents-container">
        {renderMode === 'stats' && <DashboardStats />}
        {renderMode === 'userRepos' && <UserRepos repos={userRepos} />}
        {renderMode === 'cloneUrl' && <CloneUrl />}
        {renderMode === 'localPath' && <LocalPath />}
        {renderMode === 'userSettings' && <UserSettings />}
        {renderMode === 'loading' && <Loading />}
      </div>
    </div>
  );
}
