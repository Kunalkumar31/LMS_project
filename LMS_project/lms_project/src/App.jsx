import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Course from './components/Course';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setIsAuthenticated(true);
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('logout', checkAuth);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logout', checkAuth);
    };
  }, []);


  // Protected route component
  const ProtectedRoute = ({ element, allowedRoles = [] }) => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" />;
    }

    return element;
  };

  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage />} />

          {/*About page route*/}
          <Route path="/about" element={<AboutPage />} />

          {/*Features page route*/}
          <Route path="/features" element={<FeaturesPage />} />

          {/* Login route */}
         <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />


          <Route
            path="/courses"
            element={<ProtectedRoute element={<Course />} allowedRoles={['instructor', 'admin']} />}
          />

          {/* Catch-all route for non-existing paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
