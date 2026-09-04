import React, { useEffect, useRef } from 'react';

const KiwiWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = "https://trpwdg.com/content?currency=usd&trs=559367&shmarker=690809&locale=en&powered_by=true&limit=4&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=3411";
      script.async = true;
      script.charset = "utf-8";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="kiwi-widget-wrapper" style={{ minHeight: '300px', width: '100%' }}>
      <div ref={containerRef} id="kiwi-widget-container"></div>
    </div>
  );
};

export default KiwiWidget;
