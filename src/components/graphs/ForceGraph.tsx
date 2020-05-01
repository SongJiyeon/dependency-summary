import React, { useEffect } from 'react';

import useTargetPath from '../../hooks/useTargetPath';
import { getForceData, drawForce } from '../../utils/index';

export default function DependencyTree() {
  const { targetPath } = useTargetPath();
  
  useEffect(() => {
    drawForce(getForceData(targetPath));
  }, [targetPath]);
  
  return <div className="force-container"></div>; 
}
