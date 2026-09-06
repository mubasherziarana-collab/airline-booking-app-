import React, { useState, useEffect } from 'react';
import { Calendar, Users, Search, Plane, Hotel, Car, Ticket } from 'lucide-react';
import CityAutocomplete from './CityAutocomplete';
import KiwiWidget from './KiwiWidget';

const SearchWidget = () => {
  // Main Tab State
  const [activeTab, setActiveTab] = useState('flights'); // 'flights', 'hotels', 'cars', or 'cheapoair'


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

  // Cars State
  const [carLocation, setCarLocation] = useState(null);
  const [carPickUpDate, setCarPickUpDate] = useState('');
  const [carDropOffDate, setCarDropOffDate] = useState('');

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

    // Aviasales/Hotellook redirector endpoint
    const cityName = hotelDestination.name.split(' (')[0];
    const searchUrl = `https://search.hotellook.com/?destination=${encodeURIComponent(cityName)}&checkIn=${checkInDate}&checkOut=${checkOutDate}&marker=${affiliateMarker}&adults=${guests}`;
    
    window.location.href = searchUrl;
  };

  // Handlers for Cars
  const handleCarPickUpDateChange = (e) => {
    const newDate = e.target.value;
    setCarPickUpDate(newDate);
    if (carDropOffDate && newDate >= carDropOffDate) {
      // Auto-set dropoff to the next day
      const nextDay = new Date(newDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCarDropOffDate(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleCarSearch = (e) => {
    e.preventDefault();
    if (!carLocation?.name || !carPickUpDate || !carDropOffDate) {
      alert("Please select a Location, Pick-up, and Drop-off date.");
      return;
    }

    // We are using your specific Travelpayouts affiliate link for GetRentacar
    const searchUrl = `https://getrentacar.tpo.lu/SHL4jeZu`;
    
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

    const handleActivateCars = () => {
      setActiveTab('cars');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('setDestination', handleSetDestination);
    window.addEventListener('activateHotelsTab', handleActivateHotels);
    window.addEventListener('activateCarsTab', handleActivateCars);
    
    return () => {
      window.removeEventListener('setDestination', handleSetDestination);
      window.removeEventListener('activateHotelsTab', handleActivateHotels);
      window.removeEventListener('activateCarsTab', handleActivateCars);
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
        <button 
          className={`main-tab ${activeTab === 'cars' ? 'active' : ''}`}
          onClick={() => setActiveTab('cars')}
          type="button"
        >
          <Car size={20} />
          <span>Cars</span>
        </button>
        <button 
          className={`main-tab ${activeTab === 'kiwi' ? 'active' : ''}`}
          onClick={() => setActiveTab('kiwi')}
          type="button"
        >
          <Plane size={20} />
          <span>Kiwi.com</span>
        </button>
        <button 
          className={`main-tab ${activeTab === 'cheapoair' ? 'active' : ''}`}
          onClick={() => setActiveTab('cheapoair')}
          type="button"
        >
          <Ticket size={20} />
          <span>CheapOair</span>
        </button>
      </div>

      <div className="search-widget-container">
        
        {/* FLIGHTS UI */}
        {activeTab === 'flights' && (
          <div className="flights-ui fade-in">
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
          <div className="hotels-ui fade-in">
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

        {/* CARS UI */}
        {activeTab === 'cars' && (
          <div className="cars-ui fade-in">
            <form className="search-form" onSubmit={handleCarSearch}>
              <div className="search-input-group">
                <div className="destination-wrapper flex-2">
                  <CityAutocomplete 
                    label="Pick-up Location" 
                    placeholder="City or Airport" 
                    value={carLocation} 
                    onSelect={setCarLocation} 
                  />
                </div>
                
                <div className="divider hidden-mobile"></div>
                
                <div className="input-wrapper flex-1-5">
                  <Calendar className="input-icon" size={20} />
                  <div className="input-content">
                    <label>Pick-up Date</label>
                    <input 
                      type="date" 
                      value={carPickUpDate}
                      min={today}
                      onChange={handleCarPickUpDateChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div className="input-wrapper flex-1-5">
                  <Calendar className="input-icon" size={20} />
                  <div className="input-content">
                    <label>Drop-off Date</label>
                    <input 
                      type="date" 
                      value={carDropOffDate}
                      min={carPickUpDate || today}
                      onChange={(e) => setCarDropOffDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary search-btn">
                <Search size={20} />
                <span>Find Cars</span>
              </button>
            </form>
          </div>
        )}

        {/* KIWI UI */}
        {activeTab === 'kiwi' && (
          <div className="kiwi-ui fade-in">
            <KiwiWidget />
          </div>
        )}

        {/* CHEAPOAIR UI */}
        {activeTab === 'cheapoair' && (
          <div className="cheapoair-ui fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <Ticket size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Compare Exclusive Deals on CheapOair</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              We partner with CheapOair to bring you massive discounts on last-minute flights and international travel. 
            </p>
            <a 
              href="https://www.cheapoair.com" 
              className="btn btn-primary search-btn" 
              style={{ display: 'inline-flex', padding: '1rem 2rem', textDecoration: 'none' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Search on CheapOair</span>
            </a>
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

        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .main-tabs {
          display: flex;
          background: transparent;
          padding: 0;
          margin-bottom: 1rem;
          gap: 0.5rem;
          z-index: 1;
        }

        .main-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .main-tab:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .main-tab.active {
          color: var(--primary-color);
          background: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
          color: var(--text-primary);
        }

        .toggle-btn.active {
          background: var(--surface-light);
          color: var(--text-primary);
        }

        .search-widget-container {
          padding: 1.5rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
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
          background: white;
          border-radius: 12px;
          border: 1px solid var(--surface-light);
        }
        
        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          flex: 1;
          transition: background 0.2s ease;
          border-radius: 12px;
          min-width: 0;
          background: white;
        }

        .destination-wrapper {
          flex: 1.5;
        }

        .flex-2 {
          flex: 2;
        }

        .flex-1-5 {
          flex: 1.5;
        }
        
        .input-wrapper:hover, .destination-wrapper:hover {
          background: #f8fafc;
        }
        
        .input-icon {
          color: var(--primary-color);
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
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 500;
          outline: none;
          width: 100%;
          font-family: var(--font-sans);
          cursor: pointer;
          text-overflow: ellipsis;
        }
        
        .input-content input::placeholder {
          color: #a0aec0;
        }
        
        .input-content input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
        }
        
        .passenger-select option {
          background: white;
          color: var(--text-primary);
        }
        
        .divider {
          width: 1px;
          height: 40px;
          background: var(--surface-light);
          margin: 0;
          flex-shrink: 0;
        }
        
        .search-btn {
          padding: 1.25rem 2rem;
          border-radius: 12px;
          font-size: 1.05rem;
          gap: 0.5rem;
          height: 100%;
          white-space: nowrap;
          flex-shrink: 0;
          background: var(--secondary-color);
          color: white;
          font-weight: 700;
          border: none;
        }
        
        .search-btn:hover {
          background: #e66000;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 109, 0, 0.3);
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
            background: white;
            border: 1px solid var(--surface-light);
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
