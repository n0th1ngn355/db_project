// components/SidebarBlock.js
import React from 'react';
import './sidebar_block.css';

const SidebarBlock = ({ href, image, title, info}) => {
  return (
    <a href={href} className={`sidebar-block ${info == href ? 'active' : ''}`}>
      <img className="block-image" alt={title} src={image} />
      <div className="text-wrapper">
        <span className="text">{title}</span>
      </div>
    </a>
  );
};

export default SidebarBlock;
