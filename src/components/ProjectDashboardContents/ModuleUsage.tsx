import React, { useEffect, useState } from 'react';
import Store from 'electron-store';
import axios from 'axios';

import UnusedModules from '../graphs/UnusedModules';
import useTechStack from '../../hooks/useTechStack';
import useTechList from '../../hooks/useTechList';
import useTargetPath from '../../hooks/useTargetPath';
import { getModuleUsageData, drawPie, drawBar } from '../../utils';

const store = new Store();

export default function ModuleUsage() {
  const [ data, setData ] = useState({
    usedModuleList: [],
    usedModules: [],
    packageJson: []
  });
  const { onSetTechStack } = useTechStack();
  const { onSetTechList } = useTechList();
  const { targetPath } = useTargetPath();

  useEffect(() => {
    async function setPie(): Promise<void> {
      const {
        usedModuleList,
        usedModules,
        packageJson,
        techStacks,
        techList
      } = await getModuleUsageData(targetPath);

      drawPie(usedModules, '.pie-container');
      drawBar(usedModules, '.bar-container');
      setData({ usedModuleList, usedModules, packageJson });
      onSetTechStack(techStacks);
      onSetTechList(techList);
    }
    setPie();
  }, [targetPath]);

  async function saveData() {
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_FETCH_URL}/api/module_usage`,
        data: { modules: data.usedModuleList, jwtToken: store.get('jwtToken') }
      });
      alert('저장 성공');
    } catch (error) {
      console.log(error);
      alert('업로드에 실패했습니다');
    }
  }

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
            <div className="save-data-box">
              <button className="save-data-button" onClick={saveData}>
                <span>저장된 데이터는 사용자 통계에 사용됩니다</span>
                SAVE DATA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
