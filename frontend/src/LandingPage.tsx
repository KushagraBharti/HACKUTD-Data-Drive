import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import carImage from './white_car_processed.jpg';


const LandingPage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const car = document.querySelector('.car-animation') as HTMLElement;
      if (car) {
        // Get the total scrollable height of the page
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScroll;

        // Calculate the translation value for right-to-left movement
        const maxTranslateX = window.innerWidth; // Maximum distance to travel across the viewport width
        const translateX = scrollFraction * maxTranslateX; // Move proportionally to scroll amount

        // Apply transformation to move the car from right to left
        car.style.transform = `translateX(-${translateX}px)`; // Negative value moves left
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return ( 
    
    <div className="landing-page-container">
      <header className="landing-header">
        <h1 className="typing-animation">DataDrive.</h1>
        <p><em>Optimize fuel efficiency, reduce emissions, and gain insights with our AI-powered dashboard.</em></p>
        <img src={carImage} alt="Car" className="car-animation" />
      </header>

      <nav className="landing-navigation">
        <Link to="/data-observability" className="nav-button">Data Observability Module</Link>
        <Link to="/fuel-economy-visualizer" className="nav-button">Fuel Economy Visualizer</Link>
        <Link to="/carbon-footprint-insights" className="nav-button">Carbon Footprint Insights</Link>
        <Link to="/predictive-alerts" className="nav-button">Predictive Alerts</Link>
        <Link to="/cluster-insights" className="nav-button">Cluster Insights</Link>
      </nav>


      <section className="features-section">
        <div className="feature-card">
          <h3>Data Observability</h3>
          <p>Monitor Toyota’s fuel data lifecycle and gain insights into data pipeline inefficiencies and delays.</p>
        </div>
        <div className="feature-card">
          <h3>Fuel Economy Visualizer</h3>
          <p>Analyze historical fuel data trends and receive actionable recommendations for improving efficiency.</p>
        </div>
        <div className="feature-card">
          <h3>Carbon Footprint Insights</h3>
          <p>Understand how data inefficiencies and driving behaviors impact CO2 emissions.</p>
        </div>
        <div className="feature-card">
          <h3>Predictive Alerts</h3>
          <p>Get notified about anomalies, such as sudden spikes in fuel consumption, and customize alert thresholds.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
