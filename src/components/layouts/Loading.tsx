import React, { useEffect, useState } from 'react';

export default function Loading() {
  const [ dots, setDots ] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setDots(dots.length < 3 ? dots + '.' : '');
    }, 500);
  }, [dots]);

  return (
    <div className="dashboard-contents-contents-container">
      로딩중이다{dots}
    </div>
  );
}