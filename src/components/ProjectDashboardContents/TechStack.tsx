import React from 'react';

import useTechList from '../../hooks/useTechList';
import useTechStack from '../../hooks/useTechStack';
import useModalStatus from '../../hooks/useModalStatus';

import TechStackBox from '../layouts/TechStackBox';
import Markdown from '../layouts/Markdown';

export default function TechStack() {
  const { status, setStatus } = useModalStatus();

  const { techStack, onAddTechStack, onDeleteTechStack } = useTechStack();
  const { techList, onAddTechList, onDeleteTechList } = useTechList();

  function addTech(techStack) {
    onAddTechStack(techStack);
    onDeleteTechList(techStack.name);
  }

  function deleteTech(techStack) {
    onDeleteTechStack(techStack.name);
    onAddTechList(techStack);
  }

  return (
    <div className="tech-stack-container">
      <div className="dashboard-contents-title">
        Tech Stack
      </div>
      <div className="dashboard-contents-contents-container">
        <div className="tech-stack-container-container">
          <TechStackBox
          title="Tech Stack"
          list={techStack}
          onClick={deleteTech}>
            <button className="open-modal-button" onClick={() => setStatus(true)}>
              COPY
            </button>
          </TechStackBox>
          <TechStackBox
          title="Tech Stack List"
          list={techList}
          onClick={addTech}
          />
        </div>
      </div>
      {status && <Markdown />}
    </div>
  );
}
