import React, { useState } from 'react';
import electron from 'electron';
import useTargetPath from '../../hooks/useTargetPath';

const { dialog } = electron.remote;

export default function LocalPath() {
  const [ value, setValue ] = useState('');
  const { onTargetChange } = useTargetPath();
  
  async function handleOpen() {
    const stdout = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    setValue(stdout.filePaths[0]);
  }

  function handleSave() {
    onTargetChange(value);
  }

  return (
    <div className="local-path-container">
      <div className="dashboard-contents-title">
        Local Path
      </div>
      <div className="dashboard-contents-contents-container">
        <div className="guide-container">
          <p>분석할 project 폴더의 경로를 입력하세요</p>
          <p>project 경로를 고르고 나면 <span className="save">LOAD</span>로 프로젝트를 불러오세요</p>
        </div>
        <div className="input-box">
          <button className="user-settings-open-button" type="button" onClick={handleOpen}>
            SET DIRECTORY
          </button>
          <input
          className="user-settings-input"
          type="text"
          value={value}
          disabled
          name="local-path"
          id="local-path"/>
        </div>
      </div>
      <div className="button-container">
        <button className="user-settings-save-button" type="button" onClick={handleSave}>
          SAVE
        </button>
      </div>
    </div>
  );
}
