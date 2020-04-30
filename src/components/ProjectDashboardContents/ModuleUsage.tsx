import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import useTargetPath from '../../hooks/useTargetPath';

export default function ModuleUsage() {
  const [result, setResult] = useState('');
  const { targetPath } = useTargetPath();

  async function handleFetch() {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:4000/api/module_usage',
      data: { path: targetPath }
    });

    const modules = _.countBy(res.data.modules, module => module);
    console.log(modules);
  }

  return (
    <div className="module-usage-container">
      <div className="dashboard-contents-title">
        Module Usage
      </div>
      <div className="dashboard-contents-contents-container">
        Module Usage
        <div>
          <button onClick={handleFetch}>
            this is module usage axios button
          </button>
          <div>
            {result}
          </div>
        </div>
      </div>
    </div>
  );
}
