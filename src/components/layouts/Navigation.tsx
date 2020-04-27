import React from 'react';

type NavigationProps = {
  title: string,
  children: React.ReactNode;
};

export default function Navigation({ title, children }: NavigationProps) {
  return (
    <div className="navigation-container">
      <div className="navigation-header">{title}</div>
      <div className="navigation-contents">
        {children}
      </div>
    </div>
  );
}
