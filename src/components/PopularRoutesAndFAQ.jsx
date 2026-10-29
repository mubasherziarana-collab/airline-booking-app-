import React, { useState } from 'react';
import { Plane, ChevronDown, PhoneCall, ShieldCheck, Clock, DollarSign } from 'lucide-react';

const routes = [
  { from: 'New York (JFK)', to: 'London (LHR)', code: 'LON', price: 'from $389', duration: '7h 10m', type: 'Direct / Daily' },
  { from: 'Toronto (YYZ)', to: 'Dubai (DXB)', code: 'DXB', price: 'from $699', duration: '12h 45m', type: 'Popular International' },
  { from: 'Chicago (ORD)', to: 'Istanbul (IST)', code: 'IST', price: 'from $540', duration: '10h 20m', type: 'Top Connection' },
  { from: 'Los Angeles (LAX)', to: 'Tokyo (TYO)', code: 'TYO', price: 'from $599', duration: '11h 30m', type: 'Transpacific Nonstop' },
  { from: 'London (LHR)', to: 'Singapore (SIN)', code: 'SIN', price: 'from $520', duration: '12h 50m', type: 'Direct Hub' },
  { from: 'New York (JFK)', to: 'Sao Paulo (GRU)', code: 'SAO', price: 'from $610', duration: '9h 35m', type: 'South America' }
];

const faqs = [
  {
    question: 'How does MyFlyOra find the lowest flight prices?',
    answer: 'MyFlyOra connects directly with leading global airlines, flight aggregators, and wholesale inventory networks in real time. We scan hundreds of sources simultaneously—including Aviasales, Expedia, and direct carrier deals—allowing you to compare fares transparently without any added markups or booking fees.'
  },
  {
    question: 'Can I book flights over the phone with a live agent?',
    answer: 'Yes! MyFlyOra provides a dedicated 24/7 flight reservation phone desk at 1-888-298-2636. If you are booking complex international multi-city routes, group travel, or need immediate assistance with unpublished wholesale fares, our certified reservation specialists are available around the clock.'
  },
  {
    question: 'Does MyFlyOra charge any extra booking fees?',
    answer: 'No. MyFlyOra is 100% free for travelers. When you find a flight, hotel, or car rental you like, we redirect you directly to the verified provider or official airline to complete your reservation at their verified rate.'
  },
  {
    question: 'What is the best time to book international flight tickets?',
    answer: 'For long-haul international flights, the optimal booking window is generally between 6 to 12 weeks before departure. Mid-week departures (Tuesdays and Wednesdays) typically offer lower fares compared to peak weekend flights. You can also monitor flexible dates on our search widget to spot seasonal price drops.'
  }
];

const PopularRoutesAndFAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleRouteClick = (code, city, e) => {
    e.preventDefault();
    const event = new CustomEvent('setDestination', { 
      detail: { code, name: `${city} (${code})` } 
    });
    window.dispatchEvent(event);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <section className="routes-faq-section">
      <div className="container">
        
        {/* POPULAR ROUTES */}
        <div className="section-header text-center">
          <span className="badge">Trending Destinations</span>
          <h2 className="section-title">Popular International Flight Routes</h2>
          <p className="section-subtitle">
            Compare live fares across top-searched global airline corridors. Click any route to compare dates instantly.
          </p>
        </div>

        <div className="routes-grid">
          {routes.map((route, idx) => (
            <div 
              key={idx} 
              className="route-card"
              onClick={(e) => handleRouteClick(route.code, route.to.split(' ')[0], e)}
            >
              <div className="route-header">
                <div className="route-cities">
                  <div className="city-from">{route.from}</div>
                  <div className="route-arrow">
                    <Plane size={16} />
                  </div>
                  <div className="city-to">{route.to}</div>
                </div>
                <span className="route-price">{route.price}</span>
              </div>
              <div className="route-footer">
                <span className="route-tag">{route.type}</span>
                <span className="route-time"><Clock size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {route.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* TRUST BADGES / E-E-A-T */}
        <div className="trust-strip">
          <div className="trust-item">
            <ShieldCheck size={28} className="trust-icon" />
            <div>
              <h4>Zero Added Fees</h4>
              <p>Transparent rates with no surprise markups</p>
            </div>
          </div>
          <div className="trust-item">
            <DollarSign size={28} className="trust-icon" />
            <div>
              <h4>Real-Time Comparison</h4>
              <p>Instant quotes from hundreds of travel sites</p>
            </div>
          </div>
          <div className="trust-item">
            <PhoneCall size={28} className="trust-icon" />
            <div>
              <h4>24/7 Live Desk</h4>
              <p>Direct assistance via 1-888-298-2636</p>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="faq-wrapper">
          <div className="section-header text-center" style={{ marginTop: '4rem' }}>
            <span className="badge">Frequently Asked Questions</span>
            <h2 className="section-title">Everything You Need to Know</h2>
            <p className="section-subtitle">
              Common questions about finding flights, baggage rules, and booking with MyFlyOra.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <ChevronDown size={20} className="faq-chevron" />
                </div>
                {openFaq === index && (
                  <div className="faq-answer fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .routes-faq-section {
          padding: 5rem 0;
          background: #f8fafc;
        }

        .badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #0b57d0;
          background: #e8f0fe;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          margin-bottom: 0.75rem;
        }

        .text-center {
          text-align: center;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.5rem;
          letter-spacing: -0.5px;
        }

        .section-subtitle {
          color: #64748b;
          font-size: 1rem;
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .routes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }

        .route-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .route-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          border-color: #93c5fd;
        }

        .route-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }

        .route-cities {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.95rem;
          color: #0f172a;
        }

        .route-arrow {
          color: #0b57d0;
          display: flex;
          align-items: center;
        }

        .route-price {
          font-weight: 800;
          font-size: 1.05rem;
          color: #059669;
        }

        .route-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: #64748b;
          border-top: 1px solid #f1f5f9;
          padding-top: 0.65rem;
        }

        .route-tag {
          background: #f1f5f9;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .trust-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.75rem 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .trust-icon {
          color: #0b57d0;
          flex-shrink: 0;
        }

        .trust-item h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.2rem 0;
        }

        .trust-item p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }

        .faq-wrapper {
          max-width: 780px;
          margin: 0 auto;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .faq-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.15rem 1.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-item:hover {
          border-color: #cbd5e1;
        }

        .faq-item.active {
          border-color: #93c5fd;
          box-shadow: 0 4px 12px rgba(147, 197, 253, 0.15);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .faq-question h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .faq-chevron {
          color: #64748b;
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .faq-item.active .faq-chevron {
          transform: rotate(180deg);
          color: #0b57d0;
        }

        .faq-answer {
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid #f1f5f9;
        }

        .faq-answer p {
          color: #475569;
          line-height: 1.6;
          font-size: 0.95rem;
          margin: 0;
        }
      `}</style>
    </section>
  );
};

export default PopularRoutesAndFAQ;
