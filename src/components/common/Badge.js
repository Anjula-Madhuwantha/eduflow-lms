import React from 'react';

function Badge({ label, variant = 'primary', icon }) {
  return (
    <span className={`badge badge-${variant}`}>
      {icon && <i className={`fas ${icon}`}></i>}
      {label}
    </span>
  );
}

export default Badge;