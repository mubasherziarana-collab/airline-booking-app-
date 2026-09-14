import React, { useEffect, useRef } from 'react';

const ExpediaWidget = () => {
  const scriptContainerRef = useRef(null);

  useEffect(() => {
    // Only inject the script if it hasn't been injected yet
    if (scriptContainerRef.current && scriptContainerRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.className = "eg-widgets-script";
      script.src = "https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js";
      script.async = true;
      scriptContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="expedia-widget-wrapper" style={{ width: '100%', minHeight: '350px', background: 'transparent' }}>
      {/* The Expedia Widget Container */}
      <div 
        className="eg-widget" 
        data-widget="search" 
        data-program="us-expedia" 
        data-lobs="stays,flights" 
        data-network="pz" 
        data-camref="1110lNcdP" 
        data-pubref=""
      ></div>
      
      {/* Script Injection Point */}
      <div ref={scriptContainerRef}></div>
    </div>
  );
};

export default ExpediaWidget;
