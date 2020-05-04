import React from 'react';
import _ from 'lodash';

type UnusedModulesProps = {
  data: {
    usedModules: object[],
    packageJson: object[]
  }
};

export default function UnusedModules({ data }: UnusedModulesProps) {
  const UnusedModules = data.packageJson.filter(
    module => !_.includes(_.map(data.usedModules, m => m.name), module.name)
  );

  function setClassName(module: { 'name': string, 'dev': boolean }): string {
    return module.name[0] === '@' ?
      'scope unused' : module.dev ?
      'dev unused' : 'unused';
  }

  console.log(_.map(data.usedModules, m => m.name), UnusedModules);

  return (
    <div>
      <div className="module-usage-content-title">
        Unused Modules
      </div>
      <div>
        {UnusedModules.map((module, index) => (
          <div
          key={index}
          className={setClassName(module)}
          data-tooltip='hello'>{module.name}</div>
        ))}
      </div>
    </div>
  ); 
}
