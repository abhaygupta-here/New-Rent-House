import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const AddProperty = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    imageUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Clean up payload
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        images: formData.imageUrl ? [formData.imageUrl] : []
      };

      const res = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        navigate('/properties');
      } else {
        setError(data.message || 'Failed to add property');
      }
    } catch (err) {
      setError('An error occurred while adding the property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ flex: 1, padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <motion.div 
        className="card" 
        style={{ width: '100%', maxWidth: '700px', padding: '3rem' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>List Your Property</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Enter the details of the house you want to rent out.
        </p>

        {error && <div style={{ color: 'var(--danger)', marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Property Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-input" placeholder="e.g. Modern Downtown Loft" required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Monthly Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-input" placeholder="e.g. 2500" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-input" placeholder="e.g. New York, NY" required />
          </div>

          <div className="grid grid-cols-3" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Bedrooms</label>
              <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Bathrooms</label>
              <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="form-input" required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Area (sqft)</label>
              <input type="number" name="area" value={formData.area} onChange={handleChange} className="form-input" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Property Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      const MAX_WIDTH = 1200;
                      const scaleSize = MAX_WIDTH / img.width;
                      canvas.width = MAX_WIDTH;
                      canvas.height = img.height * scaleSize;

                      const ctx = canvas.getContext('2d');
                      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                      
                      // Compress to JPEG with 0.7 quality to guarantee small payload
                      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                      setFormData({ ...formData, imageUrl: compressedBase64 });
                    };
                    img.src = reader.result;
                  };
                  reader.readAsDataURL(file);
                }
              }} 
              className="form-input" 
              style={{ paddingTop: '0.5rem' }}
              required 
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>Upload a high-quality image of the property.</span>
            
            {formData.imageUrl && (
              <div style={{ marginTop: '1rem', width: '100%', height: '200px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="form-input" 
              rows="4" 
              placeholder="Describe the property, amenities, neighborhood, etc." 
              required 
              style={{ resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Listing Property...' : 'List Property'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProperty;
