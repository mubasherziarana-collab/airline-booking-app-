import React from 'react';

const destinations = [
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    code: 'PAR',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    price: 'from $499'
  },
  {
    id: 2,
    city: 'Tokyo',
    country: 'Japan',
    code: 'TYO',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop',
    price: 'from $699'
  },
  {
    id: 3,
    city: 'New York',
    country: 'USA',
    code: 'NYC',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
    price: 'from $299'
  },
  {
    id: 4,
    city: 'Bali',
    country: 'Indonesia',
    code: 'DPS',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop',
    price: 'from $899'
  }
];

const PopularDestinations = () => {
  const handleDestinationClick = (dest, e) => {
    e.preventDefault();
    const event = new CustomEvent('setDestination', { 
      detail: { code: dest.code, name: `${dest.city} (${dest.code})` } 
    });
    window.dispatchEvent(event);
  };

  return (
    <section className="destinations section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trending Destinations</h2>
          <p className="section-subtitle">Explore our most popular spots around the globe.</p>
        </div>
        
        <div className="grid">
          {destinations.map((dest) => (
            <div 
              key={dest.id} 
              onClick={(e) => handleDestinationClick(dest, e)}
              className="card group"
              style={{cursor: 'pointer'}}
            >
              <div className="card-img-wrapper">
                <img src={dest.image} alt={dest.city} className="card-img" />
                <div className="card-overlay">
                  <span className="price-tag">{dest.price}</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{dest.city}</h3>
                <p className="card-location">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .section-padding {
          padding: 6rem 0;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .card {
          background: var(--surface-color);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid var(--surface-light);
          cursor: pointer;
        }
        
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        
        .card-img-wrapper {
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .card:hover .card-img {
          transform: scale(1.1);
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }
        
        .price-tag {
          background: var(--gradient-primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
        }
        
        .card-content {
          padding: 1.5rem;
        }
        
        .card-title {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }
        
        .card-location {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
};

export default PopularDestinations;
