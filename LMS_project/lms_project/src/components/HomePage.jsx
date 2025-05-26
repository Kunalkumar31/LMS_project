
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../components/HomePage.css'


const HomePage = () => {
  return (
    <div className="homepage">

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">EduLearn</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/features">Features</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active" style={{ height: '90vh', backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container h-100 d-flex align-items-center justify-content-center text-center text-white bg-dark bg-opacity-50">
              <div>
                <h1 className="display-4 fw-bold">Welcome to EduLearn</h1>
                <p className="lead">Learn, Grow, Succeed — Anywhere, Anytime</p>
                <Link to="/login" className="btn btn-light btn-lg px-4 mt-3">
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item" style={{ height: '90vh', backgroundImage: 'url(https://images.unsplash.com/photo-1529070538774-1843cb3265df)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container h-100 d-flex align-items-center justify-content-center text-center text-white bg-dark bg-opacity-50">
              <div>
                <h1 className="display-4 fw-bold">AI-Powered Learning</h1>
                <p className="lead">Smarter paths, personalized outcomes.</p>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4 mt-3">
                  Start Learning
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item" style={{ height: '90vh', backgroundImage: 'url(https://images.unsplash.com/photo-1496307653780-42ee777d4833)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container h-100 d-flex align-items-center justify-content-center text-center text-white bg-dark bg-opacity-50">
              <div>
                <h1 className="display-4 fw-bold">Join Our Global Community</h1>
                <p className="lead">Collaborate with learners around the world</p>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4 mt-3">
                  Join Now
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Our Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="feature-icon bg-primary text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                    <i className="bi bi-book" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <h5 className="card-title">Rich Course Content</h5>
                  <p className="card-text">Access thousands of courses across various domains to enhance your skills.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="feature-icon bg-warning text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                    <i className="bi bi-people" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <h5 className="card-title">Expert Instructors</h5>
                  <p className="card-text">Learn from industry experts and seasoned professionals in various fields.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="feature-icon bg-success text-white rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                    <i className="bi bi-laptop" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <h5 className="card-title">Flexible Learning</h5>
                  <p className="card-text">Study at your own pace with easy-to-access online content available 24/7.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Start Learning?</h2>
          <p className="lead mb-4">Join thousands of students who are already enhancing their skills on our platform</p>
          <Link to="/login" className="btn btn-light btn-lg px-4">
            Get Started Now
          </Link>
        </div>
      </section>


      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>EduLearn</h5>
              <p>Your ultimate learning companion for personal and professional growth.</p>
            </div>
            <div className="col-md-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                <li><a href="/features" className="text-white text-decoration-none">Features</a></li>
                <li><a href="/about" className="text-white text-decoration-none">About</a></li>
                <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>Email: info@edulearn.com</li>
                <li>Phone: +91 620</li>
              </ul>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">&copy; 2025 EduLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
