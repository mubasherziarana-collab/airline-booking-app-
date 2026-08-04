import React from 'react';
import SearchWidget from './SearchWidget';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="overlay"></div>
        {/* Placeholder for a beautiful image. In a real app, use a high-res travel image */}
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
          alt="Airplane flying over clouds at sunset" 
          className="hero-img"
        />
      </div>
      
      <div className="container hero-content animate-fade-in">
        <h1 className="hero-title">
          Discover The World<br />
          <span className="text-gradient">Without Limits</span>
        </h1>
        <p className="hero-subtitle">
          Find the best flight deals, book your dream vacation, and manage everything in one seamless experience.
        </p>
        
        <div className="hero-search-wrapper">
          <SearchWidget />
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 6rem;
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, 
            rgba(15, 23, 42, 0.7) 0%, 
            rgba(15, 23, 42, 0.9) 60%,
            var(--bg-color) 100%
          );
        }
        
        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        
        .text-gradient {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.1rem;
          }
        }
        
        .hero-search-wrapper {
          margin-top: 2rem;
          margin-bottom: -4rem; /* pulls the next section up slightly */
          position: relative;
          z-index: 10;
        }
      `}</style>
    </section>
  );
};

export default Hero;
