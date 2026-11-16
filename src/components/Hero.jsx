import React from 'react';
import SearchWidget from './SearchWidget';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">
          Search cheap flight tickets
        </h1>
        <p className="hero-subtitle">
          Compare deals from hundreds of travel sites at once.
        </p>
        
        <div className="hero-search-wrapper">
          <SearchWidget />
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 550px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 6rem;
          padding-bottom: 2rem;
          background-color: var(--primary-color);
          overflow-x: hidden;
          width: 100%;
        }
        
        .hero-content {
          text-align: center;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          color: white;
          font-weight: 800;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.1rem;
          }
          .hero-subtitle {
            font-size: 1.05rem;
            margin-bottom: 1.5rem;
          }
          .hero {
            min-height: 480px;
            padding-top: 5.5rem;
          }
        }
        
        .hero-search-wrapper {
          margin-top: 1rem;
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 100%;
        }
      `}</style>
    </section>
  );
};

export default Hero;
