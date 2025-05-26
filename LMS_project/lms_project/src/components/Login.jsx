import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    login: { email: '', password: '' },
    signup: { name: '', email: '', password: '', role: 'student' }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      navigate('/dashboard');
    }
  }, [navigate]);


  const handleInputChange = (tab, field, value) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { email, password } = formData.login;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Store user data if it exists
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Custom event to notify App.js of authentication change
      window.dispatchEvent(new Event('storage'));
      // Redirect to dashboard
      window.location.href = '/dashboard';



    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { name, email, password, role } = formData.signup;

    // Password validation if needed
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          role: role || 'student' // Use selected role or default to student
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Show success message
      alert(data.message || 'Registration successful! Please login.');

      // Clear form and switch to login tab
      setFormData(prev => ({
        ...prev,
        signup: { name: '', email: '', password: '', role: 'student' }
      }));
      setActiveTab('login');

      // Pre-fill login email for convenience
      setFormData(prev => ({
        ...prev,
        login: { ...prev.login, email }
      }));

    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Custom styles for the icons
  const iconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d'
  };

  const rightIconStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d',
    background: 'none',
    border: 'none'
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="card shadow-lg border-0 rounded-lg" style={{ maxWidth: '28rem' }}>
        {/* Tabs */}
        <div className="nav nav-tabs" id="auth-tabs" role="tablist">
          <button
            className={`nav-link w-50 text-center fw-medium py-3 ${activeTab === 'login' ? 'active bg-primary text-white' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`nav-link w-50 text-center fw-medium py-3 ${activeTab === 'signup' ? 'active bg-primary text-white' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="card-body p-4">
          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin}>
              <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="position-relative">
                  <Mail style={iconStyle} size={18} />
                  <input
                    type="email"
                    className="form-control ps-5"
                    placeholder="name@example.com"
                    required
                    value={formData.login.email}
                    onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <Lock style={iconStyle} size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control ps-5 pe-5"
                    required
                    value={formData.login.password}
                    onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                  />
                  <button
                    type="button"
                    style={rightIconStyle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    id="remember"
                    type="checkbox"
                    className="form-check-input"
                  />
                  <label htmlFor="remember" className="form-check-label">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-decoration-none">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup}>
              <h2 className="text-center mb-4 fw-bold">Create Account</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <div className="position-relative">
                  <User style={iconStyle} size={18} />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="John Doe"
                    required
                    value={formData.signup.name}
                    onChange={(e) => handleInputChange('signup', 'name', e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="position-relative">
                  <Mail style={iconStyle} size={18} />
                  <input
                    type="email"
                    className="form-control ps-5"
                    placeholder="name@example.com"
                    required
                    value={formData.signup.email}
                    onChange={(e) => handleInputChange('signup', 'email', e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <Lock style={iconStyle} size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control ps-5 pe-5"
                    required
                    value={formData.signup.password}
                    onChange={(e) => handleInputChange('signup', 'password', e.target.value)}
                  />
                  <button
                    type="button"
                    style={rightIconStyle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Role</label>
                <div className="position-relative">
                  <User style={iconStyle} size={18} />
                  <select
                    className="form-select ps-5"
                    value={formData.signup.role}
                    onChange={(e) => handleInputChange('signup', 'role', e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;