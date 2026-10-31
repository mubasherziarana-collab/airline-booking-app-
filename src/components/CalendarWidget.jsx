import React from 'react';

const CalendarWidget = () => {
  return (
    <div className="calendar-widget-wrapper" style={{ width: '100%', minHeight: '660px', background: 'white', borderRadius: '16px', padding: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <iframe 
        src="/calendar.html?v=2" 
        style={{ width: '100%', height: '640px', border: 'none', overflow: 'hidden' }}
        title="Low Fare Calendar"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default CalendarWidget;
