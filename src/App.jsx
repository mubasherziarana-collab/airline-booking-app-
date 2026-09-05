import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PopularDestinations from './components/PopularDestinations';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleNavigation = (e) => {
      setCurrentPage(e.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('navigate', handleNavigation);
    return () => window.removeEventListener('navigate', handleNavigation);
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <PopularDestinations />
          </>
        ) : (
          <AboutUs />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
