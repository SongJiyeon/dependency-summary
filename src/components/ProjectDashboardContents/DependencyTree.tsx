import React, { useState } from 'react';

import ForceGraph from '../graphs/ForceGraph';

export default function DependencyTree() {
  const [ treeLoaded, setTreeLoaded ] = useState(false);

  function loadTree(): void {
    setTreeLoaded(true);
  }

  return (
    <div className="dependency-tree-container">
      <div className="dashboard-contents-title">
        Dependency Tree
      </div>
      {treeLoaded ? (
        <ForceGraph />
      ) : (
        <div className="dashboard-contents-contents-container">
          <button className="load-tree-button" onClick={loadTree}>LOAD TREE</button>
        </div>
      )}
    </div>
  );
}
