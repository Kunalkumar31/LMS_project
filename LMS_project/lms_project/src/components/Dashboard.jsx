import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    setLoading(false); // Move inside this block
  } else {
    setLoading(false);
    navigate('/'); // Move *after* loading is false
  }
}, [navigate]);


  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');



    navigate('/');
  };



  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                <User size={40} />
              </div>
              <h5 className="card-title">{user?.name || 'User'}</h5>
              <p className="card-text text-muted">{user?.email}</p>
              <div className="badge bg-primary mb-3">
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User'}
              </div>
              <button onClick={handleLogout} className="btn btn-outline-danger w-100">
                <LogOut size={18} className="me-1" /> Logout
              </button>
            </div>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Navigation</h5>
            </div>
            <div className="list-group list-group-flush">
              <Link to="/dashboard" className="list-group-item list-group-item-action active">
                Dashboard
              </Link>

              {(user?.role === 'instructor' || user?.role === 'admin') && (
                <Link to="/courses" className="list-group-item list-group-item-action">
                  <BookOpen size={18} className="me-2" /> Manage Courses
                </Link>
              )}


            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title">Welcome, {user?.name || 'User'}!</h2>
              <p className="card-text">
                You are now logged in to the learning management system.
              </p>

              {user?.role === 'instructor' && (
                <div className="mt-4">
                  <h4>Instructor Dashboard</h4>
                  <p>You can manage your courses and track student progress.</p>
                  <Link to="/courses" className="btn btn-primary">
                    <BookOpen size={18} className="me-2" /> Manage Your Courses
                  </Link>
                </div>
              )}

              {user?.role === 'student' && (
                <div className="mt-4">
                  <h4>Student Dashboard</h4>
                  <p>You can browse courses and track your learning progress.</p>
                  <button className="btn btn-primary">
                    <BookOpen size={18} className="me-2" /> Browse Courses
                  </button>
                </div>
              )}

              {user?.role === 'admin' && (
                <div className="mt-4">
                  <h4>Admin Dashboard</h4>
                  <p>You have access to administrative tools and settings.</p>
                  <div className="d-flex gap-2">
                    <Link to="/courses" className="btn btn-primary">
                      <BookOpen size={18} className="me-2" /> Manage Courses
                    </Link>
                    <button className="btn btn-primary">
                      <User size={18} className="me-2" /> Manage Users
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;