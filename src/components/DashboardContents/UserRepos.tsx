import React from 'react';
import { execSync } from 'child_process';

type userReposProps = {
  repos: object[]
};

function setLanguageClass(language: string) {
  switch(language) {
    case '':
      return 'repo-language empty';
    case 'JavaScript':
      return 'repo-language javascript';
    case 'TypeScript':
      return 'repo-language typescript';
    case 'HTML':
      return 'repo-language html';
    default:
      return 'repo-language empty';
  }
}

function setUpdateAt(date: string) {
  const today = new Date();
  const updatedAt = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = updatedAt.getFullYear() < today.getFullYear() ? updatedAt.getFullYear() : '';
  return `Updated on ${updatedAt.getDate()} ${months[updatedAt.getMonth()]} ${year}`;
}

function loadProject(cloneUrl: string) {
  console.log(cloneUrl);
  const stdout = execSync('npm --version');
  console.log(stdout);
}

export default function UserRepos({ repos }: userReposProps) {
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
                <div className={setLanguageClass(repo.language)}>{repo.language}</div>
                <div className="repo-updated-at">{setUpdateAt(repo.updated_at)}</div>
              </div>
            </div>
            <div className="repo-button-container">
              <button onClick={() => loadProject(repo.clone_url)} className="repo-button" type="button">LOAD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
