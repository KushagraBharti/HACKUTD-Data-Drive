import React, { useRef, useEffect } from 'react';
import './LandingPage.css';
import carImage from './white_car_processed.jpg';

const LandingPage = () => {
  const sectionRefs = {
    dataObservability: useRef<HTMLDivElement>(null),
    fuelEconomy: useRef<HTMLDivElement>(null),
    carbonFootprint: useRef<HTMLDivElement>(null),
    predictiveAlerts: useRef<HTMLDivElement>(null),
    clusterInsights: useRef<HTMLDivElement>(null)
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const car = document.querySelector('.car-animation') as HTMLElement;
      if (car) {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScroll;
        const maxTranslateX = window.innerWidth;
        const translateX = scrollFraction * maxTranslateX;
        car.style.transform = `translateX(-${translateX}px)`;
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
        <button 
          onClick={() => scrollToSection(sectionRefs.dataObservability)}
          className="nav-button"
        >
          Data Observability Module
        </button>
        <button 
          onClick={() => scrollToSection(sectionRefs.fuelEconomy)}
          className="nav-button"
        >
          Fuel Economy Visualizer
        </button>
        <button 
          onClick={() => scrollToSection(sectionRefs.carbonFootprint)}
          className="nav-button"
        >
          Carbon Footprint Insights
        </button>
        <button 
          onClick={() => scrollToSection(sectionRefs.predictiveAlerts)}
          className="nav-button"
        >
          Predictive Alerts
        </button>
        <button 
          onClick={() => scrollToSection(sectionRefs.clusterInsights)}
          className="nav-button"
        >
          Cluster Insights
        </button>
      </nav>

      <div className="features-section">
        <div ref={sectionRefs.dataObservability} className="feature-card">
          <h3>Data Observability</h3>
          <p>Monitor Toyota's fuel data lifecycle and gain insights into data pipeline inefficiencies and delays.</p>
        </div>
        <div ref={sectionRefs.fuelEconomy} className="feature-card">
          <h3>Fuel Economy Visualizer</h3>
          <p>Analyze historical fuel data trends and receive actionable recommendations for improving efficiency.</p>
        </div>
        <div ref={sectionRefs.carbonFootprint} className="feature-card">
          <h3>Carbon Footprint Insights</h3>
          <p>Understand how data inefficiencies and driving behaviors impact CO2 emissions.</p>
        </div>
        <div ref={sectionRefs.predictiveAlerts} className="feature-card">
          <h3>Predictive Alerts</h3>
          <p>Get notified about anomalies, such as sudden spikes in fuel consumption, and customize alert thresholds.</p>
        </div>
        <div ref={sectionRefs.clusterInsights} className="feature-card">
          <h3>Cluster Insights</h3>
          <p>Analyze data clusters to identify patterns and optimize performance.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
