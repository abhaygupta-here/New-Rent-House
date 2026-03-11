import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, Search } from 'lucide-react';
import useStore from '../store/useStore';

const UsersDirectory = () => {
  const { theme } = useStore();
  
  // Mock users data
  const users = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: ['Alice Johnson', 'Michael Smith', 'Sarah Williams', 'David Brown', 'Emma Davis', 'James Miller', 'Olivia Wilson', 'William Moore'][i],
    role: i < 2 ? 'Admin' : 'User',
    email: `user${i+1}@casazen.com`,
    phone: `+1 (555) 010-${1000 + i}`,
    joinedDate: new Date(Date.now() - (i * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
    avatar: `https://i.pravatar.cc/150?u=${i}`
  }));

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Users Directory</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Manage and view registered platform users.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '400px', position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="form-input" 
            style={{ paddingLeft: '3rem', width: '100%' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ gap: '1.5rem' }}>
        {users.map((user, index) => (
          <motion.div 
            key={user.id}
            className="card"
            style={{ padding: '1.5rem', textAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1rem' }}>
              <img 
                src={user.avatar} 
                alt={user.name} 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)' }}
              />
              {user.role === 'Admin' && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg-primary)' }}>
                  <Users size={12} color="white" />
                </div>
              )}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{user.name}</h3>
            <span style={{ 
              display: 'inline-block', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '1rem', 
              fontSize: '0.75rem', 
              fontWeight: 600,
              background: user.role === 'Admin' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
              color: user.role === 'Admin' ? 'var(--success)' : 'var(--accent-primary)',
              marginBottom: '1rem'
            }}>
              {user.role}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Mail size={14} /> <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{user.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Phone size={14} /> <span>{user.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Calendar size={14} /> <span>Joined {user.joinedDate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UsersDirectory;
