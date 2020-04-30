import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import useTargetPath from '../../hooks/useTargetPath';
import useRenderMode from '../../hooks/useRenderMode';

type NavigationProps = {
  title: string,
  children: React.ReactNode;
};

export default function Navigation({ title, children }: NavigationProps) {
  const { targetPath, onTargetChange } = useTargetPath();
  const { onClickRenderMode } = useRenderMode();

  return (
    <div className="navigation-container">
      <div className="navigation-header">
        {targetPath &&
        <button
        className="go-back-button"
        type="button"
        onClick={() => {onTargetChange(null)}}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />
        </button>}
        <div className="navigation-header-title">
          {title === 'Dashboard' ?
          <button type="button" onClick={() => onClickRenderMode('stats')}>
            {title}
          </button>
          : <div>{title}</div>}
        </div>
      </div>
      <div className="navigation-contents">
        {children}
      </div>
    </div>
  );
}
