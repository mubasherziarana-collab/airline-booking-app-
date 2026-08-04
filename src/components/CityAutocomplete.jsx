import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const CityAutocomplete = ({ label, placeholder, value, onSelect }) => {
  const [query, setQuery] = useState(value?.name || '');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value && value.name !== query) {
      setQuery(value.name);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      // If user typed exactly what is selected, don't fetch again
      if (value && query === value.name) return;

      setLoading(true);
      try {
        const response = await fetch(`https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(query)}&locale=en&types[]=city,airport`);
        const data = await response.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (place) => {
    const displayName = `${place.name} (${place.code})`;
    setQuery(displayName);
    setIsOpen(false);
    onSelect({ name: displayName, code: place.code });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (!isOpen && e.target.value.length >= 2) setIsOpen(true);
  };

  return (
    <div className="input-wrapper autocomplete-wrapper" ref={wrapperRef}>
      <MapPin className="input-icon" size={20} />
      <div className="input-content">
        <label>{label}</label>
        <input 
          type="text" 
          placeholder={placeholder} 
          value={query}
          onChange={handleChange}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        />
        
        {isOpen && (results.length > 0 || loading) && (
          <div className="autocomplete-dropdown glass-panel">
            {loading ? (
              <div className="dropdown-item loading">Searching...</div>
            ) : (
              results.map((place) => (
                <div 
                  key={place.id} 
                  className="dropdown-item"
                  onClick={() => handleSelect(place)}
                >
                  <span className="place-name">{place.name}</span>
                  <span className="place-code">{place.code}</span>
                  {place.country_name && <span className="place-country">{place.country_name}</span>}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        .autocomplete-wrapper {
          position: relative;
        }
        
        .autocomplete-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          width: 250px;
          max-height: 300px;
          overflow-y: auto;
          background: var(--surface-color);
          border: 1px solid var(--surface-light);
          border-radius: 12px;
          margin-top: 8px;
          z-index: 50;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        
        @media (max-width: 1024px) {
          .autocomplete-dropdown {
            width: 100%;
          }
        }
        
        .dropdown-item {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s;
        }
        
        .dropdown-item:last-child {
          border-bottom: none;
        }
        
        .dropdown-item:hover {
          background: rgba(255,255,255,0.1);
        }
        
        .dropdown-item.loading {
          color: var(--text-secondary);
          justify-content: center;
          font-size: 0.9rem;
        }
        
        .place-name {
          color: white;
          font-weight: 500;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .place-code {
          background: var(--primary-color);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: bold;
        }
        
        .place-country {
          color: var(--text-secondary);
          font-size: 0.8rem;
          display: none;
        }
        
        @media (min-width: 768px) {
          .place-country {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default CityAutocomplete;
