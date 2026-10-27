import React from 'react';
import { Plane, Car, Hotel, Compass, Menu, PhoneCall } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <a href="#home" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' })); }} className="logo-wrapper">
          <div className="logo">
            <Plane className="logo-icon" size={28} />
            <span className="logo-text">MyFlyOra</span>
          </div>
          <span className="logo-slogan">Your Journey. Our Wings.</span>
        </a>
        
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li>
              <a href="#flights" className="nav-link active">
                <Plane size={18} />
                <span>Flights</span>
              </a>
            </li>
            <li>
              <a href="#search-widget" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('activateHotelsTab')); }} className="nav-link">
                <Hotel size={18} />
                <span>Hotels</span>
              </a>
            </li>
            <li>
              <a href="#search-widget" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('activateCarsTab')); }} className="nav-link">
                <Car size={18} />
                <span>Car Rentals</span>
              </a>
            </li>
            <li>
              <a href="#explore" className="nav-link">
                <Compass size={18} />
                <span>Explore</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <a href="tel:+18882982636" className="call-agent-btn">
            <PhoneCall size={18} className="phone-icon-pulse" />
            <div className="call-agent-text">
              <span className="call-label">24/7 Phone Booking</span>
              <span className="call-number">1-888-298-2636</span>
            </div>
          </a>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 1.5rem 0;
          background: transparent;
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-decoration: none;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
        }
        
        .logo-icon {
          color: white;
        }
        
        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: white;
        }
        
        .logo-slogan {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: -2px;
          margin-left: 36px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .desktop-nav {
          display: none;
        }
        
        @media (min-width: 992px) {
          .desktop-nav {
            display: block;
          }
        }
        
        .nav-list {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          transition: color 0.2s ease;
        }
        
        .nav-link:hover, .nav-link.active {
          color: white;
        }
        
        .nav-link.active {
          font-weight: 600;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .call-agent-btn {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          color: white;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .call-agent-btn:hover {
          background: white;
          color: #0b57d0;
          border-color: white;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .call-agent-btn:hover .call-label {
          color: #575757;
        }

        .phone-icon-pulse {
          color: #4ade80;
          animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        .call-agent-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          text-align: left;
        }

        .call-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.25s ease;
        }

        .call-number {
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        
        .mobile-menu-btn {
          display: block;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }
        
        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
