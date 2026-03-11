import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Maximize, MapPin, Bed, Bath, Search } from 'lucide-react';
import useStore from '../store/useStore';

const PropertyCard = ({ property, index }) => {
  return (
    <motion.div 
      className="card" 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/properties/${property._id}`} style={{ display: 'block', height: '100%' }}>
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img 
            src={property.images[0] || 'https://via.placeholder.com/400x300'} 
            alt={property.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={(e) => { e.preventDefault(); /* Prevent navigation when clicking heart */ }}
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}
            >
              <Heart size={18} fill="none" />
            </button>
          </div>
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', padding: '0.25rem 0.75rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600 }}>
            ${property.price.toLocaleString()}/mo
          </div>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            <MapPin size={16} /> <span>{property.location}</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{property.title}</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
              <Bed size={18} /> <span>{property.bedrooms} Beds</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
              <Bath size={18} /> <span>{property.bathrooms} Baths</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
              <Maximize size={18} /> <span>{property.area} sqft</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/properties');
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Discover Properties</h2>
          <p>Find your ideal home from our curated selection.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '400px', position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search by location..." 
            className="form-input" 
            style={{ paddingLeft: '3rem', width: '100%' }}
          />
        </div>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading properties...</div>
      ) : (
        <div className="grid grid-cols-3">
          {properties.map((prop, idx) => <PropertyCard key={prop._id} property={prop} index={idx} />)}
        </div>
      )}
    </div>
  );
};

export default Properties;
