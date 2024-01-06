import React from 'react';
import './settings_block.css';

const SettingsBlock = () => {
  return (
    <a href="settings" className="settings-gear">
      <div className="overlap-group">
        <img className="img" alt="Vector" src="settings.svg" />
        <span className="text-wrapper">Settings</span>
      </div>
    </a>
  );
};

export default SettingsBlock;