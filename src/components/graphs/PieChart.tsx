import React, { useEffect } from 'react';

import useTargetPath from '../../hooks/useTargetPath';
import { getPieData, drawPie } from '../../utils';

export default function DependencyTree() {
  const { targetPath } = useTargetPath();

  useEffect(() => {
    async function setPie(): Promise<void> {
      const { data, packageJson } = await getPieData(targetPath);
      drawPie(data);
    }
    setPie();
  }, [targetPath]);
  
  return <div className="pie-container"></div>; 
}
