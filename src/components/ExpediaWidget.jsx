import React from 'react';

const ExpediaWidget = () => {
  return (
    <div className="expedia-widget-wrapper" style={{ width: '100%', minHeight: '400px', background: 'transparent' }}>
      <iframe 
        src="/expedia.html" 
        style={{ width: '100%', height: '400px', border: 'none', overflow: 'hidden' }}
        title="Expedia Search"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default ExpediaWidget;
