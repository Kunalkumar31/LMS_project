

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="about-page">

            <header className="bg-primary text-white py-5" data-aos="fade-down">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold">About EduLearn</h1>
                    <p className="lead">Empowering Learners Everywhere</p>
                </div>
            </header>

            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <div
                            className="col-md-6 mb-4 mb-md-0"
                            data-aos="fade-right"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                                alt="About EduLearn"
                                className="img-fluid rounded shadow-lg"
                            />
                        </div>
                        <div className="col-md-6" data-aos="fade-left">
                            <h2 className="fw-bold mb-3">Who We Are</h2>
                            <p>
                                EduLearn is a modern learning platform designed to help students and professionals grow their skills
                                through flexible and affordable online education.
                            </p>
                            <p>
                                Whether you're learning to code, mastering business strategies, or diving into creative arts,
                                EduLearn is here to support your journey with tools, content, and community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container text-center" data-aos="zoom-in">
                    <h2 className="fw-bold mb-4">Our Mission</h2>
                    <p className="lead">
                        To make world-class education accessible, engaging, and personalized for everyone — everywhere.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="fw-bold text-center mb-5" data-aos="fade-up">What Makes Us Different</h2>
                    <div className="row text-center g-4">
                        <div className="col-md-4" data-aos="flip-left">
                            <div className="card h-100 shadow-sm p-4 border-0 hover-shadow transition">
                                <h4 className="fw-bold mb-3">AI-Powered Learning</h4>
                                <p>
                                    Personalized course recommendations and smart progress tracking to optimize your learning path.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="flip-up">
                            <div className="card h-100 shadow-sm p-4 border-0 hover-shadow transition">
                                <h4 className="fw-bold mb-3">Real-Time Interaction</h4>
                                <p>
                                    Live chats, discussion forums, and instructor Q&A features help you stay connected and supported.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="flip-right">
                            <div className="card h-100 shadow-sm p-4 border-0 hover-shadow transition">
                                <h4 className="fw-bold mb-3">Global Community</h4>
                                <p>
                                    Join learners from around the world and collaborate on projects, ideas, and challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 text-center bg-primary text-white" data-aos="fade-up">
                <div className="container">
                    <h2 className="mb-3">Join EduLearn Today</h2>
                    <p className="lead">Start your journey towards knowledge and career growth.</p>
                    <Link to="/login" className="btn btn-light btn-lg mt-3">Get Started</Link>
                </div>
            </section>

            <footer className="bg-dark text-white py-4">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2025 EduLearn. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
};

export default AboutPage;
