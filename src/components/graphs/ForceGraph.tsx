import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import useTargetPath from '../../hooks/useTargetPath';
import { getForceData, drawForce } from '../../utils/index';

export default function DependencyTree() {
  const [ data, setData ] = useState({});
  const [ graphType, setGraphType ] = useState('weight');
  const { targetPath } = useTargetPath();
  
  const select = '.force-container';

  useEffect(() => {
    const data = getForceData(targetPath);
    setData(data);
    drawForce(_.cloneDeep(data), graphType, select);
  }, [targetPath]);

  useEffect(() => {
    !_.isEmpty(data) && drawForce(_.cloneDeep(data), graphType, select);
  }, [graphType]);
  
  return (
    <div>
      <div className="dependency-tree-button-box">
        <button type="button" onClick={() => setGraphType('weight')}>WEIGHT</button>
        <button type="button" onClick={() => setGraphType('depth')}>DEPTH</button>
      </div>
      <div className="force-container"></div>
    </div>
  );
}
