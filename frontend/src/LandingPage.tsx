import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <h1>DataDrive</h1>
        <p>Optimize fuel efficiency, reduce emissions, and gain insights with our AI-powered dashboard.</p>
      </header>

      <nav className="landing-navigation">
        <Link to="/data-observability" className="nav-button">Data Observability Module</Link>
        <Link to="/fuel-economy-visualizer" className="nav-button">Fuel Economy Visualizer</Link>
        <Link to="/carbon-footprint-insights" className="nav-button">Carbon Footprint Insights</Link>
        <Link to="/predictive-alerts" className="nav-button">Predictive Alerts</Link>
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
