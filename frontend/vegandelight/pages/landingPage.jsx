import React from "react";
import Options from "../components/options";
import Welcome from "../components/welcome";
import AboutUs from "../components/aboutUs";
import HowItWorks from "../components/howItWorks";
import Footer from "../components/footer";
import "../styles/landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Options />
      <Welcome />
      <AboutUs />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default LandingPage;
