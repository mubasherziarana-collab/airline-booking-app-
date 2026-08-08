import React, { useState, useEffect } from 'react';
import { Calendar, Users, Search, Plane, Hotel } from 'lucide-react';
import CityAutocomplete from './CityAutocomplete';

const SearchWidget = () => {
  // Main Tab State
  const [activeTab, setActiveTab] = useState('flights'); // 'flights' or 'hotels'

  // Flights State
  const [tripType, setTripType] = useState('return'); // 'return' or 'oneway'
  const [origin, setOrigin] = useState(null); // { name, code }
  const [destination, setDestination] = useState(null);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');

  // Hotels State
  const [hotelDestination, setHotelDestination] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');

  const today = new Date().toISOString().split('T')[0];
  const affiliateMarker = "690809";

  // Handlers for Flights
  const handleDepartDateChange = (e) => {
    const newDate = e.target.value;
    setDepartDate(newDate);
    if (returnDate && newDate > returnDate) {
      setReturnDate(newDate);
    }
  };

  const formatDateForUrl = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}${month}`;
  };

  const handleFlightSearch = (e) => {
    e.preventDefault();
    if (!origin?.code || !destination?.code || !departDate) {
      alert("Please select an Origin, Destination, and Departure Date.");
      return;
    }

    const formattedDepart = formatDateForUrl(departDate);
    const formattedReturn = tripType === 'return' ? formatDateForUrl(returnDate) : '';
    const searchParams = `${origin.code}${formattedDepart}${destination.code}${formattedReturn}${passengers}`;
    const searchUrl = `https://www.aviasales.com/search/${searchParams}?marker=${affiliateMarker}`;
    
    window.location.href = searchUrl;
  };

  // Handlers for Hotels
  const handleCheckInDateChange = (e) => {
    const newDate = e.target.value;
    setCheckInDate(newDate);
    if (checkOutDate && newDate >= checkOutDate) {
      // Auto-set checkout to the next day
      const nextDay = new Date(newDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleHotelSearch = (e) => {
    e.preventDefault();
    if (!hotelDestination?.name || !checkInDate || !checkOutDate) {
      alert("Please select a Destination, Check-In, and Check-Out date.");
      return;
    }

    // Aviasales Hotels deep link structure
    // Extract just the city name without the IATA code for better hotel searches
    const cityName = hotelDestination.name.split(' (')[0];
    const searchUrl = `https://www.aviasales.com/hotels?destination=${encodeURIComponent(cityName)}&checkIn=${checkInDate}&checkOut=${checkOutDate}&marker=${affiliateMarker}&adults=${guests}`;
    
    window.location.href = searchUrl;
  };

  // Listeners
  useEffect(() => {
    const handleSetDestination = (e) => {
      setActiveTab('flights');
      setDestination(e.detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleActivateHotels = () => {
      setActiveTab('hotels');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('setDestination', handleSetDestination);
    window.addEventListener('activateHotelsTab', handleActivateHotels);
    
    return () => {
      window.removeEventListener('setDestination', handleSetDestination);
      window.removeEventListener('activateHotelsTab', handleActivateHotels);
    };
  }, []);

  return (
    <div className="search-widget-wrapper" id="search-widget">
      
      {/* Main Category Tabs */}
      <div className="main-tabs">
        <button 
          className={`main-tab ${activeTab === 'flights' ? 'active' : ''}`}
          onClick={() => setActiveTab('flights')}
          type="button"
        >
          <Plane size={20} />
          <span>Flights</span>
        </button>
        <button 
          className={`main-tab ${activeTab === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotels')}
          type="button"
        >
          <Hotel size={20} />
          <span>Hotels</span>
        </button>
      </div>

      <div className="search-widget-container glass-panel">
        
        {/* FLIGHTS UI */}
        {activeTab === 'flights' && (
          <div className="flights-ui">
            <div className="trip-type-toggle">
              <button 
                className={`toggle-btn ${tripType === 'return' ? 'active' : ''}`}
                onClick={() => setTripType('return')}
                type="button"
              >
                Return
              </button>
              <button 
                className={`toggle-btn ${tripType === 'oneway' ? 'active' : ''}`}
                onClick={() => setTripType('oneway')}
                type="button"
              >
                One Way
              </button>
            </div>

            <form className="search-form" onSubmit={handleFlightSearch}>
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
        )}

        {/* HOTELS UI */}
        {activeTab === 'hotels' && (
          <div className="hotels-ui">
            <form className="search-form" onSubmit={handleHotelSearch}>
              <div className="search-input-group">
                <div className="destination-wrapper flex-2">
                  <CityAutocomplete 
                    label="Destination" 
                    placeholder="Where are you going?" 
                    value={hotelDestination} 
                    onSelect={setHotelDestination} 
                  />
                </div>
                
                <div className="divider hidden-mobile"></div>
                
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <div className="input-content">
                    <label>Check-In</label>
                    <input 
                      type="date" 
                      value={checkInDate}
                      min={today}
                      onChange={handleCheckInDateChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <div className="input-content">
                    <label>Check-Out</label>
                    <input 
                      type="date" 
                      value={checkOutDate}
                      min={checkInDate || today}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="divider hidden-mobile"></div>
                
                <div className="input-wrapper">
                  <Users className="input-icon" size={20} />
                  <div className="input-content">
                    <label>Guests</label>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="passenger-select"
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary search-btn">
                <Search size={20} />
                <span>Find Hotels</span>
              </button>
            </form>
          </div>
        )}

      </div>
      
      <style>{`
        .search-widget-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .main-tabs {
          display: flex;
          background: rgba(30, 41, 59, 0.9);
          border-radius: 20px 20px 0 0;
          padding: 1rem 1.5rem 1.5rem;
          margin-bottom: -20px;
          gap: 1.5rem;
          z-index: 1;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-bottom: none;
          box-shadow: 0 -10px 20px rgba(0,0,0,0.2);
        }

        .main-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .main-tab:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .main-tab.active {
          color: white;
          background: var(--primary-color);
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
        }

        .trip-type-toggle {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
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
          padding: 1.5rem;
          background: rgba(30, 41, 59, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
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
          gap: 1rem;
        }
        
        .search-input-group {
          display: flex;
          flex: 1;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          flex: 1;
          transition: background 0.2s ease;
          border-radius: 16px;
          min-width: 0;
        }

        .destination-wrapper {
          flex: 1.5;
        }

        .flex-2 {
          flex: 2;
        }
        
        .input-wrapper:hover, .destination-wrapper:hover {
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
          height: 40px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0;
          flex-shrink: 0;
        }
        
        .search-btn {
          padding: 1.25rem 2rem;
          border-radius: 16px;
          font-size: 1.05rem;
          gap: 0.5rem;
          height: 100%;
          white-space: nowrap;
          flex-shrink: 0;
        }
        
        @media (max-width: 1024px) {
          .search-form {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-input-group {
            flex-direction: column;
            align-items: stretch;
            background: transparent;
            border: none;
          }
          
          .input-wrapper, .destination-wrapper {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 0.5rem;
            border-radius: 12px;
          }
          
          .divider {
            display: none;
          }
          
          .search-btn {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchWidget;
