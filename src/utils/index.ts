import { execSync } from 'child_process';
import Store from 'electron-store';
import _ from 'lodash';
import fs from 'fs';

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

  if (!fs.existsSync(path)) {
    execSync(`git clone ${cloneUrl}`, { cwd: basePath });
    execSync('npm install', { cwd: path });
    execSync('npm list -json > npmlist.json', { cwd: path });
    execSync('rm -rf node_modules .git', { cwd: path });
  }

  onTargetChange(path);
  alert('complete save!');
};

const nodes = [];
const links = [];

type moduleType = {
  name?: string,
  from?: string,
  dependencies: object
};

type nodeType = {
  id: string,
  depth: number
}

function findDependencies(source: string, name: string, module: moduleType, depth: number) {
  if (_.findIndex(nodes, node => node.id === module.from) < 0) {
    nodes.push({ 'id': module.name || module.from, name, 'depth': depth });
  }
  if (_.findIndex(links, link => link.target === module.from && link.source === source) < 0) {
    module.from && links.push({ 'target': module.from, 'source': source });
  }
  
  if (module.dependencies) {
    return _.forIn(module.dependencies,
      (value: moduleType, key: string) => findDependencies(module.name || module.from, key, value, depth + 1));
  }
}

type getForceDataReturn = { nodes: object[], links: object[] };

export function getForceData(path: string): getForceDataReturn {
  const data = fs.readFileSync(path + '/npmlist.json', 'utf8');
  const npmList = JSON.parse(data);

  findDependencies(npmList.name, npmList.name, npmList, 0);

  const linkWeights = _.countBy(links, link => link.target);

  console.log({ nodes: nodes.map(node => ({ ...node, weight: linkWeights[node.id] || 0 })), links });

  return { nodes: nodes.map(node => ({ ...node, weight: linkWeights[node.id] || 0 })), links };
};
