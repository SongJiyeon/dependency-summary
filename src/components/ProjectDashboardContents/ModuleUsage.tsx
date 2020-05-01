import React from 'react';

import PieChart from '../graphs/PieChart';

export default function ModuleUsage() {
  return (
    <div className="module-usage-container">
      <div className="dashboard-contents-title">
        Module Usage
      </div>
      <div className="dashboard-contents-contents-container">
        <div className="module-usage-pie">
          <PieChart />
        </div>
      </div>
    </div>
  );
}
