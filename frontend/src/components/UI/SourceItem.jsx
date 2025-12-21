import React from 'react';
import './UI.css';

const SourceItem = ({ title, icon: Icon, onClick }) => {
  return (
    <div className="source-item" onClick={onClick}>
      <Icon className="source-icon" />
      <span className="source-title">{title}</span>
    </div>
  );
};

export default SourceItem;