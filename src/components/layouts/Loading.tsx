import React, { useEffect, useState } from 'react';

import useTargetPath from '../../hooks/useTargetPath';
import useLoadingMsg from '../../hooks/useLoadingMsg';

export default function Loading() {
  const [ dots, setDots ] = useState('');
  const { targetPath } = useTargetPath();
  const { loadingMsg } = useLoadingMsg();

  useEffect(() => {
    setTimeout(() => {
      setDots(dots.length < 3 ? dots + '.' : '');
    }, 500);
  }, [dots]);

  useEffect(() => {
    if (targetPath) {
      setDots('');
    }
  }, [targetPath]);

  return (
    <div className="dashboard-contents-contents-container">
      {loadingMsg.map(msg => (
        <div>{msg}</div>
      ))}
      로딩중이다{dots}
    </div>
  );
}