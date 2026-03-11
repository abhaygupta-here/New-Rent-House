import { Outlet, Link } from 'react-router-dom';
import { Home, User, LogIn, LogOut, Sun, Moon, LayoutDashboard } from 'lucide-react';
import useStore from '../store/useStore';
import { useEffect } from 'react';

const Layout = () => {
  const { user, theme, setTheme, logout } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <Home size={28} />
            <span>CasaZen</span>
          </Link>

          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/properties" className="nav-link">Properties</Link>
            {user && (
              <>
                <Link to="/add-property" className="nav-link">List Property</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </>
            )}
          </nav>

          <div className="nav-actions">
            <button className="btn-icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {user ? (
              <button className="btn btn-outline gap-2" onClick={logout}>
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary gap-2">
                <LogIn size={18} /> Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      
      <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
        <p>&copy; 2026 CasaZen. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
