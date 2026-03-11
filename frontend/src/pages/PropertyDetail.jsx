import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, ArrowLeft, Heart, Share2, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProperty(data);
        } else {
          setProperty(null);
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>Loading property details...</div>;
  }

  if (!property) {
    return <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>Property not found!</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
      <Link to="/properties" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', transition: 'color 0.2s', fontWeight: 500 }} className="hover:text-accent">
        <ArrowLeft size={20} /> Back to Properties
      </Link>

      <div className="grid grid-cols-1" style={{ gap: '2rem' }}>
        {/* Main Image Banner */}
        <motion.div 
          style={{ width: '100%', height: '500px', borderRadius: '1rem', overflow: 'hidden', position: 'relative' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={property.images[0]} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button className="btn-icon" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--text-primary)' }}><Share2 size={20} /></button>
            <button className="btn-icon" style={{ background: 'rgba(255,255,255,0.9)', color: '#ef4444' }}><Heart size={20} /></button>
          </div>
        </motion.div>

        {/* Property Details Core */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem' }}>
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{property.title}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    <MapPin size={20} /> <span>{property.location}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>${property.price.toLocaleString()}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>per month</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', margin: '2rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}><Bed size={24} color="var(--accent-primary)" /> <span><strong>{property.bedrooms}</strong> Beds</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}><Bath size={24} color="var(--accent-primary)" /> <span><strong>{property.bathrooms}</strong> Baths</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem' }}><Maximize size={24} color="var(--accent-primary)" /> <span><strong>{property.area}</strong> sqft</span></div>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Description</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{property.description}</p>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Amenities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={20} color="var(--success)" /> {amenity}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="card" style={{ padding: '2rem', position: 'sticky', top: '90px' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Contact Agent</h3>
              <form>
                <div className="form-group">
                  <input type="text" className="form-input" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <input type="email" className="form-input" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <input type="tel" className="form-input" placeholder="Your Phone" />
                </div>
                <div className="form-group">
                  <textarea className="form-input" rows="4" placeholder="Hello, I am interested in this property..." style={{ resize: 'vertical' }}></textarea>
                </div>
                <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>Request Tour</button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
