import { execSync } from 'child_process';
import electron from 'electron';
import Store from 'electron-store';
import _ from 'lodash';

import { drawForce, drawPie, drawBar } from './draw';

const { findFileExists, setFileRead, findModules } = electron.remote.require('./utils');
const store = new Store();

function setClassByLanguage(language: string): string {
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

function setUpdatedDate(date: string): string {
  const today = new Date();
  const updatedAt = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = updatedAt.getFullYear() < today.getFullYear() ? updatedAt.getFullYear() : '';

  return `Updated on ${updatedAt.getDate()} ${months[updatedAt.getMonth()]} ${year}`;
}

function getNPMList(cloneUrl: string, repoName: string): string {
  const basePath = store.get('user-path') || store.get('default-path');
  const path = basePath + `/${repoName}`;
  console.log(path, findFileExists(path));
  if (!findFileExists(path)) {
    console.log('start git clone');
    execSync(`git clone ${cloneUrl}`, { cwd: basePath });
    console.log('start npm install');
    execSync('npm install', { cwd: path });
    console.log('complete install');
    execSync('npm list -json > npmlist.json', { cwd: path });
    console.log('complete make list');
  }

  getNPMListLocal(path);

  return path;
};

function getNPMListLocal(path: string) {
  try {
    if (!findFileExists(`${path}/node_modules`)) {
      console.log('start npm install');
      execSync('npm install', { cwd: path });
      console.log('complete install');
      try {
        execSync('npm list -json > npmlist.json', { cwd: path });
        console.log('complete make list');
      } catch (error) {
        if (findFileExists(`${path}/npmlist.json`)) {
          console.log('success');
          return;
        }
        console.log(findFileExists(`${path}/npmlist.json`), 'hello');
      }
    }
  } catch(error) {
    alert('프로젝트 폴더가 아니거나 package.json이 없습니다\n다시 확인해주세요');
  }

  if (!findFileExists(`${path}/npmlist.json`)) {
    execSync('npm list -json > npmlist.json', { cwd: path });
  }
}

type moduleType = {
  name?: string,
  from?: string,
  dependencies: object
};

type getForceDataType = { nodes: object[], links: object[] };

function getForceData(path: string): getForceDataType {
  const nodes = [];
  const links = [];
  const data = setFileRead(path + '/npmlist.json', 'utf8');
  const npmList = JSON.parse(data);

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

  findDependencies(npmList.name, npmList.name, npmList, 0);

  const linkWeights = _.countBy(links, link => link.target);

  return { nodes: nodes.map(node => ({ ...node, weight: linkWeights[node.id] || 0 })), links };
};

type usedModules = {
  'name': string,
  'value': number
};

type packageJson = {
  'name': string,
  'dev': boolean,
  'used': boolean
};

type techStacks = {
  'name': string,
  'type': string,
  'image_url': string,
  'homepage_url': string
};

type pieDataType = {
  usedModuleList: string[],
  usedModules: usedModules[],
  packageJson: packageJson[],
  techStacks: techStacks[],
  techList: techStacks[]
};

async function getModuleUsageData(path: string): Promise<pieDataType> {
  console.log(path);
  const usedModuleList = findModules(path);

  const packageJson = JSON.parse(setFileRead(path + '/package.json', 'utf8'));
  const techList = JSON.parse(setFileRead('public/techlist.json', 'utf8'));
  
  const devs = _.keys(packageJson.devDependencies);
  const modules = _.union(_.keys(packageJson.dependencies), devs);

  return {
    'usedModuleList': usedModuleList,
    'usedModules': _.map(_.countBy(usedModuleList, module => module), (value, key) => (
      {
        'name': key,
        'value': value
      }
    )),
    'packageJson': modules.map((module: string) => (
      {
        'name': module,
        'dev': _.includes(devs, module),
        'used': _.includes(usedModuleList, module)
      }
    )),
    'techStacks': techList.filter((tech: techStacks) => 
      _.includes(modules , tech.name)
    ),
    'techList': techList
  };
}

export {
  setClassByLanguage,
  setUpdatedDate,
  getNPMList,
  getNPMListLocal,
  getForceData,
  getModuleUsageData,
  drawForce,
  drawPie,
  drawBar
};
