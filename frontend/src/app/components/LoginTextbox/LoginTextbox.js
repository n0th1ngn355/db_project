import React from 'react';
import './LoginTextbox.css';

const LoginTextbox = ({ type, label, placeholder, value, onChange, icon }) => {
  const Icon = icon || null;
  return (
    <div className="textbox-wrapper">
      <label htmlFor="textbox">{label}</label>
      <input
        id="textbox"
        name={name} type={type}
        className="textbox"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default LoginTextbox;
