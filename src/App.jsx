import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PopularDestinations from './components/PopularDestinations';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <PopularDestinations />
      </main>
      <Footer />
    </div>
  );
}

export default App;
