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
  
  type moduleType = {
    name: string,
    dev: boolean
  }

  function setModuleType(module: moduleType): string {
    return module.name[0] === '@' ?
    'scope' : module.dev ?
    'dev' : 'normal';
  }

  return (
    <div>
      <div className="module-usage-content-title">
        Unused Modules
      </div>
      <div>
        {UnusedModules.map((module: moduleType, index) => (
          <div
          key={index}
          className={setModuleType(module) + 'Dep unused'}
          data-tooltip='hello'>{module.name}
          <span>{setModuleType(module)} 타입의 dependency입니다<br></br>
          import 여부와 관계없이 사용되었을 수 있습니다</span></div>
        ))}
      </div>
    </div>
  ); 
}
