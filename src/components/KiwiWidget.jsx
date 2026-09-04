import React, { useEffect, useRef } from 'react';

const KiwiWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = "https://trpwdg.com/content?currency=usd&trs=559367&shmarker=690809&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";
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
