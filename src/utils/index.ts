import { execSync } from 'child_process';
import Store from 'electron-store';

const store = new Store();

export function setClassByLanguage(language: string): string {
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

export function setUpdatedDate(date: string): string {
  const today = new Date();
  const updatedAt = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = updatedAt.getFullYear() < today.getFullYear() ? updatedAt.getFullYear() : '';

  return `Updated on ${updatedAt.getDate()} ${months[updatedAt.getMonth()]} ${year}`;
}

export function getNPMList(cloneUrl: string, repoName: string, onTargetChange): void {
  const basePath = store.get('user-path') || store.get('default-path');
  const path = basePath + `/${repoName}`;

  console.log(path);

  execSync(`git clone ${cloneUrl}`, { cwd: basePath });
  execSync('npm install', { cwd: path });
  execSync('npm list -json > npmlist.json', { cwd: path });

  onTargetChange(`${basePath}/${repoName}`);

  alert('complete save!');
};
