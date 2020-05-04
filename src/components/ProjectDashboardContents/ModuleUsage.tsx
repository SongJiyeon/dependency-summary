import React, { useEffect, useState } from 'react';

import UnusedModules from '../graphs/UnusedModules';
import useTargetPath from '../../hooks/useTargetPath';
import { getPieData, drawPie, drawBar } from '../../utils';

export default function ModuleUsage() {
  const [ data, setData ] = useState({ usedModules: [], packageJson: [] });
  const { targetPath } = useTargetPath();

  useEffect(() => {
    async function setPie(): Promise<void> {
      const { usedModules, packageJson } = await getPieData(targetPath);
      drawPie(usedModules);
      drawBar(usedModules);
      setData({ usedModules, packageJson });
    }
    setPie();
  }, [targetPath]);

  return (
    <div className="module-usage-container">
      <div className="dashboard-contents-title">
        Module Usage
      </div>
      <div className="dashboard-contents-contents-container">
        <div className="module-usage-pie">
          <div>
            <div className="module-usage-content-title">Import Frequency Ratio</div>
            <div className="pie-container"></div>
          </div>
          <div>
            <div>
              <div className="module-usage-content-title">Top 5 Most Used Modules</div>
              <div className="bar-container"></div>
            </div>
            <UnusedModules data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
