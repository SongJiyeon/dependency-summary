import React, { useState, useRef, useEffect } from 'react';
import { select } from 'd3';

import { drawChart } from '../../utils/drawTree';

export default function DependencyTree() {
  const svgRef = useRef();
  const [ data, setData ] = useState([25, 30, 45, 60, 20]);
  const [ treeLoaded, setTreeLoaded ] = useState(false);

  useEffect(() => {
    const svg = select(svgRef.current);
    drawChart(svg);
  }, [treeLoaded]);

  function loadTree(): void {
    console.log('treeeeee');
    setTreeLoaded(true);
  }

  return (
    <div className="dependency-tree-container">
      <div className="dashboard-contents-title">
        Dependency Tree
      </div>
      {treeLoaded ? (
        <>
          <svg className="dependency-tree" ref={svgRef}></svg>
          <button onClick={() => setData(data.map(value => value + 5))}>update</button>
          <button onClick={() => setData(data.filter(value => value < 35))}>filter</button>
        </>
      ) : (
        <div className="dashboard-contents-contents-container">
          <button className="load-tree-button" onClick={loadTree}>LOAD TREE</button>
        </div>
      )}
    </div>
  );
}
