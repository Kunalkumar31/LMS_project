
import React, { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const FeaturesPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="features-page">
            <header className="bg-dark text-white py-5" data-aos="fade-down">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold">Platform Features</h1>
                    <p className="lead">Unlock the power of learning with EduLearn</p>
                </div>
            </header>

            <section className="py-5 bg-light">
                <div className="container text-center mb-5" data-aos="zoom-in">
                    <h2 className="fw-bold">Why Choose EduLearn?</h2>
                    <p className="text-muted">Explore what makes our platform powerful and effective</p>
                </div>

                <div className="container">
                    <div className="row g-4">
                        {featuresData.map((feature, index) => (
                            <div className="col-md-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="card h-100 shadow-sm border-0 p-4 hover-shadow transition">
                                    <div className="mb-3">
                                        <i className={`bi ${feature.icon} fs-1 text-primary`}></i>
                                    </div>
                                    <h5 className="fw-bold mb-2">{feature.title}</h5>
                                    <p className="text-muted">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-5 text-center bg-primary text-white" data-aos="fade-up">
                <div className="container">
                    <h2 className="mb-3">Experience the Difference</h2>
                    <p className="lead">Join thousands of learners improving their skills every day</p>
                    <Link to="/signup" className="btn btn-light btn-lg mt-3">Join Now</Link>
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

const featuresData = [
    {
        title: 'AI Recommendations',
        description: 'Smart course suggestions based on your goals and progress.',
        icon: 'bi-cpu',
    },
    {
        title: 'Live Classes',
        description: 'Attend real-time sessions with expert instructors.',
        icon: 'bi-camera-video',
    },
    {
        title: 'Discussion Forums',
        description: 'Collaborate and solve problems with peers and mentors.',
        icon: 'bi-chat-dots',
    },
    {
        title: 'Quizzes & Assessments',
        description: 'Test your skills with auto-graded interactive quizzes.',
        icon: 'bi-ui-checks',
    },
    {
        title: 'Certificate of Completion',
        description: 'Earn shareable certificates after completing courses.',
        icon: 'bi-award',
    },
    {
        title: 'Mobile Friendly',
        description: 'Learn anytime, anywhere on any device.',
        icon: 'bi-phone',
    },
];

export default FeaturesPage;
