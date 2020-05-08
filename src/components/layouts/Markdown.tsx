import React, { useState } from 'react';
import _ from 'lodash';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import useTechStack from '../../hooks/useTechStack';
import useModalStatus from '../../hooks/useModalStatus';

export default function Markdown() {
  const { techStack } = useTechStack();
  const { setStatus } = useModalStatus();
  const techList = _.groupBy(techStack, tech => tech.type);
  const [ value, setValue ] = useState(setMarkdown());

  function onCopy(): void {
    alert('복사되었습니다');
    setStatus(false);
  }

  function setMarkdown(): string {
    return _.reduce(techList, (result, techs, name) => result + 
    `<h3>${name}</h3><br><ul>${techs.reduce((techRes, tech) => techRes +
      `<li>${tech.name}</li>`, '')}</ul>`, '');
  }

  return (
    <>
      <div className="modal-background" onClick={() => setStatus(false)}></div>
      <div className="modal-container">
        <input
        type="text"
        id="tech-stack"
        value={value}
        onChange={e => setValue(e.target.value)} />
        <div className="tech-stack-box">
          {_.map(techList, (techs, name) => (
            <div key={name}>
              <h3>{name}</h3>
              <ul>
                {techs.map((tech, index) => (<li key={index}>{tech.name}</li>))}
              </ul>
            </div>
          ))}
        </div>
        <CopyToClipboard
        text={value}>
          <button
          className="copy-button"
          onClick={onCopy}>
            COPY
          </button>
        </CopyToClipboard>
      </div>
    </>
  );
}
