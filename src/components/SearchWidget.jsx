import React, { useState, useEffect } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import CityAutocomplete from './CityAutocomplete';

const SearchWidget = () => {
  const [tripType, setTripType] = useState('return'); // 'return' or 'oneway'
  const [origin, setOrigin] = useState(null); // { name, code }
  const [destination, setDestination] = useState(null);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  const today = new Date().toISOString().split('T')[0];

  const handleDepartDateChange = (e) => {
    const newDate = e.target.value;
    setDepartDate(newDate);
    if (returnDate && newDate > returnDate) {
      setReturnDate(newDate);
    }
  };

  // Listen for clicks from the Trending Destinations section
  useEffect(() => {
    const handleSetDestination = (e) => {
      setDestination(e.detail);
      // Scroll smoothly to the search widget
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    window.addEventListener('setDestination', handleSetDestination);
    return () => window.removeEventListener('setDestination', handleSetDestination);
  }, []);

  // Helper to format YYYY-MM-DD to DDMM for Aviasales
  const formatDateForUrl = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}${month}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!origin?.code || !destination?.code || !departDate) {
      alert("Please select an Origin, Destination, and Departure Date.");
      return;
    }

    const affiliateMarker = "690809"; // Your Travelpayouts marker
    
    const formattedDepart = formatDateForUrl(departDate);
    const formattedReturn = tripType === 'return' ? formatDateForUrl(returnDate) : '';
    
    // URL Format: aviasales.com/search/[OriginIATA][DepartDate][DestinationIATA][ReturnDate][Passengers]
    // One Way: aviasales.com/search/NYC2508LON1
    // Return: aviasales.com/search/NYC2508LON02091
    
    const searchParams = `${origin.code}${formattedDepart}${destination.code}${formattedReturn}${passengers}`;
    const searchUrl = `https://www.aviasales.com/search/${searchParams}?marker=${affiliateMarker}`;
    
    // Redirect to partner site
    window.location.href = searchUrl;
  };

  return (
    <div className="search-widget-wrapper">
      <div className="trip-type-toggle">
        <button 
          className={`toggle-btn ${tripType === 'return' ? 'active' : ''}`}
          onClick={() => setTripType('return')}
        >
          Return
        </button>
        <button 
          className={`toggle-btn ${tripType === 'oneway' ? 'active' : ''}`}
          onClick={() => setTripType('oneway')}
        >
          One Way
        </button>
      </div>

      <div className="search-widget-container glass-panel">
        <form className="search-form" onSubmit={handleSearch}>
          
          <div className="search-input-group">
            <CityAutocomplete 
              label="From" 
              placeholder="Origin City" 
              value={origin} 
              onSelect={setOrigin} 
            />
            
            <div className="divider"></div>
            
            <CityAutocomplete 
              label="To" 
              placeholder="Destination City" 
              value={destination} 
              onSelect={setDestination} 
            />
            
            <div className="divider hidden-mobile"></div>
            
            <div className="input-wrapper">
              <Calendar className="input-icon" size={20} />
              <div className="input-content">
                <label>Depart</label>
                <input 
                  type="date" 
                  value={departDate}
                  min={today}
                  onChange={handleDepartDateChange}
                  required
                />
              </div>
            </div>
            
            {tripType === 'return' && (
              <>
                <div className="divider"></div>
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <div className="input-content">
                    <label>Return</label>
                    <input 
                      type="date" 
                      value={returnDate}
                      min={departDate || today}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required={tripType === 'return'}
                    />
                  </div>
                </div>
              </>
            )}
            
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
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary search-btn">
            <Search size={20} />
            <span>Search Flights</span>
          </button>
        </form>
      </div>
      
      <style>{`
        .search-widget-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .trip-type-toggle {
          display: flex;
          background: rgba(30, 41, 59, 0.7);
          border-radius: 12px 12px 0 0;
          padding: 0.5rem 1rem 1rem;
          margin-bottom: -15px; /* Pull widget up over it */
          gap: 1rem;
          z-index: 1;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-bottom: none;
        }

        .toggle-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .toggle-btn:hover {
          color: white;
        }

        .toggle-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .search-widget-container {
          padding: 1rem;
          background: rgba(30, 41, 59, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 100px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          backdrop-filter: blur(16px);
        }
        
        .search-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          min-width: 0; /* Prevents flex items from overflowing */
        }
        
        .input-wrapper:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .input-icon {
          color: var(--primary-light);
          flex-shrink: 0;
        }
        
        .input-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
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
          text-overflow: ellipsis;
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
          margin: 0 0.25rem;
          flex-shrink: 0;
        }
        
        .search-btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.05rem;
          gap: 0.5rem;
          height: 100%;
          white-space: nowrap;
          flex-shrink: 0;
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
