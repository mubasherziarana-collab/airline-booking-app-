import React from 'react';
import { Plane, Car, Hotel, Compass, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="container header-container">
        <a href="/" className="logo">
          <Plane className="logo-icon" size={28} />
          <span className="logo-text">WanderSky</span>
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
              <a href="#hotels" className="nav-link">
                <Hotel size={18} />
                <span>Hotels</span>
              </a>
            </li>
            <li>
              <a href="#cars" className="nav-link">
                <Car size={18} />
                <span>Car Rentals (via rentoracars.com)</span>
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
          <button className="btn btn-outline login-btn">Sign In</button>
          <button className="btn btn-primary register-btn">Sign Up</button>
          <button className="mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2rem);
          max-width: 1200px;
          z-index: 100;
          padding: 1rem 0;
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          text-decoration: none;
        }
        
        .logo-icon {
          color: var(--primary-light);
        }
        
        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        
        .nav-link:hover, .nav-link.active {
          color: white;
        }
        
        .nav-link.active svg {
          color: var(--primary-light);
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .mobile-menu-btn {
          display: block;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }
        
        .login-btn, .register-btn {
          display: none;
        }
        
        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
          .login-btn, .register-btn {
            display: inline-flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
