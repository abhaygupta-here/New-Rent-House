import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';
import PropertyDetail from './pages/PropertyDetail';
import UsersDirectory from './pages/UsersDirectory';
import useStore from './store/useStore';

const App = () => {
  const { user } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="users" element={user ? <UsersDirectory /> : <Navigate to="/login" />} />
          <Route path="add-property" element={user ? <AddProperty /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
