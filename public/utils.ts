import * as babel from '@babel/core';
import * as esprima from 'esprima';
import * as fs from 'fs';
import axios from 'axios';

exports.sayHello = () => {

};

exports.findModules = (path: string) => {
  const babelOptions = JSON.parse(fs.readFileSync('.babelrc', 'utf-8'));
  let fileNames: { name: string, path: string }[] = [];

  function findFileNames(folderPath: string): void {
    const fileTypeReg = /\.(js|ts)$/i;
  
    const wholeFiles = fs.readdirSync(folderPath, { withFileTypes: true });
    const directories = wholeFiles.filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules');
    const files = wholeFiles
      .filter(dirent => fileTypeReg.test(dirent.name))
      .map(dirent => ({
        'name': dirent.name,
        'path': `${folderPath}/${dirent.name}`
      }));
  
    fileNames = [ ...fileNames, ...files ];
  
    if (directories.length) {
      return directories.forEach(dir => findFileNames(`${folderPath}/${dir.name}`));
    }
  }

  findFileNames(path);

  return fileNames.reduce((modules: any, file) => {
    const code = babel.transformFileSync(file.path, babelOptions);
    const modulesInFile = code && code.code && esprima.parseModule(code.code).body.filter(module => module.type === 'ImportDeclaration');
    const moduleNames = modulesInFile && modulesInFile.length ? 
    modulesInFile.map((module: any) => module.source.value).filter(name => name[0] !== '.') : [];

    return [ ...modules, ...moduleNames ]
  }, []);
};