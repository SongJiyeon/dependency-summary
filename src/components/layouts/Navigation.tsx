import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import useTargetPath from '../../hooks/useTargetPath';
import useRenderMode from '../../hooks/useRenderMode';
import useTechList from '../../hooks/useTechList';
import useTechStack from '../../hooks/useTechStack';

type NavigationProps = {
  title: string,
  children: React.ReactNode;
};

export default function Navigation({ title, children }: NavigationProps) {
  const { targetPath, onTargetChange } = useTargetPath();
  const { onSetTechStack } = useTechStack();
  const { onSetTechList } = useTechList();
  const { onClickRenderMode } = useRenderMode();

  function handleGoBack(): void {
    onTargetChange(null);
    onSetTechStack([]);
    onSetTechList([]);
    onClickRenderMode('stats');
  }

  return (
    <div className="navigation-container">
      <div className="navigation-header">
        {targetPath &&
        <button
        className="go-back-button"
        type="button"
        onClick={handleGoBack}>
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
