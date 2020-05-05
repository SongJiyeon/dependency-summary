import React from 'react';
import _ from 'lodash';

type techStackType = {
  'name': string,
  'type': string,
  'image_url': string,
  'homepage_url': string
};

type TechStackBoxProps = {
  title: string,
  list: techStackType[],
  onClick: Function,
  children?: React.ReactNode
};

export default function TechStackBox({ title, list, onClick, children }: TechStackBoxProps) {
  const techList = _.groupBy(list, tech => tech.type);

  return (
    <div>
      <div className="tech-box-title">
        {title}
      </div>
      <div className="tech-box">
        {_.map(techList, (techs, name) => (
          <div key={name}>
            <div className="tech-type">{name}</div>
            {techs.map((item, index) => (
              <button
              key={index}
              className="tech-item"
              onClick={() => onClick(item)}>
                <img src={item.image_url} alt="" className="tech-image" />
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
