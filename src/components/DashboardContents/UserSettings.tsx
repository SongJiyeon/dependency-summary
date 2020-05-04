import React, { useState } from 'react';
import electron from 'electron';
import Store from 'electron-store';

const { dialog } = electron.remote;
const store = new Store();

export default function UserSettings() {
  const [value, setValue] = useState('');
  
  async function handleOpen() {
    const dir = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    setValue(dir.filePaths[0]);
  }

  function handleSave() {
    store.set('user-path', value);
    store.set('test', { 'name': 'test' })
    console.log(value, store.get('test'));
  }

  return (
    <div className="user-settings-container">
      <div className="dashboard-contents-title">
        User Settings
      </div>
      <div className="dashboard-contents-contents-container">
        <div className="guide-container">
          <p>project 폴더를 저장할 경로를 설정하세요</p>
          <p>저장 경로를 고르고 나면 <span className="save">SAVE</span>로 설정을 저장하세요</p>
          <p>
            Github repository 혹은 clone url에서 프로젝트를 선택하면 해당 경로에 프로젝트 폴더가 저장됩니다
          </p>
        </div>
        <div className="input-box">
          <button className="user-settings-open-button" type="button" onClick={handleOpen}>
            SET DIRECTORY
          </button>
          <input
          className="user-settings-input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          name="user-setting-path"
          id="user-setting-path"/>
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
