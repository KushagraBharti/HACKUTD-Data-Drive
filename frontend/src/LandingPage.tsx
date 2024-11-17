import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import carImage from "./white_car_processed.jpg";
import ClusterInsights from "./components/ClusterInsights";
import FuelEfficiencyChart from "./components/FuelEfficiencyChart";
import CarDashboard from "./components/CarDashboard";

type SectionKeys = "dataObservability" | "fuelEconomy" | "clusterInsights";

const LandingPage: React.FC = () => {
  const sectionRefs: Record<SectionKeys, React.RefObject<HTMLDivElement>> = {
    dataObservability: useRef<HTMLDivElement>(null),
    fuelEconomy: useRef<HTMLDivElement>(null),
    clusterInsights: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (key: SectionKeys) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Shared state for automatic inputs
  const [sharedInputs, setSharedInputs] = useState<any>(null);

  useEffect(() => {
    // Handle car animation as the user scrolls
    const handleScroll = () => {
      const car = document.querySelector(".car-animation") as HTMLElement;
      if (car) {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScroll;
        const maxTranslateX = window.innerWidth * 0.5; // Limit car movement to half of screen width
        const translateX = scrollFraction * maxTranslateX;
        car.style.transform = `translateX(-${translateX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Fade-in effect for each section as it comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target); // Stop observing once the element is visible
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is in view
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
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

      {/* Discrete Sticky Navigation Buttons */}
      <nav className="discrete-sticky-nav landing-navigation">
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
        {/* Car Dashboard */}
        <div ref={sectionRefs.dataObservability} className="feature-card fade-in">
          <h3>CAR DASHBOARD</h3>
          <CarDashboard setSharedInputs={setSharedInputs} />
        </div>

        {/* Fuel Economy Section */}
        <div ref={sectionRefs.fuelEconomy} className="feature-card fade-in">
          <h3>FUEL ECONOMY</h3>
          <FuelEfficiencyChart autoInputs={sharedInputs} />
        </div>

        {/* Cluster Insights Section */}
        <div ref={sectionRefs.clusterInsights} className="feature-card fade-in">
          <h3>CLUSTER INSIGHTS</h3>
          <ClusterInsights autoInputs={sharedInputs} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
