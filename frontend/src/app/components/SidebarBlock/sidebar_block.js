import React from 'react';
import './sidebar_block.css';

const SidebarBlock = ({ image, title }) => {
  return (
    <div className="sidebar-block">
      <div className="text-wrapper">{title}</div>
      <img className="block-image" alt={title} src={image} />
    </div>
  );
};

export default SidebarBlock;
