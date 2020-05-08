import React, { useState } from 'react';
import useTargetPath from '../../hooks/useTargetPath';
import { getNPMList } from '../../utils/index';

export default function CloneUrl() {
  const [path, setPath] = useState('');
  const { targetPath, onTargetChange } = useTargetPath();

  function handleLoad() {
    const repoName = path.split('/')[4].replace('.git', '');
    onTargetChange(getNPMList(path, repoName));
  }

  return (
    <div className="clone-url-container">
      <div className="dashboard-contents-title">
        Clone Url
      </div>
      <div className="dashboard-contents-contents-container">
        <div className="guide-container">
          <p>분석할 Github repository의 clone url을 입력하세요</p>
          <p>example <span className="sample-url">https://github.com/SongJiyeon/dependency-summary.git</span></p>
        </div>
        <div className="input-box">
          <input
          className="clone-url-input"
          type="text"
          value={path}
          onChange={e => setPath(e.target.value)}
          name="clone-url"
          id="clone-url"/>
          <button className="clone-url-load-button" type="button" onClick={handleLoad}>
            LOAD
          </button>
        </div>
      </div>
    </div>
  );
}
