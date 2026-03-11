import { motion } from 'framer-motion';
import { ArrowRight, Search, MapPin, Building } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--accent-light) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--accent-primary)', opacity: 0.05, filter: 'blur(100px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--success)', opacity: 0.05, filter: 'blur(100px)' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <motion.h1 
              style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your Next <span style={{ color: 'var(--accent-primary)' }}>Perfect</span> Home
            </motion.h1>
            
            <motion.p 
              style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover stunning properties crafted for your lifestyle. Seamless searching, intuitive design, and real-time updates.
            </motion.p>

            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="btn btn-primary gap-2" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                <Search size={20} /> Browse Properties
              </button>
              <button className="btn btn-outline gap-2" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                Learn More <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            style={{ display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/images/hero.png" 
              alt="Modern ultra-luxury home exterior" 
              style={{ 
                width: '100%', 
                maxWidth: '600px', 
                borderRadius: '1.5rem', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)', 
                border: '1px solid rgba(255, 255, 255, 0.1)' 
              }} 
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Features Section */}
      <section className="container py-24" style={{ padding: '6rem 1.5rem' }}>
        <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Why Choose CasaZen</h2>
        <div className="grid grid-cols-3">
          {[
            { icon: Search, title: 'Smart Search', desc: 'Find properties instantly with our advanced filtering.' },
            { icon: MapPin, title: 'Prime Locations', desc: 'Curated homes in the most desirable neighborhoods.' },
            { icon: Building, title: 'Verified Quality', desc: 'Every listing verified for the highest standards.' }
          ].map((feature, idx) => (
            <motion.div 
              key={idx} 
              className="card" 
              style={{ padding: '2rem', textAlign: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', background: 'var(--accent-light)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <feature.icon size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem' }}>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
