import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About MyFlyOra</h1>
        <p>Your ultimate travel meta-search companion.</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            MyFlyOra is a modern, responsive travel aggregator designed to provide a seamless booking experience. 
            We are passionate about making travel accessible, affordable, and easy to plan. Whether you are looking for 
            a quick weekend getaway or a month-long international adventure, our platform brings the best deals 
            directly to your fingertips.
          </p>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <p>
            We are a <strong>meta-search engine</strong>, which means we do not sell tickets directly or process payments. 
            Instead, our advanced search widget scans hundreds of airlines, hotels, and travel agencies at once. 
            Once you find the perfect flight, hotel, or car rental, we securely redirect you to trusted, world-renowned 
            partners like <strong>Aviasales</strong>, <strong>Kiwi.com</strong>, and <strong>Booking.com</strong> to complete your transaction safely.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Trusted Partners</h2>
          <div className="partners-grid">
            <div className="partner-card">
              <h3>Aviasales</h3>
              <p>Global flight search partner providing access to over 700 airlines.</p>
            </div>
            <div className="partner-card">
              <h3>Kiwi.com</h3>
              <p>Innovative flight aggregator specializing in connecting uncooperative airlines for massive discounts.</p>
            </div>
            <div className="partner-card">
              <h3>Hotellook</h3>
              <p>Hotel comparison engine that scans Booking.com, Agoda, and 80+ other booking agencies.</p>
            </div>
            <div className="partner-card">
              <h3>GetRentacar</h3>
              <p>World-class car rental marketplace offering transparent pricing.</p>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .about-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 4rem 2rem;
          color: var(--text-primary);
        }

        .about-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .about-header h1 {
          font-size: 3rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .about-header p {
          font-size: 1.25rem;
          color: var(--text-secondary);
        }

        .about-section {
          margin-bottom: 3rem;
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .about-section h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          border-bottom: 2px solid var(--surface-light);
          padding-bottom: 0.5rem;
        }

        .about-section p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .partner-card {
          background: var(--surface-color);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--surface-light);
        }

        .partner-card h3 {
          color: var(--primary-color);
          margin-bottom: 0.75rem;
        }

        .partner-card p {
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
