import React from 'react';

import useTargetPath from '../../hooks/useTargetPath';
import { getNPMList, setClassByLanguage, setUpdatedDate } from '../../utils/index';

type userReposProps = {
  repos: object[]
};

export default function UserRepos({ repos }: userReposProps) {
  const { onTargetChange } = useTargetPath();

  function loadProject(cloneUrl: string, repoName: string) {
    const path = getNPMList(cloneUrl, repoName);
    onTargetChange(path);

    alert('complete save!');
  }

  return (
    <div className="user-repos-container">
      <div className="dashboard-contents-title">
        Github Repositories
      </div>
      <div>
        {repos.map((repo, index) => (
          <div className="repo-container" key={index}>
            <div className="repo-info">
              <div className="repo-full-name">{repo.full_name}</div>
              <div className="repo-description">{repo.description}</div>
              <div className="repo-small-info">
                <div className={setClassByLanguage(repo.language)}>{repo.language}</div>
                <div className="repo-updated-at">{setUpdatedDate(repo.updated_at)}</div>
              </div>
            </div>
            <div className="repo-button-container">
              <button onClick={() => loadProject(repo.clone_url, repo.name)} className="repo-button" type="button">LOAD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
