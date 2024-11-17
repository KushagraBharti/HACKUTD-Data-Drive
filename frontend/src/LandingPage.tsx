import React, { useEffect, useRef } from "react";
import "./styles.css";
import carImage from "./white_car_processed.jpg";
import ClusterInsights from "./components/ClusterInsights";
import FuelEfficiencyPrediction from "./components/FuelEfficiencyPrediction";
import FuelEfficiencyChart from "./components/FuelEfficiencyChart";

type SectionKeys = "dataObservability" | "fuelEconomy" | "carbonFootprint" | "predictiveAlerts" | "clusterInsights";

const LandingPage: React.FC = () => {
  const sectionRefs: Record<SectionKeys, React.RefObject<HTMLDivElement>> = {
    dataObservability: useRef<HTMLDivElement>(null),
    fuelEconomy: useRef<HTMLDivElement>(null),
    carbonFootprint: useRef<HTMLDivElement>(null),
    predictiveAlerts: useRef<HTMLDivElement>(null),
    clusterInsights: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (key: SectionKeys) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const car = document.querySelector(".car-animation") as HTMLElement;
      if (car) {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScroll;
        const maxTranslateX = window.innerWidth;
        const translateX = scrollFraction * maxTranslateX;
        car.style.transform = `translateX(-${translateX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="landing-page-container">
      {/* Header Section */}
      <header className="landing-header">
        <h1 className="typing-animation">DataDrive.</h1>
        <p>
          <em>
            Optimize fuel efficiency, reduce emissions, and gain insights with
            our AI-powered dashboard.
          </em>
        </p>
        <img src={carImage} alt="Car" className="car-animation" />
      </header>

      {/* Navigation Buttons */}
      <nav className="landing-navigation">
        {Object.keys(sectionRefs).map((key) => (
          <button
            key={key}
            onClick={() => scrollToSection(key as SectionKeys)}
            className="nav-button"
          >
            {key.replace(/([A-Z])/g, " $1").toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Flashcards Section */}
      <div className="features-section">
        {/* Data Observability Section */}
        <div ref={sectionRefs.dataObservability} className="feature-card">
          <h3>DATA OBSERVABILITY</h3>
          <FuelEfficiencyChart />
        </div>

        {/* Fuel Economy Section */}
        <div ref={sectionRefs.fuelEconomy} className="feature-card">
          <h3>FUEL ECONOMY</h3>
          <FuelEfficiencyPrediction />
        </div>

        {/* Cluster Insights Section */}
        <div ref={sectionRefs.clusterInsights} className="feature-card">
          <h3>CLUSTER INSIGHTS</h3>
          <ClusterInsights />
        </div>

        {/* Carbon Footprint Placeholder */}
        <div ref={sectionRefs.carbonFootprint} className="feature-card">
          <h3>CARBON FOOTPRINT</h3>
          <p>Content for carbon footprint goes here.</p>
        </div>

        {/* Predictive Alerts Placeholder */}
        <div ref={sectionRefs.predictiveAlerts} className="feature-card">
          <h3>PREDICTIVE ALERTS</h3>
          <p>Content for predictive alerts goes here.</p>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
