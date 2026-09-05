import React from 'react';
import { Plane } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo">
              <Plane className="logo-icon" size={28} />
              <span className="logo-text">MyFlyOra</span>
            </a>
            <p className="brand-desc">
              Your ultimate travel companion for flights, hotels, and seamless experiences worldwide.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">FB</a>
              <a href="#" className="social-link">TW</a>
              <a href="#" className="social-link">IG</a>
              <a href="#" className="social-link">LI</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-heading">Services</h4>
            <ul>
              <li><a href="#">Flight Search</a></li>
              <li><a href="#search-widget" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('activateHotelsTab')); }}>Hotels</a></li>
              <li><a href="#search-widget" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('activateCarsTab')); }}>Car Rentals</a></li>
              <li><a href="#">Travel Insurance</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-heading">Company</h4>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'about' })); }}>About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="mailto:mubasherziarana@gmail.com">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-heading">Legal</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="disclaimer">
            <strong>Disclaimer:</strong> MyFlyOra is a travel meta-search engine. We do not process bookings, take payments, or collect credit card information. We securely redirect you to trusted partners like Aviasales, Kiwi.com, and Booking.com to complete your transaction safely.
          </p>
          <p>&copy; {new Date().getFullYear()} MyFlyOra. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .disclaimer {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.5;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .footer {
          background-color: var(--surface-color);
          padding: 4rem 0 2rem;
          margin-top: 4rem;
          border-top: 1px solid var(--surface-light);
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          margin-bottom: 1rem;
        }
        
        .logo-icon {
          color: var(--primary-color);
        }
        
        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        
        .brand-desc {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          max-width: 300px;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--surface-light);
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        
        .social-link:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-3px);
        }
        
        .footer-heading {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        .footer-links ul {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        
        .footer-links a {
          color: var(--text-secondary);
        }
        
        .footer-links a:hover {
          color: var(--primary-color);
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid var(--surface-light);
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
