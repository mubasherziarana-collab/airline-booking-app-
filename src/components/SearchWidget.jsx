import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

const SearchWidget = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1 Adult');

  const handleSearch = (e) => {
    e.preventDefault();
    
    // In a real app, you would use an Autocomplete API to convert city names (e.g., "New York")
    // into IATA airport codes (e.g., "NYC") to build a direct search URL.
    
    // For this basic link approach demo, we'll redirect the user to your partner site
    // (Aviasales/Jetradar) with a demo affiliate marker attached.
    const affiliateMarker = "690809"; // Replace this with your actual Travelpayouts marker
    
    const basicLinkUrl = `https://www.aviasales.com/?marker=${affiliateMarker}`;
    
    alert(`Basic Link Approach:\n\nRedirecting you to our partner site to complete your search for flights from ${origin || 'Anywhere'} to ${destination || 'Anywhere'}...`);
    
    // Open the partner site in a new tab so they don't lose your app
    window.open(basicLinkUrl, '_blank');
  };

  return (
    <div className="search-widget-container glass-panel">
      <form className="search-form" onSubmit={handleSearch}>
        
        <div className="search-input-group">
          <div className="input-wrapper">
            <MapPin className="input-icon" size={20} />
            <div className="input-content">
              <label>From</label>
              <input 
                type="text" 
                placeholder="Origin City or Airport" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="input-wrapper">
            <MapPin className="input-icon" size={20} />
            <div className="input-content">
              <label>To</label>
              <input 
                type="text" 
                placeholder="Destination City" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divider hidden-mobile"></div>
          
          <div className="input-wrapper">
            <Calendar className="input-icon" size={20} />
            <div className="input-content">
              <label>Depart</label>
              <input 
                type="date" 
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="input-wrapper">
            <Calendar className="input-icon" size={20} />
            <div className="input-content">
              <label>Return</label>
              <input 
                type="date" 
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divider hidden-mobile"></div>
          
          <div className="input-wrapper">
            <Users className="input-icon" size={20} />
            <div className="input-content">
              <label>Travelers</label>
              <select 
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="passenger-select"
              >
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>Family (4+)</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary search-btn">
          <Search size={20} />
          <span>Search Flights</span>
        </button>
      </form>
      
      <style>{`
        .search-widget-container {
          padding: 1.5rem;
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 100px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .search-form {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .search-input-group {
          display: flex;
          flex: 1;
          align-items: center;
          background: transparent;
          border-radius: 50px;
        }
        
        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          flex: 1;
          transition: background 0.2s ease;
          border-radius: 20px;
        }
        
        .input-wrapper:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .input-icon {
          color: var(--primary-light);
        }
        
        .input-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        
        .input-content label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        
        .input-content input, .input-content select {
          background: transparent;
          border: none;
          color: white;
          font-size: 0.95rem;
          font-weight: 500;
          outline: none;
          width: 100%;
          font-family: var(--font-sans);
          cursor: pointer;
        }
        
        .input-content input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .input-content input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }
        
        .passenger-select option {
          background: var(--surface-color);
          color: white;
        }
        
        .divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 0.5rem;
        }
        
        .search-btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.05rem;
          gap: 0.5rem;
          height: 100%;
          white-space: nowrap;
        }
        
        @media (max-width: 1024px) {
          .search-widget-container {
            border-radius: 24px;
            padding: 1.5rem;
          }
          
          .search-form {
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
          }
          
          .search-input-group {
            flex-direction: column;
            align-items: stretch;
            background: transparent;
          }
          
          .input-wrapper {
            padding: 1rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            margin-bottom: 0.5rem;
          }
          
          .divider {
            display: none;
          }
          
          .search-btn {
            padding: 1.25rem;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchWidget;
