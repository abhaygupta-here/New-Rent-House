import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Home, Users, DollarSign, Activity, PlusCircle, Settings, LogOut } from 'lucide-react';
import useStore from '../store/useStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user, theme, logout } = useStore();
  const [stats, setStats] = useState({ properties: 24, users: 156, revenue: 84000 });

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Views',
        data: [650, 890, 1200, 1100, 1600, 2100],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const barChartData = {
    labels: ['Rentals', 'Sales', 'Leases'],
    datasets: [
      {
        label: 'Transactions',
        data: [45, 12, 28],
        backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6'],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: theme === 'dark' ? '#f8fafc' : '#0f172a' } }
    },
    scales: {
      x: { ticks: { color: theme === 'dark' ? '#94a3b8' : '#475569' }, grid: { color: theme === 'dark' ? '#334155' : '#e2e8f0' } },
      y: { ticks: { color: theme === 'dark' ? '#94a3b8' : '#475569' }, grid: { color: theme === 'dark' ? '#334155' : '#e2e8f0' } }
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div 
      className="card" 
      style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      whileHover={{ y: -5 }}
    >
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.875rem', margin: 0 }}>{value}</h3>
      </div>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: `${color}20`, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} />
      </div>
    </motion.div>
  );

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <h3 style={{ margin: 0 }}>Welcome, {user?.name || 'User'}</h3>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>Administrator</p>
        </div>
        <ul className="sidebar-menu" style={{ flex: 1 }}>
          <li className="sidebar-item"><Link to="/dashboard" className="sidebar-link active"><Activity size={20} /> Overview</Link></li>
          <li className="sidebar-item"><Link to="/properties" className="sidebar-link"><Home size={20} /> View Properties</Link></li>
          <li className="sidebar-item"><Link to="/add-property" className="sidebar-link"><PlusCircle size={20} /> List New Property</Link></li>
          <li className="sidebar-item"><Link to="/users" className="sidebar-link"><Users size={20} /> Manage Users</Link></li>
          <li className="sidebar-item" style={{ marginTop: '2rem' }}><a href="#" className="sidebar-link"><Settings size={20} /> Settings</a></li>
          <li className="sidebar-item"><button onClick={logout} className="sidebar-link" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', color: 'var(--danger)' }}><LogOut size={20} /> Sign Out</button></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2 style={{ marginBottom: '2rem' }}>Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
          <StatCard title="Total Properties" value={stats.properties} icon={Home} color="#3b82f6" />
          <StatCard title="Active Users" value={stats.users} icon={Users} color="#10b981" />
          <StatCard title="Monthly Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={DollarSign} color="#8b5cf6" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          <div className="card" style={{ padding: '1.5rem', height: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Traffic Overview</h3>
            <Line data={lineChartData} options={chartOptions} />
          </div>
          <div className="card" style={{ padding: '1.5rem', height: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Transactions</h3>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
