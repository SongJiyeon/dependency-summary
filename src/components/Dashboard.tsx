import React from 'react';
import axios from 'axios';

import Navigation from './layouts/Navigation';
import DashboardStats from './DashboardContents/DashboardStats';
import UserRepos from './DashboardContents/UserRepos';
import CloneUrl from './DashboardContents/CloneUrl';
import LocalPath from './DashboardContents/LocalPath';
import useRegisterMode from '../hooks/useRegisterMode';
import useLogin from '../hooks/useLogin';
import useUserRepos from '../hooks/useUserRepos';

export default function Dashboard() {
  const { registerMode, onClickRegisterMode } = useRegisterMode();
  const { userRepos, onLoad } = useUserRepos();
  const { loggedIn } = useLogin();

  async function handleClick(mode: 'stats' | 'userRepos' | 'cloneUrl' | 'localPath') {
    if (mode === 'userRepos') {
      const repos = await axios({
        method: 'get',
        url: 'https://api.github.com/user/repos',
        headers: { 'Authorization': 'token ' + loggedIn.token }
      });
      console.log(repos.data);
      onLoad(repos.data);
    }
    onClickRegisterMode(mode);
  }

  return (
    <div className="dashboard-container">
      <Navigation title="Dashboard">
        <button className="navigation-button" type="button" onClick={() => handleClick('userRepos')}>github repos</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('cloneUrl')}>clone url</button>
        <button className="navigation-button" type="button" onClick={() => handleClick('localPath')}>local path</button>
      </Navigation>
      <div className="dashboard-contents-container">
        {registerMode.mode === 'stats' && <DashboardStats />}
        {registerMode.mode === 'userRepos' && <UserRepos repos={userRepos} />}
        {registerMode.mode === 'cloneUrl' && <CloneUrl />}
        {registerMode.mode === 'localPath' && <LocalPath />}
      </div>
    </div>
  );
}
