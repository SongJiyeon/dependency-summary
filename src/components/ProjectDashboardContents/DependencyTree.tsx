import React, { useState } from 'react';

import ForceGraph from '../graphs/ForceGraph';

export default function DependencyTree() {
  const [ treeLoaded, setTreeLoaded ] = useState(false);

  return (
    <div className="dependency-tree-container">
      <div className="dashboard-contents-title">
        Dependency Tree
      </div>
      {treeLoaded ? (
        <ForceGraph />
      ) : (
        <div className="dashboard-contents-contents-container">
          <button className="load-tree-button" onClick={() => setTreeLoaded(true)}>LOAD TREE</button>
        </div>
      )}
    </div>
  );
}
