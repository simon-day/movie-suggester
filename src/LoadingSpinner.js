import './LoadingSpinner.css';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-page">
      <h4>Getting Your Recommendations</h4>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
